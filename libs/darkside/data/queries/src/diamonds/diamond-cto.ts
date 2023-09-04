import { fetchDiamondCtoData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamondCto = createQueryKeys('diamondCto', {
  content: (options) => {
    return {
      queryKey: [options],
      queryFn: () => fetchDiamondCtoData(options),
    };
  },
});
