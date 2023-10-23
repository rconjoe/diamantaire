// import { spinner } from 'zx/experimental';
// import { Effect, Context } from 'effect';
import { exec } from 'teen_process';
//
// import { syncexecutorschema } from './schema';
//
// const synccontext = context.tag<syncexecutorschema>();
//
// class SyncError {
//   _tag = 'SyncError';
//   // prettier-ignore
//   constructor(public message: string) { }
// }
//
// const executeSync = Effect.gen(function*(_) {
//   const ctx = yield* _(SyncContext);
//
//   console.log(ctx);
//
//   yield* _(
//     Effect.tryPromise({
//       try: () => $`wmill sync pull`,
//       catch: () => new SyncError('Shit! `wmill sync pull` failed.'),
//     }),
//   );
//
//   return {
//     success: true,
//   };
// });

export default async function runExecutor(options: SyncExecutorSchema) {
  try {
    const { stdout, stderr, code } = await exec('ls');

    console.log(stdout.split('\n'));
    console.log(stderr);
    console.log(code);

    return { success: true };
  } catch (e) {
    console.error(e);
  }

  // const runnable = Effect.provideService(executeSync, SyncContext, SyncContext.of(options));
  //
  // return Effect.runPromise(runnable);
}
