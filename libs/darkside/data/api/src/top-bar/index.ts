import { gql } from 'graphql-request';

import { queryDatoGQL } from '../clients';

export const TOP_BAR_QUERY = gql`
  query announcementBar($locale: SiteLocale) {
    announcementBar(locale: $locale) {
      loop
      data {
        copy
        nonGeoCopy
        geoCopy
        enableGeoCopy
        link
        route
        shouldShowDynamicBookAnAppointment
        enableGwp
        supportedCountries {
          code
          name
        }
      }
    }
  }
`;

export async function fetchTopBarData(locale: string) {
  const topBarData = await queryDatoGQL({
    query: TOP_BAR_QUERY,
    variables: { locale },
  });

  return topBarData;
}
