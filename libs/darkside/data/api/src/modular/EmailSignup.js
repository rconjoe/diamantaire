const EmailSignup = `
  ... on ModularEmailSignupBlockRecord {
    _modelApiKey
    id
    title
    headingType
    headingAdditionalClass
    copy
    ctaCopy
    enablePhoneField
    enablePhoneFieldTitle
    supportedCountries {
      code
      name
    }
    enableStackedView
    additionalClass
    emailList {
      source
      listId
      sfdcCampaignId
    }
  }
`;

export default EmailSignup;
