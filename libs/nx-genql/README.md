# nx-genql

_Generate schema, types, and utility functions providing end-to-end typesafety against external graphql APIs._

### Problem

You are writing a graphql query string to DatoCMS or Shopify. You need to be absolutely sure that the query string you pass is valid according to the currently published schema of whatever API you are calling. If it is not, this usually results in a bad query (return `undefined` or `5xx`) going as far upstream as production before anyone notices the discrepancy.

### Solution

This plugin is a tool that can be used to build a system that eliminates the possibility of such errors.

It can introspect the schema of an external API, generate TS types according to it, and provide a `createClient()` function that returns a graphql query client that has autocomplete according to the introspected schema.

It uses [genql](https://genql.dev/docs) to do all the work.

### Configuration

- As of now you are required to have a workspace root `.env` file containing a `DATO_READ_ONLY_TOKEN` environment variable.
- Only _DatoCMS_ is supported. (Shopify API's coming soon)
- Know what project you want to put the utility files in.

### Usage

```
yarn nx g @diamantaire/nx-genql:utils
```

The generated files do not affect workspace configuration. You can generate them and delete them as you please without any side effects.