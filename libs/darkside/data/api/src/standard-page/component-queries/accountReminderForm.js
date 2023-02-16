const accountReminderForm = `
  query accountReminderForm($locale: SiteLocale) {
    accountReminderForm(locale: $locale) {
      instructions
      occasionLabel
      dateLabel
      recipientNameLabel
      preferredCommunicationLabel
      phonePlaceholder
      recipientNamePlaceholder
      datePlaceholder
      saveCtaCopy
      errorCopy
      otherOccasionPlaceholder
      preferredCommunicationOptions {
        key
        value
      }
      occasionOptions {
        key
        value
      }
    }
  }
`;

export default accountReminderForm;
