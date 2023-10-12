import { fetchTopBarData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const topBar = createQueryKeys('top-bar', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchTopBarData(locale),
  }),
});
