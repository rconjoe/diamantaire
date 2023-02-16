const allJewelryProductsTextOnly = `
  query allJewelryProductsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allJewelryProducts(first: $first, skip: $skip, locale: $locale) {
      id
      slug
      category
      productTitle
      productDescription
      diamondDescription
    }
  }
`;

export default allJewelryProductsTextOnly;
