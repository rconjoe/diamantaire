import { fetchBuilderFlowSeo } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const builderFlow = createQueryKeys('builder-flow', {
  seo: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchBuilderFlowSeo(locale),
  }),
});
