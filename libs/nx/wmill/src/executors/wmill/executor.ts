import { WmillExecutorSchema } from './schema';

export default async function runExecutor(options: WmillExecutorSchema) {
  console.log('Executor ran for Wmill', options);

  return {
    success: true,
  };
}
