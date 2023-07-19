import { queries } from '@diamantaire/darkside/data/queries';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useJournalSubcategory(locale: string, category: string, subcategory: string, first?: number, skip?: number) {
  const initialSkip = skip ?? 0;

  const getNextPageParam = () => {
    // Get the current skip value
    const currentSkip = initialSkip + 1;

    // Return the next skip value
    return currentSkip;
  };

  return useInfiniteQuery({
    ...queries.journal.journalsBySubcategory(locale, category, subcategory, first, skip),
    getNextPageParam,
    refetchOnWindowFocus: false,
  });
}

export default useJournalSubcategory;
