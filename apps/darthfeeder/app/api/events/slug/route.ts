/* eslint-disable camelcase */
import { NextRequest } from 'next/server';

// import { verifySignatureEdge } from '@diamantaire/feedutils';

import { SlugEventEndpoint } from '../../../../lib/endpoints/events/slug';
import { makeNextAppHandler } from '../../../../lib/handlers';
import { makeOkResult } from '../../../../lib/util';

const handlers = makeNextAppHandler(SlugEventEndpoint, {
  // eslint-disable-next-line prettier/prettier
  async POST(req: NextRequest, _, body) {
    console.log(body);

    return makeOkResult({ message: 'ok' });
  },
});

export const POST = handlers.POST;
export const runtime = 'edge';
