import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useHumanNameMapper(locale: string) {
  return useQuery({
    ...queries['human-name-mappers'].content(locale),
  });
}

export default useHumanNameMapper;
