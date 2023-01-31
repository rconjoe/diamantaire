const engravingOptionCopyTextOnly = `
  query engravingOptionCopyTextOnly($locale: SiteLocale) {
    engravingOptionCopy(locale: $locale) {
      id
      addEngravingOptionCopy
      addEngravingOptionCta
      currentEngravingCopy
      modifyEngravingCopy
      removeEngravingOptionCta
      updateEngravingOptionCta
    }
  }
`;

export default engravingOptionCopyTextOnly;
