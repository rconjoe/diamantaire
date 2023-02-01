const VALID_COUNTRY_SUBDOMAINS = [
  'de',
  'be',
  'fr',
  'it',
  'se',
  'es',
  'no',
  'nl',
  'ch',
  'dk',
];

/**
 * Gets subdomain from request object and returns a country code
 * @param {object} req - page request object
 */
export const getServerSideSubdomainCountryCode = req => {
  const subdomains = req?.subdomains;

  if (subdomains) {
    const subdomain = subdomains[0];

    return getValidCountryCodeFromSubdomain(subdomain);
  }

  // If no valid countrycode is found, return undefinef
  return;
};

/**
 * Parses the location host from the window global object
 * and returns a country code if valid
 */
export const getClientSideSubdomainCountryCode = () => {
  if (!window) {
    return;
  }
  const host = window?.location?.host;

  if (host) {
    const subdomain = host.split('.')[0];

    if (subdomain) {
      return getValidCountryCodeFromSubdomain(subdomain);
    }
  }

  // If no valid countrycode is found, return undefinef
  return;
};

const getValidCountryCodeFromSubdomain = subdomain => {
  if (subdomain === 'uk') {
    return 'GB';
  }

  // only accept known subdomains
  if (subdomain && VALID_COUNTRY_SUBDOMAINS.includes(subdomain)) {
    return subdomain.toUpperCase();
  }

  return;
};
