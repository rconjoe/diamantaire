import { gql } from 'graphql-request';

import { queryDatoGQL } from '../clients';

export const GET_STANDARD_PAGE_BY_SLUG = gql`
  query StandardPageBySlug($slug: String!) {
    standardPage(filter: { slug: $slug }) {
      id
    }
  }
`;

export async function validateStandardPage(slug: string) {
  const response = await queryDatoGQL({
    query: GET_STANDARD_PAGE_BY_SLUG,
    variables: {
      slug,
    },
  });

  return response;
}
