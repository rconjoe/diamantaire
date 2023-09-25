import {
  fetchListPageDatoBlocksBySlug,
  fetchPlpDatoCreativeBlocks,
  fetchPlpDatoPromoCardCollection,
  fetchPlpDatoServerData,
} from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const plpListPage = createQueryKeys('plp', {
  serverSideDato: (locale: string, slug: string | string[], category: string) => ({
    queryKey: [locale, slug],
    queryFn: () => fetchPlpDatoServerData(locale, slug.toString(), category),
  }),
  promoCardCollection: (locale: string, id: string) => ({
    queryKey: [locale, id],
    queryFn: () => fetchPlpDatoPromoCardCollection(locale, id),
  }),
  creativeBlocks: (locale: string, ids: string[]) => ({
    queryKey: [locale, ids],
    queryFn: () => fetchPlpDatoCreativeBlocks(locale, ids),
  }),
  plpBlockPickerBlocks: (locale: string, slug: string) => ({
    queryKey: [locale, slug],
    queryFn: () => fetchListPageDatoBlocksBySlug(locale, slug),
  }),
});
