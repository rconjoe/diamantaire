/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from 'next/server';

import { EndpointHandlers, handleCoreRequest } from './server';
import { APIResult, EndpointDefinition, HTTPMethod, makeAPIErrorResult } from './util';

// this will generater handler functions for each method defined in an EndpointDefinition
export type createNextAppHandlers<ED extends EndpointDefinition<any>> = {
  [M in keyof ED['methods']]: (request: NextRequest) => Promise<Response>;
};

// the makeNextAppHandler function returns an object containing handler functions for each HTTP method you put in the ED
// handler functions process incoming requests, verify the HTTP method, then pass off to a core handler to get a Response.
export const makeNextAppHandler = <ED extends EndpointDefinition<any>>(
  endpoint: ED,
  handlers: EndpointHandlers<ED, NextRequest>,
) => {
  // initializes an empty object h and type-asserts it as createNextAppHandlers<ED>
  // this object will hold the handler functions for each method defined in the provided endpoint definition.
  const h = {} as createNextAppHandlers<ED>;

  // for each HTTPMethod in the provided endpoint definition...
  for (const method of Object.keys(endpoint.methods)) {
    // Convert the method name to the HTTPMethod type.
    const m = method as HTTPMethod;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const def = endpoint.methods[m]!; // Access the specific method definition from the endpoint.

    // ...create a handler function, which will -
    h[m] = async (req: NextRequest) => {
      // if the request's HTTP method doesn't match the expected method for this handler,
      if (req.method !== method) {
        // a 405 Method Not Allowed error response is returned
        return new Response(
          JSON.stringify(makeAPIErrorResult(405, `Method ${req.method} not allowed`) satisfies APIResult<any, any>),
          { status: 405, headers: { Allow: method } },
        );
      }

      // extract the request body if required by the method definition
      const bodyIn = 'request' in def ? await req.json() : undefined;

      // process the request...
      const handlerResponse = await handleCoreRequest(endpoint, handlers, m, req.url, bodyIn, req);

      // convert the handlers response to a JSON format and create the actual Response obje
      const body = JSON.stringify(handlerResponse);

      return new Response(body, {
        // if handlerResponse.ok is true, use 200
        // if there's an error, use the error code provided by the handler
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
