import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextMiddlewareResult } from 'next/dist/server/web/types';

export function darksideMiddleware(
  request: NextRequest,
  response: NextResponse,
  event: NextFetchEvent
): NextMiddlewareResult {
  // an example of how you can make middleware functions only apply to certain routes:
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }

  // geo:
  if (!request.cookies.has('geo')) {
    response.cookies.set('geo', request?.geo);
  }

  // we don't need to store our own locale cookie - only hook up our locale switcher to set the NEXT_LOCALE cookie.
  // when this cookie is set, the next router will redirect to that locale route.
  // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie

  return response;
}
