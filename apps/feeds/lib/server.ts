/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */

import * as S from '@effect/schema/Schema';
import { formatErrors } from '@effect/schema/TreeFormatter';
import { Effect } from 'effect';
import * as Either from 'effect/Either';
import * as Fn from 'effect/Function';

import {
  APIResult,
  EndpointDefinition,
  WithRequest,
  inferParams,
  inferRequest,
  inferRouteOkResponse,
  HTTPMethod,
  makeAPIErrorResult,
  makeAPIError,
  makeErrorResult,
  APIResultSchema,
} from './util';

type Handler<Params extends Record<string, any>, Body, ResponseData, Request> = (
  request: Request,
  params: Params,
  body: Body,
) => Promise<APIResult<any, ResponseData>>;

type createHandlerFn<RD, Params extends Record<string, any>, Request> = RD extends WithRequest<any, any>
  ? Handler<Params, inferRequest<RD>, inferRouteOkResponse<RD>, Request>
  : Handler<Params, never, inferRouteOkResponse<RD>, Request>;

export type EndpointHandlers<ED extends EndpointDefinition<any>, Request> = {
  [Method in keyof ED['methods']]: createHandlerFn<ED['methods'][Method], inferParams<ED>, Request>;
};

export const handleCoreRequest = async <ED extends EndpointDefinition<any>>(
  endpoint: ED,
  handlers: EndpointHandlers<ED, any>,
  method: HTTPMethod,
  rawUrl: string,
  body: unknown,
  request: any,
) => {
  const url = new URL(rawUrl, 'http://localhost');
  const query = Object.fromEntries(url.searchParams);

  const r = endpoint.methods[method];
  const handler = handlers[method];

  if (!r) {
    console.warn(`Received ${method} request on ${url}, but the schema does not support this method`);

    return makeAPIErrorResult(405, 'Method not allowed');
  }

  if (!handler) {
    console.warn(`Received ${method} request on ${url}, but no handler is attached to that method`);

    return makeAPIErrorResult(500, 'No handler attached to method');
  }

  const params = Fn.pipe(
    query,
    S.parseEither(endpoint.path.schema),
    Either.mapLeft((errors) => makeAPIError(400, `Could not parse path params with schema: ${formatErrors(errors.errors)}`)),
  );

  if (Either.isLeft(params)) {
    return makeErrorResult({
      ok: false,
      error: params.left,
    });
  }

  /* eslint-disable no-undef-init */
  let validated: inferRequest<ED['methods'][typeof method]> | undefined = undefined;

  if ('request' in r) {
    const json = Fn.pipe(
      body,
      S.parseEither(r.request),
      Either.mapLeft((errors) => makeAPIError(400, `Could not parse json with schema: ${formatErrors(errors.errors)}`)),
    );

    if (Either.isLeft(json)) {
      return makeErrorResult({
        ok: false,
        error: json.left,
      });
    }

    validated = json.right;
  }

  return Effect.runPromise(
    Fn.pipe(
      Effect.promise(() => {
        // @ts-expect-error these signatures match.
        const r = handler(request, params.right, validated);

        return r;
      }),
      Effect.flatMap(S.encode(APIResultSchema(r.response))),
      Effect.mapError((errors) =>
        makeAPIErrorResult(500, `Could not encode response with schema: ${formatErrors(errors.errors)}`),
      ),
      Effect.merge,
    ),
  );
};
