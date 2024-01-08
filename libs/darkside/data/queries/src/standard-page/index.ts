import {
  STANDARD_PAGE_BY_SLUG,
  queryDatoGQL,
} from '@diamantaire/darkside/data/api';import { createQueryKeys } from '@lukemorales/query-key-factory';

export const standardPage = createQueryKeys('standard-page', {
  content: (slug: string, locale: string) => ({
    queryKey: [slug, locale],
    queryFn: () => getStandardPageData(slug, locale),
  }),
});

async function getStandardPageData(slug: string, locale: string) {
  if (!slug) {
    throw new Error('Get Standard Page: Slug is required');
  }

  const response = await queryDatoGQL({ query: STANDARD_PAGE_BY_SLUG, variables: { locale, slug } });

  return response;
}
