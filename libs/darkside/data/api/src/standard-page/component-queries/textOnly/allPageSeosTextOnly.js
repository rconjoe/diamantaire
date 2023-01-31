const allPageSeosTextOnly = `
  query allPageSeosTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allPageSeos(first: $first, skip: $skip, locale: $locale) {
      id
      seoTitle
      seoDescription
    }
  }
`;

export default allPageSeosTextOnly;
