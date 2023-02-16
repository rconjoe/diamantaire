const allTrioBlocksTextOnly = `
  query allTrioBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allTrioBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      aboveCopy
      belowCopy
      headingType
      headingAdditionalClass
    }
  }
`;

export default allTrioBlocksTextOnly;
