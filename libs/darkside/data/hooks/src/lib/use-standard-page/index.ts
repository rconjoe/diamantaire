import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useStandardPage(slug: string, locale: string) {
  return useQuery({
    ...queries['standard-page'].content(slug, locale),
  });
}

export default useStandardPage;
