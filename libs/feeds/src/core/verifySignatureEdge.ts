import { Receiver } from '@upstash/qstash';
import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export type VerifySignatureConfig = {
  currentSigningKey?: string;
  nextSigningKey?: string;

  /**
   * The url of this api route, including the protocol.
   *
   * If you omit this, the url will be automatically determined by checking the `VERCEL_URL` env variable and assuming `https`
   */
  url?: string;

  /**
   * Number of seconds to tolerate when checking `nbf` and `exp` claims, to deal with small clock differences among different servers
   *
   * @default 0
   */
  clockTolerance?: number;
};

export function verifySignatureEdge(
  handler: (req: NextRequest, nfe: NextFetchEvent) => NextResponse | Promise<NextResponse>,
  config?: VerifySignatureConfig,
) {
  const currentSigningKey = config?.currentSigningKey ?? process.env.QSTASH_CURRENT_SIGNING_KEY;

  if (!currentSigningKey) {
    throw new Error('currentSigningKey is required, either in the config or as env variable QSTASH_CURRENT_SIGNING_KEY');
  }
  const nextSigningKey = config?.nextSigningKey ?? process.env.QSTASH_NEXT_SIGNING_KEY;

  if (!nextSigningKey) {
    throw new Error('nextSigningKey is required, either in the config or as env variable QSTASH_NEXT_SIGNING_KEY');
  }
  const receiver = new Receiver({
    currentSigningKey,
    nextSigningKey,
  });

  return async (req: NextRequest, nfe: NextFetchEvent) => {
    const reqClone = req.clone() as NextRequest;
    // eslint-disable-next-line
    // @ts-ignore This can throw errors during vercel build
    const signature = req.headers.get('upstash-signature');

    if (!signature) {
      return new NextResponse(new TextEncoder().encode('`Upstash-Signature` header is missing'), {
        status: 403,
      });
    }
    if (typeof signature !== 'string') {
      throw new Error('`Upstash-Signature` header is not a string');
    }

    const body = await req.text();
    const isValid = await receiver.verify({
      signature,
      body,
      clockTolerance: config?.clockTolerance,
    });

    if (!isValid) {
      return new NextResponse(new TextEncoder().encode('invalid signature'), { status: 403 });
    }

    let parsedBody: unknown;

    try {
      if (req.headers.get('content-type') === 'application/json') {
        parsedBody = JSON.parse(body);
      } else {
        parsedBody = body;
      }
    } catch {
      // eslint-disable-next-line
      parsedBody = body;
    }

    return handler(reqClone, nfe);
  };
}
