import { GraphQLClient, Variables } from 'graphql-request';

export async function shopifyAdminGraphqlApi(shopifyQuery: any, variables: Variables) {
  const endpoint = `${process.env['NEXT_PUBLIC_SHOPIFY_STORE_URL']}/admin/api/2023-04/graphql.json`;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      'X-Shopify-Access-Token': process.env['SHOPIFY_ADMIN_API_TOKEN'] || '',
    },
  });

  const data = await graphQLClient.request(shopifyQuery, variables);

  return data;
}

export async function shopifyAdminRestApi(path) {
  const baseURL = `https://${process.env['NEXT_PUBLIC_SHOPIFY_STORE_URL']}/admin/api/2023-10${path}`;

  const headers = { 'X-Shopify-Access-Token': process.env['SHOPIFY_ADMIN_API_TOKEN'] || '' };

  const response = await fetch(baseURL, { method: 'GET', headers })
    .then((res) => res.json())
    .then((json) => json);

  return response;
}
