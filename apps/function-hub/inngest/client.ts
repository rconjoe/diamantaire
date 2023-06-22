import { EventSchemas, Inngest } from 'inngest';

import { DemoPingDatoEvent } from './demo';

type Events = {
  'demo/ping.dato': DemoPingDatoEvent;
};

export const inngest = new Inngest({
  name: 'function-hub',
  schemas: new EventSchemas().fromRecord<Events>(),
  // eventKey: process.env.INNGEST_EVENT_KEY,
});
