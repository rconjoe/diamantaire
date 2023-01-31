const headerNavigationTextOnly = `
  query headerNavigationTextOnly($locale: SiteLocale) {
    headerNavigation(locale: $locale){
      id
      desktopNavEngagementTitle
      loveEngagement {
        id
        columnTitle
      }
      desktopNavJewelryTitle
      fineJewelry {
        id
        columnTitle
      }
      desktopNavAboutTitle
      about {
        id
        columnTitle
      }
      mobileAccordionOrder {
        id
        label
      }
      mobileLocalizationAccordionOrder {
        id
        label
      }
    }
  }
`;

export default headerNavigationTextOnly;
