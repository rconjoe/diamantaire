import { countries } from '@diamantaire/shared/constants';
import Cookies from 'js-cookie';

export const getIsUserInEu = () => {
  const countryCode = Cookies.get('geoCountry') || 'US';
  const selectedRegion = countries[countryCode].region;
  const isUserInEu = selectedRegion === 'Europe';

  return isUserInEu;
};
