const annualGifting = `
  query annualGiftingQuery($locale: SiteLocale) {
    annualGifting(locale: $locale) {
      subscriptionFormTitle
      subscriptionFormCopy
      customerNameLabel
      customerEmailLabel
      customerPhoneLabel
      recipientFormTitle
      recipientNameLabel
      occasionLabel
      dateLabel
      budgetLabel
      budgetOptions {
        key
        startRange
        endRange
      }
      recipientAddressLine1Label
      recipientAddressLine2Label
      recipientCityLabel
      recipientStateLabel
      recipientCountryLabel
      recipientPostalCodeLabel
      messageLabel
      ctaCopy
    }
  }
`;

export default annualGifting;
