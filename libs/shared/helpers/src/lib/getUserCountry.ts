import Cookies from 'js-cookie';

export const getUserCountry = () => {
  const { country: countryCode } = JSON.parse(Cookies.get('geo')) || 'US';

  return countryCode;
};
