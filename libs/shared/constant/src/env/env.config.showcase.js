const shopifyConfig = require('./env.shopify.production');
const okendoConfig = require('./env.okendo.production');
const klaviyoConfig = require('./env.klaviyo.production');
const diamondFoundryConfig = require('./env.diamondFoundry.staging');
const datoConfig = require('./env.dato.showcase');

const HOST = 'https://showcase.vrai.com';

const PREVENT_BASIC_SSR_CACHE = false;
const PREVENT_REDIRECT_HOME_TRY_ON = true;
const PREVENT_JEWELRY_PRODUCT_REDIRECT = false;

// const GTM_CONTAINER_ID = 'GTM-KK5KX69';

/**
 * These are real credentials tied to dan@diamondfoundry.com,
 * but they don't match what we are using in production. These
 * are only here for integration testing and debugging.
 *
 * On production we are using credentials tied to
 * vo-dev-service-owner@diamondfoundry.com.
 */

const ACUITY_USER_ID = '26511695';
const ACUITY_API_KEY = '69d995ae21d1b73f4f3add164800d9a3';

const PAYPAL_PAY_LATER_KEY =
  'AeRsqLp2AZNJZZu9lyI-dsgG5YkEwwsJ79EfRwEK_083xVgKBux61sBaNyqgpQ3EqSLGebN2DBOQ98at';

/**
 * These are for testing localization.
 */
const FAKE_EU_LOCATION_ENABLED = false;
const FAKE_EU_IP_ADDRESS = '212.21.66.6'; // 212.21.66.6 = Berlin

// The domain from which to load diamond videos
const DIAMOND_VIDEO_DOMAIN = 'videos.diamondfoundry.com';

const CMS_TTL_SECS = 1200;
const CMS_REFRESH_TIME_SECS = 300;

/**
 * The cache expiry is 20 minutes (1,200 seconds), and this is warmed
 * every 5 minutes (300 seconds).
 */
const DEFAULT_TTL_SECS = 1200;
const DEFAULT_REFRESH_TIME_SECS = 300;

/**
 * The cache expiry is 8 hours (28,800 seconds), but the cache warmer
 * will refresh at one quarter of that duration, 2 hours (7,200 seconds).
 */
const MASTER_COLLECTION_TTL_SECS = 28800;
const MASTER_COLLECTION_REFRESH_TIME_SECS = 7200;

/**
 * The cache expiry for diamonds is 100 minutes (6,000 seconds), but the cache warmer
 * will refresh at every 10 minutes (600 seconds). This cache refresh
 * rate is low to try to avoid double sales. It also allows us to warm numerous times
 * before expiration, which gives us redundancy against failures.
 *
 * Warming is run continuously using setInterval which does NOT account for
 * execution time. The execution time is throttled to one request per 25 seconds
 * for Shopify, and much lower for Dato.
 */
const DIAMOND_COLLECTION_TTL_SECS = 6000;
const DIAMOND_COLLECTION_REFRESH_TIME_SECS = 600;

/**
 * This is used for the revalidate value in getStaticProps.
 * Next.js will attempt to re-generate the page:
 * - When a request comes in
 * - At most once every 90 mins (5400 seconds)
 */
const STATIC_PAGE_TTL_SECS = 5400;

/**
 * International versions of the site are on subdomains and the country selectors link
 * to the respective subdomains.  This makes it difficult to test languages on staging.
 * Thise configs will allow that to be disabled
 */
const PREVENT_SUBDOMAIN_LINKING = true;
const COOKIE_PREFIX = 'showcase.';
const ENV_SUBDOMAIN = 'showcase';

/**
 * reCaptcha toggle and threshold. It normally returns a score of 0.0 - 1.0 depending on how
 * likely the user behavior is human.
 */
const RECAPTCHA_ENABLED = false;
const RECAPTCHA_BOT_THRESHOLD = 0.4;
const RECAPTCHA_PUBLIC_KEY = '6LcVjPocAAAAAGvD8wPm7hWBoLDIFUcM3wIIAhmV';

/**
 * Key to authenticate local API requests (currently only used for /klaviyo)
 */
const SIGNING_SECRET = 'Hcti5SWBi2BV7Qi1RCxvoqHUyGXJN9CsPeYuSScXWL8=';

// URL for sending messages to slack
const SLACK_WEBHOOK_URL =
  'https://hooks.slack.com/services/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';

module.exports = {
  // GTM_CONTAINER_ID,
  PAYPAL_PAY_LATER_KEY,
  ACUITY_USER_ID,
  ACUITY_API_KEY,
  HOST,
  PREVENT_BASIC_SSR_CACHE,
  PREVENT_REDIRECT_HOME_TRY_ON,
  PREVENT_JEWELRY_PRODUCT_REDIRECT,
  CMS_TTL_SECS,
  CMS_REFRESH_TIME_SECS,
  DEFAULT_TTL_SECS,
  DEFAULT_REFRESH_TIME_SECS,
  MASTER_COLLECTION_TTL_SECS,
  MASTER_COLLECTION_REFRESH_TIME_SECS,
  DIAMOND_COLLECTION_TTL_SECS,
  DIAMOND_COLLECTION_REFRESH_TIME_SECS,
  FAKE_EU_LOCATION_ENABLED,
  FAKE_EU_IP_ADDRESS,
  PREVENT_SUBDOMAIN_LINKING,
  COOKIE_PREFIX,
  ENV_SUBDOMAIN,
  DIAMOND_VIDEO_DOMAIN,
  RECAPTCHA_ENABLED,
  RECAPTCHA_BOT_THRESHOLD,
  RECAPTCHA_PUBLIC_KEY,
  STATIC_PAGE_TTL_SECS,
  SIGNING_SECRET,
  SLACK_WEBHOOK_URL,
  ...shopifyConfig,
  ...okendoConfig,
  ...datoConfig,
  ...klaviyoConfig,
  ...diamondFoundryConfig,
};
