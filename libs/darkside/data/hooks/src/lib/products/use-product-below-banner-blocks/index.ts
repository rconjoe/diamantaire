import { queries } from '@diamantaire/darkside/data/queries';
import { PdpTypePlural } from '@diamantaire/shared/constants';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface ProductBlockPickerBlocksProps {
  belowBannerBlocks: any[];
}

export function useProductBelowBannerBlocks(
  slug: string,
  locale: string,
  productType: PdpTypePlural,
): UseQueryResult<ProductBlockPickerBlocksProps, unknown> {
  return useQuery({
    ...queries.products.productBelowBannerBlocks(slug, locale, productType),
  });
}

export default useProductBelowBannerBlocks;
