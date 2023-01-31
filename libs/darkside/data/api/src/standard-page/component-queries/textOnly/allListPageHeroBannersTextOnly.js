const allListPageHeroBannersTextOnly = `
  query allListpageHeroBannersTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allListpageHeroBanners(first: $first, skip: $skip, locale: $locale) {
      id
      title
      copy
    }
  }
`;

export default allListPageHeroBannersTextOnly;
