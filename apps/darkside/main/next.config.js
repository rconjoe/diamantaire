// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction

// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withNx, composePlugins } = require('@nx/next');

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
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
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
};

const plugins = [
  withNx,
  withBundleAnalyzer,
];

module.exports = composePlugins(...plugins)(nextConfig); 
