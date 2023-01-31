const allProductSuggestionQuadBlocksTextOnly = `
  query allProductSuggestionQuadBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allProductSuggestionQuadBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      content {
        id
        aboveCopy
        title1
        title2
        title3
        title4
      }
    }
  }
`;

export default allProductSuggestionQuadBlocksTextOnly;
