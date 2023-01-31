const allNavigationLinksTextOnly = `
  query allNavigationLinksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allNavigationLinks(first: $first, skip: $skip, locale: $locale) {
      id
      copy
    }
  }
`;

export default allNavigationLinksTextOnly;
