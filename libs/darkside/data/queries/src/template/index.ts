import { queryDatoGQL, GLOBAL_TEMPLATE_QUERY } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const template = createQueryKeys('template', {
  global: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => getGlobalTemplateData(locale),
  }),
});

async function getGlobalTemplateData(locale) {
  const response = await queryDatoGQL({ query: GLOBAL_TEMPLATE_QUERY, variables: { locale } });

  console.log("response", response);

  return response;
}
