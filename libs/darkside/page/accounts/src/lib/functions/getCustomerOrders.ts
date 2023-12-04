import { shopifyAdminRestApi } from '@diamantaire/darkside/data/api';

export default async function getCustomerOrders({ id }: { id: string }) {
  try {
    const shopify = await shopifyAdminRestApi();

    const endpoint = `customers/${id}/orders.json`;

    const payload = await shopify.get(endpoint);

    return payload.data.orders;
  } catch (error) {
    console.error('Error fetching customer data:', error);

    throw error;
  }
}
