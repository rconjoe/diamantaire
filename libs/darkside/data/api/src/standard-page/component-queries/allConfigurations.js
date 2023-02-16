const allConfigurations = `
  query queryAllConfigurations($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allConfigurations(first: $first, skip: $skip, locale: $locale) {
      id
      configuredProductOptionsInOrder
      color
      clarity
      chainWidth
      chainLength
      carat
      caratWeightOverride
      closure
      diamondCount
      diamondSize
      jacketLength
      metal
      posts
      setting
      shape
      shownWithCenterStone
      bandWidth
      depth
      trioBlocks {
        id
      }
      productIconList {
        id
      }
      jewelryProduct {
        id
      }
    }
  }
`;

export default allConfigurations;
