export async function fetchGlobalTemplateData(locale: string) {
  // TODO: need logic for this to work with journal
  let reqUrl = `api/template/global?locale=${locale}`;

  if (typeof window === 'undefined') {
    reqUrl = `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}/${reqUrl}`;
  } else {
    reqUrl = `${window.location.origin}/${reqUrl}`;
  }
  const response = await fetch(reqUrl);

  return response.json();
}

export const GLOBAL_TEMPLATE_QUERY = `
query headerNavigationDynamicQuery($locale: SiteLocale) {
    headerNavigationDynamic(locale: $locale) {
      section {
        title
        key
        route
        columns {
          columnTitle
          route
          colKey
          links {
            _modelApiKey
            id
            copy
            route
            isBold
            linkKey
            flags
            nestedLinks {
              id
              copy
              route
              isBold
            }
            supportedCountries {
              code
            }
          }
        }
      }
      mobileAccordionOrder {
        key
        label
        isCollapsible
      }
      mobileLocalizationAccordionOrder {
        key
        isCollapsible
        label
      }
      iconsAltText {
        key
        value
      }
    }
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
    allHumanNamesMappers(first: "100") {
      title
      map {
        key
        value
      }
    }
  }
`;
