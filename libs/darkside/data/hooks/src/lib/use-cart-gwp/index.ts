import { queries } from '@diamantaire/darkside/data/queries';
import { DatoDarksideButtonProps, DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export type CartGwpDataType = {
  allGwpDarksides: Array<{
    tiers: Array<{
      id: string;
      promotionDateRangeEnd: string;
      promotionDateRangeStart: string;
      minSpendByCurrencyCode: Record<string, number>;
      gwpSupportedCountries: {
        code: string;
        name: string;
      }[];
      giftProduct: {
        plpImage: DatoImageType;
      };
      giftProductInventoryLevelCutoff: number;
      cartQualifiedTitle: string;
      cartQualifiedBody: string;
      cartQualifiedBackgroundColor: {
        hex: string;
      };
      cartNonQualifiedTitle: string;
      cartNonQualifiedBody: string;
      cartNonQualifiedBackgroundColor: {
        hex: string;
      };
      cartNonQualifiedCta: DatoDarksideButtonProps[];
    }>;
  }>;
};

export function useCartGwp(locale: string): UseQueryResult<CartGwpDataType, unknown> {
  return useQuery({ ...queries.cart.gwp(locale) });
}

export default useCartGwp;
