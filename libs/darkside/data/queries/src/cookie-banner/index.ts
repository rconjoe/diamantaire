import { fetchCookieBannerData } from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const cookieBanner = createQueryKeys('cookieBanner', {
  content: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchCookieBannerData(locale),
  }),
});
