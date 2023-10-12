import Cookies from 'js-cookie';

export const getUserCountry = () => {
  const countryCode = Cookies.get('geoCountry') || 'US';

  return countryCode;
};
