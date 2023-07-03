import { shopifyAdminRequest } from '@diamantaire/darkside/data/api';
import { gql } from 'graphql-request';

export type CustomerDetails = {
  customer: {
    phone: string;
    defaultAddress: {
      name: string;
      address1: string;
      address2: string;
      city: string;
      province: string;
      zip: string;
      country: string;
    };
  };
};

export async function fetchCustomerDetailsByCustomerId(customerId: string): Promise<CustomerDetails['customer']> {
  const query = gql`
    query CustomerDetailsLookup($customerId: ID!) {
      customer(id: $customerId) {
        phone
        defaultAddress {
          firstName
          lastName
          address1
          address2
          city
          provinceCode
          zip
          country
        }
      }
    }
  `;

  const variables = {
    customerId,
  };

  const data = (await shopifyAdminRequest(query, variables)) as CustomerDetails;

  return data?.customer || null;
}

export default async function getCustomerShippingDetails({ id }: { id: string }) {
  return await fetchCustomerDetailsByCustomerId(id);
}
