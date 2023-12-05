import { shopifyAdminRestApi } from '@diamantaire/darkside/data/api';

export default async function getCustomerByEmail({ email }: { email: string }) {
  try {
    const endpoint = `/customers/search.json?query=email:"${email}"`;

    const data = await shopifyAdminRestApi(endpoint);

    return data.customers.shift();
  } catch (error) {
    console.error('Error fetching customer data:', error);

    throw error;
  }
}
