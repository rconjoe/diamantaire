import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useShowroomNav(locale: string) {
  return useQuery({
    ...queries.showrooms.nav(locale),
  });
}

export default useShowroomNav;
