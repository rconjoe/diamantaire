import { fetchFooterData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const footer = createQueryKeys('footer', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchFooterData(locale),
  }),
});
