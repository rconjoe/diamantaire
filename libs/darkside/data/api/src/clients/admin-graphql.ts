import { GraphQLClient, Variables } from 'graphql-request';

export async function shopifyAdminRequest(shopifyQuery: any, variables: Variables) {
  const endpoint = `https://${process.env['NEXT_PUBLIC_SHOPIFY_STORE_URL']}/admin/api/2023-04/graphql.json`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Access-Token': process.env['SHOPIFY_ADMIN_API_TOKEN'] || '',
    },
  });

  const data = await graphQLClient.request(shopifyQuery, variables);

  return data;
}
