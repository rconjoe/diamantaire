import { useQuery } from '@tanstack/react-query';
import { queries } from '@diamantaire/darkside/data/queries';

export function useJournalConfig(locale: string) {
  return useQuery({
    ...queries.journal.config(locale),
    meta: {
      locale,
    },
  }).data;
}

export default useJournalConfig;
