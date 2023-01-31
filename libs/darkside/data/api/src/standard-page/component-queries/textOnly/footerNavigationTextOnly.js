import {
  modularBasicTextLabelBlockTextOnly,
  modularCountryPickerColumnBlockTextOnly,
} from './modular';

const footerNavigationTextOnly = `
  query footerNavigationTextOnly($locale: SiteLocale) {
    footerNavigation(locale: $locale){
      id
      columns {
        id
        title
      }
      emailSignUpColumn {
        id
        title
        copy
        ctaCopy
        optInCopy
      }
      copyright
      emailSignUpCopy {
        emailInputPlaceholder
        emailInputEmpty
        emailInputNotValid
        emailInputBeingSent
        emailInputSuccessfullySent
        emailInputUnsuccessfullySent
        gdprOptInCopy
        gdprCtaCopy
      }
      countryPicker {
        ${modularBasicTextLabelBlockTextOnly},
        ${modularCountryPickerColumnBlockTextOnly},
      }
    }
  }
`;

export default footerNavigationTextOnly;
