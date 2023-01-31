const EmailSignup = `
  ... on ModularEmailSignupBlockRecord {
    _modelApiKey
    id
    title
    copy
    ctaCopy
    enablePhoneField
    enablePhoneFieldTitle
    supportedCountries {
      code
      name
    }
  }
`;

export default EmailSignup;
