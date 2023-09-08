/* eslint-disable camelcase */
import { NextRequest } from 'next/server';

// import { verifySignatureEdge } from '@diamantaire/feedutils';

import { SlugEventEndpoint } from '../../../../lib/endpoints/events/slug';
import { makeNextAppHandler } from '../../../../lib/handlers';
import { makeOkResult } from '../../../../lib/util';

const handlers = makeNextAppHandler(SlugEventEndpoint, {
  // eslint-disable-next-line prettier/prettier
  async POST(req: NextRequest, _, body) {
    console.log('\n\nGeolocation example: (this may be undefined where vrai.dev cloudflare proxy is turned on)\n');
    console.table(req.geo);

    console.log('\n\nThis body is received by the handler you define, already parsed and validated:\n');
    console.log(body);

    return makeOkResult({ message: 'ok' });
  },
});

export const POST = handlers.POST;
export const runtime = 'edge';
