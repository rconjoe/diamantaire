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
  'Long Hexagon': 'long-hexagon',
  Hexagon: 'hexagon',
  Keystone: 'keystone',
  Radiant: 'radiant',
  'Brilliant Emerald': 'brilliant-emerald',
  Capri: 'capri',
  'Cushion Princess': 'cushion-princess',
  'Elongated Cushion': 'elongated-cushion',
  Felix: 'felix',
  Fusion: 'fusion',
  Harmonia: 'harmonia',
  Heart: 'heart',
  Kite: 'kite',
  'Oval Rose': 'oval-rose',
  Passion: 'passion',
  Rand: 'rand',
  Regulus: 'regulus',
  'Round Rose': 'round-rose',
  Lucky: 'lucky',
};

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
