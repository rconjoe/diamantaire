import { fetchDiamondTableData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamondTable = createQueryKeys('diamondTable', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => {
      return fetchDiamondTableData(locale);
    },
  }),
});
