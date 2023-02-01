import {
  NECKLACE_PRODUCT_TYPE,
  EARRING_PRODUCT_TYPE,
  BRACELET_PRODUCT_TYPE,
  ENGAGEMENT_RING_PRODUCT_TYPE,
  RING_PRODUCT_TYPE,
  WEDDING_BAND_PRODUCT_TYPE,
  CARAT_OPTIONS_IN_HUMAN_NAMES,
} from '@diamantaire/shared/constants';

import formatRingSize from './formatRingSize';

const SPEC_ORDER = [
  'side',
  'shape',
  'paveCluster',
  'sideStoneShape',
  'sideStoneCarat',
  'metal',
  'bandAccent',
  'bandColor',
  'bandWidth',
  'ringSize',
  'diamondCount',
  'diamondOrientation',
  'caratWeight',
];

// Used for FF_DEV_LOCALES_ENABLED
export const DEV_LOCALES = {
  // Enter any languages only seen when DEV FF is enabled
  // e.g. fr: 'Français',
};

export const LOCALES = {
  en_US: 'English',
  de: 'Deutsch', // TODO: According to Mozilla, the locale for Germany should be de-DE. I am unsure how to resolve this mismatch.
  fr: 'Français',
  es: 'Español',
};

export const LOCALE_KEYS = Object.keys(LOCALES);

export const DEFAULT_LOCALE = 'en_US';

// Used for FF_DEV_LOCALE_ENABLED
export const DEV_LOCALES_BY_COUNTRY = {
  // Enter any languages only seen when DEV FF is enabled
  // e.g. CA: ['en_US', 'fr'],
  // e.g. FR: ['fr', 'en_US'],
  US: ['en_US', 'es'],
};

// Locales are dependant on country selected.
// Primary locales are the default locale for that country.
export const AVAILABLE_LOCALES_BY_COUNTRY = {
  CA: ['en_US', 'fr'],
  US: ['en_US'],
  AT: ['de', 'en_US'],
  BE: ['en_US', 'fr'],
  DK: ['en_US'],
  FI: ['en_US'],
  FR: ['fr', 'en_US'],
  DE: ['de', 'en_US'],
  IE: ['en_US'],
  IT: ['en_US'],
  NL: ['en_US'],
  NO: ['en_US'],
  PT: ['en_US'],
  ES: ['es', 'en_US'],
  SE: ['en_US'],
  CH: ['de', 'fr', 'en_US'],
  GB: ['en_US'],
  AU: ['en_US'],
  JP: ['en_US'],
  SG: ['en_US'],
  KR: ['en_US'],
  CN: ['en_US'],
  TW: ['en_US'],
  HK: ['en_US'],
  BG: ['en_US'],
  CY: ['en_US'],
  CZ: ['en_US'],
  EE: ['en_US'],
  GR: ['en_US'],
  HR: ['en_US'],
  HU: ['en_US'],
  LT: ['en_US'],
  LU: ['en_US'],
  LV: ['en_US'],
  MT: ['en_US'],
  PL: ['en_US'],
  RO: ['en_US'],
  SI: ['en_US'],
  SK: ['en_US'],
  Int: ['en_US'],
};

/**
 * Returns first element in array of available locales for the given country code
 * Defaults to 'en_US' if unavailable
 * @param {string} countryCode
 */
export function getPrimaryLocaleByCountryCode(countryCode) {
  const [
    primaryLocale,
    /* eslint-disable-next-line no-unused-vars */
    ...additionalLocales
  ] = getAvailableLocalesByCountryCode(countryCode);

  return primaryLocale || DEFAULT_LOCALE;
}

/**
 * Returns array of country locales mapped to the provided country code
 * Defaults to return ['en_US'] if cannot be found in map
 * @param {string} countryCode - country code (e.g. US or DE)
 */
export function getAvailableLocalesByCountryCode(
  countryCode,
  availableLocales = AVAILABLE_LOCALES_BY_COUNTRY
) {
  return availableLocales[countryCode] || [DEFAULT_LOCALE];
}

/**
 * Maps a key to a string object for localization.  Will attempt key in lowercase before fallingback to return key if mapped inital kay value not found..
 * @param {object} map - string map
 * @param {string} key - map key
 * @param {string} fallbackString - optional fallback string override (defaults to key value)
 * @returns {string} - returns mapped string or fallback string.
 */
export const mapStr = (map, key, fallbackString = key) => {
  if (!map) {
    return key;
  }

  return map[key] || map[String(key).toLowerCase()] || fallbackString;
};

/**
 * Replaces named placeholders with provided array of values. Will accept components as values to replace.
 * @param {string} placeholderString - string which includes placeholders
 * @param {*} placeHoldersArr - array of placeholders, e.g ['{{namedPlaceholder1}}, {{namedPlaceholder2}}]
 * @param {*} valuesArr - array of values to replace placeholders, e.g. [5, 'string value']
 * @returns {array} - returns array of strings and replaced values which can be rendered as JSX. If all values in valuesArr are strings, it will return a string
 */
export const replacePlaceholders = (string, placeHoldersArr, valuesArr) => {
  if (!placeHoldersArr || !valuesArr) {
    return string;
  }
  let strArr = [];
  let placeholderIndexArr = [0];

  // find index of where to slice string
  placeHoldersArr.forEach((placeholder) => {
    if (string) {
      const i = string.indexOf(placeholder);

      placeholderIndexArr.push(i);
      placeholderIndexArr.push(i + placeholder.length);
    }
  });

  // sort index then slice string
  placeholderIndexArr
    .sort((a, b) => a - b)
    .forEach((index, i) => {
      const start = index;
      const end = placeholderIndexArr[i + 1];

      strArr.push(string.slice(start, end));
    });

  // replace placeholder indexes with values
  placeHoldersArr.forEach((placeholder, i) => {
    const index = strArr.indexOf(placeholder);

    strArr[index] = valuesArr[i];
  });

  return valuesArr.every((s) => typeof s == 'string')
    ? strArr.join('')
    : strArr;
};

/**
 * Formats a number according to the provided locale string using Intl.NumberFormat.
 * @param {number} number - number which needs to be formatted
 * @param {string} locale - (BCP 47) locale to base the format on
 * @param {object} optoins - Intl formatting options
 * @returns {string} - formatted number as string
 */
export function formatNumber(
  number,
  locale = 'en',
  options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
) {
  const bcp47Locale = toBCP47LocaleTag(locale);

  return Intl.NumberFormat(bcp47Locale, options).format(number);
}

/**
 * Converts string to be BCP 47 formatted (https://www.techonthenet.com/js/language_tags.php)
 * @param {string} locale - locale string
 * @returns {string} - BCP 47 formatted locale string
 */
export function toBCP47LocaleTag(locale) {
  return locale.replace('_', '-');
}

export default { mapStr, replacePlaceholders };

/**
 * Provided a configuredProducts options, it will return an array of string each including ';' delimited product specs
 * @param {object} params - function params
 * @param {array} params.configuredProducts - array of configured products which include product options
 * @param {object} params.stringMaps - store string maps
 * @param {string} params.productType - product type product property
 * @param {string} params.locale - locale for specs (used for number formatting)
 */
export function getProductSpecsFromConfiguredProducts({
  configuredProducts,
  stringMaps,
  productType,
  locale,
}) {
  return configuredProducts.map((product) =>
    getProductSpecsFromOptions({
      options: product.options,
      stringMaps,
      productType,
      locale,
    })
  );
}

/**
 * Provided a options object, it will return an a ';' delimited product specs string.  (e.g. "Shape: Round; Carat Weight: 0.75ct")
 * @param {object} params - function params
 * @param {object} params.configuredProducts - array of configured products which include product options
 * @param {object} params.stringMaps - store string maps
 * @param {string} params.productType - product type product property
 * @param {string} params.locale - locale for specs (used for number formatting)
 */
export function getProductSpecsFromOptions(props) {
  const { options, stringMaps = {}, productType, locale } = props;

  const {
    OPTION_NAMES,
    METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES,
    METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES,
    BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES,
    DIAMOND_SHAPES,
    BAND_COLORS,
    SIDE_OPTIONS,
    DIAMOND_ORIENTATION,
    BAND_WIDTH,
    CARAT_WEIGHT_HUMAN_NAMES,
    PAVE_CLUSTER_SHAPES_HUMAN_NAMES,
  } = stringMaps;

  if (!options || !OPTION_NAMES || !productType) {
    return '';
  }
  const specs = {};

  let value, specKey;

  // Important, make sure key is also in SPEC_ORDER

  for (let key in options) {
    value = options[key];
    if (value) {
      switch (key) {
        case 'diamondType': {
          specKey = 'shape';
          if (DIAMOND_SHAPES) {
            specs[
              specKey
            ] = `${OPTION_NAMES[specKey]}: ${DIAMOND_SHAPES[value]}`;
          }
          break;
        }
        case 'paveCluster': {
          const mappedValue = PAVE_CLUSTER_SHAPES_HUMAN_NAMES[value];

          specs[key] = `${OPTION_NAMES['paveCluster']}: ${
            mappedValue ? mappedValue : value
          }`;

          break;
        }
        case 'metal': {
          let valueKey = value;

          if (
            options.specialMapKeySelectedMetal &&
            METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES
          ) {
            value = options.specialMapKeySelectedMetal;

            specs[key] = `${OPTION_NAMES[key]}: ${
              METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES[
                options.specialMapKeySelectedMetal
              ]
            }`;

            break;
          }
          // BUG where goldPurity is included with platinum
          if (options.goldPurity && value !== 'platinum') {
            valueKey = `${options.goldPurity} ${value}`;
          }
          if (METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES) {
            specs[
              key
            ] = `${OPTION_NAMES[key]}: ${METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES[valueKey]}`;
          }
          break;
        }
        case 'ringSize': {
          let additionalText = '';

          if (productType === NECKLACE_PRODUCT_TYPE) {
            // some Nechlaces may use ringSize as 'carat length'
            if (isCaratValue(value)) {
              specKey = 'carat weight';
              value = formatCaratString(value, locale);
            } else if (value === 'other') {
              break;
            } else {
              specKey = 'chain length';
              additionalText = '"'; // length measured in inches
            }
          } else if (productType === EARRING_PRODUCT_TYPE) {
            if (isCaratValue(value)) {
              specKey = 'carat weight';
              value = formatCaratString(value, locale);
            } else {
              specKey = 'hoop length';
            }
          } else if (productType === BRACELET_PRODUCT_TYPE) {
            specKey = 'size';
          } else if (
            productType === ENGAGEMENT_RING_PRODUCT_TYPE ||
            productType === RING_PRODUCT_TYPE ||
            productType === WEDDING_BAND_PRODUCT_TYPE
          ) {
            value = formatRingSize(value, locale);
            specKey = 'ring size';
          } else {
            break;
          }
          specs[
            'ringSize'
          ] = `${OPTION_NAMES[specKey]}: ${value}${additionalText}`;
          break;
        }
        case 'bandAccent': {
          if (BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES) {
            specs[
              key
            ] = `${OPTION_NAMES['band']}: ${BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES[value]}`;
          }
          break;
        }
        case 'sideStoneCarat': {
          const formattedCarats = formatCaratString(value, locale);

          specs[
            key
          ] = `${OPTION_NAMES['side stone carat']}: ${formattedCarats}`;
          break;
        }
        case 'sideStoneShape': {
          if (DIAMOND_SHAPES) {
            specs[
              key
            ] = `${OPTION_NAMES['side stone shape']}: ${DIAMOND_SHAPES[value]}`;
          }
          break;
        }
        case 'bandColor': {
          if (BAND_COLORS) {
            specs[key] = `${OPTION_NAMES['band color']}: ${BAND_COLORS[value]}`;
          }
          break;
        }
        case 'caratWeight': {
          if (
            CARAT_WEIGHT_HUMAN_NAMES &&
            CARAT_WEIGHT_HUMAN_NAMES[value] !== 'other'
          ) {
            if (productType === ENGAGEMENT_RING_PRODUCT_TYPE) {
              specs[
                key
              ] = `${OPTION_NAMES['centerstone']}: ${CARAT_WEIGHT_HUMAN_NAMES[value]} ct, I-J, VS+`;
            } else {
              specs[
                key
              ] = `${OPTION_NAMES['carat weight']}: ${CARAT_WEIGHT_HUMAN_NAMES[value]} ctw`;
            }
          }
          break;
        }
        case 'bandWidth': {
          //e.g. "0.01ct"
          const mappedValue = BAND_WIDTH[value];

          specs[key] = `${OPTION_NAMES['band width']}: ${
            mappedValue ? mappedValue : value
          }`;
          break;
        }
        case 'side': {
          if (SIDE_OPTIONS) {
            specs[key] = `${OPTION_NAMES['side']}: ${SIDE_OPTIONS[value]}`;
          }
          break;
        }
        case 'diamondCount': {
          specs[key] = `${OPTION_NAMES['diamond count']}: ${value}`;
          break;
        }
        case 'diamondOrientation': {
          if (DIAMOND_ORIENTATION) {
            specs[
              key
            ] = `${OPTION_NAMES['diamondOrientation']}: ${DIAMOND_ORIENTATION[value]}`;
          }
        }
      }
    }
  }

  return orderAndFlattenSpecs(specs);
}

function orderAndFlattenSpecs(specs, orderArr = SPEC_ORDER, separator = ';') {
  return orderArr
    .map((specKey) => specs[specKey])
    .filter(Boolean)
    .join(separator);
}

function parseCaratValue(str) {
  return parseFloat(str.replace('ct', ''));
}

export function formatCaratString(
  str,
  locale = 'en_US',
  caratOptions = CARAT_OPTIONS_IN_HUMAN_NAMES
) {
  if (!str) {
    return str;
  }

  const mappedCaratValue = caratOptions[str];

  // For English we want to show '1/10ct' instead of '0.10ct';
  if (locale === 'en_US' && mappedCaratValue) {
    return mappedCaratValue;
  }

  // For a full carat do not return decimal
  if (str === '1.0ct') {
    return '1ct';
  }

  return `${formatNumber(parseCaratValue(str), locale)}ct`;
}

function isCaratValue(str) {
  return str.includes('ct');
}
