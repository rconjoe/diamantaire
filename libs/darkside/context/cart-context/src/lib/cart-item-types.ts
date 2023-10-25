export type ERProductCartItemProps = {
  settingVariantId: string;
  settingAttributes: {
    // Fulfillment
    productType: 'Engagement Ring';
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
    centerStone: string;
    bandAccent: string;
  };
  diamondVariantId?: string;
  diamondAttributes?: {
    productAsset: string;
    _productTitle: string;
    productIconListShippingCopy: string;
    shippingBusinessDays: string;
    // This is the setting variant id
    feedId: string;
    // This unifies the setting with the custom diamond
    productGroupKey: string;
    // This refers to the setting url
    pdpUrl: string;
    shippingText: string;
  };
};

export type JewelryCartItemProps = {
  variantId: string;
  attributes: {
    // Fulfillment
    productType: 'Necklace' | 'Bracelet' | 'Earring';
    metalType: string;
    productAsset: string;
    _productTitle: string;
    shippingBusinessDays: string;
    productIconListShippingCopy: string;
    productGroupKey: string;
    pdpUrl: string;
    _specs: string;
    feedId: string;
    shippingText: string;
    childProduct: {
      behavior: 'linked' | 'duplicate';
    } | null;
  };
};
