import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useJournalsByCategory(locale: string, category: string, first?: number, skip?: number) {
  return useQuery({
    ...queries.journal.journalsByCategory(locale, category, first, skip),
    meta: {
      locale,
    },
    enabled: false,
  });
}

export default useJournalsByCategory;
