import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useFooter(locale: string) {
  return useQuery({
    ...queries.footer.content(locale),
    meta: {
      locale,
    },
  });
}

export default useFooter;
