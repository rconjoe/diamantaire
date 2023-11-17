import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

type BlockProductProps = {
  products: {
    id: string;
    productType: string;
    productSlug: string;
    collectionSlug: string;
    collectionTitle: string;
  }[];
  lowestPricesByCollection;
};

export function useBlockProducts(slugs: string[]): UseQueryResult<BlockProductProps, unknown> {
  return useQuery({ ...queries['product-blocks'].products(slugs) });
}
