const allAnnouncementBarInfosTextOnly = `
  query allAnnouncementBarInfosTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allAnnouncementBarInfos(first: $first, skip: $skip, locale: $locale) {
      id
      title
      copy
    }
  }
`;

export default allAnnouncementBarInfosTextOnly;
