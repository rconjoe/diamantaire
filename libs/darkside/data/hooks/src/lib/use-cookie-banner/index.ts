import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export type CookieBannerProps = {
  cookieBanner: {
    text: string;
    title: string;
    acceptAllCtaText: string;
    acceptSelectionCtaText: string;
    essentialCookiesCategoryName: string;
    statisticsCookiesCategoryName: string;
    marketingCookiesCategoryName: string;
    customerSupportCookiesCategoryName: string;
  };
};

export function useCookieBanner(locale: string): UseQueryResult<CookieBannerProps, unknown> {
  return useQuery({
    ...queries.cookieBanner.content(locale),
    meta: {
      locale,
    },
  });
}

export default useCookieBanner;
