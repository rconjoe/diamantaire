/* eslint-disable camelcase */

import { ProductConfigEventEndpoint } from '@diamantaire/feeds';
import { makeNextAppHandler, makeOkResult } from '@diamantaire/lapidary';
import { NextRequest } from 'next/server';

const handlers = makeNextAppHandler(ProductConfigEventEndpoint, {
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
