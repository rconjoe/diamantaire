import { SyncExecutorSchema } from './schema';
import executor from './executor';

const options: SyncExecutorSchema = {};

describe('Sync Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
