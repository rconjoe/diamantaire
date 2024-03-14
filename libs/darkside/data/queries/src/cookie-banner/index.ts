import { fetchCookieBannerData } from '@diamantaire/darkside/data/api';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const cookieBanner = createQueryKeys('cookieBanner', {
  content: (locale: string) => ({
    queryKey: [locale],
    // queryFn: () => fetchCookieBannerData(locale),
    queryFn: () => {
      if (getIsUserInEu()) {
        return fetchCookieBannerData(locale);
      } else {
        // Return a promise that resolves to an empty object if user is not in EU
        return Promise.resolve({});
      }
    },
  }),
});
