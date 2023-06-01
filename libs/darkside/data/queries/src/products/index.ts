import {
  fetchDatoProductIconList,
  fetchDatoProductInfo,
  fetchDatoProductInstagramReel,
  fetchDatoProductSpec,
  fetchDatoProductTrioBlock,
  fetchDatoProductVideoBlock,
  fetchDatoVariant,
  getProductPage,
} from '@diamantaire/darkside/data/api';
import { ProductTypePlural } from '@diamantaire/shared/constants';
import { createQueryKeys } from '@lukemorales/query-key-factory';

// import type { DarksideGlobalGatewayQueryFunctionContext } from '@diamantaire/shared/types';
// import { QueryOptions } from '@tanstack/react-query';

export const productPage = createQueryKeys('products', {
  variant: (productSlug: string, variantSlug: string) => ({
    queryKey: [productSlug, variantSlug],
    queryFn: () => getProductPage(productSlug, variantSlug),
    // https://tanstack.com/query/v4/docs/react/guides/disabling-queries
    // enabled: false, // prevent auto refetch => TODO: gateway request changes
  }),
  serverSideDatoProductInfo: (productSlug: string, locale: string, productType: ProductTypePlural) => ({
    queryKey: [productSlug, locale, productType],
    queryFn: () => fetchDatoProductInfo(productSlug, locale, productType),
  }),
  productSpec: (id: string, locale: string) => ({
    queryKey: [id, locale],
    queryFn: () => fetchDatoProductSpec(id, locale),
  }),
  productIconList: (productType: string, locale: string) => ({
    queryKey: [productType, locale],
    queryFn: () => fetchDatoProductIconList(productType, locale),
  }),
  productTrioBlock: (id: string, locale: string) => ({
    queryKey: [id, locale],
    queryFn: () => fetchDatoProductTrioBlock(id, locale),
  }),
  productInstagramReel: (id: string, locale: string) => ({
    queryKey: [id, locale],
    queryFn: () => fetchDatoProductInstagramReel(id, locale),
  }),
  productVideoBlock: (id: string, locale: string) => ({
    queryKey: [id, locale],
    queryFn: () => fetchDatoProductVideoBlock(id, locale),
  }),
  datoVariant: (variantSlug: string, locale: string) => ({
    queryKey: [variantSlug, locale],
    queryFn: () => fetchDatoVariant(variantSlug, locale),
  }),
});
