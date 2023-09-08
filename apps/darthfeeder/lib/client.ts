/* eslint-disable @typescript-eslint/no-explicit-any */

import * as S from '@effect/schema/Schema';
import { formatErrors } from '@effect/schema/TreeFormatter';
import { Effect } from 'effect';
import * as Either from 'effect/Either';
import * as Fn from 'effect/Function';

import {
  APIResult,
  APIResultSchema,
  EndpointDefinition,
  inferOkResult,
  inferParams,
  inferRequest,
  inferResponse,
  makeAPIErrorResult,
} from './util';

type MethodResult<MD> = Promise<inferResponse<MD>>;

type createAuthedMethodFn<MD, Params> = MD extends { request: any }
  ? (token: string, params: Params, body: inferRequest<MD>) => MethodResult<MD>
  : (token: string, params: Params) => MethodResult<MD>;

type createPublicMethodFn<MD, Params> = MD extends { request: any }
  ? (params: Params, body: inferRequest<MD>) => MethodResult<MD>
  : (params: Params) => MethodResult<MD>;

type createMethodFn<MD, Params> = MD extends { auth: true }
  ? createAuthedMethodFn<MD, Params>
  : createPublicMethodFn<MD, Params>;

// this looks like makeNextAppHandler or makeNextPagesHandler because it is, only creating client side resources this time.
// it is how you get both server handling code AND a "client sdk" from the same EndpointDefinition.
// ****
// **** the core idea in our implementation here is that:
// ****ED's are the source of truth for the API so both the client sdk and the server handlers are generated from them.****
// ****ED's are the source of truth for the API so both the client sdk and the server handlers are generated from them.****
// ****ED's are the source of truth for the API so both the client sdk and the server handlers are generated from them.****
// ****ED's are the source of truth for the API so both the client sdk and the server handlers are generated from them.****
// ****
// tRPC/ts-rest/nestia/zodium et al, ad nauseum... this is what they provide essentially is ways to do this same thing
// i hope this makes more sense over time as it is very powerful and flexible for us.
export type EndpointClient<D extends EndpointDefinition<any>> = {
  [M in keyof D['methods']]: createMethodFn<D['methods'][M], inferParams<D>>;
};

// infers the structure of a successful response from an EndpointClient.
// extracts the "OK" result from the return type of a method within the client.
export type inferSuccessResponse<D extends EndpointClient<any>, M extends keyof D> = inferOkResult<
  Awaited<ReturnType<D[M]>>
>;

// again, same thing as makeNextAppHandler or makeNextPagesHandler, but for an EndpointClient instead of EndpointHandlers
// see those two functions for more detailed comments...
export const makeClient = <D extends EndpointDefinition<any>>(base: string, endpoint: D): EndpointClient<D> => {
  // this will hold the methods specified in the endpoint definition
  const client: Partial<EndpointClient<D>> = {};

  // go over each provided method
  for (const method of Object.keys(endpoint.methods)) {
    // get its definition
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const def = endpoint.methods[method as keyof typeof endpoint.methods]!;

    // this function will make the actual API request when invoked -
    // eslint-disable-next-line prettier/prettier
    client[method] = async function(...args: any[]) {
      const opts: RequestInit = {
        method: method,
      };

      let token: string | undefined;

      // if auth is specified, extract the token from the first argument
      if (def.auth) {
        token = args.shift();
      }

      // extract the params for the request on deck
      const params = args.shift() as inferParams<D>;
      // and use it to encode the path...
      const path = endpoint.path.encode(params);
      // and form a URL we will use to make the request
      const url = new URL(path, base);

      // these we don't have to check for a body on
      const noRequestBody = method === 'GET' || method === 'DELETE';

      // if we hit a request definition in the loop and it's not one of those ^
      if (!noRequestBody && 'request' in def) {
        // extract the body...
        const rawBody = args.shift();

        // encode that body according to the provided schema and explicitly handle errors...
        // TODO: refactor this to use Effect.gen
        const body = Fn.pipe(
          rawBody,
          S.encodeEither(def.request),
          Either.mapRight((errors) => `Could not encode request body with schema: ${formatErrors(errors.errors)}`),
          Either.mapLeft((encoded) => JSON.stringify(encoded)),
        );

        // TODO: standardize a set of (preferably diamond-themed) error codes
        if (Either.isLeft(body)) return makeAPIErrorResult(4000, body.left);

        opts.body = body.right;
        opts.headers = {
          // if auth is specified... add token to request headers.
          // TODO: widen spec to allow others like Authorization bearer, x-shopify-access-token, etc.
          // TODO: to have a version of the auth feature that is qstash instead would be really useful -
          // it could trigger request validation so that others using the queue don't have to write it themselves.
          ...(def.auth ? { Cookie: `token=${token}` } : {}),
          ...opts.headers,
          'Content-Type': 'application/json',
        };
      }

      // make the fetch request. these calls are the ones that, when wrapped like this, we call an "sdk" or "client".
      // TODO: not as important as core handlers, but this should be hardened as well:
      const response = await fetch(url, opts);
      const raw = await response.text();

      // look at the type of v. this will end up being our response.
      const v = Effect.runSync(
        // TODO: refactor to Effect.gen. this is a bit of a mess the way it is.
        Fn.pipe(
          // try parsing "raw" into json
          Effect.try({
            try: () => JSON.parse(raw) as unknown,
            // if this throws, the server handler for this endpoint is drunk. check backend logs
            catch: () => makeAPIErrorResult(5000, `Could not parse json: ${raw}`),
          }),
          // if the json parses, try to parse it into the predefined response schema :D
          Effect.flatMap(S.parse(APIResultSchema(def.response))),
          // throwing here would indicate we got a workable response but it doesn't match the schema we expected
          Effect.mapError((errors) =>
            '_tag' in errors && errors._tag === 'ParseError'
              ? makeAPIErrorResult(5000, `Could not parse json with schema: ${formatErrors(errors.errors)}`)
              : (errors as APIResult<any, any>),
          ),
          Effect.merge,
        ),
      );

      // return the processed response...
      return v;
    };
  }

  return client as EndpointClient<D>;
};
