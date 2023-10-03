import { queries } from '@diamantaire/darkside/data/queries';
import { DatoImageType } from '@diamantaire/shared/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export interface ProductIconListDataTypes {
  _modelApiKey?: string;
  ctaRoute?: string;
  ctaCopy?: string;
  copy?: string;
  shippingBusinessDays?: string;
  shippingBusinessDaysCountryMap?: string;
  shippingText?: string;
  cutForYouShippingBusinessDays?: number;
  cutForYouShippingText?: string;
  icon?: {
    width: number;
    height: number;
    url: string;
  };
  additionalInfo?: {
    title: string;
    image: DatoImageType;
    copy: string;
  };
}

type ProductIconListProps = {
  productIconList: {
    items: ProductIconListDataTypes[];
  };
};

export function useProductIconList(
  productType: 'engagement-ring' | 'wedding-band' | 'jewelry' | 'Diamond PDP',
  locale: string,
): UseQueryResult<ProductIconListProps, unknown> {
  return useQuery({
    ...queries.products.productIconList(productType, locale),
  });
}

export default useProductIconList;
