import { fetchStandardPageDataBySlug } from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const standardPage = createQueryKeys('standard-page', {
  content: (slug: string) => ({
    queryKey: [slug],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => fetchStandardPageDataBySlug(slug),
  }),
});
