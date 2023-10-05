import { kv } from '@vercel/kv';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(
  request: NextRequest,
  response: NextResponse,
  _event: NextFetchEvent,
): Promise<NextMiddlewareResult> {
  // an example of how you can make middleware functions only apply to certain routes:
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }

  const { nextUrl: url, geo } = request;

  console.log('geo', geo);

  // WIP
  const country = geo.country || 'US';
  // const city = geo.city || 'San Francisco';
  // const region = geo.region || 'CA';

  // store user's geo data in a cookie
  response.cookies.set('geoCountry', country);
  response.cookies.set('geo', JSON.stringify(geo));

  // store in header
  response.headers.set('X-Geo-Country', country);

  // exclude API and Next.js internal routes
  if (!url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next')) {
    const localRedirectDestination = await kv.hget<string>('redirects', url.pathname);

    if (localRedirectDestination) {
      url.pathname = localRedirectDestination;
      // const isPermanent = await kv.sismember('permanent_redirects', url.pathname);

      return NextResponse.redirect(url);
    }
  }

  // we don't need to store our own locale cookie - only hook up our locale switcher to set the NEXT_LOCALE cookie.
  // when this cookie is set, the next router will redirect to that locale route.
  // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie

  return NextResponse.next();
}
