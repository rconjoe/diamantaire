import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function darksideMiddleware(
  request: NextRequest,
  response: NextResponse,
  _event: NextFetchEvent,
): NextMiddlewareResult {
  // an example of how you can make middleware functions only apply to certain routes:
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }

  const { nextUrl: url, geo } = request;

  console.log('geo', geo);

  // WIP
  const country = geo.country || 'US';
  const city = geo.city || 'San Francisco';
  // const region = geo.region || 'CA';

  url.searchParams.set('country', country);
  url.searchParams.set('city', city);
  // store user's geo data in a cookie
  request.cookies.set('geoCountry', country);
  request.cookies.set('geo', JSON.stringify(geo));

  request['userAgent'] = geo;

  // geo:
  // if (!request.cookies.has('geo')) {
  //   response.cookies.set('geo', request?.geo); // commment out for now, linting issue.
  // }

  // we don't need to store our own locale cookie - only hook up our locale switcher to set the NEXT_LOCALE cookie.
  // when this cookie is set, the next router will redirect to that locale route.
  // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie

  return response;
}
