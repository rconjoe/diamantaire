import { fetchDiamondTableData } from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const diamondTable = createQueryKeys('diamondTable', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => {
      return fetchDiamondTableData(ctx?.meta?.locale || locale);
    },
  }),
});
