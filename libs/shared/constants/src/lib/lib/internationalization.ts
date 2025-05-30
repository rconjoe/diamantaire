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

export const USDollarExchangeRates = {
  [Currency.USDollars]: 1,
  [Currency.Euros]: 0.98,
  [Currency.BritishPounds]: 0.859,
  [Currency.CanadianDollars]: 1.315,
  [Currency.AustralianDollars]: 1.352,
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
    languages: [Language.English],
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
    name: 'Sweden',
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
    currency: Currency.BritishPounds,
    languages: [Language.English],
    vat: 0.2,
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
    vat: 0.17,
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
  MX: {
    code: 'MX',
    name: 'Mexico',
    region: countryRegions.NorthAmerica,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    region: countryRegions.International,
    currency: Currency.USDollars,
    languages: [Language.English],
  },
};

export const countryCodesWithVat = Object.values(countries).reduce((a, v) => {
  if (v.vat) a.push(v.code);

  return a;
}, []);

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

export const getLocaleFromCountry = (countryCode) => {
  const country = countries?.[countryCode];
  const primaryLanguageCode = getPrimaryLanguage(countryCode);

  if (!country) {
    return 'en-US'; // Fallback to US English if country not found
  }

  return `${primaryLanguageCode}-${countryCode}`;
};

export const getCountryName = (countryCode: string) => {
  return countries[countryCode]?.name;
};

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

/**
 * Adds additional tax if applicable based on country code or returns original price
 * @param {number} price - amount to add tax to if applicable
 * @param {string} countryCode - country code to get tax rate
 * @returns {number} - price with tax added if applicable or original price
 */
export function getPriceWithAddedTax(price: number, countryCode: string): number {
  const vat = getVat(countryCode);

  if (!vat) {
    return price;
  }

  return price * (1 + vat);
}

/**
 * Checks if the amount provided has cents values
 * @param {number} amount - amount to check
 * @returns {boolean} - true if amount has cents values
 */
export function hasCentsValues(amount: number) {
  return amount % 100 === 0;
}

/**
 * Applies exchange rate to the amount provided
 * @param {number} amount - amount to apply exchange rate to
 * @param {string} currency - currency to get exchange rate
 * @param {boolean} excludeExchangeRate - should exclude exchange rate
 * @returns {number} - amount with exchange rate applied
 */
export function applyExchangeRate(amount: number, currency = 'USD', excludeExchangeRate = false) {
  const result = amount * USDollarExchangeRates[currency];

  if (currency === 'USD') {
    return result;
  }

  // We don't need to apply an exchange rate when shopify is providing the price in GBP
  if (excludeExchangeRate === true) {
    return amount;
  }

  // round up for international currencies
  return Math.ceil(result);
}

/**
 * Function to get the formatted price based on the locale
 * @param {number} priceInCents - USD price in cents
 * @param {string} locale - locale to format the price
 * @param {boolean} hideZeroCents - should show trailing 00 cents if price is a whole number
 * @param {boolean} excludeCurrency - should exclude currency symbol
 * @returns {string} - formatted price
 *
 * This is for when we want to add VAT + conversion
 */

export function getFormattedPrice(
  priceInCents: number,
  locale: string = DEFAULT_LOCALE,
  hideZeroCents = true,
  excludeCurrency = false,
  // When we return the item from VRAI server, we need the exchange rate. When shopify returns it in checkout, we don't
  excludeExchangeRate = false,
  quantity = 1,
): string {
  const { countryCode } = parseValidLocale(locale);

  const currency = getCurrency(countryCode);

  const convertedPrice = applyExchangeRate(priceInCents / 100, currency, excludeExchangeRate);

  let finalPrice = getPriceWithAddedTax(convertedPrice, countryCode);

  if (currency !== Currency.USDollars) {
    finalPrice = Math.ceil(finalPrice);
  }

  if (excludeCurrency) {
    return Number(finalPrice).toFixed(2);
  }

  // this is a hack to see proper CAD formatting
  // https://github.com/nodejs/node/issues/15265#issuecomment-776942859
  const customLocale = countryCode === 'ES' || countryCode === 'CH' ? 'de-DE' : locale === 'en-CA' || locale === 'fr-CA' ? 'en-US' : locale;

  const numberFormat = new Intl.NumberFormat(customLocale, {
    currency,
    style: 'currency',
    minimumFractionDigits: hideZeroCents ? 0 : 2,
    maximumFractionDigits: hideZeroCents ? 0 : 2,
  });

  // Intl.NumberFormat has no way to return the currency symbol in the right position, so we gotta do it
  let formattedPrice = numberFormat.format(finalPrice * quantity);

  let currencySymbol = formattedPrice.replace(/[0-9.,\s]/g, '');

  formattedPrice = formattedPrice.replace(currencySymbol, '');

  // Manually adding period to first gap in price if currency is EUR
  if (currency === 'EUR') {
    formattedPrice = formattedPrice.replace(' ', '.');
  }
  // Canada symbol
  if (countryCode === 'CA') {
    formattedPrice = formattedPrice.replace(/\s+/, ',');
  }

  // Australia symbol
  if (countryCode === 'AU') {
    currencySymbol = 'A' + currencySymbol;
  }

  formattedPrice = `${currencySymbol}${formattedPrice}`;

  return formattedPrice;
}

// We use this to format the price for multiple products that are combined, ex: a custom ER
// Best practice: get the base value with this, then use simpleFormatPrice to add the symbol
export function combinePricesOfMultipleProducts(prices, locale) {
  const { countryCode } = parseValidLocale(locale);
  const currency = getCurrency(countryCode);

  const totalPrice = prices.reduce((acc, price) => {
    // 1. Convert price
    const convertedPrice = applyExchangeRate(price / 100, currency, false);

    // 2. Add VAT
    const finalPrice = getPriceWithAddedTax(convertedPrice, countryCode);

    // Don't round up if the tenth is less than .5
    const isTenthLessThanHalf = checkTenthsLessThanHalf([finalPrice]);

    // Edge case: earrings pair
    const arePricesTheSame = prices.filter((p) => p === price).length > 1;

    // Add the transformed price to the accumulator
    return (
      acc +
      (locale !== 'en-US' && hasThreeZeros && !arePricesTheSame
        ? finalPrice
        : (locale === 'en-GB' && !isTenthLessThanHalf) || (locale !== 'en-US' && !isTenthLessThanHalf)
        ? Math.ceil(finalPrice)
        : !isTenthLessThanHalf
        ? Math.ceil(finalPrice)
        : // Round up to the nearest half if there are multiple prices and the locale is ES or DE
        prices.length > 1 && locale !== 'en-US'
        ? ceilToHalf(finalPrice)
        : finalPrice)
    );
  }, 0); // Initial value of the accumulator is 0

  return totalPrice * 100; // Now holds the sum of all transformed prices
}

function ceilToHalf(number) {
  const rounded = Math.ceil(number * 2) / 2;

  return rounded;
}

// Edge case where number is already whole number - Dedicated to G Money
function hasThreeZeros(num) {
  // Convert the number to a string
  const numStr = num.toString();

  // Check if the last three characters are '000'
  return numStr.endsWith('000');
}

function checkTenthsLessThanHalf(numbers) {
  return numbers.map((number) => {
    // Calculate the decimal part of the number
    const decimalPart = number - Math.floor(number);

    // Extract the tenths place by multiplying the decimal part by 10 and taking the floor
    const tenths = Math.floor(decimalPart * 10);

    // Check if the tenths place is less than 5 (since 0.5 * 10 = 5)
    return tenths < 5;
  });
}

// This is just for adding a symbol + decimals to the price. This does not add VAT or conversion rate!!!
export function simpleFormatPrice(
  priceInCents: number,
  locale: string = DEFAULT_LOCALE,
  hideZeroCents = true,
  cur?: string, // sometime you want a different currency than locale currency so you have this.
) {
  const { countryCode } = parseValidLocale(locale);
  const currency = cur || getCurrency(countryCode);

  const customLocale = countryCode === 'ES' || countryCode === 'CH' ? 'de-DE' : locale === 'en-CA' || locale === 'fr-CA' ? 'en-US' : locale;
  const numberFormat = new Intl.NumberFormat(customLocale, {
    currency,
    style: 'currency',
    minimumFractionDigits: hideZeroCents ? 0 : 2,
    maximumFractionDigits: hideZeroCents ? 0 : 2,
  });

  if (currency !== Currency.USDollars && currency !== Currency.BritishPounds) {
    priceInCents = Math.ceil(priceInCents);
  }

  let formattedPrice = numberFormat.format(priceInCents / 100);
  let currencySymbol = formattedPrice.replace(/[0-9.,\s]/g, '');

  formattedPrice = formattedPrice.replace(currencySymbol, '');

  // Manually adding period to first gap in price if currency is EUR
  if (currency === 'EUR') {
    formattedPrice = formattedPrice.replace(' ', '.');
  }

  // Canada symbol
  if (countryCode === 'CA') {
    formattedPrice = formattedPrice.replace(/\s+/, ',');
  }
  // Australia symbol
  if (countryCode === 'AU') {
    currencySymbol = 'A' + currencySymbol;
  }

  formattedPrice = `${currencySymbol}${formattedPrice}`;

  return formattedPrice;
}

export function getFormattedCarat(carat: number, locale: string = DEFAULT_LOCALE, digits?: number) {
  return Intl.NumberFormat(locale, {
    minimumFractionDigits: digits ? digits : 2,
    maximumFractionDigits: digits ? digits : 2,
  }).format(carat);
}

export function convertPriceToUSD(amountInCents: number, currency: string) {
  const rate = USDollarExchangeRates[currency];

  return Math.ceil(amountInCents / rate);
}

export function generateLanguageAlternates({ baseUrl = 'https://www.vrai.com', currentPath }) {
  const languageAlternates = [];

  // Add x-default at the beginning to always include it pointing to the base URL
  languageAlternates.push({ hrefLang: 'x-default', href: baseUrl + currentPath });

  const generalCases = {
    en: baseUrl,
    es: `${baseUrl}/es-ES`,
    de: `${baseUrl}/de-DE`,
  };

  // Add general language cases, appending currentPath where necessary
  Object.keys(generalCases).forEach((language) => {
    const href =
      generalCases[language] === baseUrl ? generalCases[language] + currentPath : generalCases[language] + currentPath;

    languageAlternates.push({ hrefLang: language, href });
  });

  // Add specific language-country combinations
  Object.values(countries).forEach((country) => {
    country.languages.forEach((language) => {
      const hrefLang = `${language}-${country.code}`;
      // Use the base URL directly for 'en-US', appending currentPath for others
      const href =
        country.code === 'US' && language === 'en'
          ? baseUrl + currentPath
          : `${baseUrl}/${language}-${country.code}${currentPath}`;

      languageAlternates.push({ hrefLang, href });
    });
  });

  // Filter to ensure no duplicate entries are added
  return languageAlternates.filter(
    (value, index, self) => index === self.findIndex((t) => t.hrefLang === value.hrefLang && t.href === value.href),
  );
}
