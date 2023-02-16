const allDiamondContentBlocksTextOnly = `
  query allDiamondContentBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allDiamondContentBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      diamondBlockTitle
      diamondBlockText
    }
  }
`;

export default allDiamondContentBlocksTextOnly;
