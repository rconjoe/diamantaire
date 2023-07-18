import { fetchDiamondsData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamonds = createQueryKeys('diamonds', {
  content: (options) => {
    return {
      queryKey: [options],
      queryFn: () => fetchDiamondsData(options),
    };
  },
});
