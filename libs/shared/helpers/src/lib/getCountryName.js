import { COUNTRY_CODES } from '../helpers/constants';

export default function getCountryName(countryCode) {
  const COUNTRY_NAMES = Object.keys(COUNTRY_CODES);

  for (let i = 0; i < COUNTRY_NAMES.length; i++) {
    if (COUNTRY_CODES[COUNTRY_NAMES[i]] === countryCode) {
      return COUNTRY_NAMES[i];
    }
  }

  return 'International';
}
