const allOmegaProductsTextOnly = `
  query allOmegaProductsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allOmegaProducts(first: $first, skip: $skip, locale: $locale) {
      id
      plpTitle
      pdpSubTitle
      shopifyProductHandle
      shownWithCtw
      bandWidthOverride
      metalWeightOverride
      paveCaratWeightOverride
      caratWeightOverride
      color
      origin
      clarity
      shape
      dimensions
    }
  }
`;

export default allOmegaProductsTextOnly;
