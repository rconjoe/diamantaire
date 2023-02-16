const allHumanNamesMappersTextOnly = `
  query allHumanNamesMappersTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allHumanNamesMappers(first: $first, skip: $skip, locale: $locale) {
      id
      map {
        id
        value
      }
    }
  }
`;

export default allHumanNamesMappersTextOnly;
