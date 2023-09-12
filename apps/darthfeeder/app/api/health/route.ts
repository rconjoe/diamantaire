import { HealthEndpoint } from '@diamantaire/feeds';
import { makeNextAppHandler, makeOkResult } from '@diamantaire/lapidary';

// TODO: can use this to check whatever
const handlers = makeNextAppHandler(HealthEndpoint, {
  async GET() {
    return makeOkResult({
      message: 'type safe but still on the edge',
    });
  },
});

export const GET = handlers.GET;
