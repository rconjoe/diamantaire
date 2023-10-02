import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useCookieBanner(locale: string) {
  return useQuery({
    ...queries.cookieBanner.content(locale),
    meta: {
      locale,
    },
  });
}

export default useCookieBanner;
