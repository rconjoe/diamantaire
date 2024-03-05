import axios from 'axios';

const vraiAdminApiClient = axios.create({
  baseURL: 'https://vo-live.myshopify.com/admin/api/2024-01/graphql.json',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': '4f2b9a508cb5bd52dc8479c18b4bd9b2',
  },
});

export { vraiAdminApiClient };
