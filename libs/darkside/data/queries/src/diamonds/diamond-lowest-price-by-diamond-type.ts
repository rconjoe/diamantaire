import { fetchLowestPriceByDiamondType } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const lowestPriceDiamond = createQueryKeys('lowestPriceDiamond', {
  content: (diamondType) => {
    return {
      queryKey: ['lowestPriceDiamond', diamondType],
      queryFn: () => fetchLowestPriceByDiamondType(diamondType),
    };
  },
});
