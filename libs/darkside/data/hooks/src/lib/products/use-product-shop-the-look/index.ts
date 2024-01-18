import { queries } from '@diamantaire/darkside/data/queries';
import { ListPageItemWithConfigurationVariants } from '@diamantaire/shared-product';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

interface ProductShopTheLookProps {
  products: ListPageItemWithConfigurationVariants[];
}

export function useProductShopTheLook(ids: string[], locale): UseQueryResult<ProductShopTheLookProps, unknown> {
  return useQuery({ ...queries.plp.plpShopTheLook(ids, locale) });
}
