import { authMiddleware } from '@clerk/nextjs';
import { isDevEnv } from '@diamantaire/shared/constants';
import { kv } from '@vercel/kv';
import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const ORDERED_CONFIGURATION_PROPERTIES = [
  'diamondType',
  'metal',
  'goldPurity',
  'bandAccent',
  'bandWidth',
  'hiddenHalo',
  'caratWeight',
  'sideStoneShape',
  'sideStoneCarat',
  'bandStyle',
  'ceramicColor',
  'diamondSize',
];

export default async function middleware(request: NextRequest, _event: NextFetchEvent): Promise<NextMiddlewareResult> {
  // Use authMiddleware
  const authResult = authMiddleware({
    publicRoutes: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)', '/sign-in', '/sign-up'],
  });

  // If authMiddleware returns a response, return it immediately
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  // This is what gets returned from the middleware, cookies need to be set on the res
  const res = NextResponse.next();

  const { nextUrl: url, geo } = request;

  if (isDevEnv) {
    // const US_GEO = { city: 'New York', country: 'US', latitude: '40.7128', longitude: '-74.0060', region: 'NY' };
    const US_GEO = {
      city: 'Los Angeles',
      country: 'US',
      latitude: '34.0726',
      longitude: '-118.261',
      region: 'North America',
    };
    const DE_GEO = { city: 'Frankfurt am Main', country: 'DE', latitude: '50.1049', longitude: '8.6295', region: 'Europe' };
    const UK_GEO = { city: 'London', country: 'GB', latitude: '51.5074', longitude: '-0.1278', region: 'Europe' };
    const ES_GEO = { city: 'Madrid', country: 'ES', latitude: '40.4168', longitude: '-3.7038', region: 'Europe' };

    // const VIRTUAL_GEO = {
    //   city: 'Decatur',
    //   country: 'US',
    //   latitude: '33.7748',
    //   longitude: '-84.2963',
    //   region: 'North America',
    // };

    let selectedGeo = US_GEO; // default to US

    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);
    const localeParam = params.get('locale');

    if (localeParam) {
      const countryLocale = localeParam.split('-')[1];

      if (countryLocale === 'DE') {
        selectedGeo = DE_GEO;
      } else if (countryLocale === 'ES') {
        selectedGeo = ES_GEO;
      } else if (countryLocale === 'GB') {
        selectedGeo = UK_GEO;
      }
    }

    // If you need to test a specific country as if they were choosing different locales, then replace selectedGeo with the country you want to test
    res.cookies?.set('geo', JSON.stringify(selectedGeo));
  } else {
    // store user's geo data in a cookie
    res.cookies?.set('geo', JSON.stringify(geo));
  }

  // exclude API and Next.js internal routes
  if (!url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next')) {
    let localRedirectDestination = await kv.hget<string>('redirects', url.pathname);

    if (localRedirectDestination) {
      // If its a PDP, try to get more specific redirect
      if (Boolean(url.search) && (url.pathname.startsWith('/engagement-rings') || url.pathname.startsWith('/jewelry'))) {
        // First reduce search to known values and order
        const reducedSearch = url.search.split('&').reduce((acc, current) => {
          const [k, v] = current.split('=');

          if (ORDERED_CONFIGURATION_PROPERTIES.includes(k)) {
            acc += `&${k}=${v}`;
          }

          return acc;
        }, '');

        const sanitizedSearch = new URLSearchParams(reducedSearch);

        sanitizedSearch.sort();

        const localRedirectSourceWithQuery = url.pathname + '?' + sanitizedSearch.toString();
        const redirectWithQuery = await kv.hget<string>('redirects', localRedirectSourceWithQuery);

        if (redirectWithQuery) {
          localRedirectDestination = redirectWithQuery;
        }
      }

      url.pathname = localRedirectDestination;

      const isPermanent = await kv.sismember('permanent_redirects', url.pathname);

      return NextResponse.redirect(url, isPermanent ? 301 : 302);
    }

    const localRewriteDestination = await kv.hget<string>('rewrites', url.pathname);

    if (localRewriteDestination) {
      url.pathname = localRewriteDestination;

      return NextResponse.rewrite(url);
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};
