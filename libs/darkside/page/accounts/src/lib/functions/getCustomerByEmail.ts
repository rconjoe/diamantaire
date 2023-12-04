import { shopifyAdminRestApi } from '@diamantaire/darkside/data/api';

export default async function getCustomerByEmail({ email }: { email: string }) {
  try {
    const shopify = await shopifyAdminRestApi();

    const endpoint = `customers/search.json?query=email:${email}`;

    const payload = await shopify.get(endpoint);

    const { data: { customers = [] } = {} } = payload;

    // TODO: DO we assume it will just only return one customer ?

    return customers.shift();
  } catch (error) {
    console.error('Error fetching customer data:', error);

    throw error;
  }
}
