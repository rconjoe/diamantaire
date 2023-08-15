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
  }
`;

export default EmailSignup;
