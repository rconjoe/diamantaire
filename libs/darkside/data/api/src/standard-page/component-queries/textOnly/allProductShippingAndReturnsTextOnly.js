const allProductShippingAndReturnsTextOnly = `
  query allProductShippingAndReturnsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allProductShippingAndReturns(first: $first, skip: $skip, locale: $locale) {
      id
      copy
      shippingType
    }
  }
`;

export default allProductShippingAndReturnsTextOnly;
