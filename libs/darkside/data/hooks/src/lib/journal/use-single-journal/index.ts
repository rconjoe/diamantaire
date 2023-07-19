import { queries } from '@diamantaire/darkside/data/queries';
import { useQuery } from '@tanstack/react-query';

export function useSingleJournal(locale: string, slug: string | string[]) {
  return useQuery({
    ...queries.journal.singleJournal(locale, slug),
  }).data;
}

export default useSingleJournal;
