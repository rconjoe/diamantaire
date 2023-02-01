import { default as URI } from 'jsuri';
import { DEFAULT_LOCALE, toBCP47LocaleTag } from '@diamantaire/shared/helpers';

export function cleanProductionCheckoutUrl(
  checkoutUrlStr,
  checkoutFlow,
  privacy = {},
  countryCode,
  locale = DEFAULT_LOCALE
) {
  const checkoutUrl = new URI(checkoutUrlStr);

  if (checkoutUrl.host().includes('vo-live.myshopify.com')) {
    checkoutUrl.setHost('vrai.com');
  }

  checkoutUrl.addQueryParam('source', 'vo20');

  if (checkoutFlow) {
    checkoutUrl.addQueryParam('checkoutFlow', checkoutFlow);
  }

  // Pass the user's privacy settings on to Shopify via URL params.
  if (privacy.hasSetPrivacyPreferences) {
    if (!privacy.marketing) {
      checkoutUrl.addQueryParam('marketing', 'false');
    }
    if (!privacy.statistics) {
      checkoutUrl.addQueryParam('statistics', 'false');
    }
    if (!privacy.customerSupport) {
      checkoutUrl.addQueryParam('customerSupport', 'false');
    }
  }

  if (countryCode && countryCode !== 'US') {
    checkoutUrl.addQueryParam('country', countryCode);
  }

  // Add locale to checkout url so shopify can display the right language
  // Shopify will use BCP47 locale format (en-US instead of en_US)
  if (locale) {
    checkoutUrl.addQueryParam('locale', toBCP47LocaleTag(locale));
  }

  return checkoutUrl.toString();
}

export default function goToCheckoutUrl({
  checkoutUrl,
  checkoutFlow,
  privacy = {},
  countryCode,
  locale,
}) {
  const shopifyCheckoutUrl = cleanProductionCheckoutUrl(
    checkoutUrl,
    checkoutFlow,
    privacy,
    countryCode,
    locale
  );

  window.location = shopifyCheckoutUrl;
}
