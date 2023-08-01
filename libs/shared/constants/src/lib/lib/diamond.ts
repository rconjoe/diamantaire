import { createDisplayOrderFromOptionNames } from '../constant.helpers';

export const MIN_DIAMOND_CARAT = 0.3;

// Settings to ignore filters entirely
export const CARAT_SIZE_TO_ONLY_APPLY_COLOR_FILTER = 2.5;
export const ACCEPTABLE_COLORS_FOR_LARGEST_STONES = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'N', 'YELLOW'];

// Filters for regular size diamonds
export const ACCEPTABLE_COLORS = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'k', 'L'];
export const ACCEPTABLE_CUTS = ['Excellent', 'Ideal', 'Ideal+Hearts'];
export const ACCEPTABLE_CLARITIES = ['SI1', 'SI2', 'VS2', 'VS1', 'VVS1', 'VVS2'];
export const ACCEPTABLE_DIAMOND_TYPE_PAIRS = [
  ['emerald', 'pear'],
  ['round-brilliant', 'pear'],
  ['round-brilliant', 'oval'],
];
// Filters for small diamonds

export const SMALL_DIAMOND_CARAT_THRESHOLD = 0.85;
export const SMALL_DIAMOND_COLORS = ['H', 'G', 'F', 'E', 'D'];
export const SMALL_DIAMOND_CUTS = ACCEPTABLE_CUTS;
export const SMALL_DIAMOND_CLARITIES = ['VS1', 'VVS1', 'VVS2'];
export const COLORS_TO_IGNORE_FILTERS = ['D', 'E', 'F', 'YELLOW'];

// Flters for big diamonds.
// These are very similar to regular diamonds right now,
// but I imagine these will change in the future so I am
// leaving the settings here for now.
export const BIG_DIAMOND_CARAT_THRESHOLD = 2.0;
export const BIG_DIAMOND_COLORS = ACCEPTABLE_COLORS;
export const BIG_DIAMOND_CUTS = ACCEPTABLE_CUTS;
export const BIG_DIAMOND_CLARITIES = ACCEPTABLE_CLARITIES;

export enum DiamondTypes {
  Asscher = 'asscher',
  Baguette = 'baguette',
  Cushion = 'cushion',
  Emerald = 'emerald',
  HalfMoon = 'half-moon',
  Hexagon = 'hexagon',
  Keystone = 'keystone',
  LongHexagon = 'long-hexagon',
  Lozenge = 'lozenge',
  Marquise = 'marquise',
  Octavia = 'octavia',
  Oval = 'oval',
  Pear = 'pear',
  Princess = 'princess',
  Radiant = 'radiant',
  RoundBrilliant = 'round-brilliant',
  Shiled = 'shield',
  TaperedBaguette = 'tapered-baguette',
  Trillion = 'trillion',
  // TODO: incomplete, missing mixed diamond types
}

export const DIAMOND_TYPE_HUMAN_NAMES = {
  'round-brilliant': 'Round Brilliant',
  oval: 'Oval',
  emerald: 'Emerald',
  marquise: 'Marquise',
  cushion: 'Cushion',
  pear: 'Pear',
  trillion: 'Trillion',
  baguette: 'Baguette',
  'tapered-baguette': 'Tapered Baguette',
  asscher: 'Asscher',
  princess: 'Princess',
  'half-moon': 'Half moon',
  shield: 'Shield',
  octavia: 'Octavia',
  lozenge: 'Lozenge',
  longHexagon: 'Long Hexagon',
  hexagon: 'Hexagon',
  keystone: 'Keystone',
  radiant: 'Radiant',
  'baguette+oval': 'Baguette and Oval',
  'baguette+trillion': 'Baguette and Trillion',
  'baguette+marquise': 'Baguette and Marquise',
  'marquise+round-brilliant': 'Marquise and Round Brilliant',
  'marquise+trillion': 'Marquise and Trillion',
  'marquise+baguette': 'Marquise and Baguette',
  'oval+trillion': 'Oval and Trillion',
  'lozenge+round-brilliant': 'Lozenge and Round Brilliant',
  'emerald+pear': 'Emerald and Pear',
  'round-brilliant+pear': 'Round Brilliant and Pear',
  'round-brilliant+oval': 'Round Brilliant and Oval',
  'round-brilliant+emerald': 'Round Brilliant and Emerald',
  'round-brilliant+baguette': 'Round Brilliant and Baguette',
  'round-brilliant+baguette+marquise': 'Round Brilliant, Baguette, and Marquise',
};
export const DIAMOND_TYPE_META_TITLE_HUMAN_NAMES = {
  'round-brilliant': 'Round Brilliant',
  oval: 'Oval',
  emerald: 'Emerald',
  marquise: 'Marquise',
  cushion: 'Cushion',
  pear: 'Pear',
  trillion: 'Trillion',
  baguette: 'Baguette',
  'tapered-baguette': 'Tapered Baguette',
  asscher: 'Asscher',
  princess: 'Princess',
  'half-moon': 'Half moon',
  shield: 'Shield',
  octavia: 'Octavia',
  lozenge: 'Lozenge',
  longHexagon: 'Long Hexagon',
  hexagon: 'Hexagon',
  keystone: 'Keystone',
  radiant: 'Radiant',
  'baguette+oval': 'Baguette and Oval',
  'baguette+trillion': 'Baguette and Trillion',
  'baguette+marquise': 'Baguette and Marquise',
  'marquise+trillion': 'Marquise and Trillion',
  'oval+trillion': 'Oval and Trillion',
  'lozenge+round-brilliant': 'Lozenge and Round Brilliant',
  'emerald+pear': 'Emerald and Pear',
  'round-brilliant+pear': 'Round Brilliant and Pear',
  'round-brilliant+oval': 'Round Brilliant and Oval',
  'round-brilliant+emerald': 'Round Brilliant and Emerald',
  'round-brilliant+baguette': 'Round Brilliant and Baguette',
  'round-brilliant+baguette+marquise': 'Round Brilliant, Baguette, and Marquise',
};
export const INVERTED_DIAMOND_TYPE_HUMAN_NAMES = {
  'Round Brilliant': 'round-brilliant',
  Oval: 'oval',
  Emerald: 'emerald',
  Marquise: 'marquise',
  Cushion: 'cushion',
  Pear: 'pear',
  Trillion: 'trillion',
  Baguette: 'baguette',
  'Tapered Baguette': 'tapared-baguette',
  'Half moon': 'half-moon',
  Radiant: 'radiant',
};
export const DIAMOND_TYPES = [
  'round-brilliant',
  'oval',
  'emerald',
  'marquise',
  'cushion',
  'pear',
  'trillion',
  'asscher',
  'princess',
  'radiant',
];
export const MIX_DIAMOND_TYPE = {
  MARQUISE_AND_TRILLION: 'marquise+trillion',
  MARQUISE_AND_BAGUETTE: 'marquise+baguette',
  MARQUISE_AND_ROUND: 'marquise+round-brilliant',
  OVAL_AND_TRILLION: 'oval+trillion',
  BAGUETTE_AND_OVAL: 'baguette+oval',
  BAGUETTE_AND_TRILLION: 'baguette+trillion',
  BAGUETTE_AND_MARQUISE: 'baguette+marquise',
  ROUND_AND_EMERALD: 'round-brilliant+emerald',
  ROUND_AND_BAGUETTE: 'round-brilliant+baguette',
  EMERALD_AND_PEAR: 'emerald+pear',
  ROUND_AND_PEAR: 'round-brilliant+pear',
  ROUND_AND_OVAL: 'round-brilliant+oval',
  PEAR_AND_ROUND_AND_EMERALD: 'pear+round-brilliant+emerald',
  PEAR_AND_ROUND_AND_BAGUETTE: 'pear+round-brilliant+baguette',
  PEAR_AND_ROUND_AND_BAGUETTE_AND_TRILLION_AND_MARQUISE: 'pear+round-brilliant+baguette+trillion+marquise',
  HEXAGON_AND_LOZENGE_AND_MARQUISE: 'hexagon+lozenge+marquise',
  EMERALD_AND_MARQUISE_AND_ROUND_AND_LOZENGE: 'emerald+maquise+round-brilliant+lozenge',
  TRILLION_AND_PEAR_AND_MARQUISE_AND_HALF_MOON_AND_LOZENGE_KITE_AND_HEXAGON:
    'trillion+pear+marquise+half-moon+lozenge+kite+hexagon',
  LOZENGE_AND_ROUND: 'lozenge+round-brilliant',
  LOZENGE_AND_HALF_MOON_AND_HEXAGON_AND_BAGUETTE_AND_ROUND_AND_MARQUISE:
    'lozenge+half-moon+hexagon+baguette+round-brilliant+marquise',
  TRILLION_AND_HALF_MOON_AND_ROUND_AND_MARQUISE_AND_BAGUETTE: 'trillion+half-moon+round-brilliant+marquise+baguette',
  BAGUETTE_AND_LOZENGE_AND_HEXAGON_AND_MARQUISE_AND_ROUND_AND_HALF_MOON:
    'baguette+lozenge+hexagon+marquise+round-brilliant+half-moon',
  ROUND_AND_BAGUETTE_AND_MARQUISE: 'round-brilliant+baguette+marquise',
};
export const MIXED_DIAMONDS_PAIRS = [
  MIX_DIAMOND_TYPE.EMERALD_AND_PEAR,
  MIX_DIAMOND_TYPE.ROUND_AND_PEAR,
  MIX_DIAMOND_TYPE.ROUND_AND_OVAL,
];
export const MIX_DIAMOND_TYPES = [
  MIX_DIAMOND_TYPE.MARQUISE_AND_TRILLION,
  MIX_DIAMOND_TYPE.MARQUISE_AND_BAGUETTE,
  MIX_DIAMOND_TYPE.MARQUISE_AND_ROUND,
  MIX_DIAMOND_TYPE.OVAL_AND_TRILLION,
  MIX_DIAMOND_TYPE.BAGUETTE_AND_OVAL,
  MIX_DIAMOND_TYPE.BAGUETTE_AND_TRILLION,
  MIX_DIAMOND_TYPE.BAGUETTE_AND_MARQUISE,
  MIX_DIAMOND_TYPE.EMERALD_AND_PEAR,
  MIX_DIAMOND_TYPE.ROUND_AND_PEAR,
  MIX_DIAMOND_TYPE.ROUND_AND_OVAL,
  MIX_DIAMOND_TYPE.ROUND_AND_EMERALD,
  MIX_DIAMOND_TYPE.ROUND_AND_BAGUETTE,
  MIX_DIAMOND_TYPE.PEAR_AND_ROUND_AND_EMERALD,
  MIX_DIAMOND_TYPE.PEAR_AND_ROUND_AND_BAGUETTE,
  MIX_DIAMOND_TYPE.PEAR_AND_ROUND_AND_BAGUETTE_AND_TRILLION_AND_MARQUISE,
  MIX_DIAMOND_TYPE.HEXAGON_AND_LOZENGE_AND_MARQUISE,
  MIX_DIAMOND_TYPE.EMERALD_AND_MARQUISE_AND_ROUND_AND_LOZENGE,
  MIX_DIAMOND_TYPE.TRILLION_AND_PEAR_AND_MARQUISE_AND_HALF_MOON_AND_LOZENGE_KITE_AND_HEXAGON,
  MIX_DIAMOND_TYPE.LOZENGE_AND_ROUND,
  MIX_DIAMOND_TYPE.LOZENGE_AND_HALF_MOON_AND_HEXAGON_AND_BAGUETTE_AND_ROUND_AND_MARQUISE,
  MIX_DIAMOND_TYPE.TRILLION_AND_HALF_MOON_AND_ROUND_AND_MARQUISE_AND_BAGUETTE,
  MIX_DIAMOND_TYPE.BAGUETTE_AND_LOZENGE_AND_HEXAGON_AND_MARQUISE_AND_ROUND_AND_HALF_MOON,
  MIX_DIAMOND_TYPE.ROUND_AND_BAGUETTE_AND_MARQUISE,
];
export const MIX_DIAMOND_SETS = {
  [MIX_DIAMOND_TYPE.MARQUISE_AND_TRILLION]: ['marquise', 'trillion'],
  [MIX_DIAMOND_TYPE.MARQUISE_AND_BAGUETTE]: ['marquise', 'baguette'],
  [MIX_DIAMOND_TYPE.MARQUISE_AND_ROUND]: ['marquise', 'round-brilliant'],
  [MIX_DIAMOND_TYPE.OVAL_AND_TRILLION]: ['oval', 'trillion'],
  [MIX_DIAMOND_TYPE.BAGUETTE_AND_OVAL]: ['baguette', 'oval'],
  [MIX_DIAMOND_TYPE.BAGUETTE_AND_MARQUISE]: ['baguette', 'marquise'],
  [MIX_DIAMOND_TYPE.BAGUETTE_AND_TRILLION]: ['baguette', 'trillion'],
  [MIX_DIAMOND_TYPE.EMERALD_AND_PEAR]: ['emerald', 'pear'],
  [MIX_DIAMOND_TYPE.ROUND_AND_PEAR]: ['round-brilliant', 'pear'],
  [MIX_DIAMOND_TYPE.ROUND_AND_OVAL]: ['round-brilliant', 'oval'],
  [MIX_DIAMOND_TYPE.ROUND_AND_EMERALD]: ['round-brilliant', 'emerald'],
  [MIX_DIAMOND_TYPE.ROUND_AND_BAGUETTE]: ['round-brilliant', 'baguette'],
  [MIX_DIAMOND_TYPE.PEAR_AND_ROUND_AND_EMERALD]: ['pear', 'round-brilliant', 'emerald'],
  [MIX_DIAMOND_TYPE.PEAR_AND_ROUND_AND_BAGUETTE]: ['pear', 'round-brilliant', 'baguette'],
  [MIX_DIAMOND_TYPE.PEAR_AND_ROUND_AND_BAGUETTE_AND_TRILLION_AND_MARQUISE]: [
    'pear',
    'round-brilliant',
    'baguette',
    'trillion',
    'marquise',
  ],
  [MIX_DIAMOND_TYPE.HEXAGON_AND_LOZENGE_AND_MARQUISE]: ['hexagon', 'lozenge', 'marquise'],
  [MIX_DIAMOND_TYPE.EMERALD_AND_MARQUISE_AND_ROUND_AND_LOZENGE]: ['emerald', 'marquise', 'round-brilliant', 'lozenge'],
  [MIX_DIAMOND_TYPE.TRILLION_AND_PEAR_AND_MARQUISE_AND_HALF_MOON_AND_LOZENGE_KITE_AND_HEXAGON]: [
    'trillion',
    'pear',
    'marquise',
    'half-moon',
    'lozenge',
    'hexagon',
  ],
  [MIX_DIAMOND_TYPE.LOZENGE_AND_ROUND]: ['lozenge', 'round-brilliant'],
  [MIX_DIAMOND_TYPE.LOZENGE_AND_HALF_MOON_AND_HEXAGON_AND_BAGUETTE_AND_ROUND_AND_MARQUISE]: [
    'lozenge',
    'half-moon',
    'hexagon',
    'baguette',
    'round-brilliant',
    'marquise',
  ],
  [MIX_DIAMOND_TYPE.TRILLION_AND_HALF_MOON_AND_ROUND_AND_MARQUISE_AND_BAGUETTE]: [
    'trillion',
    'half-moon',
    'round-brilliant',
    'marquise',
    'baguette',
  ],
  [MIX_DIAMOND_TYPE.BAGUETTE_AND_LOZENGE_AND_HEXAGON_AND_MARQUISE_AND_ROUND_AND_HALF_MOON]: [
    'baguette',
    'lozenge',
    'hexagon',
    'marquise',
    'round-brilliant',
    'half-moon',
  ],
  [MIX_DIAMOND_TYPE.ROUND_AND_BAGUETTE_AND_MARQUISE]: ['round-brilliant', 'baguette', 'marquise'],
};
export const DIAMOND_TYPES_FOR_WEDDING = [
  'round-brilliant',
  'oval',
  'emerald',
  'marquise',
  'cushion',
  'pear',
  'trillion',
  'baguette',
  'tapered-baguette',
  'asscher',
  'princess',
  'half-moon',
  'shield',
  'octavia',
  'lozenge',
  'longHexagon',
  'hexagon',
  'keystone',
  'radiant',
  MIX_DIAMOND_TYPE.MARQUISE_AND_ROUND,
  MIX_DIAMOND_TYPE.MARQUISE_AND_BAGUETTE,
  MIX_DIAMOND_TYPE.MARQUISE_AND_TRILLION,
  MIX_DIAMOND_TYPE.OVAL_AND_TRILLION,
  MIX_DIAMOND_TYPE.BAGUETTE_AND_OVAL,
  MIX_DIAMOND_TYPE.BAGUETTE_AND_TRILLION,
  MIX_DIAMOND_TYPE.BAGUETTE_AND_MARQUISE,
  MIX_DIAMOND_TYPE.EMERALD_AND_PEAR,
  MIX_DIAMOND_TYPE.ROUND_AND_PEAR,
  MIX_DIAMOND_TYPE.ROUND_AND_OVAL,
  MIX_DIAMOND_TYPE.ROUND_AND_BAGUETTE,
  MIX_DIAMOND_TYPE.ROUND_AND_EMERALD,
  MIX_DIAMOND_TYPE.ROUND_AND_BAGUETTE_AND_MARQUISE,
];
export const DIAMOND_TYPES_FOR_ER_PLP = [
  'round-brilliant',
  'oval',
  'emerald',
  'marquise',
  'cushion',
  'pear',
  'trillion',
  'asscher',
  'princess',
  'radiant',
];
export const ALL_DIAMONDS = [
  'round-brilliant',
  'oval',
  'emerald',
  'marquise',
  'cushion',
  'pear',
  'trillion',
  'asscher',
  'princess',
  'radiant',
];
export const DIAMOND_TYPE_INTERNAL_NAMES = {
  'Round Brilliant': 'round-brilliant',
  'Brilliant Round': 'round-brilliant',
  Oval: 'oval',
  Emerald: 'emerald',
  Marquise: 'marquise',
  Cushion: 'cushion',
  Pear: 'pear',
  Trillion: 'trillion',
  Baguette: 'baguette',
  Asscher: 'asscher',
  Princess: 'princess',
  'Half Moon': 'half-moon',
  Shield: 'shield',
  Octavia: 'octavia',
  Lozenge: 'lozenge',
  'Long Hexagon': 'longHexagon',
  Hexagon: 'hexagon',
  Keystone: 'keystone',
  Radiant: 'radiant',
};
export const DIAMOND_TYPES_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  DIAMOND_TYPES_FOR_WEDDING,
  DIAMOND_TYPE_HUMAN_NAMES,
);
export const DIAMOND_SHAPES_IN_ORDER = [
  DiamondTypes.RoundBrilliant,
  DiamondTypes.Oval,
  DiamondTypes.Emerald,
  DiamondTypes.Marquise,
  DiamondTypes.Cushion,
  DiamondTypes.Pear,
  DiamondTypes.Trillion,
  DiamondTypes.Baguette,
  DiamondTypes.TaperedBaguette,
  DiamondTypes.Asscher,
  DiamondTypes.Princess,
  DiamondTypes.HalfMoon,
  DiamondTypes.Shiled,
  DiamondTypes.Octavia,
  DiamondTypes.Lozenge,
  DiamondTypes.LongHexagon,
  DiamondTypes.Hexagon,
  DiamondTypes.Keystone,
  DiamondTypes.Radiant,
];
export const THREE_STONE_DIAMOND_TYPE_SIDE_STONE_SHAPES = {
  oval: ['pear', 'round-brilliant', 'oval', 'trillion', 'tapered-baguette'],
  asscher: ['pear', 'round-brilliant', 'trillion', 'tapered-baguette'],
  cushion: ['pear', 'round-brilliant', 'trillion', 'tapered-baguette'],
  emerald: ['pear', 'round-brilliant', 'emerald', 'trillion', 'tapered-baguette'],
  marquise: ['pear', 'round-brilliant', 'marquise', 'trillion', 'tapered-baguette'],
  pear: ['pear', 'round-brilliant', 'trillion', 'tapered-baguette'],
  princess: ['pear', 'round-brilliant', 'trillion', 'tapered-baguette'],
  radiant: ['pear', 'round-brilliant', 'trillion', 'tapered-baguette'],
  'round-brilliant': ['pear', 'round-brilliant', 'trillion', 'tapered-baguette'],
  trillion: ['tapered-baguette'],
};
export const DIAMOND_TYPES_BASED_ON_THREE_STONE_SIDE_STONE_SHAPES = {
  trillion: ['oval', 'asscher', 'cushion', 'emerald', 'marquise', 'pear', 'princess', 'radiant', 'round-brilliant'],
  pear: ['oval', 'asscher', 'cushion', 'emerald', 'marquise', 'pear', 'princess', 'radiant', 'round-brilliant'],
  'round-brilliant': ['oval', 'asscher', 'cushion', 'emerald', 'marquise', 'pear', 'princess', 'radiant', 'round-brilliant'],
  oval: ['oval'],
  emerald: ['emerald'],
  marquise: ['marquise'],
  'tapered-baguette': [
    'round-brilliant',
    'oval',
    'emerald',
    'marquise',
    'cushion',
    'pear',
    'asscher',
    'princess',
    'radiant',
    'trillion',
  ],
};
export const EAST_WEST_SIDE_STONE_SHAPES = ['pear', 'trillion', 'tapered-baguette'];
export const CFY_DIAMOND_LIMIT = 3;
export const DIAMOND = 'diamond';
export const DIAMOND_BUYBACK = 'diamondBuybackDrawer';
export const DIAMONDS_CATEGORY = 'diamonds';
export const DIAMOND_BUYBACK_WARRANTY_HANDLE = 'buyback-warranty';
export const DIAMOND_SPEC = 'diamondSpec';
export const HORIZONTAL_DIAMOND_ORIENTATION = 'horizontal';
export const DIAMOND_PAGINATED_LABELS = {
  totalDocs: 'itemCount',
  docs: 'items',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
export const RETIRED_DIAMOND_BEZEL_NECKLACE_VARIANT = {
  slug: 'diamond-bezel-necklace',
  ringSize: '18-20',
};
export const MIN_DIAMOND_PRICE_FOR_BUYBACK = 250000;
