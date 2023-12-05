import { shopifyAdminRestApi } from '@diamantaire/darkside/data/api';

export default async function getCustomerOrders({ id }: { id: string }) {
  try {
    const endpoint = `/customers/${id}/orders.json`;
    const data = await shopifyAdminRestApi(endpoint);

    return data.orders;
  } catch (error) {
    console.error('Error fetching customer data:', error);

    throw error;
  }
}
