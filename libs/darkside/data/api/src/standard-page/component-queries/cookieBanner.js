const cookieBanner = `
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

export default cookieBanner;
