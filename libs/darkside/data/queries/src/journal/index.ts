import {
  fetchJournalsByCategory,
  fetchJournalConfig,
  fetchJournalHeader,
  fetchAllJournalsByMostRecent,
  fetchSingleJournal,
  fetchJournalsBySubcategory,
} from '@diamantaire/darkside/data/api';
import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const journal = createQueryKeys('journal', {
  config: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => fetchJournalConfig(ctx.meta.locale),
  }),
  journalHeader: (locale: string) => ({
    queryKey: [locale],
    queryFn: (ctx: DarksideGlobalGatewayQueryFunctionContext) => fetchJournalHeader(ctx.meta.locale),
  }),
  journalsByCategory: (locale: string, category: string, first?: number, skip?: number) => ({
    queryKey: [category],
    queryFn: () => fetchJournalsByCategory(locale, category, first, skip),
  }),
  journalsBySubcategory: (
    locale: string,
    category?: string | Array<string>,
    subcategory?: string | Array<string>,
    first?: number,
    skip?: number,
  ) => ({
    queryKey: [locale],
    queryFn: () => fetchJournalsBySubcategory(locale, category, subcategory, first, skip),
  }),
  journalsByMostRecent: (locale: string, first?: number, skip?: number) => ({
    queryKey: [locale],
    queryFn: () => fetchAllJournalsByMostRecent(locale, first, skip),
  }),
  singleJournal: (locale: string, slug: string) => ({
    queryKey: [locale],
    queryFn: () => fetchSingleJournal(locale, slug),
  }),
});
