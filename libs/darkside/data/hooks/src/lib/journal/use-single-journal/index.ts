import { useQuery } from '@tanstack/react-query';
import { queries } from '@diamantaire/darkside/data/queries';

export function useSingleJournal(locale: string, slug: string) {
  return useQuery({
    ...queries.journal.singleJournal(locale, slug),
    meta: {
      locale,
    },
  }).data;
}

export default useSingleJournal;
