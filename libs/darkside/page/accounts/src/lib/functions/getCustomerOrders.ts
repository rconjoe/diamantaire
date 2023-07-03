import { shopifyAdminRequest } from '@diamantaire/darkside/data/api';
import { gql } from 'graphql-request';

export type MinimalCustomerOrdersWithProps = {
  customer: {
    orders: {
      nodes: {
        id: string;
        name: string;
        createdAt: string;
        status: string;
        price: {
          total: {
            amount: number;
          };
        };
      }[];
    };
  };
};

export async function fetchOrdersByCustomerId(
  customerId: string,
): Promise<MinimalCustomerOrdersWithProps['customer']['orders']['nodes']> {
  const query = gql`
    query CustomerOrderLookup($customerId: ID!) {
      customer(id: $customerId) {
        orders(first: 100) {
          nodes {
            id
            name
            createdAt
            status: displayFulfillmentStatus
            price: totalPriceSet {
              total: presentmentMoney {
                amount
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    customerId,
  };

  const data = (await shopifyAdminRequest(query, variables)) as MinimalCustomerOrdersWithProps;

  return data?.customer?.orders?.nodes || [];
}

export default async function getCustomerOrders({ id }: { id: string }) {
  return await fetchOrdersByCustomerId(id);
}
