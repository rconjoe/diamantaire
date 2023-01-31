const allDiamondShapeSpecsTextOnly = `
  query allDiamondShapeSpecsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allDiamondShapeSpecs(first: $first, skip: $skip, locale: $locale) {
      id
      diamondShape
      diamondShapeText
    }
  }
`;

export default allDiamondShapeSpecsTextOnly;
