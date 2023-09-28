// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction

// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { withSentryConfig } = require('@sentry/nextjs');

const redirects = [
  { source: '/wedding-bands', destination: '/wedding-rings/wedding-bands', permanent: true },
  { source: '/earrings-jewelry', destination: '/jewelry/earrings', permanent: true },
  { source: '/create-your-own-diamond-earrings', destination: '/jewelry/', permanent: true },
  { source: '/create-your-own-diamond-necklace', destination: '/jewelry/all', permanent: true },
  { source: '/gifts-for-her-jewelry', destination: '/jewelry/gifts-for-her', permanent: true },
  { source: '/new-arrivals-jewelry', destination: '/jewelry/new-arrivals', permanent: true },
  { source: '/all-jewelry', destination: '/jewelry/all', permanent: true },
  { source: '/stacking-earrings-jewelry', destination: '/jewelry/stacking-earrings', permanent: true },
  { source: '/holiday-jewelry-gifts', destination: '/jewelry/holiday-gifts', permanent: true },
  { source: '/black-friday-jewelry', destination: '/jewelry/black-friday', permanent: true },
  { source: '/cyber-monday-jewelry', destination: '/jewelry/cyber-monday', permanent: true },
  { source: '/affordable-engagement-rings', destination: '/engagement-rings/', permanent: true },
  { source: '/necklaces-jewelry', destination: '/jewelry/necklaces', permanent: true },
  { source: '/bracelets-jewelry', destination: '/jewelry/bracelets', permanent: true },
  { source: '/sterling-silver-jewelry', destination: '/jewelry/sterling-silver', permanent: true },
  { source: '/diamond-bezel-collection-jewelry', destination: '/jewelry/diamond-bezel', permanent: true },
  { source: '/gifts-under-500-jewelry', destination: '/jewelry/gifts-under-500', permanent: true },
  { source: '/gifts-under-500ca-jewelry', destination: '/jewelry/gifts-under-500ca', permanent: true },
  { source: '/gifts-under-500eur-jewelry', destination: '/jewelry/gifts-under-500eur', permanent: true },
  { source: '/gifts-under-500gbp-jewelry', destination: '/jewelry/gifts-under-500gbp', permanent: true },
  { source: '/gifts-under-1000-jewelry', destination: '/jewelry/gifts-under-1000', permanent: true },
  { source: '/gifts-under-1000gbp-jewelry', destination: '/jewelry/gifts-under-1000gbp', permanent: true },
  { source: '/gifts-under-1000eur-jewelry', destination: '/jewelry/gifts-under-1000eur', permanent: true },
  { source: '/gifts-under-1000ca-jewelry', destination: '/jewelry/gifts-under-1000ca', permanent: true },
  { source: '/gifts-under-1000a-jewelry', destination: '/jewelry/gifts-under-1000a', permanent: true },
  { source: '/birthday-gifts-jewelry', destination: '/jewelry/birthday-gifts', permanent: true },
  { source: '/valentines-day-edit-jewelry', destination: '/jewelry/valentines-day-gifts', permanent: true },
  { source: '/gifts-under-500a-jewelry', destination: '/jewelry/gifts-under-500a', permanent: true },
  { source: '/rings-jewelry', destination: '/jewelry/rings', permanent: true },
  { source: '/solitaire-diamond-collection-jewelry', destination: '/jewelry/solitaire-diamond-collection', permanent: true },
  { source: '/oval-cut-diamond-engagement-rings', destination: '/engagement-rings/oval-cut', permanent: true },
  { source: '/5-carat-diamond-engagement-rings', destination: '/engagement-rings/', permanent: true },
  { source: '/4-carat-diamond-engagement-rings', destination: '/engagement-rings/', permanent: true },
  { source: '/unique-engagement-rings', destination: '/engagement-rings/', permanent: true },
  { source: '/2-carat-diamond-rings', destination: '/engagement-rings/2-carat-diamond', permanent: true },
  { source: '/1-carat-diamond-rings', destination: '/engagement-rings/1-carat-diamond', permanent: true },
  { source: '/princess-cut-diamond-engagement-rings', destination: '/engagement-rings/princess-cut', permanent: true },
  { source: '/hexagon-cut-diamond-engagement-rings', destination: '/engagement-rings/hexagon-cut', permanent: true },
  {
    source: '/elongated-cushion-cut-diamond-engagement-rings',
    destination: '/engagement-rings/elongated-cushion-cut',
    permanent: true,
  },
  { source: '/vintage-inspired-engagement-rings', destination: '/engagement-rings/vintage-style', permanent: true },
  { source: '/cushion-cut-diamond-engagement-rings', destination: '/engagement-rings/cushion-cut', permanent: true },
  { source: '/asscher-cut-diamond-engagement-rings', destination: '/engagement-rings/asscher-cut', permanent: true },
  { source: '/anniversary-rings', destination: '/jewelry/anniversary-rings', permanent: true },
  { source: '/eternity-rings', destination: '/jewelry/eternity-rings', permanent: true },
  { source: '/mens-wedding-rings', destination: '/wedding-rings/mens', permanent: true },
  { source: '/womens-wedding-rings', destination: '/wedding-rings/womens', permanent: true },
  { source: '/engagement-rings-new-arrivals', destination: '/engagement-rings/new-arrivals', permanent: true },
  { source: '/two-tone-engagement-rings', destination: '/engagement-rings/two-tone', permanent: true },
  { source: '/three-stone-engagement-rings', destination: '/engagement-rings/three-stone', permanent: true },
  { source: '/solitaire-engagement-rings', destination: '/engagement-rings/solitaire', permanent: true },
  { source: '/white-gold-wedding-rings', destination: '/wedding-rings/white-gold', permanent: true },
  { source: '/platinum-wedding-rings', destination: '/wedding-rings/platinum', permanent: true },
  { source: '/pear-cut-diamond-engagement-rings', destination: '/engagement-rings/pear-cut', permanent: true },
  { source: '/platinum-engagement-rings', destination: '/engagement-rings/platinum', permanent: true },
  { source: '/mothers-day-gifts-jewelry', destination: '/jewelry/mothers-day-gifts', permanent: true },
  { source: '/bridesmaid-gifts-jewelry', destination: '/jewelry/bridesmaid-gifts', permanent: true },
  { source: '/bridal-jewelry', destination: '/jewelry/bridal', permanent: true },
  { source: '/ready-to-ship-jewelry', destination: '/jewelry/ready-to-ship', permanent: true },
  { source: '/engagement-rings-settings', destination: '/engagement-rings/settings', permanent: true },
  { source: '/radiant-cut-diamond-engagement-rings', destination: '/engagement-rings/radiant-cut', permanent: true },
  { source: '/rose-gold-engagement-rings', destination: '/engagement-rings/rose-gold', permanent: true },
  { source: '/white-gold-engagement-rings', destination: '/engagement-rings/white-gold', permanent: true },
  { source: '/yellow-gold-engagement-rings', destination: '/engagement-rings/yellow-gold', permanent: true },
  {
    source: '/round-brilliant-cut-diamond-engagement-rings',
    destination: '/engagement-rings/round-brilliant-cut',
    permanent: true,
  },
  { source: '/marquise-cut-diamond-engagement-rings', destination: '/engagement-rings/marquise-cut', permanent: true },
  { source: '/emerald-cut-diamond-engagement-rings', destination: '/engagement-rings/emerald-cut', permanent: true },
  { source: '/vrai-v-collection-jewelry', destination: '/jewelry/vrai-v-collection', permanent: true },
  { source: '/cathedral-engagement-rings', destination: '/engagement-rings/cathedral', permanent: true },
  { source: '/oval-cut-diamonds', destination: '/loose-diamonds/oval-cut', permanent: true },
  { source: '/hidden-halo-engagement-rings', destination: '/engagement-rings/hidden-halo', permanent: true },
  { source: '/halo-engagement-rings', destination: '/engagement-rings/halo', permanent: true },
  { source: '/anniversary-gifts-jewelry', destination: '/jewelry/anniversary-gifts', permanent: true },
  { source: '/graduation-gifts-jewelry', destination: '/jewelry/graduation-gifts', permanent: true },
  { source: '/wedding-rings', destination: '/wedding-rings/wedding-bands', permanent: true },
  { source: '/best-sellers-jewelry', destination: '/jewelry/best-sellers', permanent: true },
  { source: '/holiday-gifts-jewelry', destination: '/jewelry/holiday-gifts', permanent: true },
  { source: '/capri-cut-diamond-engagement-rings', destination: '/engagement-rings/capri-cut', permanent: true },
  { source: '/diamond-tennis-collection', destination: '/jewelry/diamond-tennis-collection', permanent: true },
  { source: '/diamond-ear-arcs-jewelry', destination: '/jewelry/diamond-ear-climbers', permanent: true },
  { source: '/floral-engagement-rings', destination: '/engagement-rings/floral', permanent: true },
  { source: '/vrai-x-brides-jewelry', destination: '/jewelry/vrai-x-brides', permanent: true },
  { source: '/trillion-cut-diamond-engagement-rings', destination: '/engagement-rings/trillion-cut', permanent: true },
  { source: '/trillion-cut-diamonds', destination: '/loose-diamonds/trillion-cut', permanent: true },
  { source: '/round-cut-diamonds', destination: '/loose-diamonds/round-cut', permanent: true },
  { source: '/radiant-cut-diamonds', destination: '/loose-diamonds/radiant-cut', permanent: true },
  { source: '/princess-cut-diamonds', destination: '/loose-diamonds/princess-cut', permanent: true },
  { source: '/pink-diamonds', destination: '/loose-diamonds/pink', permanent: true },
  { source: '/pear-cut-diamonds', destination: '/loose-diamonds/pear-cut', permanent: true },
  { source: '/marquise-cut-diamonds', destination: '/loose-diamonds/marquise-cut', permanent: true },
  { source: '/emerald-cut-diamonds', destination: '/loose-diamonds/emerald-cut', permanent: true },
  { source: '/cushion-cut-diamonds', destination: '/loose-diamonds/cushion-cut', permanent: true },
  { source: '/asscher-cut-diamonds', destination: '/loose-diamonds/asscher-cut', permanent: true },
  { source: '/simple-engagement-rings', destination: '/engagement-rings/simple', permanent: true },
  { source: '/3-carat-diamond-engagement-rings', destination: '/engagement-rings/3-carat-diamond', permanent: true },
  { source: '/yellow-gold-wedding-rings', destination: '/wedding-rings/yellow-gold', permanent: true },
  { source: '/wedding-jewelry', destination: '/jewelry/wedding', permanent: true },
  { source: '/unisex-gifts-jewelry', destination: '/jewelry/unisex-gifts', permanent: true },
  { source: '/tiny-diamond-collection-jewelry', destination: '/jewelry/tiny-diamond-collection', permanent: true },
  { source: '/tetrad-rings-jewelry', destination: '/jewelry/tetrad-rings', permanent: true },
  { source: '/summer-edit-jewelry', destination: '/jewelry/summer-edit', permanent: true },
  { source: '/stylist-edit-jewelry', destination: '/jewelry/stylist-edit-by-tara-swennen', permanent: true },
  {
    source: '/stylist-edit-by-samantha-mcmillen-jewelry',
    destination: '/jewelry/stylist-edit-by-samantha-mcmillen',
    permanent: true,
  },
  { source: '/stylist-edit-by-jeanne-yang-jewelry', destination: '/jewelry/stylist-edit-by-jeanne-yang', permanent: true },
  {
    source: '/stylist-edit-by-ciara-and-russell-wilson',
    destination: '/jewelry/stylist-edit-by-ciara-and-russell-wilson',
    permanent: true,
  },
  { source: '/stylist-edit-by-arizona-muse-jewelry', destination: '/jewelry/stylist-edit-by-arizona-muse', permanent: true },
  { source: '/signet-ring-collection-jewelry', destination: '/jewelry/signet-rings', permanent: true },
  { source: '/signature-bezel-engagement-rings', destination: '/engagement-rings/signature-bezel', permanent: true },
  { source: '/shield-cut-diamond-engagement-rings', destination: '/engagement-rings/shield-cut', permanent: true },
  { source: '/round-rose-cut-diamond-engagement-rings', destination: '/engagement-rings/round-rose-cut', permanent: true },
  { source: '/rose-gold-wedding-rings', destination: '/wedding-rings/rose-gold', permanent: true },
  { source: '/regulus-cut-diamond-engagement-rings', destination: '/engagement-rings/regulus-cut', permanent: true },
  { source: '/anniversary-gift-jewelry', destination: '/jewelry/', permanent: true },
  { source: '/all-earrings-jewelry', destination: '/jewelry/', permanent: true },
  { source: '/new-parents-gifts-jewelry', destination: '/jewelry/new-parents-gifts', permanent: true },
  { source: '/new-beginnings-gifts-jewelry', destination: '/jewelry/new-beginnings-gifts', permanent: true },
  { source: '/medallion-necklaces-jewelry', destination: '/jewelry/medallion-necklaces', permanent: true },
  { source: '/promise-rings-jewelry', destination: '/jewelry/promise-rings', permanent: true },
  {
    source: '/long-hexagon-cut-diamond-engagement-rings',
    destination: '/engagement-rings/long-hexagon-cut',
    permanent: true,
  },
  { source: '/oval-rose-cut-diamond-engagement-rings', destination: '/engagement-rings/oval-rose-cut', permanent: true },
  { source: '/rand-cut-diamond-engagement-rings', destination: '/engagement-rings/rand-cut', permanent: true },
  {
    source: '/petra-flannery-stylist-edit-jewelry',
    destination: '/jewelry/stylist-edit-by-petra-flannery',
    permanent: true,
  },
  { source: '/passion-cut-diamond-engagement-rings', destination: '/engagement-rings/passion-cut', permanent: true },
  { source: '/octavia-cut-diamond-engagement-rings', destination: '/engagement-rings/octavia-cut', permanent: true },
  { source: '/mixed-cuff-ring-collection-jewelry', destination: '/jewelry/mixed-cuff-rings', permanent: true },
  { source: '/mens-jewelry', destination: '/jewelry/mens', permanent: true },
  { source: '/lucky-cut-diamond-engagement-rings', destination: '/engagement-rings/lucky-cut', permanent: true },
  { source: '/lozenge-cut-diamond-engagement-rings', destination: '/engagement-rings/lozenge-cut', permanent: true },
  { source: '/layering-necklaces-jewelry', destination: '/jewelry/layering-necklaces', permanent: true },
  { source: '/last-chance-jewelry', destination: '/jewelry/last-chance', permanent: true },
  { source: '/kite-cut-diamond-engagement-rings', destination: '/engagement-rings/kite-cut', permanent: true },
  { source: '/iconic-shapes-jewelry', destination: '/jewelry/iconic-shapes', permanent: true },
  { source: '/heart-cut-diamond-engagement-rings', destination: '/engagement-rings/heart-cut', permanent: true },
  { source: '/harmonia-cut-diamond-engagement-rings', destination: '/engagement-rings/harmonia-cut', permanent: true },
  { source: '/gifts-for-him-jewelry', destination: '/jewelry/gifts-for-him', permanent: true },
  { source: '/fusion-cut-diamond-engagement-rings', destination: '/engagement-rings/fusion-cut', permanent: true },
  { source: '/felix-cut-diamond-engagement-rings', destination: '/engagement-rings/felix-cut', permanent: true },
  { source: '/east-west-engagement-rings', destination: '/engagement-rings/east-west', permanent: true },
  { source: '/earrings-gift-jewelry', destination: '/jewelry/earrings', permanent: true },
  { source: '/diamond-cross-necklaces-jewelry', destination: '/jewelry/cross-necklaces', permanent: true },
  {
    source: '/cushion-princess-cut-diamond-engagement-rings',
    destination: '/engagement-rings/cushion-princess-cut',
    permanent: true,
  },
  {
    source: '/brilliant-emerald-cut-diamond-engagement-rings',
    destination: '/engagement-rings/brilliant-emerald-cut',
    permanent: true,
  },
  { source: '/best-engagement-rings', destination: '/engagement-rings/best', permanent: true },
  { source: '/baguette-collection-jewelry', destination: '/jewelry/baguette-collection', permanent: true },
  { source: '/anniversary-necklace-gift-jewelry', destination: '/jewelry/anniversary-necklace', permanent: true },
  { source: '/anniversary-earrings-jewelry', destination: '/jewelry/anniversary-earrings', permanent: true },
  { source: '/anniversary-bracelet-gift-jewelry', destination: '/jewelry/anniversary-bracelets', permanent: true },
];

const DEFAULT_LOCALE = 'en-US';
const AVAILABLE_LOCALES = [
  DEFAULT_LOCALE,
  'en-CA',
  'fr-CA',
  'de-AT',
  'en-AT',
  'en-BE',
  'fr-BE',
  'en-DK',
  'en-FI',
  'fr-FR',
  'en-FR',
  'de-DE',
  'en-DE',
  'en-IE',
  'en-IT',
  'en-NL',
  'en-NO',
  'en-PT',
  'es-ES',
  'en-ES',
  'en-SE',
  'de-CH',
  'fr-CH',
  'en-CH',
  'en-GB',
  'en-AU',
  'en-JP',
  'en-SG',
  'en-KR',
  'en-CN',
  'en-TW',
  'en-HK',
  'en-BG',
  'en-CY',
  'en-CZ',
  'en-EE',
  'en-GR',
  'en-HR',
  'en-HU',
  'en-LT',
  'en-LU',
  'en-LV',
  'en-MT',
  'en-PL',
  'en-RO',
  'en-SI',
  'en-SK',
];

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  async redirects() {
    return redirects;
  },
  nx: {
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  i18n: {
    locales: AVAILABLE_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  // api: {
  //   externalResolver: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.datocms-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
      },
      {
        protocol: 'https',
        hostname: 'images.vraiandoro.com',
      },
      {
        protocol: 'https',
        hostname: 'videos.diamondfoundry.com',
      },
    ],
    deviceSizes: [576, 768, 992, 1200, 1440],
    // we should remove this because we don't want it - https://nextjs.org/docs/pages/api-reference/components/image#imagesizes
    // imageSizes: [576, 768, 992, 1200, 1440],
  },

  async rewrites() {
    return [
      {
        source: '/journal',
        destination: `${process.env.JOURNAL_SITE}/journal`,
      },
      {
        source: '/journal/:path*',
        destination: `${process.env.JOURNAL_SITE}/journal/:path*`,
      },
    ];
  },
  env: {
    GATEWAY_URL: process.env.GATEWAY_URL || 'http://localhost:3333',
  },
  sentry: {
    hideSourcemaps: true,
    // See the sections below for information on the following options:
    //   'Configure Source Maps':
    //     - disableServerWebpackPlugin
    //     - disableClientWebpackPlugin
    //     - hideSourceMaps
    //     - widenClientFileUpload
    //   'Configure Legacy Browser Support':
    //     - transpileClientSDK
    //   'Configure Serverside Auto-instrumentation':
    //     - autoInstrumentServerFunctions
    //     - excludeServerRoutes
    //   'Configure Tunneling to avoid Ad-Blockers':
    //     - tunnelRoute
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: 'vrai-oro',
  project: 'darkside-main',

  // An auth token is required for uploading source maps.
  // You can get an auth token from https://sentry.io/settings/account/api/auth-tokens/
  // The token must have `project:releases` and `org:read` scopes for uploading source maps
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// FIXME: https://nx.dev/packages/next/documents/next-config-setup#composing-plugins-using-utility-(nx-16-and-later)
module.exports = withNx(withSentryConfig(nextConfig, sentryWebpackPluginOptions));
