import { fetchHeaderData } from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const header = createQueryKeys('header', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => fetchHeaderData(ctx.meta.locale),
  }),
});
