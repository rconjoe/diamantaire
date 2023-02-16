const allWeddingBandProductsTextOnly = `
  query allWeddingBandProductsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allWeddingBandProducts(first: $first, skip: $skip, locale: $locale) {
      id
      slug
      productTitle
      productDescription
      seoTitle
      seoDescription
      specBlockTitle
      bandWidth
      bandDepth
      paveCaratWeight
      metalWeight
      shownWithCtwLabel
      optionList {
        id
        label
      }
    }
  }
`;

export default allWeddingBandProductsTextOnly;
