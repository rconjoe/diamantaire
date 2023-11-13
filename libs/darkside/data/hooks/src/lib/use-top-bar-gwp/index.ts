import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type TopBarGWPData = {
  allGwpDarksides: Array<{
    tiers: Array<{
      id: string;
      promotionDateRangeEnd: string;
      promotionDateRangeStart: string;
      minSpendByCurrencyCode: Record<string, number>;
      activeCountries: string;
      giftProduct: {
        plpImage: DatoImageType;
      };
      giftProductInventoryLevelCutoff: number;
      announcementBarQualifiedCopy: string;
      announcementBarNonQualifiedCopy: string;
      announcementBarNothingInCartCopy: string;
    }>;
  }>;
};

export function useTopBarGWP(locale: string): UseQueryResult<TopBarGWPData, unknown> {
  return useQuery({
    ...queries['top-bar'].gwp(locale),
  });
}

export default useTopBarGWP;
