import Joi from 'joi';

export const JoiSchemaValidation = Joi.object({
  NODE_ENV: Joi.string().required(),
  APP_PORT: Joi.number().default(3000),

  MONGO_URI: Joi.required().messages({ message: 'MONGODB_URI is required' }),
  SHOPIFY_STOREFRONT_GRAPHQL_URI: Joi.string().required(),
  // NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN: Joi.string().required(),
  SHOPIFY_ADMIN_GRAPHQL_URI: Joi.string().required(),
  SHOPIFY_ADMIN_API_TOKEN: Joi.string().required(),
  DATO_GRAPHQL_URI: Joi.string().required(),
  DATO_READ_ONLY_TOKEN: Joi.string().required(),
  RESTLET_CONSUMER_KEY: Joi.string().required(),
  RESTLET_CONSUMER_SECRET: Joi.string().required(),
  RESTLET_TOKEN_KEY: Joi.string().required(),
  RESTLET_TOKEN_SECRET: Joi.string().required(),
  RESTLET_OAUTH_REALM: Joi.string().required(),
  NETSUITE_DIAMOND_AVAILABILITY_RESTLET_URI: Joi.string().required(),
  API_KEY: Joi.string().required(),
});
