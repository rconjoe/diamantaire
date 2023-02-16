const allJewelryPdpCtasTextOnly = `
  query allJewelryPdpCtasTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allJewelryPdpCtas(first: $first, skip: $skip, locale: $locale) {
      id
      addToBagCtaCopy
      outOfStockCtaCopy
      diamondPageFlowCtaCopy
      diamondPairFlowCtaCopy
    }
  }
`;

export default allJewelryPdpCtasTextOnly;
