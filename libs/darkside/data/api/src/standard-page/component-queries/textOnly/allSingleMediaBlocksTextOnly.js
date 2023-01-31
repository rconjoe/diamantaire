const allSingleMediaBlocksTextOnly = `
  query allSingleMediaBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allSingleMediaBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      copy
      ctaCopy
    }
  }
`;

export default allSingleMediaBlocksTextOnly;
