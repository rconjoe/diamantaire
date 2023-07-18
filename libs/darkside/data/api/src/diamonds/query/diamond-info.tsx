export const DIAMOND_INFO_QUERY = `
query diamondInfoQuery($locale: SiteLocale) {
  additionalInfo(locale: $locale) {
    title
    text
    image {
      alt
      url
    }
  }
}`;
