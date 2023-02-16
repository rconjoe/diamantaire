const allFaqAccordionContentsTextOnly = `
  query allFaqAccordionContentsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allFaqAccordionContents(first: $first, skip: $skip, locale: $locale) {
      id
      title
      content
    }
  }
`;

export default allFaqAccordionContentsTextOnly;
