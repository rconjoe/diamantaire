const allCelebrityBlocksTextOnly = `
  query allCelebrityBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allCelebrityBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      copy
    }
  }
`;

export default allCelebrityBlocksTextOnly;
