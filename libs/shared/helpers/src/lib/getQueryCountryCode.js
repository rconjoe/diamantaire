import { COUNTRY_CODES } from '../helpers/constants';

export const getServerSideQueryCountryCode = req => {
  const { country } = req.query;

  if (country && isValidCountryCode(country)) {
    return country.toUpperCase();
  }

  return;
};

export const getClientSideQueryCountryCode = () => {
  if (typeof window !== 'undefined') {
    const urlSearchParams = new URLSearchParams(window.location.search);

    if (urlSearchParams) {
      const params = fromEntries(urlSearchParams.entries());
      const { country: countryParam } = params;

      if (countryParam && isValidCountryCode(countryParam)) {
        return countryParam.toUpperCase();
      }
    }
  }

  return;
};

const isValidCountryCode = country => {
  if (country) {
    return Object.values(COUNTRY_CODES).includes(country.toUpperCase());
  }

  return false;
};

function fromEntries(iterable) {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;

    return obj;
  }, {});
}
