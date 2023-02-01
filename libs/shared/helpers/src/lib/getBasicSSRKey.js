const { getGeoIpData } = require('../api/geolocationParser');

import { getPrimaryLocaleByCountryCode } from '../helpers/language';
import { EU_COUNTRY_CODES } from '@diamantaire/shared/constants';
import { LOCALE_COOKIE_NAME } from '../helpers/universalCookies';

/**
 *
 * @param {Object} req
 */
const getBasicSSRKey = function ({ req }, overrideGeoIpDataForTest = false) {
  let ssrKey = createBaseKey(req);

  ssrKey = addOptionalLocalePrefix(ssrKey, req);

  ssrKey = addOptionalOutsideUsPrefix(ssrKey, req, overrideGeoIpDataForTest);

  // eslint-disable-next-line no-console
  console.log('basic ssr cache with key: ', ssrKey);

  return ssrKey;
};

/*
 *  Generates a cache key based on the request url. It strips off all query params
 *  except the white listed params.
 *
 *  The variations in the url of builder pages has a lot of permutation.
 *  It is not covered in the whitelist and if we turn on the basicSSR for builder
 *  pages then it will need to include these params white listed if we want to cache
 *  them correctly.
 *
 *       category, product, bandAccent, flow, diamondLotId, metal,
 *       ringSize, goldPurity, sideStoneCarat, bandWidth, diamondType
 */
export const createBaseKey = (req) => {
  const WHITELIST_PARAMS = ['metal', 'diamondType', 'extra'];
  const [path, queryParams = ''] = req.url.split('?');
  const sanitizedQuery = queryParams?.split('&').filter((param) => {
    if (!param) {
      return;
    }

    const [key] = param.split('=');

    return WHITELIST_PARAMS.includes(key);
  });

  // add whitelisted query params onto the cache key
  if (!sanitizedQuery.length) {
    return path;
  } else {
    return `${path}?` + sanitizedQuery.join('&');
  }
};

export const addOptionalLocalePrefix = (key, req) => {
  const countryCode = req.overrideCountryCode;
  const primarySubdomainLocale = countryCode
    ? getPrimaryLocaleByCountryCode(countryCode)
    : undefined;
  const locale =
    req.cookies?.[LOCALE_COOKIE_NAME] ||
    primarySubdomainLocale ||
    req.geoLocale;

  if (locale) {
    return `${locale}-${key}`;
  }

  return key;
};

/**
 * Prefix the key based on region
 *
 * If the user is inside the US? ssrKey
 * If the user is inside the EU? Set a key based on the subdomain e.g [EU]-ssrKey [DE]-ssrKey
 * If the user is outside the US and outside the EU? [countryCode]-ssrKey
 *
 * This balances two considerations:
 * 1. If we put too much in the SSR cache, which uses system memory, then we
 *    will crash our server.
 * 2. Countries that use different currencies must use different page caches.
 */
export const addOptionalOutsideUsPrefix = (
  key,
  req,
  overrideGeoIpDataForTest = false
) => {
  const geoIpData = overrideGeoIpDataForTest || getGeoIpData(req);
  const overrideCountryCode = req.overrideCountryCode;
  const countryCode = overrideCountryCode || geoIpData?.country || 'US';
  const isOutsideUS = countryCode !== 'US';

  if (isOutsideUS) {
    const isInsideEu = EU_COUNTRY_CODES.includes(countryCode);

    if (overrideCountryCode) {
      return `[${overrideCountryCode}]-${key}`;
    } else if (isInsideEu) {
      return `[EU]-${key}`;
    }

    return `[${countryCode}]-${key}`;
  }

  return key;
};

export default getBasicSSRKey;
