import { z } from 'zod';

import { transformedShopifyProductSchema } from '../utils/normalizers/product';
export type VraiProduct = z.infer<typeof transformedShopifyProductSchema>;

export type VraiProductContent = {
  shouldUseDefaultPrice?: boolean;
  hasOnlyOnePrice?: boolean;
  productLabel?: {
    title: string;
  };
};
export type VraiProductData = { content: VraiProductContent; product: VraiProduct; metal?: Record<string, string> };

// TODO: move somewhere else
type ProgressiveImage = {
  webpSrcSet: string[];
  sizes: string[];
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  alt: string;
  title: string;
  bgColor: string;
  base64: string;
};

export type ListPageItemConfiguration = {
  productSlug: string;
  productType: string;
  collectionSlug: string;
  title: string;
  price: number;
  configuration: Record<string, string>;
  primaryImage: ProgressiveImage;
  hoverImage?: ProgressiveImage;
};

export type ListPageItemWithConfigurationVariants = {
  defaultId: string;
  productType: string;
  productLabel?: string;
  useLowestPrice?: boolean;
  lowestPrice?: number;
  hasOnlyOnePrice?: boolean;
  metal: { value: string; id: string }[];
  variants: {
    [variantId: string]: ListPageItemConfiguration;
  };
};

export type FilterTypeProps = 'metal' | 'diamondType' | 'price' | 'styles' | 'subStyles';
export type FilterValueProps = {
  metal?: string;
  diamondType?: string;
  price?: {
    min?: number;
    max?: number;
  };
  styles?: string;
  subStyles?: string;
};
