import * as S from '@effect/schema/Schema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OkResultSchema = <T>(inner: S.Schema<any, T>) => S.struct({ ok: S.literal(true), data: inner });
export type OkResult<T> = S.To<ReturnType<typeof OkResultSchema<T>>>;
export const makeOkResult = <T>(inner: T) => ({ ok: true, data: inner } as const);
export type inferOkResult<R> = R extends OkResult<infer Res> ? Res : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorResultSchema = <T>(inner: S.Schema<any, T>) => S.struct({ ok: S.literal(false), error: inner });
export type ErrorResult<T> = S.To<ReturnType<typeof ErrorResultSchema<T>>>;
export const makeErrorResult = <T>(inner: T) => ({ ok: false, error: inner } as const);
export type inferErrorResult<R> = R extends ErrorResult<infer Res> ? Res : never;

export const ResultSchema = <DIn, DOut, EIn, EOut>(ok: S.Schema<DIn, DOut>, err: S.Schema<EIn, EOut>) =>
  S.union(OkResultSchema(ok), ErrorResultSchema(err));
export type Result<DIn, DOut, EIn, EOut> = S.To<ReturnType<typeof ResultSchema<DIn, DOut, EIn, EOut>>>;
