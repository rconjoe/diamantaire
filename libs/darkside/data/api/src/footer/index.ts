import { queryDatoGQL } from '../clients';

const FOOTER_NAV_QUERY = `
    query footerNavigation($locale: SiteLocale) {
        footerNavigation(locale: $locale) {
            columns {
              title
              links {
                route
                copy
                flags
                supportedCountries {
                  code
                }
              }
            }
            emailSignUpColumn {
              ctaCopy
              copy
              title
            }
            emailSignUpCopy {
              emailInputPlaceholder
              emailInputEmpty
              emailInputNotValid
              emailInputBeingSent
              emailInputSuccessfullySent
              emailInputUnsuccessfullySent
              gdprOptInCopy
              gdprCtaCopy
              gdprCtaRoute
              optInCopy
              phoneInputPlaceholder
            }
            copyright
            countryPicker {
              ... on BasicTextLabelRecord {
                key
                copy
              }
              ... on CountryPickerColumnRecord {
                label
                countries
              
            }
          }
        }
    }
  `;

export async function fetchFooterData(locale: string) {
  const footerData = await queryDatoGQL({
    query: FOOTER_NAV_QUERY,
    variables: { locale },
  });

  return footerData;
}
