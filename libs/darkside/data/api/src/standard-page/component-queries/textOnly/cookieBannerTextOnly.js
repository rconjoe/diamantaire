const cookieBannerTextOnly = `
  query cookieBanner($locale: SiteLocale) {
    cookieBanner(locale: $locale) {
      id
      title
      text
      marketingCookiesCategoryName
      statisticsCookiesCategoryName
      essentialCookiesCategoryName
      customerSupportCookiesCategoryName
      acceptAllCtaText
      acceptSelectionCtaText
    }
  }
`;

export default cookieBannerTextOnly;
