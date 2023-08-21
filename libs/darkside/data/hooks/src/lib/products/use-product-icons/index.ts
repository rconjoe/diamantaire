import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export interface ProductIconListDataTypes {
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
}

type ProductIconListProps = {
  productIconList: {
    items: ProductIconListDataTypes[];
  };
};

export function useProductIconList(
  productType: 'engagement-ring' | 'wedding-band' | 'jewelry',
  locale: string,
): UseQueryResult<ProductIconListProps, unknown> {
  return useQuery({
    ...queries.products.productIconList(productType, locale),
  });
}

export default useProductIconList;
