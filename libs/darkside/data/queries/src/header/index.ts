import { fetchHeaderData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const header = createQueryKeys('header', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchHeaderData(locale),
  }),
});
