import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useGlobalData(locale: string) {
  return useQuery({
    ...queries.template.global(locale),
    keepPreviousData: true,
    staleTime: Infinity,
  });
}

export default useGlobalData;
