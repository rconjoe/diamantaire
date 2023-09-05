import { NextRequest } from 'next/server';

// import { verifySignatureEdge } from '@diamantaire/feedutils';

import { SlugEventEndpoint } from '../../../../lib/endpoints/events/slug';
import { makeNextAppHandler } from '../../../../lib/handlers';
import { makeOkResult } from '../../../../lib/util';

const handlers = makeNextAppHandler(SlugEventEndpoint, {
  async POST(req: NextRequest, { }, body) {
    console.log(body.event_type);
    console.log(JSON.stringify(req.headers.get('Upstash-Signature')));

    return makeOkResult({ message: JSON.stringify(req) });
  },
});

export const POST = handlers.POST;
export const runtime = 'edge';
