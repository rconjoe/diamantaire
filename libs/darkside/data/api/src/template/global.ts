import { queryDatoGQL } from '../clients';
import { ButtonFragment } from '../fragments';

// fetch from API routes (unused)

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

// Gets data from DATO
export async function getGlobalTemplateData(locale) {
  try {
    const response = await queryDatoGQL({ query: GLOBAL_TEMPLATE_QUERY, variables: { locale } });

    return response;
  } catch (error) {
    console.log('Error retrieving global template data', error);

    return null;
  }
}

export const GLOBAL_TEMPLATE_QUERY = `
query headerNavigationDynamicQuery($locale: SiteLocale) {
    headerNavigationDynamic(locale: $locale) {
      section {
        title
        key
        route
        newRoute
        columns {
          columnTitle
          route
          newRoute
          colKey
          links {
            _modelApiKey
            id
            copy
            route
            newRoute
            isBold
            linkKey
            flags
            nestedLinks {
              id
              copy
              route
              newRoute
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
          newRoute
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
        darksideButtons {
         ${ButtonFragment}
        }
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
    allHumanNamesMappers(locale: $locale, first: "100") {
      title
      map {
        key
        value
      }
    }
    diamondTable(locale: $locale){
      carbonNeutralCertification {
        id
        url
        alt
      }
    } 
  }
`;
