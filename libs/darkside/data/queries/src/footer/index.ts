import { fetchFooterData } from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const footer = createQueryKeys('footer', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => fetchFooterData(ctx.meta.locale),
  }),
});
