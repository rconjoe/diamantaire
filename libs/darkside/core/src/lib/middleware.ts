import { NextMiddlewareResult } from 'next/dist/server/web/types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
type LocalRedirects = {
  [k: string]:
    | {
        destination: string;
        permanent: boolean;
      }
    | undefined;
};

const redirects = [
  { '/new-arrivals-jewelry': { destination: '/jewelry/new-arrivals', permanent: true } },
  { '/wedding-bands': { destination: '/wedding-rings/wedding-bands', permanent: true } },
  { '/earrings-jewelry': { destination: '/jewelry/earrings', permanent: true } },
  { '/create-your-own-diamond-necklace': { destination: '/jewelry/all', permanent: true } },
  { '/gifts-for-her-jewelry': { destination: '/jewelry/gifts-for-her', permanent: true } },
  { '/all-jewelry': { destination: '/jewelry/all', permanent: true } },
  { '/stacking-earrings-jewelry': { destination: '/jewelry/stacking-earrings', permanent: true } },
  { '/holiday-jewelry-gifts': { destination: '/jewelry/holiday-gifts', permanent: true } },
  { '/black-friday-jewelry': { destination: '/jewelry/black-friday', permanent: true } },
  { '/cyber-monday-jewelry': { destination: '/jewelry/cyber-monday', permanent: true } },
  { '/necklaces-jewelry': { destination: '/jewelry/necklaces', permanent: true } },
  { '/bracelets-jewelry': { destination: '/jewelry/bracelets', permanent: true } },
  { '/sterling-silver-jewelry': { destination: '/jewelry/sterling-silver', permanent: true } },
  { '/diamond-bezel-collection-jewelry': { destination: '/jewelry/diamond-bezel', permanent: true } },
  { '/gifts-under-500-jewelry': { destination: '/jewelry/gifts-under-500', permanent: true } },
  { '/gifts-under-500ca-jewelry': { destination: '/jewelry/gifts-under-500ca', permanent: true } },
  { '/gifts-under-500eur-jewelry': { destination: '/jewelry/gifts-under-500eur', permanent: true } },
  { '/gifts-under-500gbp-jewelry': { destination: '/jewelry/gifts-under-500gbp', permanent: true } },
  { '/gifts-under-1000-jewelry': { destination: '/jewelry/gifts-under-1000', permanent: true } },
  { '/gifts-under-1000gbp-jewelry': { destination: '/jewelry/gifts-under-1000gbp', permanent: true } },
  { '/gifts-under-1000eur-jewelry': { destination: '/jewelry/gifts-under-1000eur', permanent: true } },
  { '/gifts-under-1000ca-jewelry': { destination: '/jewelry/gifts-under-1000ca', permanent: true } },
  { '/gifts-under-1000a-jewelry': { destination: '/jewelry/gifts-under-1000a', permanent: true } },
  { '/birthday-gifts-jewelry': { destination: '/jewelry/birthday-gifts', permanent: true } },
  { '/valentines-day-edit-jewelry': { destination: '/jewelry/valentines-day-gifts', permanent: true } },
  { '/gifts-under-500a-jewelry': { destination: '/jewelry/gifts-under-500a', permanent: true } },
  { '/rings-jewelry': { destination: '/jewelry/rings', permanent: true } },
  { '/solitaire-diamond-collection-jewelry': { destination: '/jewelry/solitaire-diamond-collection', permanent: true } },
  { '/oval-cut-diamond-engagement-rings': { destination: '/engagement-rings/oval-cut', permanent: true } },
  { '/2-carat-diamond-rings': { destination: '/engagement-rings/2-carat-diamond', permanent: true } },
  { '/1-carat-diamond-rings': { destination: '/engagement-rings/1-carat-diamond', permanent: true } },
  { '/princess-cut-diamond-engagement-rings': { destination: '/engagement-rings/princess-cut', permanent: true } },
  { '/hexagon-cut-diamond-engagement-rings': { destination: '/engagement-rings/hexagon-cut', permanent: true } },
  {
    '/elongated-cushion-cut-diamond-engagement-rings': {
      destination: '/engagement-rings/elongated-cushion-cut',
      permanent: true,
    },
  },
  { '/vintage-inspired-engagement-rings': { destination: '/engagement-rings/vintage-style', permanent: true } },
  { '/cushion-cut-diamond-engagement-rings': { destination: '/engagement-rings/cushion-cut', permanent: true } },
  { '/asscher-cut-diamond-engagement-rings': { destination: '/engagement-rings/asscher-cut', permanent: true } },
  { '/anniversary-rings': { destination: '/jewelry/anniversary-rings', permanent: true } },
  { '/eternity-rings': { destination: '/jewelry/eternity-rings', permanent: true } },
  { '/mens-wedding-rings': { destination: '/wedding-rings/mens', permanent: true } },
  { '/womens-wedding-rings': { destination: '/wedding-rings/womens', permanent: true } },
  { '/engagement-rings-new-arrivals': { destination: '/engagement-rings/new-arrivals', permanent: true } },
  { '/two-tone-engagement-rings': { destination: '/engagement-rings/two-tone', permanent: true } },
  { '/three-stone-engagement-rings': { destination: '/engagement-rings/three-stone', permanent: true } },
  { '/solitaire-engagement-rings': { destination: '/engagement-rings/solitaire', permanent: true } },
  { '/white-gold-wedding-rings': { destination: '/wedding-rings/white-gold', permanent: true } },
  { '/platinum-wedding-rings': { destination: '/wedding-rings/platinum', permanent: true } },
  { '/pear-cut-diamond-engagement-rings': { destination: '/engagement-rings/pear-cut', permanent: true } },
  { '/platinum-engagement-rings': { destination: '/engagement-rings/platinum', permanent: true } },
  { '/mothers-day-gifts-jewelry': { destination: '/jewelry/mothers-day-gifts', permanent: true } },
  { '/bridesmaid-gifts-jewelry': { destination: '/jewelry/bridesmaid-gifts', permanent: true } },
  { '/bridal-jewelry': { destination: '/jewelry/bridal', permanent: true } },
  { '/ready-to-ship-jewelry': { destination: '/jewelry/ready-to-ship', permanent: true } },
  { '/engagement-rings-settings': { destination: '/engagement-rings/settings', permanent: true } },
  { '/radiant-cut-diamond-engagement-rings': { destination: '/engagement-rings/radiant-cut', permanent: true } },
  { '/rose-gold-engagement-rings': { destination: '/engagement-rings/rose-gold', permanent: true } },
  { '/white-gold-engagement-rings': { destination: '/engagement-rings/white-gold', permanent: true } },
  { '/yellow-gold-engagement-rings': { destination: '/engagement-rings/yellow-gold', permanent: true } },
  {
    '/round-brilliant-cut-diamond-engagement-rings': {
      destination: '/engagement-rings/round-brilliant-cut',
      permanent: true,
    },
  },
  { '/marquise-cut-diamond-engagement-rings': { destination: '/engagement-rings/marquise-cut', permanent: true } },
  { '/emerald-cut-diamond-engagement-rings': { destination: '/engagement-rings/emerald-cut', permanent: true } },
  { '/vrai-v-collection-jewelry': { destination: '/jewelry/vrai-v-collection', permanent: true } },
  { '/cathedral-engagement-rings': { destination: '/engagement-rings/cathedral', permanent: true } },
  { '/oval-cut-diamonds': { destination: '/loose-diamonds/oval-cut', permanent: true } },
  { '/hidden-halo-engagement-rings': { destination: '/engagement-rings/hidden-halo', permanent: true } },
  { '/halo-engagement-rings': { destination: '/engagement-rings/halo', permanent: true } },
  { '/anniversary-gifts-jewelry': { destination: '/jewelry/anniversary-gifts', permanent: true } },
  { '/graduation-gifts-jewelry': { destination: '/jewelry/graduation-gifts', permanent: true } },
  { '/wedding-rings': { destination: '/wedding-rings/wedding-bands', permanent: true } },
  { '/best-sellers-jewelry': { destination: '/jewelry/best-sellers', permanent: true } },
  { '/holiday-gifts-jewelry': { destination: '/jewelry/holiday-gifts', permanent: true } },
  { '/capri-cut-diamond-engagement-rings': { destination: '/engagement-rings/capri-cut', permanent: true } },
  { '/diamond-tennis-collection': { destination: '/jewelry/diamond-tennis-collection', permanent: true } },
  { '/diamond-ear-arcs-jewelry': { destination: '/jewelry/diamond-ear-climbers', permanent: true } },
  { '/floral-engagement-rings': { destination: '/engagement-rings/floral', permanent: true } },
  { '/vrai-x-brides-jewelry': { destination: '/jewelry/vrai-x-brides', permanent: true } },
  { '/trillion-cut-diamond-engagement-rings': { destination: '/engagement-rings/trillion-cut', permanent: true } },
  { '/trillion-cut-diamonds': { destination: '/loose-diamonds/trillion-cut', permanent: true } },
  { '/round-cut-diamonds': { destination: '/loose-diamonds/round-cut', permanent: true } },
  { '/radiant-cut-diamonds': { destination: '/loose-diamonds/radiant-cut', permanent: true } },
  { '/princess-cut-diamonds': { destination: '/loose-diamonds/princess-cut', permanent: true } },
  { '/pink-diamonds': { destination: '/loose-diamonds/pink', permanent: true } },
  { '/pear-cut-diamonds': { destination: '/loose-diamonds/pear-cut', permanent: true } },
  { '/marquise-cut-diamonds': { destination: '/loose-diamonds/marquise-cut', permanent: true } },
  { '/emerald-cut-diamonds': { destination: '/loose-diamonds/emerald-cut', permanent: true } },
  { '/cushion-cut-diamonds': { destination: '/loose-diamonds/cushion-cut', permanent: true } },
  { '/asscher-cut-diamonds': { destination: '/loose-diamonds/asscher-cut', permanent: true } },
  { '/simple-engagement-rings': { destination: '/engagement-rings/simple', permanent: true } },
  { '/3-carat-diamond-engagement-rings': { destination: '/engagement-rings/3-carat-diamond', permanent: true } },
  { '/yellow-gold-wedding-rings': { destination: '/wedding-rings/yellow-gold', permanent: true } },
  { '/wedding-jewelry': { destination: '/jewelry/wedding', permanent: true } },
  { '/unisex-gifts-jewelry': { destination: '/jewelry/unisex-gifts', permanent: true } },
  { '/tiny-diamond-collection-jewelry': { destination: '/jewelry/tiny-diamond-collection', permanent: true } },
  { '/tetrad-rings-jewelry': { destination: '/jewelry/tetrad-rings', permanent: true } },
  { '/summer-edit-jewelry': { destination: '/jewelry/summer-edit', permanent: true } },
  { '/stylist-edit-jewelry': { destination: '/jewelry/stylist-edit-by-tara-swennen', permanent: true } },
  {
    '/stylist-edit-by-samantha-mcmillen-jewelry': {
      destination: '/jewelry/stylist-edit-by-samantha-mcmillen',
      permanent: true,
    },
  },
  { '/stylist-edit-by-jeanne-yang-jewelry': { destination: '/jewelry/stylist-edit-by-jeanne-yang', permanent: true } },
  {
    '/stylist-edit-by-ciara-and-russell-wilson': {
      destination: '/jewelry/stylist-edit-by-ciara-and-russell-wilson',
      permanent: true,
    },
  },
  { '/stylist-edit-by-arizona-muse-jewelry': { destination: '/jewelry/stylist-edit-by-arizona-muse', permanent: true } },
  { '/signet-ring-collection-jewelry': { destination: '/jewelry/signet-rings', permanent: true } },
  { '/signature-bezel-engagement-rings': { destination: '/engagement-rings/signature-bezel', permanent: true } },
  { '/shield-cut-diamond-engagement-rings': { destination: '/engagement-rings/shield-cut', permanent: true } },
  { '/round-rose-cut-diamond-engagement-rings': { destination: '/engagement-rings/round-rose-cut', permanent: true } },
  { '/rose-gold-wedding-rings': { destination: '/wedding-rings/rose-gold', permanent: true } },
  { '/regulus-cut-diamond-engagement-rings': { destination: '/engagement-rings/regulus-cut', permanent: true } },
  { '/new-parents-gifts-jewelry': { destination: '/jewelry/new-parents-gifts', permanent: true } },
  { '/new-beginnings-gifts-jewelry': { destination: '/jewelry/new-beginnings-gifts', permanent: true } },
  { '/medallion-necklaces-jewelry': { destination: '/jewelry/medallion-necklaces', permanent: true } },
  { '/promise-rings-jewelry': { destination: '/jewelry/promise-rings', permanent: true } },
  { '/long-hexagon-cut-diamond-engagement-rings': { destination: '/engagement-rings/long-hexagon-cut', permanent: true } },
  { '/oval-rose-cut-diamond-engagement-rings': { destination: '/engagement-rings/oval-rose-cut', permanent: true } },
  { '/rand-cut-diamond-engagement-rings': { destination: '/engagement-rings/rand-cut', permanent: true } },
  { '/petra-flannery-stylist-edit-jewelry': { destination: '/jewelry/stylist-edit-by-petra-flannery', permanent: true } },
  { '/passion-cut-diamond-engagement-rings': { destination: '/engagement-rings/passion-cut', permanent: true } },
  { '/octavia-cut-diamond-engagement-rings': { destination: '/engagement-rings/octavia-cut', permanent: true } },
  { '/mixed-cuff-ring-collection-jewelry': { destination: '/jewelry/mixed-cuff-rings', permanent: true } },
  { '/mens-jewelry': { destination: '/jewelry/mens', permanent: true } },
  { '/lucky-cut-diamond-engagement-rings': { destination: '/engagement-rings/lucky-cut', permanent: true } },
  { '/lozenge-cut-diamond-engagement-rings': { destination: '/engagement-rings/lozenge-cut', permanent: true } },
  { '/layering-necklaces-jewelry': { destination: '/jewelry/layering-necklaces', permanent: true } },
  { '/last-chance-jewelry': { destination: '/jewelry/last-chance', permanent: true } },
  { '/kite-cut-diamond-engagement-rings': { destination: '/engagement-rings/kite-cut', permanent: true } },
  { '/iconic-shapes-jewelry': { destination: '/jewelry/iconic-shapes', permanent: true } },
  { '/heart-cut-diamond-engagement-rings': { destination: '/engagement-rings/heart-cut', permanent: true } },
  { '/harmonia-cut-diamond-engagement-rings': { destination: '/engagement-rings/harmonia-cut', permanent: true } },
  { '/gifts-for-him-jewelry': { destination: '/jewelry/gifts-for-him', permanent: true } },
  { '/fusion-cut-diamond-engagement-rings': { destination: '/engagement-rings/fusion-cut', permanent: true } },
  { '/felix-cut-diamond-engagement-rings': { destination: '/engagement-rings/felix-cut', permanent: true } },
  { '/east-west-engagement-rings': { destination: '/engagement-rings/east-west', permanent: true } },
  { '/earrings-gift-jewelry': { destination: '/jewelry/earrings', permanent: true } },
  { '/diamond-cross-necklaces-jewelry': { destination: '/jewelry/cross-necklaces', permanent: true } },
  {
    '/cushion-princess-cut-diamond-engagement-rings': {
      destination: '/engagement-rings/cushion-princess-cut',
      permanent: true,
    },
  },
  {
    '/brilliant-emerald-cut-diamond-engagement-rings': {
      destination: '/engagement-rings/brilliant-emerald-cut',
      permanent: true,
    },
  },
  { '/best-engagement-rings': { destination: '/engagement-rings/best', permanent: true } },
  { '/baguette-collection-jewelry': { destination: '/jewelry/baguette-collection', permanent: true } },
  { '/anniversary-necklace-gift-jewelry': { destination: '/jewelry/anniversary-necklace', permanent: true } },
  { '/anniversary-earrings-jewelry': { destination: '/jewelry/anniversary-earrings', permanent: true } },
  { '/anniversary-bracelet-gift-jewelry': { destination: '/jewelry/anniversary-bracelets', permanent: true } },
];

export function darksideMiddleware(
  request: NextRequest,
  response: NextResponse,
  _event: NextFetchEvent,
): NextMiddlewareResult {
  const url = request.nextUrl;
  // an example of how you can make middleware functions only apply to certain routes:
  // if (request.nextUrl.pathname.startsWith('/about')) {
  //   return NextResponse.rewrite(new URL('/about-2', request.url))
  // }

  const { nextUrl: url, geo } = request;

  // console.log('geo', geo);

  // WIP
  const country = geo.country || 'US';
  const city = geo.city || 'San Francisco';
  // const region = geo.region || 'CA';

  url.searchParams.set('country', country);
  url.searchParams.set('city', city);

  request['userAgent'] = geo;

  // store user's geo data in a cookie
  response.cookies.set('geoCountry', country);
  response.cookies.set('geo', JSON.stringify(geo));

  // store in header
  response.headers.set('X-Geo-Country', country);
  // geo:
  if (!request.cookies.has('geo')) {
    // response.cookies.set('geo', request?.geo); // commment out for now, linting issue.
  }

  // Find the redirect from the local JSON file, do note this JSON shouldn't be
  // large, as the space in Edge Middleware is quite limited
  const localRedirect = (redirects as LocalRedirects[])[url.pathname];

  if (localRedirect) {
    url.pathname = localRedirect.destination;

    return NextResponse.redirect(url);
  }

  // we don't need to store our own locale cookie - only hook up our locale switcher to set the NEXT_LOCALE cookie.
  // when this cookie is set, the next router will redirect to that locale route.
  // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie

  return response;
}
