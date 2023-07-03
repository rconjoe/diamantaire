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

export async function addNewCustomerAddress(customerId: string, address: object): Promise<CustomerDetails['customer']> {
  const query = gql`
    mutation addCustomerAddress($customerId: ID!, $address: MailingAddressInput!) {
      updateCustomer(id: $customerId, input: { addresses: { insert: $address } }) {
        id
        addresses {
          id
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
          phone
        }
      }
    }
  `;

  const variables = {
    customerId,
    address,
  };

  const data = (await shopifyAdminRequest(query, variables)) as CustomerDetails;

  console.log('address data', data);

  return data?.customer || null;
}
export async function updateCustomerDetailsByCustomerId(
  customerId: string,
  shippingInfo: string,
): Promise<CustomerDetails['customer']> {
  const query = gql`
    mutation updateCustomerDefaultShippingInfo($customerId: String!, $shippingInfo: CustomerShippingInfoInput!) {
      updateCustomer(id: $customerId, input: { defaultShippingInfo: $shippingInfo }) {
        id
        defaultShippingInfo {
          firstName
          lastName
          address1
          address2
          city
          province
          country
          zip
        }
      }
    }
  `;

  const variables = {
    customerId,
    shippingInfo,
  };

  const data = (await shopifyAdminRequest(query, variables)) as CustomerDetails;

  return data?.customer || null;
}

// TODO: Finalize these functions to update customer shipping info via mutations - https://diamondfoundry.atlassian.net/jira/software/projects/DIA/boards/99/backlog?selectedIssue=DIA-208
// export default async function updateCustomerShippingDetails({ id }: { id: string; shippingInfo: string }) {
export default async function updateCustomerShippingDetails() {
  console.log('update shipping info');
  // return await addNewCustomerAddress(id);
  // return await updateCustomerDetailsByCustomerId(id, shippingInfo);
}
