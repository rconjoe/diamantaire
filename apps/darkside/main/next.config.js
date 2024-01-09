// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction

// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withNx, composePlugins } = require('@nx/next');
const { withSentryConfig } = require("@sentry/nextjs");

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
        destination: `${process.env.JOURNAL_SITE}/`,
      },
      {
        source: '/journal/:path*',
        destination: `${process.env.JOURNAL_SITE}/:path*`,
      },
    ];
  },
  env: {
    GATEWAY_URL: process.env.GATEWAY_URL || 'http://localhost:3333',
  },
};

const projectConfig = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "vrai-oro",
    project: "darkside-main",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
)

const plugins = [
  withNx,
  withBundleAnalyzer,
];

module.exports = composePlugins(...plugins)(projectConfig); 

