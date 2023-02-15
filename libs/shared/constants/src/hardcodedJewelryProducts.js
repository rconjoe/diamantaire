import {
  MODULAR_BRACELET_PRODUCT_SLUGS,
  MODULAR_EARRING_PRODUCT_SLUGS,
  MODULAR_NECKLACE_PRODUCT_SLUGS,
  MODULAR_RING_PRODUCT_SLUGS,
} from './hardcodedModularJewelryProducts';

export const RANGE_RINGSIZE_SLUGS = ['tiny-diamond-cuff-ring'];

const PREVIOUS_SLUGS_OF_MODULAR_BRACELETS = [
  // Used to redirect to their associated modular version
  'round-diamond-tennis-bracelet-2-75-ctw',
  'round-diamond-tennis-bracelet-4-50-ctw',
  'round-diamond-tennis-bracelet-8-50-ctw',
  'baguette-diamond-bezel-bracelet',
  'marquise-diamond-bezel-bracelet',
  'trillion-diamond-bezel-bracelet',
  'round-diamond-bezel-bracelet',
  'round-diamond-tennis-bracelet-petite',
  'round-diamond-tennis-bracelet-medium',
  'round-diamond-tennis-bracelet-large',
  'baguette-tennis-bracelet',
];

export const BRACELET_PRODUCT_SLUGS = [...PREVIOUS_SLUGS_OF_MODULAR_BRACELETS, ...MODULAR_BRACELET_PRODUCT_SLUGS];

const PREVIOUS_SLUGS_OF_MODULAR_NECKLACES = [
  // Used to redirect to their associated modular version
  'solitaire-emerald-diamond-necklace',
  'solitaire-emerald-diamond-pendant',
  'solitaire-marquise-diamond-necklace',
  'solitaire-marquise-diamond-pendant',
  'solitaire-oval-diamond-necklace',
  'solitaire-oval-diamond-pendant',
  'solitaire-pear-diamond-necklace',
  'solitaire-pear-diamond-pendant',
  'solitaire-round-brilliant-diamond-necklace',
  'solitaire-round-brilliant-diamond-pendant',
  'solitaire-trillion-diamond-necklace',
  'solitaire-trillion-diamond-pendant',
  'baguette-diamond-bezel-necklace',
  'marquise-diamond-bezel-necklace',
  'round-diamond-bezel-necklace',
  'trillion-diamond-bezel-necklace',
];

export const NECKLACE_PRODUCT_SLUGS = [...PREVIOUS_SLUGS_OF_MODULAR_NECKLACES, ...MODULAR_NECKLACE_PRODUCT_SLUGS];

export const PREVIOUS_SLUGS_OF_MODULAR_RINGS = [
  // Used to redirect to their associated modular version
  'baguette-diamond-bezel-ring',
  'marquise-diamond-bezel-ring',
  'round-diamond-bezel-ring',
  'trillion-diamond-bezel-ring',
  'emerald-diamond-tetrad',
  'marquise-diamond-tetrad',
  'oval-diamond-tetrad',
  'round-diamond-tetrad',
  'the-emerald-signet-ring',
  'the-marquise-signet-ring',
  'the-oval-signet-ring',
];

export const RING_PRODUCT_SLUGS = [...PREVIOUS_SLUGS_OF_MODULAR_RINGS, ...MODULAR_RING_PRODUCT_SLUGS];

const PREVIOUS_SLUGS_OF_MODULAR_EARRINGS = [
  // Used to redirect to their associated modular version
  'emerald-4-diamond-ear-arc',
  'emerald-6-diamond-ear-arc',
  'marquise-4-diamond-ear-arc',
  'marquise-6-diamond-ear-arc',
  'pear-4-diamond-ear-arc',
  'pear-6-diamond-ear-arc',
  'round-4-diamond-ear-arc',
  'round-6-diamond-ear-arc',
  'solitaire-emerald-diamond-drop-ear-jacket',
  'solitaire-emerald-diamond-studs',
  'solitaire-marquise-diamond-studs',
  'solitaire-oval-diamond-drop-ear-jacket',
  'solitaire-oval-diamond-studs',
  'solitaire-pear-diamond-drop-ear-jacket',
  'solitaire-pear-diamond-studs',
  'solitaire-round-brilliant-diamond-drop-ear-jacket',
  'solitaire-round-brilliant-diamond-studs',
  'solitaire-trillion-diamond-drop-ear-jacket',
  'solitaire-trillion-diamond-studs',
  'baguette-diamond-bezel-drop-huggie-hoops-large',
  'baguette-diamond-bezel-drop-huggie-hoops-petite',
  'marquise-diamond-bezel-drop-huggie-hoops-large',
  'marquise-diamond-bezel-drop-huggie-hoops-petite',
  'round-diamond-bezel-drop-huggie-hoops-large',
  'round-diamond-bezel-drop-huggie-hoops-petite',
  'trillion-diamond-bezel-drop-huggie-hoops-large',
  'trillion-diamond-bezel-drop-huggie-hoops-petite',
  'baguette-diamond-bezel-earrings',
  'marquise-diamond-bezel-earrings',
  'round-diamond-bezel-earrings',
  'trillion-diamond-bezel-earrings',
];

export const EARRING_PRODUCT_SLUGS = [...PREVIOUS_SLUGS_OF_MODULAR_EARRINGS, ...MODULAR_EARRING_PRODUCT_SLUGS];

export const JEWELRY_PRODUCT_SLUGS = [
  ...BRACELET_PRODUCT_SLUGS,
  ...NECKLACE_PRODUCT_SLUGS,
  ...RING_PRODUCT_SLUGS,
  ...EARRING_PRODUCT_SLUGS,
];
