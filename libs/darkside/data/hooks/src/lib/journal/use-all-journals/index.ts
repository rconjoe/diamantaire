import { useQuery } from '@tanstack/react-query';
import { queries } from '@diamantaire/darkside/data/queries';

export function useAllJournals(locale: string, first?: number, skip?: number) {
  return useQuery({
    ...queries.journal.journalsByMostRecent(locale, first, skip),
    meta: {
      locale,
      first,
      skip,
    },
  }).data;
}

export default useAllJournals;
