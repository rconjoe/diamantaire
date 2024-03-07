import { GraphQLClient } from 'graphql-request';

const shopifyAdminApiUrl = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_GRAPHQL_URL;
const shopifyAdminApiToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_TOKEN;

const shopifyAdminApiClient = new GraphQLClient(shopifyAdminApiUrl, {
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': shopifyAdminApiToken,
  },
});

export { shopifyAdminApiClient };
