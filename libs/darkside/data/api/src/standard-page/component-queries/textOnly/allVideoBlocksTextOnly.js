const allVideoBlocksTextOnly = `
  query allVideoBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allVideoBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      copy
    }
  }
`;

export default allVideoBlocksTextOnly;
