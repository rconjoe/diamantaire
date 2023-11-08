import { getUserGeo } from '@diamantaire/shared/geolocation';

export const getUserCountry = () => {
  const geo = getUserGeo();
  const countryCode = geo ? geo.country : 'US';

  return countryCode;
};
