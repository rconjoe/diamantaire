import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useTopBar(locale: string) {
  return useQuery({
    ...queries['top-bar'].content(locale),
  });
}

export default useTopBar;
