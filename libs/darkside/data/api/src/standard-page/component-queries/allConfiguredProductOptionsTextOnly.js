const allConfiguredProductOptionsTextOnly = `
  query allConfiguredProductOptionsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allConfiguredProductOptions(first: $first, skip: $skip, locale: $locale) {
      id
      plpTitle
      shownWithCenterStone
      configuredProductOptionsInOrder
    }
  }
`;

export default allConfiguredProductOptionsTextOnly;
