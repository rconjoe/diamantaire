import Client from 'shopify-buy';

export const client = Client.buildClient({
  domain: 'vo-live.myshopify.com',
  storefrontAccessToken: process.env['NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN'],
  apiVersion: '2023-01',
});
