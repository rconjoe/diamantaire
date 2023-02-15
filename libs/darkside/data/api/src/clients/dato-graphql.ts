import { GraphQLClient } from 'graphql-request';

console.log('tempppp', process.env['NEXT_PUBLIC_DATOCMS_API_TOKEN']);

export function queryDatoGQL({
  query,
  variables,
  includeDrafts,
  excludeInvalid,
}: {
  query: string;
  variables?: object;
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
}) {
  const headers: { [key: string]: string } = {
    authorization: `Bearer ` + process.env['NEXT_PUBLIC_DATOCMS_API_TOKEN'],
  };

  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }

  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }

  // Production
  // const client = new GraphQLClient('https://graphql.datocms.com', { headers });

  // Dev (includes drafts)
  const client = new GraphQLClient('https://graphql.datocms.com/preview', {
    headers,
  });

  return client.request(query, variables);
}
