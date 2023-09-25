import { fetchGlobalTemplateData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const template = createQueryKeys('template', {
  global: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchGlobalTemplateData(locale),
  }),
});
