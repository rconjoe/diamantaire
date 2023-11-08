import executor from './executor';
import { WmillExecutorSchema } from './schema';

const options: WmillExecutorSchema = {};

describe('Wmill Executor', () => {
  it('can run', async () => {
    const output = await executor(options);

    expect(output.success).toBe(true);
  });
});
