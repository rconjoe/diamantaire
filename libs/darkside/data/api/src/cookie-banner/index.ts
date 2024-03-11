import { getIsUserInEu } from '@diamantaire/shared/geolocation';

import { queryDatoGQL } from '../clients';

const COOKIE_BANNER_QUERY = `
  query cookieBanner($locale: SiteLocale) {
    cookieBanner(locale: $locale) {
      title
      text
      essentialCookiesCategoryName
      statisticsCookiesCategoryName
      marketingCookiesCategoryName
      customerSupportCookiesCategoryName
      acceptAllCtaText
      acceptSelectionCtaText
    }
  }
  `;

export async function fetchCookieBannerData(locale: string) {
  const cookieBannerData = getIsUserInEu()
    ? await queryDatoGQL({
        query: COOKIE_BANNER_QUERY,
        variables: { locale },
      })
    : {};

  return cookieBannerData;
}
