/* eslint-disable @typescript-eslint/no-explicit-any */

import * as S from '@effect/schema/Schema';

import { ResultSchema, inferOkResult, makeErrorResult } from './result';

export * from './result';
export * from './optional';

export const APIErrorSchema = S.struct({
  code: S.number,
  message: S.string,
});

export type APIError = S.To<typeof APIErrorSchema>;
// here you get a function that takes a code/message and returns an object matching the APIError schema.
// without as const here, the compiler will complain that the type is not assignable to the type parameter of the function.
export const makeAPIError = (code: number, message: string): APIError => ({ code, message } as const);

export const makeAPIErrorResult = (code: number, message: string) => makeErrorResult(makeAPIError(code, message));

export const APIResultSchema = <In, Out>(inner: S.Schema<In, Out>) => ResultSchema(inner, APIErrorSchema);
export type APIResult<In, Out> = S.To<ReturnType<typeof APIResultSchema<In, Out>>>;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// a path will eventually go into an object used to describe an endpoint (lets say "endpoint descriptor").
// this object will have knowledge of:
// - the path string itself (e.g. /api/v1.3.21a/burninators/trogdor)
//   - that string is not specified on our "endpoint descriptor" as a string,
export type Path<Params> = {
  // so you are describing here, what we can think of as object called "schema" of type "S.Schema"
  // for you to create an instance of an S.Schema, you have to provide a type definition for two of its properties.
  // you will see these called I and A, but that only helps people who already know what I and A are.
  // they are really "From" and "To" respectively.
  schema: S.Schema<any, Params>;
  encode: Resolver<Params>;
};
export type inferParams<MD> = MD extends EndpointDefinition<infer Params> ? Params : never;

type Resolver<S> = (s: S) => string;

// why a path *resolver*? think of buildWhateverRoute stuff in vno...
// routes are complex and have many parts, so we need a way to build them up as we go, but not end up with a mess,
// re: vno route-builders - buildDynamicRouteExceptOnThursdayWTF.js
export const makePathResolver = <Params>(schema: S.Schema<any, Params>, s: Resolver<Params>): Path<Params> => ({
  schema,
  encode: s,
});

type RouteAuth = { auth: boolean };

export type WithResponse<In, Out> = { response: S.Schema<In, Out> };
export type inferResponse<M> = M extends WithResponse<any, infer Res> ? APIResult<any, Res> : never;
export type inferSuccessResponse<D extends EndpointDefinition<any>, M extends keyof D['methods']> = inferOkResult<
  D['methods'][M]
>;

// an object, with a property "request", which is itself a Schema.
export type WithRequest<In, Out> = { request: S.Schema<In, Out> };
export type inferRequest<M> = M extends WithRequest<any, infer Req> ? Req : never;

export type Route<Method extends HTTPMethod> = (Method extends 'GET' | 'DELETE'
  ? WithResponse<any, any>
  : WithResponse<any, any> | (WithRequest<any, any> & WithResponse<any, any>)) &
  RouteAuth;
export type inferRouteOkResponse<R> = R extends WithResponse<any, infer Res> ? Res : never;

// describes the structure and available methods (like GET, POST) of an API endpoint
export type EndpointDefinition<Params> = {
  path: Path<Params>;
  methods: {
    [K in HTTPMethod]?: Route<K>;
  };
};

export type Endpoint = EndpointDefinition<any>;
