import { authMiddleware } from '@clerk/nextjs';
import { isDevEnv } from '@diamantaire/shared/constants';
import { kv } from '@vercel/kv';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest, _event: NextFetchEvent): Promise<NextMiddlewareResult> {
  // Use authMiddleware
  const authResult = await authMiddleware({
    publicRoutes: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
  });

  // If authMiddleware returns a response, return it immediately
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  // This is what gets returned from the middleware, cookies need to be set on the res
  const res = NextResponse.next();

  const { nextUrl: url, geo } = request;

  if (isDevEnv) {
    const LA_GEO = { city: 'Los Angeles', country: 'US', latitude: '34.0726', longitude: '-118.261', region: 'CA' };
    // const NY_GEO = { city: 'New York', country: 'US', latitude: '40.7128', longitude: '-74.0060', region: 'NY' };
    // const DE_GEO = { city: 'Frankfurt am Main', country: 'DE', latitude: '50.1049', longitude: '8.6295', region: 'HE' };

    res.cookies?.set('geo', JSON.stringify(LA_GEO));
  } else {
    // store user's geo data in a cookie
    res.cookies?.set('geo', JSON.stringify(geo));
  }

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

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};
