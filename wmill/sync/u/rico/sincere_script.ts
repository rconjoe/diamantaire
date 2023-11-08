// Ctrl/CMD+. to cache dependencies on imports hover.
import { GraphQLClient } from 'npm:graphql-request';

// Deno uses "npm:" prefix to import from npm (https://deno.land/manual@v1.36.3/node/npm_specifiers)
import * as wmill from "npm:windmill-client@1"

// fill the type, or use the +Resource type to get a type-safe reference to a resource
// type Postgresql = object

export async function main(
 
) {
  const client = new GraphQLClient((await wmill.getVariable('f/shopify/admin_rest_url'))), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Shopify-Storefront-Access-Token': (await wmill.getVariable('f/shopify/admin_access_token')),
      },
    });
  // let x = await wmill.getVariable('u/user/foo')
  return { foo: a };
}
