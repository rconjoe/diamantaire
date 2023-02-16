const allProductWaitlistsTextOnly = `
  query allProductWaitlistsTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allProductWaitlists(first: $first, skip: $skip, locale: $locale) {
      id
      waitlistCopy
      waitlistCtaCopy
    }
  }
`;

export default allProductWaitlistsTextOnly;
