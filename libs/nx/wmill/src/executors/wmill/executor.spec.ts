import { WmillExecutorSchema } from './schema';
import executor from './executor';

const options: WmillExecutorSchema = {};

describe('Wmill Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
