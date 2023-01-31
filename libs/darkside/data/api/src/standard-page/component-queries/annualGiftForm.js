const annualGiftForm = `
  query annualGiftFormQuery($locale: SiteLocale) {
    annualGiftForm(locale: $locale) {
      title
      textInputLabel1
      textInputPlaceholder1
      radioLabel1
      radioOptions1 {
        key
        startRange
        endRange
      }
      radioLabel2
      radioOptions2 {
        key
        value
      }
      phoneInputPlaceholder
      ctaCopy
    }
  }
`;

export default annualGiftForm;
