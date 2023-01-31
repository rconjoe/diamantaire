const productOptionsMap = `
  query humanNamesMapper($locale: SiteLocale) {
    allHumanNamesMappers(locale: $locale, first: 100) {
      map {
        value
        key
      }
      title
    }
  }
`;

export default productOptionsMap;
