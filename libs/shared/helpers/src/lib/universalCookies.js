import Cookies from 'js-cookie'; // See https://www.npmjs.com/package/js-cookie
import getEnvConfig from '../env';
const { PREVENT_SUBDOMAIN_LINKING, COOKIE_PREFIX } = getEnvConfig();

export const CHECKOUT_ID_COOKIE_NAME = 'checkout-id';
export const CHECKOUT_ATTRIBUTION_CHANNEL_COOKIE_NAME =
  'sales-attribution-channel';
export const CHECKOUT_ATTRIBUTION_SALESPERSON_COOKIE_NAME =
  'sales-attribution-sales-person';
export const BANNER_CLOSED_COOKIE_NAME = 'banner-closed';
export const LOCALE_COOKIE_NAME = `${COOKIE_PREFIX}selectedLocale`;
export const PRIVACY_COOKIE_NAME = 'privacy';
export const GEOLOCATION_COOKIE_NAME = `${COOKIE_PREFIX}geolocation`;
export const VAT_RATES_COOKIE_NAME = 'vat-rates';
export const HUBSPOT_COOKIES_TOKEN = 'hubspotutk';
export const EMAIL_POP_UP_COOKIE_NAME = 'email-popup';
export const COUNTRY_CODE_COOKIE_NAME = 'country-code';
export const PDP_PRODUCT_DETAILS_COOKIE_NAME = 'pdp-product-details';
export const WISH_LIST = 'wish-list';
export const ALL_VRAI_SUBDOMAINS = '.vrai.com';
export const ROOT_PATH = '/';

const SUBDOMAIN_COOKIE_OPTIONS = {
  path: ROOT_PATH,
  domain: ALL_VRAI_SUBDOMAINS,
};

/**
 * This helper object provides get/set methods for the cookies
 * needed by our site.
 */

export const CheckoutIdCookie = {
  set(checkoutId) {
    Cookies.set(CHECKOUT_ID_COOKIE_NAME, checkoutId);
  },
  get(cookies) {
    return cookies[CHECKOUT_ID_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(CHECKOUT_ID_COOKIE_NAME);
  },
};

export const CountryCodeCookie = {
  set(countryCode) {
    Cookies.set(COUNTRY_CODE_COOKIE_NAME, countryCode);
  },
  get(cookies) {
    return cookies[COUNTRY_CODE_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(COUNTRY_CODE_COOKIE_NAME);
  },
};

export const CheckoutSalesChannelCookie = {
  set(salesAttribution) {
    Cookies.set(
      CHECKOUT_ATTRIBUTION_CHANNEL_COOKIE_NAME,
      JSON.stringify(salesAttribution),
      { expires: 90 }
    );
  },
  get(cookies) {
    const rawCookies = cookies[CHECKOUT_ATTRIBUTION_CHANNEL_COOKIE_NAME];

    return rawCookies
      ? JSON.parse(cookies[CHECKOUT_ATTRIBUTION_CHANNEL_COOKIE_NAME])
      : undefined;
  },
  remove() {
    Cookies.remove(CHECKOUT_ATTRIBUTION_CHANNEL_COOKIE_NAME);
  },
};

export const CheckoutSalesPersonCookie = {
  set(salesPerson) {
    Cookies.set(CHECKOUT_ATTRIBUTION_SALESPERSON_COOKIE_NAME, salesPerson);
  },
  get(cookies) {
    return cookies[CHECKOUT_ATTRIBUTION_SALESPERSON_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(CHECKOUT_ATTRIBUTION_SALESPERSON_COOKIE_NAME);
  },
};

export const BannerCloseCookie = {
  set() {
    Cookies.set(BANNER_CLOSED_COOKIE_NAME, 'true', { expires: 0.5 }); // 0.5 days (12 hours) from time of creation
  },
  get(cookies) {
    return cookies[BANNER_CLOSED_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(BANNER_CLOSED_COOKIE_NAME);
  },
};

export const LocaleCookies = {
  set(locale) {
    Cookies.set(
      LOCALE_COOKIE_NAME,
      locale,
      PREVENT_SUBDOMAIN_LINKING ? {} : SUBDOMAIN_COOKIE_OPTIONS
    );
  },
  get(cookies) {
    return cookies[LOCALE_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(
      LOCALE_COOKIE_NAME,
      PREVENT_SUBDOMAIN_LINKING ? {} : SUBDOMAIN_COOKIE_OPTIONS
    );
  },
};

export const PrivacyCookie = {
  set(privacy) {
    let cookieOptions = { expires: 30 }; // expires set in days from creation

    if (!PREVENT_SUBDOMAIN_LINKING) {
      cookieOptions = {
        ...cookieOptions,
        ...SUBDOMAIN_COOKIE_OPTIONS,
      };
    }
    Cookies.set(PRIVACY_COOKIE_NAME, privacy, cookieOptions);
  },
  get(cookies) {
    return cookies[PRIVACY_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(PRIVACY_COOKIE_NAME);
  },
};

export const GeolocationCookie = {
  set(geolocation) {
    Cookies.set(
      GEOLOCATION_COOKIE_NAME,
      geolocation,
      PREVENT_SUBDOMAIN_LINKING ? {} : SUBDOMAIN_COOKIE_OPTIONS
    );
  },
  get(cookies) {
    return cookies ? cookies[GEOLOCATION_COOKIE_NAME] : null;
  },
  remove() {
    Cookies.remove(
      GEOLOCATION_COOKIE_NAME,
      PREVENT_SUBDOMAIN_LINKING ? {} : SUBDOMAIN_COOKIE_OPTIONS
    );
  },
};

export const vatRatesCookie = {
  set(vatRates) {
    Cookies.set(VAT_RATES_COOKIE_NAME, vatRates, SUBDOMAIN_COOKIE_OPTIONS);
  },
  get(cookies) {
    return cookies ? cookies[VAT_RATES_COOKIE_NAME] : null;
  },
  remove() {
    Cookies.remove(VAT_RATES_COOKIE_NAME, SUBDOMAIN_COOKIE_OPTIONS);
  },
};

export const hubspotCookieToken = () => {
  return Cookies.get(HUBSPOT_COOKIES_TOKEN);
};

export const emailPopupCookie = {
  set() {
    Cookies.set(EMAIL_POP_UP_COOKIE_NAME, 'true', { expires: 30 });
  },
  get(cookies) {
    return cookies[EMAIL_POP_UP_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(EMAIL_POP_UP_COOKIE_NAME);
  },
};

export const pdpProductDataCookie = {
  set(dataString) {
    Cookies.set(PDP_PRODUCT_DETAILS_COOKIE_NAME, dataString, { expires: 30 });
  },
  get(cookies) {
    return cookies[PDP_PRODUCT_DETAILS_COOKIE_NAME];
  },
  remove() {
    Cookies.remove(PDP_PRODUCT_DETAILS_COOKIE_NAME);
  },
};

export const getInterestingCookies = ({ nextContext, isServer }) => {
  if (isServer) {
    return pickInterestingCookies(serverSideCookies(nextContext));
  } else {
    return pickInterestingCookies(clientSideCookies());
  }
};

export const wishListCookie = {
  set(value) {
    Cookies.set(WISH_LIST, value);
  },
  get() {
    return Cookies.get(WISH_LIST);
  },
  remove() {
    Cookies.remove(WISH_LIST);
  },
};

const serverSideCookies = nextContext => {
  return nextContext.req.cookies; // provided via the cookie-parser express middleware
};

const clientSideCookies = () => {
  return Cookies.get();
};

const pickInterestingCookies = (cookies = {}) => {
  return {
    [CHECKOUT_ID_COOKIE_NAME]: cookies[CHECKOUT_ID_COOKIE_NAME],
    [BANNER_CLOSED_COOKIE_NAME]: cookies[BANNER_CLOSED_COOKIE_NAME],
    [LOCALE_COOKIE_NAME]: cookies[LOCALE_COOKIE_NAME],
    [PRIVACY_COOKIE_NAME]: cookies[PRIVACY_COOKIE_NAME],
    [GEOLOCATION_COOKIE_NAME]: cookies[GEOLOCATION_COOKIE_NAME],
    [EMAIL_POP_UP_COOKIE_NAME]: cookies[EMAIL_POP_UP_COOKIE_NAME],
    [CHECKOUT_ATTRIBUTION_SALESPERSON_COOKIE_NAME]:
      cookies[CHECKOUT_ATTRIBUTION_SALESPERSON_COOKIE_NAME],
    [CHECKOUT_ATTRIBUTION_CHANNEL_COOKIE_NAME]:
      cookies[CHECKOUT_ATTRIBUTION_CHANNEL_COOKIE_NAME],
    [PDP_PRODUCT_DETAILS_COOKIE_NAME]: cookies[PDP_PRODUCT_DETAILS_COOKIE_NAME],
  };
};
