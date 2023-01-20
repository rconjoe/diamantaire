export interface ProductVariantPDPData {
  productId: string;
  productType: string;
  optionConfigs: OptionsConfigurations;
  collectionContent: object; // Need DATOCMS types
  variantContent: object; // dato er variant content
  canonicalVariant: Variant;
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
}

export interface Price {
  amount?: string;
  currencyCode?: string;
}
