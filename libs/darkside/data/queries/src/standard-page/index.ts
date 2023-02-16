import { fetchStandardPageDataBySlug } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const standardPage = createQueryKeys('standard-page', {
  content: (slug: string) => ({
    queryKey: [slug],
    queryFn: () => fetchStandardPageDataBySlug(slug),
  }),
});
