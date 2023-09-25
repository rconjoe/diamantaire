export enum ProductType {
  EngagementRing = 'Engagement Ring',
  WeddingBand = 'Wedding Band',
  Bracelet = 'Bracelet',
  Earrings = 'Earrings',
  Necklace = 'Necklace',
  Ring = 'Ring',
}
export enum ProductTypePlural {
  EngagementRings = 'Engagement Rings',
  WeddingBands = 'Wedding Bands',
  Bracelets = 'Bracelets',
  Earrings = 'Earrings',
  Necklaces = 'Necklaces',
  Rings = 'Rings',
  Jewelry = 'Jewelry',
}
export const PDPProductType = {
  ['Engagement Ring']: 'Engagement Rings',
  ['Jewelry']: 'Jewelry',
  ['engagement-rings']: 'Engagement Rings',
  ['jewelry']: 'Jewelry',
} as const;

export const WEDDING_BAND_PRODUCT_TYPE = 'Wedding Band';
export const ENGAGEMENT_RING_PRODUCT_TYPE = 'Engagement Ring';
export const EARRING_PRODUCT_TYPE = 'Earrings';
export const NECKLACE_PRODUCT_TYPE = 'Necklace';
export const BRACELET_PRODUCT_TYPE = 'Bracelet';
export const DIAMONDS_PRODUCT_TYPE = 'Diamonds';
export const RING_PRODUCT_TYPE = 'Ring';
export const RING_SIZER_PRODUCT_TYPE = 'Ring Sizer';
export const GIFT_CARD_PRODUCT_TYPE = 'Gift Card';
export const ACCESSORY_PRODUCT_TYPE = 'Accessory';
export const GWP_PRODUCT_TYPE = 'GWP';
export const EARRINGS_CATEGORY = 'earrings';
export const NECKLACES_CATEGORY = 'necklaces';
export const BRACELETS_CATEGORY = 'bracelets';
export const RINGS_CATEGORY = 'rings';
export const ACCESSORIES_CATEGORY = 'accessories';
export const JEWELRY_CATEGORY_PRODUCT_TYPES = {
  [RINGS_CATEGORY]: RING_PRODUCT_TYPE,
  [NECKLACES_CATEGORY]: NECKLACE_PRODUCT_TYPE,
  [EARRINGS_CATEGORY]: EARRING_PRODUCT_TYPE,
  [BRACELETS_CATEGORY]: BRACELET_PRODUCT_TYPE,
  [ACCESSORIES_CATEGORY]: ACCESSORY_PRODUCT_TYPE,
};
