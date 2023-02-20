const blogHeader = `
  query blogHeader($locale: SiteLocale) {
    blogHeader(locale: $locale) {
      title
      links {
        ... on NavigationLinkRecord {
          _modelApiKey
          id
          copy
          route
          isBold
          linkKey
          flags
          nestedLinks {
            id
            copy
            route
            isBold
          }
        }
      }
    }
  }
`;

export default blogHeader;
