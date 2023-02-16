import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useStandardPage(slug: string) {
  return useQuery({
    ...queries['standard-page'].content(slug),
  });
}

export default useStandardPage;
