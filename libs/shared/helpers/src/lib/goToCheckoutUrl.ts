import { parseValidLocale } from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import Cookies from 'js-cookie';
import { default as URI } from 'jsuri';

import { toBCP47LocaleTag } from './currency';

interface Consent {
  marketing?: boolean;
  statistics?: boolean;
  preferences?: boolean;
}

interface CheckoutUrlParams {
  checkoutUrl: string;
  locale: string;
  consent: Consent;
  email?: string;
}

const goToCheckoutUrl = ({ checkoutUrl, locale, consent, email }: CheckoutUrlParams) => {
  const isUserInEu = getIsUserInEu();
  const didAcceptPrivacy = Cookies.get('didAcceptPrivacy') === 'true';
  const url = new URI(checkoutUrl);
  const shouldAddEmailParam =
    email && (!isUserInEu || (isUserInEu && didAcceptPrivacy && consent?.marketing && consent?.statistics));
  const { countryCode } = parseValidLocale(locale);

  if (url.host().includes('vo-live.myshopify.com')) {
    url.setHost('vrai.com');
  }
  if (countryCode && countryCode !== 'US') {
    url.addQueryParam('country', countryCode);
  }
  if (locale) {
    url.addQueryParam('locale', toBCP47LocaleTag(locale));
  }
  if (shouldAddEmailParam) {
    url.addQueryParam('checkout[email]', email);
  }
  if (isUserInEu && consent) {
    // User in EU has interacted with the cookie banner
    if (didAcceptPrivacy) {
      if (!consent.marketing) {
        url.addQueryParam('marketing', 'false');
      }
      if (!consent.statistics) {
        url.addQueryParam('statistics', 'false');
      }
      if (!consent.preferences) {
        url.addQueryParam('customerSupport', 'false');
      }
    } else {
      // User in EU but did not interact with the cookie banner
      url.addQueryParam('marketing', 'false');
      url.addQueryParam('statistics', 'false');
      url.addQueryParam('customerSupport', 'false');
    }
  }

  const checkoutUrlString = url.toString();

  // For testing
  window.open(checkoutUrlString, '_blank');

  // window.location = checkoutUrlString;
};

export default goToCheckoutUrl;

export { goToCheckoutUrl };
