import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export interface DiamondVariant {
  id: string;
  sku: string;
  price: number;
  variantId: string;
  availableForSale: boolean;
}

export interface DiamondLowestPriceDataProps {
  _id: string;
  lotId: string;
  availableForSale: boolean;
  carat: number;
  clarity: string;
  color: string;
  cut: string;
  dangerousInternalProductId: string;
  dangerousInternalShopifyVariantId: string;
  dfCertificateUrl: string;
  diamondType: string;
  handle: string;
  hidden: boolean;
  price: number;
  productTitle: string;
  productType: string;
  slug: string;
  variantId: string;
  variants: DiamondVariant[];
}

export interface DiamondLowestPriceOptionsDataTypes {
  diamondType: string;
}
export function useDiamondLowestPriceByDiamondType(
  options: DiamondLowestPriceOptionsDataTypes,
  queryOptions = {},
): UseQueryResult<DiamondLowestPriceDataProps, unknown> {
  return useQuery({
    ...queries.lowestPriceDiamond.content(options.diamondType),
    ...queryOptions,
    keepPreviousData: true,
    staleTime: 300000,
  });
}

export default useDiamondLowestPriceByDiamondType;
