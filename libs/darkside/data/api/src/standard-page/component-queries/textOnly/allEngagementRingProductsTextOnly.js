const allEngagementRingProductsTextOnly = `
  query allEngagementRingProductsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allEngagementRingProducts(first: $first, skip: $skip, locale: $locale) {
      id
      slug
      productTitle
      productDescription
      seoTitle
      seoDescription
      specBlockTitle
      bandWidth
      bandDepth
      settingHeight
      paveCaratWeight
      metalWeight
      shownWithCtwLabel
    }
  }
`;

export default allEngagementRingProductsTextOnly;
