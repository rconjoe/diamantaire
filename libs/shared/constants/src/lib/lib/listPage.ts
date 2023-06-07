import { DIAMOND_TYPES } from './diamond';

export const LIST_PAGE_FILTER_DIAMOND_TYPE = 'shape';
export const LIST_PAGE_FILTER_METAL_COLOR = 'metal';
export const LIST_PAGE_FILTER_STYLE = 'style';
export const LIST_PAGE_FILTER_SUB_CATEGORY = 'subCategory';
export const LIST_PAGE_FILTER_EXTRA = 'extra';
export const LIST_PAGE_FILTER_PRICE = 'price';
export const LIST_PAGE_SORT_FEATURED = 'Featured';
export const LIST_PAGE_SORT_BEST_SELLERS = 'Best Sellers';
export const LIST_PAGE_SORT_PRICE_LOW_TO_HIGH = '$: Low to high';
export const LIST_PAGE_SORT_PRICE_HIGH_TO_LOW = '$: High to low';
export const LIST_PAGE_SORT_NEW = 'New Arrivals';
export const DIAMOND_LIST_PAGE_SLUGS = [...DIAMOND_TYPES, 'round'].map((v) => v + '-cut-diamonds');
export const JEWELRY_LIST_PAGE_SLUGS = [
  'bracelets-jewelry',
  'necklaces-jewelry',
  'rings-jewelry',
  'earrings-jewelry',
  'all-jewelry',
  'new-arrivals-jewelry',
  'iconic-shapes-jewelry',
  'diamond-bezel-collection-jewelry',
  'graduation-gifts-jewelry',
  'stylist-edit-jewelry',
  'stylist-edit-by-samantha-mcmillen-jewelry',
  'last-chance-jewelry',
  'bridal-jewelry',
  'anniversary-gifts-jewelry',
  'diamond-ear-arcs-jewelry',
  'medallion-necklaces-jewelry',
  'signet-ring-collection-jewelry',
  'tetrad-rings-jewelry',
  'petra-flannery-stylist-edit-jewelry',
  'holiday-gifts-jewelry',
  'mixed-cuff-ring-collection-jewelry',
  'solitaire-diamond-collection-jewelry',
  'baguette-collection-jewelry',
  'tiny-diamond-collection-jewelry',
  'valentines-day-edit-jewelry',
  'earrings-gift-jewelry',
  'unisex-gifts-jewelry',
  'birthday-gifts-jewelry',
  'bridesmaid-gifts-jewelry',
  'anniversary-bracelet-gift-jewelry',
  'anniversary-necklace-gift-jewelry',
  'anniversary-gift-jewelry',
  'birthday-gift-jewelry',
  'rings-birthday-gift-jewelry',
  'anniversary-earrings-jewelry',
  'rings-gift-jewelry',
  'birthday-necklace-gift-jewelry',
  'bracelet-gift-jewelry',
  'necklace-gift-jewelry',
  'special-gifts-for-her-jewelry',
  'gifts-under-500-jewelry',
  'gifts-under-1000-jewelry',
  'best-selling-gifts-jewelry',
  'gifts-for-him-jewelry',
  'iconic-shapes',
  'all-jewelry/emerald-cut',
  'all-jewelry/pear-shaped',
  'all-jewelry/round-brilliant',
  'all-jewelry/oval',
  'all-jewelry/marquise',
  'all-jewelry/trillion',
  'all-jewelry/baguette',
  'mothers-day-gifts-jewelry',
  'gifts-for-her-jewelry',
  'new-parents-gifts-jewelry',
  'stacking-earrings-jewelry',
  'layering-necklaces-jewelry',
  'diamond-tennis-collection',
  'black-friday-jewelry',
  'holiday-jewelry-gifts',
  ...DIAMOND_LIST_PAGE_SLUGS,
];
export const SHAPED_BASED_ENGAGEMENT_RING_LIST_PAGE_SLUGS = [
  'round-brilliant-cut-diamond-engagement-rings',
  'oval-cut-diamond-engagement-rings',
  'emerald-cut-diamond-engagement-rings',
  'marquise-cut-diamond-engagement-rings',
  'cushion-cut-diamond-engagement-rings',
  'pear-cut-diamond-engagement-rings',
  'trillion-cut-diamond-engagement-rings',
  'asscher-cut-diamond-engagement-rings',
  'princess-cut-diamond-engagement-rings',
  'radiant-cut-diamond-engagement-rings',
];
export const ENGAGEMENT_RING_METAL_LIST_PAGE_SLUGS = [
  'yellow-gold-engagement-rings',
  'rose-gold-engagement-rings',
  'white-gold-engagement-rings',
  'platinum-engagement-rings',
];
export const ENGAGEMENT_RING_STYLE_LIST_PAGE_SLUGS = [
  'solitaire-engagement-rings',
  'vintage-inspired-engagement-rings',
  'halo-engagement-rings',
  'cathedral-engagement-rings',
  'three-stone-engagement-rings',
  'two-tone-engagement-rings',
  'hidden-halo-engagement-rings',
  'signature-bezel-engagement-rings',
];
export const BUILDER_ENGAGEMENT_RING_LIST_PAGE_SLUGS = [...SHAPED_BASED_ENGAGEMENT_RING_LIST_PAGE_SLUGS, 'engagement-rings'];
export const ER_LIST_PAGE_SLUGS = [
  ...ENGAGEMENT_RING_STYLE_LIST_PAGE_SLUGS,
  ...BUILDER_ENGAGEMENT_RING_LIST_PAGE_SLUGS,
  ...ENGAGEMENT_RING_METAL_LIST_PAGE_SLUGS,
  'engagement-rings-settings',
  'best-engagement-rings',
  'custom-engagement-rings',
  'ethical-engagement-rings',
  'how-to-buy-an-engagement-ring',
  'ring-size-conversion',
  'wedding-rings/yellow-gold-wedding-rings',
  'wedding-rings/rose-gold-wedding-rings',
  'wedding-rings/anniversary-rings',
  'wedding-rings/anniversary-ring',
  'wedding-rings/anniversary-ring',
  'wedding-rings/eternity-rings',
];
export const LIST_PAGE_SLUGS = [
  ...DIAMOND_LIST_PAGE_SLUGS,
  ...JEWELRY_LIST_PAGE_SLUGS,
  ...ER_LIST_PAGE_SLUGS,
  'wedding-bands',
];
