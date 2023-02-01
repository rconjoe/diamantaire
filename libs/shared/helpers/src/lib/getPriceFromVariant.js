import { addApplicableEuVat } from '@diamantaire/shared/helpers';
import { ALL_PAIR_ONLY_PRODUCT_SLUGS } from '@diamantaire/shared/constants';

// Return a price from a variant.
export const getPriceFromVariant = (variant = {}, currencyCode) => {
  let price;

  // if diamond
  const diamondVariant = variant?.variants?.all?.[0];
  const hasDiamond = Boolean(diamondVariant);

  if (hasDiamond) {
    price = Number.parseInt(diamondVariant?.price);
  } else {
    // This price is in pennies due to our ingestion. See shopifyNumber
    price = Number.parseInt(variant.price);
  }

  if (currencyCode && currencyCode != 'USD') {
    if (hasDiamond && diamondVariant?.presentmentPrices) {
      for (let i = 0; i < diamondVariant.presentmentPrices.length; i++) {
        if (
          currencyCode === diamondVariant.presentmentPrices[i].currencyCode &&
          diamondVariant.presentmentPrices[i].amount
        ) {
          // the presentmentPrices come through as floating point numbers,
          // so we must convert them to integers
          price = Number.parseInt(
            100 * Number.parseFloat(diamondVariant.presentmentPrices[i].amount)
          );
        }
      }
    } else if (variant.presentmentPrices) {
      for (let i = 0; i < variant.presentmentPrices.length; i++) {
        if (
          currencyCode === variant.presentmentPrices[i].currencyCode &&
          variant.presentmentPrices[i].amount
        ) {
          // the presentmentPrices come through as floating point numbers,
          // so we must convert them to integers
          price = Number.parseInt(
            100 * Number.parseFloat(variant.presentmentPrices[i].amount)
          );
        }
      }
    }
  }

  return price;
};

export const getVatEnabledPriceFromVariant = ({
  variant,
  currencyCode,
  countryCode,
  vatRates,
  includeVat = false,
}) => {
  let shopifyPrice = getPriceFromVariant(variant, currencyCode);

  if (includeVat && vatRates && countryCode) {
    // Add VAT when its applicable
    shopifyPrice = addApplicableEuVat(shopifyPrice, countryCode, vatRates);
  }
  const { slug } = variant || {};

  if (slug && ALL_PAIR_ONLY_PRODUCT_SLUGS.includes(slug)) {
    shopifyPrice = shopifyPrice * 2;
  }

  return shopifyPrice;
};

export const getPlpPriceFromVariant = ({
  variant,
  currencyCode,
  countryCode,
  vatRates,
  includeVat = false,
}) => {
  let shopifyPrice = getPriceFromVariant(variant, currencyCode);

  if (includeVat && vatRates && countryCode) {
    // Add VAT when its applicable
    shopifyPrice = addApplicableEuVat(shopifyPrice, countryCode, vatRates);
  }

  const { slug } = variant || {};

  if (slug && ALL_PAIR_ONLY_PRODUCT_SLUGS.includes(slug)) {
    shopifyPrice = shopifyPrice * 2;
  }

  return shopifyPrice;
};

export const getVatSubtractedShopifyNumber = ({
  shopifyNumber,
  countryCode,
  vatRates,
  includeVat = false,
}) => {
  if (includeVat && vatRates && countryCode) {
    // Add VAT when its applicable
    const vatEnabledShopifyNumber = addApplicableEuVat(
      shopifyNumber,
      countryCode,
      vatRates
    );

    return shopifyNumber - (vatEnabledShopifyNumber - shopifyNumber);
  }

  return shopifyNumber;
};
