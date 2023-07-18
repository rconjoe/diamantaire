import { fetchDiamondPdpData } from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamondPdp = createQueryKeys('diamondPdp', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => {
      return fetchDiamondPdpData(ctx?.meta?.locale || locale);
    },
  }),
});
