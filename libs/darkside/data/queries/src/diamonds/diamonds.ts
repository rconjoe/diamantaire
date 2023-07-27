import { fetchDiamondData, fetchInfiniteDiamondData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamonds = createQueryKeys('diamonds', {
  content: (options) => {
    return {
      queryKey: [options],
      queryFn: () => fetchDiamondData(options),
    };
  },
});

export const infiniteDiamonds = createQueryKeys('infiniteDiamonds', {
  content: (options) => {
    return {
      queryKey: [options],
      queryFn: ({ pageParam }) => fetchInfiniteDiamondData(options, pageParam),
    };
  },
});
