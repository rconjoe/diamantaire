import { queries } from '@diamantaire/darkside/data/queries';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

export type ProductSuggestionsProps = {
  productSuggestionQuadBlock: {
    content: {
      aboveCopy: string;
    }[];
  };
};

export function useProductSuggestions(id: string, locale: string): UseQueryResult<ProductSuggestionsProps, unknown> {
  return useQuery({
    ...queries.products.productSuggestions(id, locale),
  });
}

export default useProductSuggestions;
