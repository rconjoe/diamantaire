import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useProductSkusVariants(collectionSlug: string) {
    return useQuery({
        ...queries.products.getSKUProductVariants(collectionSlug),
        staleTime: Infinity,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    });
}

export default useProductSkusVariants;