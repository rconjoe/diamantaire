import { buildClient } from '@datocms/cma-client-node';
import { NonRetriableError } from 'inngest';

import { inngest } from './client';

export type DemoPingDatoEvent = {
  data: {
    recordId: string;
  };
};

const datodemo = inngest.createFunction(
  { name: 'Demo Dato Pinger' },
  { event: 'demo/ping.dato' },
  async ({ event, step }) => {
    const record = await step.run('fetching record', async () => {
      const client = buildClient({ apiToken: process.env.DATO_NODE_CLIENT_TOKEN });

      try {
        return await client.items.find(event.data.recordId);
      } catch (error) {
        throw new NonRetriableError('error fetching from dato,', {
          cause: error,
        });
      }
    });

    step.sleep(1000);

    return {
      ...record,
    };
  },
);

export default datodemo;
