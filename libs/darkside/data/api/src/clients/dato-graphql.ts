import { DEFAULT_LOCALE, parseValidLocale } from '@diamantaire/shared/constants';
import { GraphQLClient, Variables } from 'graphql-request';

export function queryDatoGQL({
  query,
  variables,
  includeDrafts,
  excludeInvalid = true,
}: {
  query: string;
  variables?: Variables;
  includeDrafts?: boolean;
  excludeInvalid?: boolean;
}) {
  if (variables && variables['locale']) {
    const { locale } = variables;
    const refinedLocale = (locale as string) || DEFAULT_LOCALE;

    variables['locale'] = getDatoRequestLocale(refinedLocale);
  }

  const environment = process.env['NEXT_PUBLIC_VERCEL_ENV'] || 'development';

  const headers: { [key: string]: string } = {
    authorization: `Bearer ` + process.env['NEXT_PUBLIC_DATOCMS_API_TOKEN'],
  };

  if (includeDrafts || environment !== 'production') {
    headers['X-Include-Drafts'] = 'true'
  } 

  // should exclude invalid by default
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }

  const client = new GraphQLClient(`https://graphql.datocms.com/${environment === 'production' ? '' : 'preview'}`, {
    headers,
  });

  return client.request(query, variables);
}

function getDatoRequestLocale(locale: string) {
  const { languageCode } = parseValidLocale(locale);

  if (languageCode === 'en') {
    return 'en_US';
  } else return languageCode;
}
