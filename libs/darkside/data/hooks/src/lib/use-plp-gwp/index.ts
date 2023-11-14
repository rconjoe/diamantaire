import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type PlpGWPData = {
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
      promoCardQualifiedCopy: string;
      promoCardNonQualifiedCopy: string;
      creativeBlockNonQualifiedCopy: string;
      creativeBlockQualifiedCopy: string;
    }>;
  }>;
};

export function usePlpGWP(locale: string): UseQueryResult<PlpGWPData, unknown> {
  return useQuery({
    ...queries.plp.gwp(locale),
  });
}

export default usePlpGWP;
