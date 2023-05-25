import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type ProductIconListProps = {
  productIconList: {
    items: {
      _modelApiKey?: string;
      ctaRoute?: string;
      ctaCopy?: string;
      copy?: string;
      shippingBusinessDays?: string;
      shippingBusinessDaysCountryMap?: string;
      shippingText?: string;

      icon?: {
        width: number;
        height: number;
        url: string;
      };
    }[];
  };
};

export function useProductIconList(productType: string, locale: string): UseQueryResult<ProductIconListProps, unknown> {
  return useQuery({
    ...queries.products.productIconList(productType, locale),
  });
}

export default useProductIconList;
