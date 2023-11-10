import {
  fetchDatoProductIconList,
  fetchDatoProductInfo,
  fetchDatoProductInstagramReel,
  fetchDatoProductSpec,
  fetchDatoProductSuggestionBlock,
  fetchDatoProductTrioBlock,
  fetchDatoProductVideoBlock,
  fetchDatoVariant,
  fetchPDPGwpData,
  getProductDiamondTypes,
  getProductPage,
} from '@diamantaire/darkside/data/api';
import { PdpTypePlural } from '@diamantaire/shared/constants';
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
  serverSideDatoProductInfo: (productSlug: string, locale: string, productType: PdpTypePlural) => ({
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
  productSuggestions: (id: string, locale: string) => ({
    queryKey: [id, locale],
    queryFn: () => fetchDatoProductSuggestionBlock(id, locale),
  }),
  datoVariant: (variantSlug: string, locale: string) => ({
    queryKey: [variantSlug, locale],
    queryFn: () => fetchDatoVariant(variantSlug, locale),
  }),
  productDiamondTypes: (productSlug: string) => ({
    queryKey: [productSlug],
    queryFn: () => getProductDiamondTypes(productSlug),
  }),
  gwp: (locale: string) => ({
    queryKey: [locale],
    queryFn: () => fetchPDPGwpData(locale),
  }),
});
