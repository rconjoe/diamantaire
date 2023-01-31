const allCreativeBlocksTextOnly = `
  query allCreativeBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allCreativeBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      desktopCopy
      mobileCopy
      ctaCopy
    }
  }
`;

export default allCreativeBlocksTextOnly;
