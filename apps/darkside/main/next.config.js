//@ts-check

const { JOURNAL_DEV_URL } = process.env;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `/:path*`,
      },
      // {
      //   source: '/jewelry/:path*',
      //   destination: `${JEWELRY_URL}/jewelry/:path*`,
      // },
      {
        source: '/journal',
        destination: `${JOURNAL_DEV_URL}/journal`,
      },
      {
        source: '/journal/:path*',
        destination: `${JOURNAL_DEV_URL}/journal/:path*`,
      },
    ];
  },
  i18n: {
    locales: ['en-US', 'fr', 'de', 'es'],
    defaultLocale: 'en-US',
  },
};

module.exports = withNx(nextConfig);
