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
  const cookieBannerData = await queryDatoGQL({
    query: COOKIE_BANNER_QUERY,
    variables: { locale },
  });

  return cookieBannerData;
}
