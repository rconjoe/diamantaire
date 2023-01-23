import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
  workingDirectory: process.env.PWD || process.cwd(),
  mongoUri: process.env.MONGO_URI,
  apiPrefix: process.env.API_PREFIX || 'v1',
  shopifyStoreFrontGraphqlUri: process.env.SHOPIFY_STOREFRONT_GRAPHQL_URI,
  shopifyStoreFrontAPIToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN,
  shopifyAdminGraphqlUri: process.env.SHOPIFY_ADMIN_GRAPHQL_URI,
  shopifyAdminAPIToken: process.env.SHOPIFY_ADMIN_API_TOKEN,
  shopifyGidPrifix: process.env.SHOPIFY_GID_PREFIX,
  datoGraphqlUri: process.env.DATO_GRAPHQL_URI,
  datoReadOnlyAPIToken: process.env.DATO_READ_ONLY_TOKEN,
  consumerKey: process.env.RESTLET_CONSUMER_KEY,
  consumerSecret: process.env.RESTLET_CONSUMER_SECRET,
  tokenKey: process.env.RESTLET_TOKEN_KEY,
  tokenSecret: process.env.RESTLET_TOKEN_SECRET,
  oauthRealm: process.env.RESTLET_OAUTH_REALM,
  netsuiteDiamondAvailabilityRestletUri: process.env.NETSUITE_DIAMOND_AVAILABILITY_RESTLET_URI,
  apiKey: process.env.API_KEY,
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './libs/server/schema.graphql',
    sortSchema: true,
  },
}));
