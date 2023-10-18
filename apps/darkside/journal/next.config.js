//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next/plugins/with-nx');

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
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: AVAILABLE_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
  basePath: process.env['NODE_ENV'] === 'development' ? '' : '/journal',
};

module.exports = withNx(nextConfig);
