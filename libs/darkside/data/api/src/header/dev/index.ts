export const HEADER_NAV_QUERY = `
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

// export async function fetchHeaderData(locale: string) {
//   const headerData = await fetch({
//     query: HEADER_NAV_QUERY,
//     variables: { locale },
//   });

//   return headerData;
// }

export async function fetchHeaderData(locale: string) {
  const response = await fetch(
    `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}/api/template/global?locale=${locale}`,
  );

  return response.json();
}
