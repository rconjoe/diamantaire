const allProductIconListsTextOnly = `
  query allProductIconListsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allProductIconLists(first: $first, skip: $skip, locale: $locale) {
      id
      items {
        ... on ModularProductIconListItemRecord {
          id
          copy
          ctaCopy
        }
        ... on ModularShippingProductIconListItemRecord {
          id
          shippingText
          staticText
          shippingBusinessDaysCountryMap
        }
      }
    }
  }
`;

export default allProductIconListsTextOnly;
