const allQuoteBlocksTextOnly = `
  query allQuoteBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allQuoteBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      quote
      attribution
    }
  }
`;

export default allQuoteBlocksTextOnly;
