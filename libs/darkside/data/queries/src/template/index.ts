import { queryDatoGQL, GLOBAL_TEMPLATE_QUERY } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const template = createQueryKeys('template', {
  global: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => getGlobalTemplateData(locale),
  }),
});

async function getGlobalTemplateData(locale) {
  try {
    const response = await queryDatoGQL({ query: GLOBAL_TEMPLATE_QUERY, variables: { locale } });

    return response;
  } catch(error) {
    console.log("Error retrieving global template data", error);

    return {}
  }
  
}
