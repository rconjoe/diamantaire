import {
  fetchListPageDatoBlocksBySlug,
  fetchPlpDatoCreativeBlocks,
  fetchPlpDatoPromoCardCollection,
  fetchPlpDatoServerData,
  fetchPlpShopTheLook,
  fetchPlpGwpData,
} from '@diamantaire/darkside/data/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const plpListPage = createQueryKeys('plp', {
  serverSideDato: (locale: string, slug: string | string[], category: string) => ({
    queryKey: [locale, slug],
    queryFn: () => fetchPlpDatoServerData(locale, slug?.toString(), category),
  }),
  promoCardCollection: (locale: string, id: string) => ({
    queryKey: [locale, id],
    queryFn: () => fetchPlpDatoPromoCardCollection(locale, id),
  }),
  creativeBlocks: (
    locale: string,
    ids: string[],
    useLargeCreativeImageInDesktop: boolean,
    useLargeCreativeImageInMobile: boolean,
  ) => ({
    queryKey: [locale, ids],
    queryFn: () => fetchPlpDatoCreativeBlocks(locale, ids, useLargeCreativeImageInDesktop, useLargeCreativeImageInMobile),
  }),
  plpBlockPickerBlocks: (locale: string, slug: string, category: string) => ({
    queryKey: [locale, slug, category],
    queryFn: () => fetchListPageDatoBlocksBySlug(locale, slug, category),
  }),
  gwp: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchPlpGwpData(locale),
  }),
  plpShopTheLook: (productIds: string[], locale) => ({
    queryKey: [productIds, locale],
    queryFn: () => fetchPlpShopTheLook(productIds, locale),
  }),
});
