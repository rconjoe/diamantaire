import { formatNumber, DEFAULT_LOCALE } from './language';

/**
 * Takes a ring size string and reformats it for a different locale if possible.
 * Ignores en_US locale since it is assumed to be provided correctly
 * Returns original string if a NaN value or number range is provided
 * @param {string} ringSizeString - ringSize
 * @param {string} locale - locale ISO
 */
function formatRingSize(ringSizeString, locale = DEFAULT_LOCALE) {
  // ring sizes are entered in en_US, no need to reformat
  if (locale === DEFAULT_LOCALE) {
    return ringSizeString;
  }

  // Some ring sizes should not be parsed as numbers and canno tbe converted
  if (typeof ringSizeString === 'string') {
    if (
      ringSizeString.includes('-') ||
      Number.isNaN(parseFloat(ringSizeString))
    ) {
      return ringSizeString;
    }
  }

  return formatNumber(parseFloat(ringSizeString), locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });
}

export default formatRingSize;
