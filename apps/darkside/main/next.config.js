// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withNx } = require('@nrwl/next/plugins/with-nx');
const { withSentryConfig } = require('@sentry/nextjs');

//@ts-check

// const { JOURNAL_DEV_URL } = process.env;

// eslint-disable-next-line @typescript-eslint/no-var-requires

const DEFAULT_LOCALE = 'en-US';

const LOCALES = [
  DEFAULT_LOCALE,
  'fr-FR',
  'en-FR',
  'de-DE',
  'en-DE',
  'es-ES',
  'en-ES',
  'en-CA',
  'fr-CA',
  'en-GB',
  'en-AT',
  'en-AU',
];

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  i18n: {
    locales: LOCALES,
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
    ],
    // let's refine deviceSizes
    deviceSizes: [576, 768, 992, 1200, 1440],
    imageSizes: [576, 768, 992, 1200, 1440],
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: `/:path*`,
  //     },
  //     // {
  //     //   source: '/jewelry/:path*',
  //     //   destination: `${JEWELRY_URL}/jewelry/:path*`,
  //     // },
  //     {
  //       source: '/journal',
  //       destination: `${JOURNAL_DEV_URL}/journal`,
  //     },
  //     {
  //       source: '/journal/:path*',
  //       destination: `${JOURNAL_DEV_URL}/journal/:path*`,
  //     },
  //   ];
  // },
  // env: {
  //   GATEWAY_URL: process.env.GATEWAY_URL || 'http://localhost:3333',
  // },
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

module.exports = withNx(withSentryConfig(nextConfig, sentryWebpackPluginOptions));
