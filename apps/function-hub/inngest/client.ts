import { EventSchemas, Inngest } from 'inngest';

type DemoPingDato = {
  data: {
    recordId: string;
  };
};

type Events = {
  'demo/ping.dato': DemoPingDato;
};

export const inngest = new Inngest({
  name: 'function-hub',
  schemas: new EventSchemas().fromRecord<Events>(),
  // eventKey: process.env.INNGEST_EVENT_KEY,
});
