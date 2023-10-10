import { VraiProduct } from '@diamantaire/shared-product';
export interface ProductVariantPDPData extends VraiProduct {
  productType: string;
  optionConfigs: OptionsConfigurations;
  collectionContent: object; // Need DATOCMS types
  productContent: object; // dato er variant content
  canonicalVariant: VraiProduct;
}

export interface OptionsConfigurations {
  [optionType: string]: OptionConfiguration[];
}

export interface OptionConfiguration {
  id: string;
  value: string;
}
export interface ProductOptions {
  handle?: string;
  variantId?: string;
  first?: number;
  country?: string;
  after?: string;
}

export interface ItemType {
  product?: string;
  collection?: string;
}

export interface ProductCollection {
  handle?: string;
  productTitle?: string;
  dangerousInternalCollectionId?: string;
  slug?: string;
  productType?: string;
  dangerousInternalProductId?: string;
  description?: string;
  variants?: Variant[];
}

export interface Variant {
  shopifyProductHandle?: string;
  shopifyProductTitle?: string;
  id?: string;
  sku?: string;
  title?: string;
  availableForSale?: boolean;
  price?: Price;
  quantityAvailable?: number;
  options?: Options;
}

export interface Options {
  metal?: string;
  bandAccent?: string;
  diamondType?: string;
  sideStoneCarat?: string;
  sideStoneShape?: string;
  goldPurity?: string;
  ringSize?: string;
  side?: string;
  diamondOrientation?: 'horizontal' | null;
}

export interface Price {
  amount?: string;
  currencyCode?: string;
}

export type OmegaProductRecord = {
  _modelApiKey: 'omega_product';
  id: string;
  shopifyProductHandle: string;
  collection: {
    slug: string;
    productType: string;
    productLabel: {
      name: string;
    } | null;
    subCategory: string[];
    shouldUseDefaultPrice: boolean | null;
  };
};

export type ConfigurationRecord = {
  _modelApiKey: 'configuration';
  id: string;
  variantId: string;
  configuredProductOptionsInOrder: string;
  jewelryProduct: {
    slug: string;
    category: string;
    subCategory: string[];
    productLabel: { name: string } | null;
    productAccordionSpecsLabel: { productType: string };
    shouldUseDefaultPrice: boolean | null;
    hasOnlyOnePrice: boolean | null;
  };
};

export type CollectionRecord = EngagementRingProductRecord; // | WeddingBandProductRecord | JewelryProductRecord;

export type EngagementRingProductRecord = {
  id: string;
  _modelApiKey: 'engagement_ring_product';
  slug: string;
  // Not complete definition. Ideally its properly defined and then picked for the record above
};

export type PLPResponse = {
  listPage: {
    configurationsInOrder: (ConfigurationRecord | OmegaProductRecord)[];
    productsInOrder: OmegaProductRecord[];
    collectionsInOrder: CollectionRecord[];
  } & Record<string, unknown>;
};
