const ringSizeOptionCopyTextOnly = `
  query ringSizeOptionCopyTextOnly($locale: SiteLocale) {
    ringSizeOptionCopy(locale: $locale) {
      id
      ringSizeOptionCopy
      ringSizeOptionCta
    }
  }
`;

export default ringSizeOptionCopyTextOnly;
