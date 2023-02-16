const allConfigurationsTextOnly = `
  query allConfigurationsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allConfigurations(first: $first, skip: $skip, locale: $locale) {
      id
      variantId
      plpTitle
      configuredProductOptionsInOrder
      shownWithCenterStone
      shape
      color
      clarity
      cut
      carat
      caratWeightOverride
      metal
      setting
      closure
      chainLength
      chainWidth
      posts
      diamondSize
      jacketLength
      bandWidth
      outerDiameter
      ringFace
      charm
      cordWidth
      depth
      origin
    }
  }
`;

export default allConfigurationsTextOnly;
