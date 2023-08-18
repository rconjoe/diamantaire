import { generate } from '@genql/cli';
import { Effect, Context } from 'effect';

import { GenqlExecutorSchema } from './schema';

const GenqlContext = Context.Tag<GenqlExecutorSchema>();

const executeGenql = Effect.gen(function* (_) {
  const ctx = yield* _(GenqlContext);

  const result = yield* _(
    Effect.tryPromise({
      try: () => generate(ctx),
      catch: () => new Error(),
    }),
  );

  return result;
});

export default async function runExecutor(options: GenqlExecutorSchema) {
  const runnable = Effect.provideService(executeGenql, GenqlContext, GenqlContext.of(options));

  Effect.runPromise(runnable)
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((e) => {
      return {
        success: false,
        error: e,
      };
    });
}
