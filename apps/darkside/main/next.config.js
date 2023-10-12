// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction

// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
<<<<<<< HEAD
const { withNx } = require('@nx/next/plugins/with-nx');
const { withSentryConfig } = require('@sentry/nextjs');
=======
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const { withNx, composePlugins } = require('@nx/next');
// const { withSentryConfig } = require('@sentry/nextjs');
>>>>>>> aac7a000 (feat: added bundle analyzer package)

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

// const sentryWebpackPluginOptions = {
//   // Additional config options for the Sentry Webpack plugin. Keep in mind that
//   // the following options are set automatically, and overriding them is not
//   // recommended:
//   //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

//   org: 'vrai-oro',
//   project: 'darkside-main',

//   // An auth token is required for uploading source maps.
//   // You can get an auth token from https://sentry.io/settings/account/api/auth-tokens/
//   // The token must have `project:releases` and `org:read` scopes for uploading source maps
//   authToken: process.env.SENTRY_AUTH_TOKEN,

//   silent: true, // Suppresses all logs

//   // For all available options, see:
//   // https://github.com/getsentry/sentry-webpack-plugin#options.
// };

const plugins = [
  withNx,
  // (nextConfiguration) => withSentryConfig(nextConfiguration, sentryWebpackPluginOptions),
  withBundleAnalyzer,
];

// FIXME: https://nx.dev/packages/next/documents/next-config-setup#composing-plugins-using-utility-(nx-16-and-later)
module.exports = composePlugins(...plugins)(nextConfig); // withNx(withSentryConfig(nextConfig, sentryWebpackPluginOptions));

//module.exports = withNx(withBundleAnalyzer(nextConfig));
