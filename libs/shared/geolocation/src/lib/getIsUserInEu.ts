import { countries } from '@diamantaire/shared/constants';

import { getUserGeo } from './getUserGeo';

export const getIsUserInEu = () => {
  const geo = getUserGeo();
  const countryCode = geo ? geo.country : 'US';

  const selectedRegion = countries?.[countryCode]?.region;
  const isUserInEu = selectedRegion === 'Europe';

  return isUserInEu;
};
