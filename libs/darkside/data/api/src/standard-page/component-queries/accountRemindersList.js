const accountRemindersList = `
  query accountRemindersList($locale: SiteLocale) {
    accountRemindersList(locale: $locale) {
      headerTitle
      headerSubtitleNoReminders
      headerSubtitleHasReminders
      newReminderCtaCopy
      editReminderCtaCopy
      removeReminderCtaCopy
      recipientNameLabel
      preferredCommunicationLabel
      dateLabel
      deleteConfirmationCopy
      deleteConfirmationNo
      deleteConfirmationYes
    }
  }
`;

export default accountRemindersList;
