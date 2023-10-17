import { DEFAULT_LOCALE, countries } from '@diamantaire/shared/constants';

import { getCountry } from './getCountry';

export const getIsUserInEu = (locale: string = DEFAULT_LOCALE) => {
  const countryCode = getCountry(locale);
  const selectedRegion = countries[countryCode].region;
  const isUserInEu = selectedRegion === 'Europe';

  return isUserInEu;
};
