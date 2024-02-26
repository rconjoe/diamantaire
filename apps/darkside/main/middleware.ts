import { authMiddleware } from '@clerk/nextjs';
import { isDevEnv, getLocaleFromCountry } from '@diamantaire/shared/constants';
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
const VALID_COUNTRY_SUBDOMAINS = ['de', 'be', 'fr', 'it', 'se', 'es', 'no', 'nl', 'ch', 'dk'];

const PUBLIC_FILE = /\.(.*)$/;

// https://docs.prerender.io/docs/nextjs

export async function prerender(request) {
  const userAgent = request.headers.get('user-agent');
  const bots = [
    'googlebot',
    'yahoo! slurp',
    'bingbot',
    'yandex',
    'baiduspider',
    'facebookexternalhit',
    'twitterbot',
    'rogerbot',
    'linkedinbot',
    'embedly',
    'quora link preview',
    'showyoubot',
    'outbrain',
    'pinterest/0.',
    'developers.google.com/+/web/snippet',
    'slackbot',
    'vkshare',
    'w3c_validator',
    'redditbot',
    'applebot',
    'whatsapp',
    'flipboard',
    'tumblr',
    'bitlybot',
    'skypeuripreview',
    'nuzzel',
    'discordbot',
    'google page speed',
    'qwantify',
    'pinterestbot',
    'bitrix link preview',
    'xing-contenttabreceiver',
    'chrome-lighthouse',
    'telegrambot',
    'integration-test', // Integration testing
  ];

  const IGNORE_EXTENSIONS = [
    '.js',
    '.css',
    '.xml',
    '.less',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.pdf',
    '.doc',
    '.txt',
    '.ico',
    '.rss',
    '.zip',
    '.mp3',
    '.rar',
    '.exe',
    '.wmv',
    '.doc',
    '.avi',
    '.ppt',
    '.mpg',
    '.mpeg',
    '.tif',
    '.wav',
    '.mov',
    '.psd',
    '.ai',
    '.xls',
    '.mp4',
    '.m4a',
    '.swf',
    '.dat',
    '.dmg',
    '.iso',
    '.flv',
    '.m4v',
    '.torrent',
    '.woff',
    '.ttf',
    '.svg',
    '.webmanifest',
  ];
  const isBot = userAgent && bots.some((bot) => userAgent.toLowerCase().includes(bot));
  const isPrerender = request.headers.get('X-Prerender');
  const pathname = new URL(request.url).pathname;
  const extension = pathname.slice(((pathname.lastIndexOf('.') - 1) >>> 0) + 1);

  if (isPrerender || !isBot || (extension.length && IGNORE_EXTENSIONS.includes(extension))) {
    return NextResponse.next();
  } else {
    // Check if request is coming from a bot
    if (isBot) {
      const newURL = `https://service.prerender.io/${request.url}`;
      const newHeaders = new Headers(request.headers);

      //Do not forget to add your Prerender token as an environment variable
      newHeaders.set('X-Prerender-Token', process.env.PRERENDER_TOKEN);
      newHeaders.set('X-Prerender-Int-Type', 'NextJS');

      const res = await fetch(
        new Request(newURL, {
          headers: newHeaders,
          redirect: 'manual',
        }),
      );

      const responseHeaders = new Headers(res.headers);

      responseHeaders.set('X-Redirected-From', request.url);

      return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
      });
    }

    return NextResponse.next();
  }
}

export default async function middleware(request: NextRequest, _event: NextFetchEvent): Promise<NextMiddlewareResult> {
  // Bypass middleware for _next assets, API requests, or public files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  // Pre-render
  prerender(request);

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

  const { headers, nextUrl: url, geo, cookies } = request;
  const host = headers.get('host');
  // eslint-disable-next-line security/detect-unsafe-regex
  const subdomainMatch = host.match(/^(.+?)\.(vrai\.com|vrai\.qa|localhost(?::\d+)?)$/);
  const subdomain = subdomainMatch ? subdomainMatch[1] : '';

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
    const requestPath = url.pathname;

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

      const isPermanent = await kv.sismember('permanent_redirects', requestPath);

      return NextResponse.redirect(url, isPermanent ? 301 : 302);
    }

    const localRewriteDestination = await kv.hget<string>('rewrites', url.pathname);

    if (localRewriteDestination) {
      url.pathname = localRewriteDestination;

      return NextResponse.rewrite(url);
    }
  }

  if (subdomain && VALID_COUNTRY_SUBDOMAINS.includes(subdomain.toLowerCase())) {
    const countryCode = subdomain.toUpperCase();
    const localePath = getLocaleFromCountry(countryCode);
    const targetUrl = new URL(`https://www.vrai.com/${localePath}${url.pathname}${url.search}`);

    return NextResponse.redirect(targetUrl);
  }

  const preferredLocale = cookies.get('NEXT_LOCALE')?.value;

  // Redirect if there's a preferred locale that doesn't match the current locale
  if (preferredLocale && preferredLocale !== url.locale) {
    return NextResponse.redirect(new URL(`/${preferredLocale}${url.pathname}${url.search}`, request.url));
  }

  // If there's no preferred locale, derive the locale from the user's geo-location
  if (!preferredLocale) {
    const countryCode = geo.country || 'US';

    // Handle the 'US' geo-location specifically to avoid adding a subpath for 'en-US'
    if (countryCode === 'US' && url.locale === 'default') {
      // No need to redirect for US users viewing the default path
      return NextResponse.next();
    }

    const localeFromGeo = getLocaleFromCountry(countryCode);

    // Ensure not to redirect if the locale is 'en-US' to avoid unnecessary redirection
    if (localeFromGeo !== 'en-US' && localeFromGeo !== url.locale) {
      const response = NextResponse.redirect(new URL(`/${localeFromGeo}${url.pathname}${url.search}`, request.url));

      response.cookies?.set('geo', JSON.stringify(geo));

      // Set a cookie to indicate a geo-based redirection has occurred
      response.cookies.set('geo_redirected', 'true', { path: '/', maxAge: 3600 }); // Expires in 1 hour

      return response;
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)', '/'],
};
