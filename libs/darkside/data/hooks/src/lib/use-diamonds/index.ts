import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useDiamondsData(options) {
  // console.log(`** HOOK ** useDiamondsData`, options);

  return useQuery({
    ...queries.diamonds.content(options),
    keepPreviousData: true,
  });
}

export default useDiamondsData;
