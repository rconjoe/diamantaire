import executor from './executor';
import { SyncExecutorSchema } from './schema';

const options: SyncExecutorSchema = {};

describe('Sync Executor', () => {
  it('can run', async () => {
    const output = await executor(options);

    expect(output.success).toBe(true);
  });
});
