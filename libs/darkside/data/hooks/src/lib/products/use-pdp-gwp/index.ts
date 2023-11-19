import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export type PDPGwpDataType = {
  allGwpDarksides: Array<{
    tiers: Array<{
      promotionDateRangeEnd: string;
      promotionDateRangeStart: string;
      minSpendByCurrencyCode: Record<string, number>;
      supportedCountries: {
        name: string;
        code: string;
      }[];
      giftProduct: {
        plpImage: DatoImageType;
      };
      giftProductInventoryLevelCutoff: number;
      pdpBannerBody: string;
      pdpBannerColor: {
        hex: string;
      };
    }>;
  }>;
};

export function usePDPGwp(locale: string): UseQueryResult<PDPGwpDataType, unknown> {
  return useQuery({ ...queries.products.gwp(locale) });
}

export default usePDPGwp;
