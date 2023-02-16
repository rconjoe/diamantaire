const engagementRingSummaryPageTextOnly = `
  query engagementRingSummaryPageTextOnly($locale: SiteLocale){
    engagementRingSummaryPage(locale: $locale){
      id
      configuredOptionsInDisplayOrder {
        id
        label
        ctaCopy
      }
      ringSizeOptionCta
      ringSizeOptionCopy
      addEngravingOptionCta
      addEngravingOptionCopy
      removeEngravingOptionCta
      updateEngravingOptionCta
    }
  }
`;

export default engagementRingSummaryPageTextOnly;
