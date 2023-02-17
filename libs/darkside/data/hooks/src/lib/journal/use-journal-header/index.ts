import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useJournalHeader(locale: string) {
  return useQuery({
    ...queries.journal.journalHeader(locale),
    meta: {
      locale,
    },
  }).data;
}

export default useJournalHeader;
