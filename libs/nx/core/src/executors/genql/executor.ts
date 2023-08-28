import { generate } from '@genql/cli';
import { Effect, Context } from 'effect';

import { GenqlExecutorSchema } from './schema';

const GenqlContext = Context.Tag<GenqlExecutorSchema>();

class GenqlError {
  _tag = 'GenqlError';
  // prettier-ignore
  constructor(public message: string) { }
}

const executeGenql = Effect.gen(function* (_) {
  const ctx = yield* _(GenqlContext);

  yield* _(
    Effect.tryPromise({
      try: () => generate(ctx),
      catch: () => new GenqlError('There was an error running the generate() function from @genql/cli.'),
    }),
  );

  return {
    success: true,
  };
});

export default async function runExecutor(options: GenqlExecutorSchema) {
  const runnable = Effect.provideService(executeGenql, GenqlContext, GenqlContext.of(options));

  return Effect.runPromise(runnable);
}
