import * as Context from 'effect/Context';
import * as Option from 'effect/Option';

type ParsedQuery<T = string> = Record<string, T | null | Array<T | null>>;

// This object represents the different HTTP methods that can be used in a request.
export const Method = {
  GET: null,
  POST: null,
  PUT: null,
  DELETE: null,
  PATCH: null,
};

// a union of the keys of the `Method` object.
export type Method = keyof typeof Method;

// an object with keys of type `A` and values of objects with keys of type `B` and values of type `any`.
type Indexed<A extends string, B extends string> = {
  [a in A]: { [b in B]: any };
};

// takes three type parameters `A`, `B`, and `T` and returns an object with keys
// of type `A` and values of objects with keys of type `B` and values of type `T`.
type MakeIndexed<A extends string, B extends string, T extends Indexed<A, B>> = T;

// a union of the strings "JSON", "DATA", "FORM", and "BINARY".
export type RequestType = 'JSON' | 'DATA' | 'FORM' | 'BINARY';

export type RequestBodyTypes = MakeIndexed<
  RequestType,
  Method,
  {
    JSON: {
      GET: unknown;
      POST: unknown;
      PUT: unknown;
      DELETE: unknown;
      PATCH: unknown;
    };
    DATA: {
      GET: ParsedQuery<string | number | boolean>;
      POST: ParsedQuery<string | number | boolean>;
      PUT: ParsedQuery<string | number | boolean>;
      DELETE: ParsedQuery<string | number | boolean>;
      PATCH: ParsedQuery<string | number | boolean>;
    };
    FORM: {
      GET: FormData;
      POST: FormData;
      PUT: FormData;
      DELETE: FormData;
      PATCH: FormData;
    };
    BINARY: {
      GET: Buffer;
      POST: Buffer;
      PUT: Buffer;
      DELETE: Buffer;
      PATCH: Buffer;
    };
  }
>;

// an interface that represents a generic data input object.
// this allows any string key to be associated with an unknown value.
export interface DataInput {
  [k: string]: unknown;
}

// type alias for a record object that represents HTTP headers. maps string keys to string values.
export type Headers = Record<string, string>;

// an interface that represents an HTTP response:
//    - `body` is an optional value of type `Option.Option<Body>`. response body can be of any type.
//    - `headers` is a record object of type `Headers`.
//    - `status` is a number that represents the HTTP status code of the response.
export interface Response<Body> {
  body: Option.Option<Body>;
  headers: Headers;
  status: number;
}

// tags
export const HttpErrorReason = {
  Request: 'HttpErrorRequest',
  Response: 'HttpErrorResponse',
} as const;

// a type alias that represents the type of `HttpErrorReason`. same as the type of the `HttpErrorReason` object.
export type HttpErrorReason = typeof HttpErrorReason;

// an interface that represents an HTTP response error. It has two properties:
// - `_tag` is a value of type `HttpErrorReason['Response']`
// - `response` is an object of type `Response<ErrorBody>`
export interface HttpResponseError<ErrorBody> {
  _tag: HttpErrorReason['Response'];
  response: Response<ErrorBody>;
}

// checks if `u` is not null, is an object, and has a `_tag` of `HttpErrorReason.Response`
// note: uses `u is HttpResponseError<unknown>` type predicate to inform the TS compiler that when true,
// the type of `u` should be narrowed down to `HttpResponseError<unknown>`.
export function isHttpResponseError(u: unknown): u is HttpResponseError<unknown> {
  return typeof u === 'object' && u !== null && (u as any)['_tag'] === HttpErrorReason.Response;
}

// same for requests
export interface HttpRequestError {
  _tag: HttpErrorReason['Request'];
  error: Error;
}
export function isHttpRequestError(u: unknown): u is HttpRequestError {
  return typeof u === 'object' && u !== null && (u as any)['_tag'] === HttpErrorReason.Request;
}

// catch either
export function isHttpError(u: unknown): u is HttpError<unknown> {
  return isHttpRequestError(u) || isHttpResponseError(u);
}

// Generic for either
export type HttpError<ErrorBody> = HttpRequestError | HttpResponseError<ErrorBody>;

// handles both types of HTTP errors. takes a callback for each.
// returns a function that takes an `HttpError<ErrorBody>` and returns the result of the callback that ran.
export function foldHttpError<A, B, ErrorBody>(
  onError: (e: Error) => A,
  onResponseError: (e: Response<ErrorBody>) => B,
): (err: HttpError<ErrorBody>) => A | B {
  return (err) => {
    switch (err._tag) {
      case 'HttpErrorRequest':
        return onError(err.error);
      case 'HttpErrorResponse':
        return onResponseError(err.response);
    }
  };
}

export type HttpHeaders = Record<string, string>;
export const HttpHeaders = Context.Tag<HttpHeaders>();
// const accessHttpHeaders_ = Effect.contextWith((env: Context.Context<never>) => env.getOption(HttpHeaders));
//
// export function accessHttpHeadersM<R, E, A>(eff: (h: Option.Option<HttpHeaders>) => Effect<R, E, A>) {
//   return accessHttpHeaders_.flatMap(eff);
// }
// export function accessHttpHeaders<A>(eff: (h: Option.Option<HttpHeaders>) => A) {
//   return accessHttpHeaders_.map(eff);
// }
