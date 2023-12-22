import { SiteLocale } from '@diamantaire/_generated/datocms';

export type ERProductCartItemProps = {
  settingVariantId: string;
  settingAttributes: {
    // Fulfillment
    _productType: string;
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
    _dateAdded: string;
    ringSize: string;

    totalPrice?: string;
    productCategory?: string;

    childProduct: string;
  };
  diamondVariantId?: string;
  diamondAttributes?: {
    productAsset: string;
    _productTitle: string;
    _productType: string;
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
  };
  hasEngraving: boolean;
  engravingText?: string;
  locale?: string;
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
  diamondAttributes?: {
    productAsset: string;
    _productTitle: string;
    _productType: string;
    productIconListShippingCopy: string;
    shippingBusinessDays: string;
    // This is the diamond variant id - not sure if needed
    // feedId: string;
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
    // isChildProduct: string;
    _dateAdded: string;
  };
  locale?: string;
};

export type CreateCartVariables = {
  email: string;
  countryCode: string;
};
