import { kv } from '@vercel/kv';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(
  request: NextRequest,
  response: NextResponse,
  _event: NextFetchEvent,
): Promise<NextMiddlewareResult> {
  // This is what gets returned from the middleware, cookies need to be set on the res
  const res = NextResponse.next();

  const { nextUrl: url, geo } = request;

  console.log('middleware geo', geo);

  // store user's geo data in a cookie
  const country = geo.country || 'US';

  res.cookies?.set('geoCountry', country);
  res.cookies?.set('geo', JSON.stringify(geo));

  // store in header
  response.headers?.set('X-Geo-Country', country);

  // exclude API and Next.js internal routes
  if (!url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next')) {
    const localRedirectDestination = await kv.hget<string>('redirects', url.pathname);

    if (localRedirectDestination) {
      url.pathname = localRedirectDestination;
      // const isPermanent = await kv.sismember('permanent_redirects', url.pathname);

      return NextResponse.redirect(url);
    }
  }

  return res;
}
