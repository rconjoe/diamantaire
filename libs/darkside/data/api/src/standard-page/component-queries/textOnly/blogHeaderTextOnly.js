const blogHeaderTextOnly = `
  query blogHeader($locale: SiteLocale) {
    blogHeader(locale: $locale) {
      id
      title
    }
  }
`;

export default blogHeaderTextOnly;
