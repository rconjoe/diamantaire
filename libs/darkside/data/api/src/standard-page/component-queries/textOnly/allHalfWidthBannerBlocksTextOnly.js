const allHalfWidthBannerBlocksTextOnly = `
  query allHalfWidthBannerBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allHalfWidthBannerBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      desktopCopy
      mobileCopy
      ctaCopy
    }
  }
`;

export default allHalfWidthBannerBlocksTextOnly;
