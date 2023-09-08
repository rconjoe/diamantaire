/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from 'next/server';

import { EndpointHandlers, handleCoreRequest } from './server';
import { APIResult, EndpointDefinition, HTTPMethod, makeAPIErrorResult } from './util';

export type createNextAppHandlers<ED extends EndpointDefinition<any>> = {
  [M in keyof ED['methods']]: (request: NextRequest) => Promise<Response>;
};

export const makeNextAppHandler = <ED extends EndpointDefinition<any>>(
  endpoint: ED,
  handlers: EndpointHandlers<ED, NextRequest>,
) => {
  const h = {} as createNextAppHandlers<ED>;

  for (const method of Object.keys(endpoint.methods)) {
    const m = method as HTTPMethod;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const def = endpoint.methods[m]!;

    h[m] = async (req: NextRequest) => {
      if (req.method !== method) {
        return new Response(
          JSON.stringify(makeAPIErrorResult(405, `Method ${req.method} not allowed`) satisfies APIResult<any, any>),
          { status: 405, headers: { Allow: method } },
        );
      }

      const bodyIn = 'request' in def ? await req.json() : undefined;

      const handlerResponse = await handleCoreRequest(endpoint, handlers, m, req.url, bodyIn, req);

      console.log(handlerResponse);
      const body = JSON.stringify(handlerResponse);

      return new Response(body, {
        // @ts-expect-error - if handlerResponse.ok is false, error will be present.
        status: handlerResponse.ok ? 200 : handlerResponse.error.code,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };
  }

  return h;
};
