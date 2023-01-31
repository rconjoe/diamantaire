const allCelebrityJewelriesTextOnly = `
  query allCelebrityJewelriesTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allCelebrityJewelries(first: $first, skip: $skip, locale: $locale) {
      id
      itemName
      ctaCopy
    }
  }
`;

export default allCelebrityJewelriesTextOnly;
