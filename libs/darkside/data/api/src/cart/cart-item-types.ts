export type LooseDiamondAttributeProps = {
  productAsset: string;
  _productAssetObject: string;
  _productTitle: string;
  _productType: string;
  _productTypeTranslated: string;
  _specs: string;
  // This is the setting variant id
  feedId: string;
  // This unifies the setting with the custom diamond
  productGroupKey: string;
  // This refers to the setting url
  pdpUrl: string;
  caratWeight: string;
  clarity: string;
  cut: string;
  color: string;
  lotId: string;
  isChildProduct?: string;
  _dateAdded: string;
  shippingBusinessDays?: string;
  shippingText?: string;
};

export type ERProductCartItemProps = {
  settingVariantId: string;
  settingAttributes: {
    // Fulfillment
    _productType: string;
    _productTypeTranslated: string;
    _productAssetObject: string;
    metalType: string;
    productAsset: string;
    _productTitle: string;
    productIconListShippingCopy: string;
    pdpUrl: string;
    shippingText: string;
    // This is the setting variant id
    feedId: string;
    // This is the engraving text
    _EngravingBack?: string;
    // Should follow pattern: Shape: Round Brilliant;Metal: 18k Yellow Gold;Band: Double pavé;Ring size: 6
    _specs: string;
    // This unifies the setting with the custom diamond
    productGroupKey: string;

    // Item specific stuff
    diamondShape: string;
    // Not sure if this has to be included
    centerStone?: string;
    bandAccent: string;
    _dateAdded: string;
    ringSize: string;

    totalPrice?: string;
    productCategory?: string;

    childProduct: string;
    shippingBusinessDays: string;
  };
  diamonds?: ProductAddonDiamond[];

  hasEngraving: boolean;
  engravingText?: string;
  locale?: string;
};

export type ProductAddonDiamond = {
  variantId: string;
  attributes?: {
    productAsset: string;
    _productAssetObject: string;
    _productTitle: string;
    _productType: string;
    _productTypeTranslated: string;
    productIconListShippingCopy: string;
    shippingBusinessDays: string;
    // This is the setting variant id
    feedId: string;
    // This unifies the setting with the custom diamond
    productGroupKey: string;
    // This refers to the setting url
    pdpUrl: string;
    shippingText: string;
    caratWeight: string;
    clarity: string;
    cut: string;
    color: string;
    lotId: string;
    isChildProduct: string;
    _dateAdded: string;
    _specs: string;
  };
};

export type MiscCartItemProps = {
  variantId: string;
  locale?: string;
  attributes: {
    // Fulfillment
    _productType: 'Gift Card' | 'Ring Sizer';
    productAsset: string;
    _productTitle: string;
    shippingBusinessDays: string;
    productIconListShippingCopy: string;
    productGroupKey: string;
    pdpUrl: string;
    feedId: string;
    shippingText: string;
  };
};

export type JewelryCartItemProps = {
  variantId: string;
  engravingText?: string;
  hasEngraving?: boolean;
  locale?: string;
  attributes: {
    // Fulfillment
    _productType: 'Necklace' | 'Bracelet' | 'Earring';
    metalType: string;
    productAsset: string;
    _productTitle: string;
    shippingBusinessDays: string;
    productIconListShippingCopy: string;
    productGroupKey: string;
    pdpUrl: string;
    feedId: string;
    shippingText: string;
    // Double earrings
    childProduct: string;
    // Item specific stuff
    diamondShape?: string;
    caratWeight?: string;
    chainLength?: string;
    bandWidth?: string;
    ringSize?: string;
    bandAccent?: string;
    totalPriceOverride?: string | null;
  };
};

export type LooseDiamondCartItemProps = {
  diamondVariantId?: string;
  // Fulfillment
  diamondAttributes?: LooseDiamondAttributeProps;
  locale?: string;
};

interface AttributeInput {
  key: string;
  value: string;
}
export type CreateCartVariables = {
  lineItems?: Array<{ merchandiseId: string; quantity: number; customAttributes?: AttributeInput[] }>;
  email?: string;
  countryCode?: string;
  attributes?: AttributeInput[];
};
