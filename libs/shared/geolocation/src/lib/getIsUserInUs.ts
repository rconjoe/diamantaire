import { getUserGeo } from './getUserGeo';

export const getIsUserInUs = () => {
  const geo = getUserGeo();
  const countryCode = geo ? geo.country : 'US';

  const isUserInUs = countryCode === 'US';

  return isUserInUs;
};
