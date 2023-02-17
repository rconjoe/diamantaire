const announcementBar = `
  query announcementBar($locale: SiteLocale) {
    announcementBar(locale: $locale) {
      data {
        startDate
        endDate
        copy
        link
        hide
        color {
            hex
        }
        backgroundColor {
            hex
        }
        supportedCountries {
          code
          name
        }
      }
    }
  }
`;

export default announcementBar;
