const allProductTypeFaqsTextOnly = `
  query allProductTypeFaqsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allProductTypeFaqs(first: $first, skip: $skip, locale: $locale) {
      id
      faqTitle
    }
  }
`;

export default allProductTypeFaqsTextOnly;
