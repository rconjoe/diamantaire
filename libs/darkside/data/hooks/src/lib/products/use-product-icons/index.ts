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
  useStaticText?: boolean;
  cutForYouShippingBusinessDays: string;
  cutForYouShippingBusinessDaysCountryMap: string;
  cutForYouShippingText: string;
  cutForYouShippingDetails: string;
  cutForYouReturnPolicyTitle: string;
  cutForYouReturnPolicyIcon: {
    width: number;
    height: number;
    url: string;
  };

  icon?: {
    width: number;
    height: number;
    url: string;
  };
  additionalInfo?: {
    title: string;
    image: DatoImageType;
    copy: string;
    id: string;
  };
  supportedCountries?: { code: string }[];
}

type ProductIconListProps = {
  productIconList: {
    items: ProductIconListDataTypes[];
  };
};

export function useProductIconList(productType: string, locale: string): UseQueryResult<ProductIconListProps, unknown> {
  return useQuery({
    ...queries.products.productIconList(productType, locale),
  });
}

export default useProductIconList;
