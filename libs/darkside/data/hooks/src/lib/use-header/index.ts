import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useHeader(locale: string) {
  return useQuery({
    ...queries.header.content(locale),
    meta: {
      locale,
    },
  });
}

export default useHeader;
