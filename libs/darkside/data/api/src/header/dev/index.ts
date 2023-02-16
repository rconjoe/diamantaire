import { queryDatoGQL } from '../../clients';

const HEADER_NAV_QUERY = `
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
  }
`;

export async function fetchHeaderData(locale: string) {
  const headerData = await queryDatoGQL({
    query: HEADER_NAV_QUERY,
    variables: { locale },
  });

  return headerData;
}
