import { shopifyAdminRequest } from '@diamantaire/darkside/data/api';
import { gql } from 'graphql-request';

export type MinimalCustomerWithProps = {
  customers: {
    nodes: {
      id: string;
      name: string;
      email: string;
    };
  };
};

export async function fetchCustomerByEmail(queryTerm: string): Promise<MinimalCustomerWithProps['customers']['nodes']> {
  const query = gql`
    query CustomerSearchQuery($queryTerm: String!) {
      customers(first: 1, query: $queryTerm, sortKey: RELEVANCE) {
        nodes {
          id
          firstName
          email
        }
      }
    }
  `;

  const variables = {
    queryTerm: 'email:' + queryTerm,
  };

  const data = (await shopifyAdminRequest(query, variables)) as MinimalCustomerWithProps;

  return data?.customers?.nodes[0] || null;
}

export default async function getCustomerByEmail({ email }: { email: string }) {
  return await fetchCustomerByEmail(email);
}
