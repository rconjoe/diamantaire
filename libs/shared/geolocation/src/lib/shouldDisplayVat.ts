import { DEFAULT_LOCALE, countryCodesWithVat } from '@diamantaire/shared/constants';

import { getIsUserInEu } from './getIsUserInEu';

export const shouldDisplayVat = (locale = DEFAULT_LOCALE) => {
  const code = locale.split('-').pop();

  return getIsUserInEu() && countryCodesWithVat.includes(code);
};
