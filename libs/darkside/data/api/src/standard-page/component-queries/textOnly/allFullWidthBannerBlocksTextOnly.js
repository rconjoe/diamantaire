const allFullWidthBannerBlocksTextOnly = `
  query allFullWidthBannerBlocksTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allFullWidthBannerBlocks(first: $first, skip: $skip, locale: $locale) {
      id
      title
      desktopCopy
      mobileCopy
      ctaCopy
    }
  }
`;

export default allFullWidthBannerBlocksTextOnly;
