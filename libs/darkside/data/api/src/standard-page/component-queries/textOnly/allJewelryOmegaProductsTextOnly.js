const allJewelryOmegaProductsTextOnly = `
  query allJewelryOmegaProductsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allJewelryOmegaProducts(first: $first, skip: $skip, locale: $locale) {
      id
      slug
      category
      productTitle
      productDescription
      productSpecifications
    }
  }
`;

export default allJewelryOmegaProductsTextOnly;
