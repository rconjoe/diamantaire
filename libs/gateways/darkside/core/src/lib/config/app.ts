import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  workingDirectory: process.env.PWD || process.cwd(),
  // mongoUri: process.env.MONGO_URI,
  apiPrefix: process.env.API_PREFIX || 'v1',
  shopifyStoreFrontGraphqlUri: process.env.SHOPIFY_STOREFRONT_GRAPHQL_URI,
  shopifyStoreFrontAPIToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
  shopifyAdminGraphqlUri: process.env.SHOPIFY_ADMIN_GRAPHQL_URI,
  shopifyAdminAPIToken: process.env.SHOPIFY_ADMIN_API_TOKEN,
  // graphql: {
  //   playgroundEnabled: true,
  //   debug: true,
  //   schemaDestination: './src/schema.graphql',
  //   sortSchema: true,
  // },
}));
