import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseBlockProducts {
  locale: string;
  slugs: string[];
}

export function useBlockProducts({ locale, slugs }: UseBlockProducts) {
  return useQuery({ ...queries['product-blocks'].products(locale, slugs) });
}

export default useBlockProducts;
