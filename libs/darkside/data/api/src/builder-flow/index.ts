import { gql } from 'graphql-request';

import { queryDatoGQL } from '../clients';

const BUILDER_FLOW_SEO_QUERY = gql`
  query builderFlowQuery($locale: SiteLocale) {
    builderFlow(locale: $locale) {
      id
      seoFields {
        seoTitle
        seoDescription
        addNoindexNofollow
      }
    }
  }
`;

export async function fetchBuilderFlowSeo(locale: string) {
  const bfData = await queryDatoGQL({
    query: BUILDER_FLOW_SEO_QUERY,
    variables: { locale },
  });

  return bfData;
}
