import { fetchDiamondCfyData } from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamondCfy = createQueryKeys('diamondCfy', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => {
      return fetchDiamondCfyData(ctx?.meta?.locale || locale);
    },
  }),
});
