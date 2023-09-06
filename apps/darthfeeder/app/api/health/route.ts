import { HealthEndpoint } from '../../../lib/endpoints/health';
import { makeNextAppHandler } from '../../../lib/handlers';
import { makeOkResult } from '../../../lib/util';

const handlers = makeNextAppHandler(HealthEndpoint, {
  async GET() {
    return makeOkResult({
      message: 'type safe but still on the edge',
    });
  },
});

export const GET = handlers.GET;
