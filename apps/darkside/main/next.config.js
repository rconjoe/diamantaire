//@ts-check

// const { JOURNAL_DEV_URL } = process.env;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    swcPlugins: [
      [
        '@swc/plugin-styled-components',
        {
          displayName: true,
          ssr: true,
        },
      ],
    ],
  },
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
    ],
    // let's refine deviceSizes
    deviceSizes: [576, 768, 992, 1200, 1440],
    imageSizes: [576, 768, 992, 1200, 1440],
  },

  //
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
  // i18n: {
  //   locales: ['en-US', 'fr', 'de', 'es'],
  //   defaultLocale: 'en-US',
  // },
  // env: {
  //   GATEWAY_URL: process.env.GATEWAY_URL || 'http://localhost:3333',
  // },
};

module.exports = withNx(nextConfig);
