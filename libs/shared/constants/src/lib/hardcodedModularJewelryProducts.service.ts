import { RANDM_RING_SLUGS } from './constant.service';
/**
 * The slugs in this file correspond to the Jewelry Product
 * model on Dato.

*/

export const MODULAR_EARRING_PRODUCT_SLUGS = [
  'solitaire-diamond-studs',
  'solitaire-diamond-drop-ear-jacket',
  'diamond-ear-arc',
  'diamond-bezel-drop-huggie-hoops',
  'iconic-diamond-studs',
  'diamond-bezel-earrings',
  'baguette-semi-bezel-studs',
  'mixed-drop-earrings',
  'semi-bezel-stud',
  'illuminate-hoops',
  'illuminate-stud',
  'unity-ear-arc',
  'connected-earring',
  'baguette-studs',
  'ear-arc',
  'del-sol-drop-earrings',
  'round-brilliant-diamond-ear-cuff',
  'half-moon-diamond-ear-cuff',
  'pave-huggie-hoops',
  'chateau-studs',
  'perennial-stud',
  'eternity-hoop',
  'blossom-stud',
  'halo-diamond-stud',
  'bezel-solitaire-stud',
  'shooting-star-earring',
  'orion-stud',
  'shooting-star-earring',
  'shooting-star-ear-climber',
  'duo-stud',
  'duo-dangle-earring',
  'duo-drop-earring',
  'linked-tennis-earring',
  'petite-solitaire-stud',
  'petite-pave-bar-stud',
  'petite-pave-v-stud',
  'pave-cluster-stud',
  'tennis-earring',
];

export const MODULAR_NECKLACE_PRODUCT_SLUGS = [
  'solitaire-diamond-necklace',
  'solitaire-diamond-pendant',
  'diamond-bezel-necklace',
  'baguette-semi-bezel-necklace',
  'iconic-diamond-necklace',
  'semi-bezel-necklace',
  'illuminate-choker',
  'strength-necklace',
  'currency-necklace',
  'baguette-necklace',
  'inner-light-medallion',
  'inner-fire-medallion',
  'celestial-double-strand-tennis-necklace',
  'neptune-floating-necklace',
  'tiny-diamond-station-necklace',
  'inner-spirit-medallion',
  'diamond-bezel-station-necklace',
  'north-star-medallion',
  'vrai-single-diamond-cross-necklace',
  'intentions-medallion',
  'perennial-necklace',
  'solitaire-cross-necklace',
  'star-of-david-pendant',
  'crescent-moon-pendant',
  'hamsa-hand-pendant',
  'blossom-necklace',
  'halo-diamond-necklace',
  'tennis-necklace',
  'suspended-solitaire-cross',
  'arc-diamond-necklace',
  'bezel-solitaire-necklace',
  'halo-diamond-pendant',
  'orion-necklace',
  'duo-lariat-necklace',
  'duo-drop-necklace',
  'linked-tennis-necklace',
  'petite-solitaire-pendant',
  'petite-pave-bar-necklace',
  'petite-pave-v-necklace',
  'pave-cluster-necklace',
];

export const MODULAR_BRACELET_PRODUCT_SLUGS = [
  'diamond-bezel-bracelet',
  'tennis-bracelet',
  'illuminate-bracelet',
  'unity-bracelet',
  'tiny-diamond-bracelet',
  'tiny-diamond-station-bracelet',
  'diamond-bezel-station-bracelet',
  'perennial-cuff',
  'petal-cuff',
  'bezel-solitaire-bracelet',
  'mixed-shape-bracelet',
  'orion-bracelet',
  'duo-lariat-bracelet',
  'linked-tennis-bracelet',
  'petite-solitaire-bracelet',
];

export const MODULAR_UNIQUE_EARRING_PRODUCT_SLUGS = ['solitaire-diamond-studs', 'halo-diamond-stud', 'bezel-solitaire-stud'];

export const MODULAR_UNIQUE_NECKLACE_PRODUCT_SLUGS = [
  'solitaire-diamond-necklace',
  'solitaire-diamond-pendant',
  'halo-diamond-necklace',
  'bezel-solitaire-necklace',
  'halo-diamond-pendant',
];

export const MODULAR_UNIQUE_DIAMOND_PRODUCT_SLUGS = [
  ...MODULAR_UNIQUE_NECKLACE_PRODUCT_SLUGS,
  ...MODULAR_UNIQUE_EARRING_PRODUCT_SLUGS,
];

export const WHOLE_SIZE_RING_SLUGS = ['perennial-ring', 'petal-ring', 'trellis-ring', 'orion-ring'];
export const MODULAR_RING_PRODUCT_SLUGS = [
  'diamond-signet-ring',
  'diamond-bezel-ring',
  'diamond-tetrad',
  'mixed-cuff-ring',
  'tiny-diamond-cuff-ring',
  'the-pave-signet-ring',
  'tiny-diamond-ring',
  'pave-cluster-ring',
  ...WHOLE_SIZE_RING_SLUGS,
  ...RANDM_RING_SLUGS,
];

// Mixed diamond products have combined diamond types
// That is only used on when we filter list page products
export const MIX_DIAMOND_PRODUCT_SLUGS = [
  'mixed-drop-earrings',
  'illuminate-stud',
  'illuminate-choker',
  'illuminate-hoops',
  'unity-ear-arc',
  'connected-earring',
  'unity-bracelet',
  'illuminate-bracelet',
  'unity-ring',
  'chateau-studs',
  'hearst-hairpin',
  'del-sol-drop-earrings',
  'celestial-double-strand-tennis-necklace',
  'neptune-floating-necklace',
];
export const GIFT_CARD_PRODUCT_SLUGS = ['digital-gift-card'];
export const GWP_PRODUCT_SLUGS = [
  'signature-scent',
  'signature-candle',
  'gwp-cuban-link-bracelet',
  'gwp-lightweight-hoops',
  'gwp-silk-box-chain',
  'gwp-marquise-chain-bracelet',
  'gwp-tiny-studs',
];
export const RING_SIZER_PRODUCT_SLUGS = ['ring-sizer'];
export const ACCESSORY_PRODUCT_SLUGS = ['hearst-hairpin', 'lapel-pin'];

export const MODULAR_JEWELRY_PRODUCT_SLUGS = [
  ...MODULAR_EARRING_PRODUCT_SLUGS,
  ...MODULAR_NECKLACE_PRODUCT_SLUGS,
  ...MODULAR_BRACELET_PRODUCT_SLUGS,
  ...MODULAR_RING_PRODUCT_SLUGS,
  ...MODULAR_UNIQUE_DIAMOND_PRODUCT_SLUGS,
  ...GIFT_CARD_PRODUCT_SLUGS,
  ...GWP_PRODUCT_SLUGS,
  ...RING_SIZER_PRODUCT_SLUGS,
  ...ACCESSORY_PRODUCT_SLUGS,
];

export default MODULAR_JEWELRY_PRODUCT_SLUGS;

// These are for redirects
export const MODULARIZED_SLUG_ASSOCIATIONS = {
  'baguette-diamond-bezel-bracelet': 'diamond-bezel-bracelet',
  'marquise-diamond-bezel-bracelet': 'diamond-bezel-bracelet',
  'trillion-diamond-bezel-bracelet': 'diamond-bezel-bracelet',
  'round-diamond-bezel-bracelet': 'diamond-bezel-bracelet',
  'baguette-diamond-bezel-necklace': 'diamond-bezel-necklace',
  'marquise-diamond-bezel-necklace': 'diamond-bezel-necklace',
  'round-diamond-bezel-necklace': 'diamond-bezel-necklace',
  'trillion-diamond-bezel-necklace': 'diamond-bezel-necklace',
  'baguette-diamond-bezel-ring': 'diamond-bezel-ring',
  'marquise-diamond-bezel-ring': 'diamond-bezel-ring',
  'round-diamond-bezel-ring': 'diamond-bezel-ring',
  'trillion-diamond-bezel-ring': 'diamond-bezel-ring',
  'emerald-diamond-tetrad': 'diamond-tetrad',
  'marquise-diamond-tetrad': 'diamond-tetrad',
  'oval-diamond-tetrad': 'diamond-tetrad',
  'round-diamond-tetrad': 'diamond-tetrad',
  'the-emerald-signet-ring': 'diamond-signet-ring',
  'the-marquise-signet-ring': 'diamond-signet-ring',
  'the-oval-signet-ring': 'diamond-signet-ring',
  'baguette-diamond-bezel-earrings': 'diamond-bezel-earrings',
  'marquise-diamond-bezel-earrings': 'diamond-bezel-earrings',
  'round-diamond-bezel-earrings': 'diamond-bezel-earrings',
  'trillion-diamond-bezel-earrings': 'diamond-bezel-earrings',
};
