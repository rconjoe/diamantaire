import { VAT_ENABLED_COUNTRIES } from '@diamantaire/shared/constants';

/**
 * Reduces a hash of VAT rates to only the enabled country codes
 * @param {object} vatRates - hash of vat multiplers with the country code as the key
 */
export default function getApplicableVatRates(vatRates) {
  if (!vatRates) {
    return {};
  }

  return VAT_ENABLED_COUNTRIES.reduce((validVatRates, countryCode) => {
    if (vatRates[countryCode]) {
      return { ...validVatRates, [countryCode]: vatRates[countryCode] };
    }

    return validVatRates;
  }, {});
}
