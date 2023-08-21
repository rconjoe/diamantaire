export const DEFAULT_LOCALE = 'en-US';

export const countryRegions = {
  NorthAmerica: 'North America',
  Europe: 'Europe',
  AsiaPacific: 'Asia / Pacific',
  International: 'International',
};

export const Language = {
  English: 'en',
  French: 'fr',
  German: 'de',
  Spanish: 'es',
};

export type LanguageData = {
  name: string;
  code: string;
};

const supportedLanguages: LanguageData[] = [
  {
    name: 'English',
    code: Language.English,
  },
  {
    name: 'French',
    code: Language.French,
  },
  {
    name: 'German',
    code: Language.German,
  },
  {
    name: 'Spanish',
    code: Language.Spanish,
  },
];

export const languagesByCode = supportedLanguages.reduce((langMap: Record<string, LanguageData>, lang) => {
  langMap[lang.code] = lang;

  return langMap;
}, {});

export const Currency = {
  USDollars: 'USD',
  Euros: 'EUR',
  CanadianDollars: 'CAD',
  AustralianDollars: 'AUD',
  BritishPounds: 'GBP',
};

export type CountryDetails = {
  code: string;
  name: string;
  region: string;
  languages: string[];
  currency: string;
  vat?: number;
};

export const countries: Record<string, CountryDetails> = {
  CA: {
    code: 'CA',
    name: 'Canada',
    region: countryRegions.NorthAmerica,
    languages: [Language.English, Language.French],
    currency: Currency.CanadianDollars,
  },
  US: {
    code: 'US',
    name: 'United States',
    region: countryRegions.NorthAmerica,
    languages: [Language.English],
    currency: Currency.USDollars,
  },
  AT: {
    code: 'AT',
    name: 'Austria',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.German, Language.English],
    vat: 0.2,
  },
  BE: {
    code: 'BE',
    name: 'Belgium',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English, Language.French],
    vat: 0.21,
  },
  DK: {
    code: 'DK',
    name: 'Denmark',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.25,
  },
  FI: {
    code: 'FI',
    name: 'Finland',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.24,
  },
  FR: {
    code: 'FR',
    name: 'France',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.French, Language.English],
    vat: 0.2,
  },
  DE: {
    code: 'DE',
    name: 'Germany',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.German, Language.English],
    vat: 0.19,
  },
  IE: {
    code: 'IE',
    name: 'Ireland',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.23,
  },
  IT: {
    code: 'IT',
    name: 'Italy',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.22,
  },
  NL: {
    code: 'NL',
    name: 'Netherlands',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.21,
  },
  NO: {
    code: 'NO',
    name: 'Norway',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
  },
  PT: {
    code: 'PT',
    name: 'Portugal',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.23,
  },
  ES: {
    code: 'ES',
    name: 'Spain',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.Spanish, Language.English],
    vat: 0.21,
  },
  SE: {
    code: 'SE',
    name: 'Sweeden',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.25,
  },
  CH: {
    code: 'CH',
    name: 'Switzerland',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.German, Language.French, Language.English],
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    region: countryRegions.AsiaPacific,
    currency: Currency.AustralianDollars,
    languages: [Language.English],
  },
  JP: {
    code: 'JP',
    name: 'Japan',
    region: countryRegions.AsiaPacific,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
  SG: {
    code: 'SG',
    name: 'Singapore',
    region: countryRegions.AsiaPacific,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
  KR: {
    code: 'KR',
    name: 'South Korea 한국',
    region: countryRegions.AsiaPacific,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
  CN: {
    code: 'CN',
    name: 'Mainland China 中国大陆',
    region: countryRegions.AsiaPacific,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
  TW: {
    code: 'TW',
    name: 'Taiwan',
    region: countryRegions.AsiaPacific,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
  HK: {
    code: 'HK',
    name: 'Hong Kong 香港',
    region: countryRegions.AsiaPacific,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
  BG: {
    code: 'BG',
    name: 'Bulgaria',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.2,
  },
  CY: {
    code: 'CY',
    name: 'Cyprus',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.19,
  },
  CZ: {
    code: 'CZ',
    name: 'Czechia',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.21,
  },
  EE: {
    code: 'EE',
    name: 'Estonia',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.2,
  },
  GR: {
    code: 'GR',
    name: 'Greece',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.24,
  },
  HR: {
    code: 'HR',
    name: 'Croatia',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.25,
  },
  HU: {
    code: 'HU',
    name: 'Hungary',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.27,
  },
  LT: {
    code: 'LT',
    name: 'Lithuania',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.21,
  },
  LU: {
    code: 'LU',
    name: 'Luxembourg',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.16,
  },
  LV: {
    code: 'LV',
    name: 'Latvia',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.21,
  },
  MT: {
    code: 'MT',
    name: 'Malta',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.18,
  },
  PL: {
    code: 'PL',
    name: 'Poland',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.23,
  },
  RO: {
    code: 'RO',
    name: 'Romania',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.19,
  },
  SI: {
    code: 'SI',
    name: 'Slovania',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.22,
  },
  SK: {
    code: 'SK',
    name: 'Slovakia',
    region: countryRegions.Europe,
    currency: Currency.Euros,
    languages: [Language.English],
    vat: 0.2,
  },
  Int: {
    code: 'Int',
    name: 'International',
    region: countryRegions.International,
    currency: Currency.Euros,
    languages: [Language.English],
  },
};

export const availableLocales = Object.entries(countries).flatMap(
  ([countryCode, countryDetails]: [string, CountryDetails]) => {
    if (countryCode !== 'Int') {
      return countryDetails.languages.map((languageCode) => `${languageCode}-${countryCode}`);
    }

    return [];
  },
);

export const sortedCountriesByRegion = Object.values(countryRegions).reduce(
  (regionMap: Record<string, CountryDetails[]>, region) => {
    regionMap[region] = Object.values(countries)
      .filter((countryDetail) => countryDetail.region === region)
      .sort((a, b) => (a.name > b.name ? 1 : -1));

    return regionMap;
  },
  {},
);

/** LOCALES */

const LOCALE_REGEX = /^[a-z]{2}-[A-Z]{2}$/;

export function parseValidLocale(locale: string): { countryCode: string; languageCode: string } {
  if (!locale) return null;
  const [languageCode, countryCode] = locale.split('-');

  return { languageCode, countryCode };
}

export function isValidLocale(locale: string) {
  return RegExp(LOCALE_REGEX).test(locale);
}

export function generateLocale(languageCode: string, countryCode: string) {
  return `${languageCode}-${countryCode.toUpperCase()}`;
}

/** LANGUAGE **/

export function getPrimaryLanguage(countryCode: string): string {
  if (!countries[countryCode]) {
    return Language.English;
  }
  const languages = countries[countryCode].languages;

  return languages[0] || Language.English;
}

/** CURRENCY & TAX **/

export function getCurrencyFromLocale(locale: string) {
  const { countryCode } = parseValidLocale(locale);

  return getCurrency(countryCode);
}

export function getCurrency(countryCode: string): string {
  return countries[countryCode]?.currency;
}

export function getVat(countryCode: string): number | undefined {
  return countries[countryCode]?.vat;
}

export function getPriceWithVat(price: number, countryCode: string): number {
  const vat = getVat(countryCode);

  if (!vat) {
    return price;
  }

  return price * (1 + vat);
}

export function hasCentsValues(amount: number) {
  return amount % 100 === 0;
}

export function getFormattedPrice(priceInCents: number, countryCode: string, showZeroCents = false): string {
  const priceWithVatInCents = getPriceWithVat(priceInCents, countryCode);
  const decimalPlaces = hasCentsValues(priceWithVatInCents) && showZeroCents ? 2 : 0;

  const currency = getCurrency(countryCode);

  return `${(priceWithVatInCents / 100).toFixed(decimalPlaces)}`;
}
