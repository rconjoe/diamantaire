import { fetchDiamondInfoData } from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamondInfo = createQueryKeys('diamondInfo', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => {
      return fetchDiamondInfoData(ctx?.meta?.locale || locale);
    },
  }),
});
