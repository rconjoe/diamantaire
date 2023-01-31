const allTextOnlyBlocksTextOnly = `
  query allTextOnlyBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allTextOnlyBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      desktopCopy
      mobileCopy
      ctaCopy
      headingType
      headingAdditionalClass
    }
  }
`;

export default allTextOnlyBlocksTextOnly;
