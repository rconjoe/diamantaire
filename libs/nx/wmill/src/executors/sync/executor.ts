import { SyncExecutorSchema } from './schema';

export default async function runExecutor(options: SyncExecutorSchema) {
  console.log('Executor ran for Sync', options);
  return {
    success: true,
  };
}
