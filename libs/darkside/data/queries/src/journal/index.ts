import {
  fetchJournalsByCategory,
  fetchJournalConfig,
  fetchJournalHeader,
  fetchAllJournalsByMostRecent,
  fetchSingleJournal,
  fetchJournalsBySubcategory,
} from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const journal = createQueryKeys('journal', {
  config: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchJournalConfig(locale),
  }),
  journalHeader: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchJournalHeader(locale),
  }),
  journalsByCategory: (locale: string, category: string, first?: number, skip?: number) => ({
    queryKey: [locale, category],
    queryFn: () => fetchJournalsByCategory(locale, category, first, skip),
  }),
  journalsBySubcategory: (
    locale: string,
    category?: string,
    subcategory?: string | Array<string>,
    first?: number,
    skip?: number,
  ) => ({
    queryKey: [locale, subcategory, category],
    queryFn: () => fetchJournalsBySubcategory(locale, category, subcategory, first, skip),
  }),
  journalsByMostRecent: (locale: string, first?: number, skip?: number) => ({
    queryKey: [locale],
    queryFn: () => fetchAllJournalsByMostRecent(locale, first, skip),
  }),
  singleJournal: (locale: string, slug: string | string[]) => ({
    queryKey: [locale],
    queryFn: () => fetchSingleJournal(locale, slug),
  }),
});
