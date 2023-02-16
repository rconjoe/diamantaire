/**
 * Helper function for pricing and currency related operations
 */

/**
 * Given a shopify price number and localization values, it will return a properly formatted price string
 * @param {integer|float} shopifyNumber
 * @param {string} locale
 * @param {string} currencyCode
 * @param {string} countryCode
 * @param {object} vatRates
 * @param {bool} includeVat
 * @returns {string} Human readable formatted price
 */

export const shopifyNumberToHumanPrice = (
  shopifyNumber,
  locale,
  currencyCode,
  countryCode,
  vatRates,
  includeVat = false,
  excludeCurrency = false,
  round,
) => {
  let shopifyPrice = Number.isInteger(shopifyNumber) ? shopifyNumberToShopifyPrice(shopifyNumber) : shopifyNumber;

  if (includeVat && vatRates && countryCode) {
    // Add VAT when its applicable
    shopifyPrice = addApplicableEuVat(shopifyPrice, countryCode, vatRates);
  }

  // Only converted prices should be rounded up
  if (currencyCode && currencyCode !== 'USD') {
    shopifyPrice = Math.ceil(shopifyPrice);
  }

  if (round === 'shouldRoundUp') {
    shopifyPrice = Math.ceil(shopifyPrice / 100) * 100;
  }

  if (round === 'shouldRoundDown') {
    shopifyPrice = Math.floor(shopifyPrice / 100) * 100;
  }

  if (excludeCurrency) {
    return Number(shopifyPrice).toFixed(2);
  }

  const formattedPrice = makeCurrency(shopifyPrice, locale, currencyCode);

  return formattedPrice;
};

// Converts shopify price format to include decimal amount
export function shopifyNumberToShopifyPrice(num) {
  return (parseFloat(num) / 100).toFixed(2);
}

export function shopifyNumberNoDecimalToShopifyPrice(num) {
  return num / 100;
}

export function shopifyPriceToShopifyNumber(num) {
  return num * 100;
}

/**
 * Uses JS built-in Internationalization module to format currency
 * @param {float|integer} price
 * @param {string} locale
 * @param {string} currencyCode
 */

export function makeCurrency(price, locale = 'en-US', currencyCode = 'USD') {
  const currencyLocale = checkLocale(toBCP47LocaleTag(locale), currencyCode);

  // in built JS currency formatter
  const formatter = new Intl.NumberFormat(currencyLocale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: currencyCode === 'USD' ? 2 : 0, // USD prices are the only ones with cents.  e.g. Ring sizers are $4.50
    maximumFractionDigits: 2,
  });

  const formattedPrice = dropZeroCents(formatter.format(price), currencyCode);

  return formattedPrice;
}

/**
 * Formats price for display by dropping 00 cents (USD only)
 * @param {string} price
 * @param {string} [currencyCode='USD'] - Currency code
 */

export function dropZeroCents(price, currencyCode = 'USD') {
  // Drop cents if its 00 for NON EUR prices
  if (currencyCode !== 'EUR') {
    const [dollars, cents] = price.split('.');

    const isOnlyDollarAmount = cents && cents === '00';

    if (isOnlyDollarAmount) {
      return dollars;
    }
  }

  return price;
}

// This helper method is for forcing the locale to something else in some situations.
function checkLocale(locale, currencyCode) {
  // If the user wants to see Euros, then they need the currency formatted as it is in Europe: 1.000,00
  // JS Intl API will move the currency symbol depending on the locale.  We always want EUR to be: € 1.470
  if (currencyCode === 'EUR') {
    return 'nl-NL';
  }

  return locale;
}

/**
 * Adds Vat rates based on shipping country.  If no valid vat is provided, returns input price
 * @param {float} price - Product price
 * @param {string} countryCode - (e.g. US or DE)
 * @param {object} vatRates - Country code to Vat map (e.g. DE: 1.25 )
 */

export function addApplicableEuVat(price, countryCode, vatRates) {
  const countryVat = vatRates[countryCode];

  if (countryVat) {
    return price * countryVat;
  } else {
    return price;
  }
}

/**
 * Parses a string for a currency symbol / value and replace it with a formatted currency value based on
 * the currency provided.  It will parse $,€,£ with and without a space between the symbol and value.
 * It will also replace a placeholder of '%%value%%'.
 * @param {string} str - string which will be parsed
 * @param {string} currencyCode - currency in which the output will be formatted to
 * @param {object} valueMap - map for determining specific currency value
 */

export function replaceMoneyByCurrency(str, currencyCode = 'USD', valueMap) {
  if (!valueMap) {
    return str;
  }
  let finalStr = str;
  const currencyValue = str.match(/%%value%%/) || str.match(/[$|€|£]+ ?[0-9]+\.?[0-9]{2}?/);
  const newValue = valueMap[currencyCode];

  if (currencyValue && newValue) {
    const [value] = currencyValue;
    const formatterValue = makeCurrency(newValue, currencyCode === 'EUR' ? 'nl-NL' : 'en-US', currencyCode);

    finalStr = str.replace(value, formatterValue);
  }

  return finalStr;
}

/**
 * Given a shopify price number and localization values, it will return a properly formatted price string
 * @param {integer|float} shopifyNumber
 * @param {string} countryCode
 * @param {object} vatRates
 * @param {bool} includeVat
 * @returns {number}
 */

export const shopifyNumberAddApplicableEuVat = ({
  shopifyNumber,
  countryCode,
  vatRates,
  shouldIncludeVat = false,
  round,
}) => {
  let shopifyPrice = Number(shopifyNumber);

  if (shouldIncludeVat && vatRates && countryCode) {
    // Add VAT when its applicable
    shopifyPrice = addApplicableEuVat(shopifyPrice, countryCode, vatRates);
  }
  if (round === 'shouldRoundUp') {
    shopifyPrice = Math.ceil(shopifyPrice / 100) * 100;
  }

  if (round === 'shouldRoundDown') {
    shopifyPrice = Math.floor(shopifyPrice / 100) * 100;
  }

  return shopifyPrice;
};

export function toBCP47LocaleTag(locale) {
  return locale.replace('_', '-');
}
