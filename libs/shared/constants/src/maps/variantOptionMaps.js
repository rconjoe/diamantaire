export const PRODUCT_OPTION_KEYS = {
  METAL: 'metal',
  GOLD_PURITY: 'goldPurity',
  RING_SIZE: 'ringSize',
  BAND_ACCENT: 'bandAccent',
  BAND_WIDTH: 'bandWidth',
  SIDE_STONE_CARAT: 'sideStoneCarat',
  RTS_CARAT_WEIGHT: 'rtsCaratWeight',
  DIAMOND_ORIENTATION: 'diamondOrientation',
  DIAMOND_TYPE: 'diamondType',
  BAND_COLOR: 'bandColor',
  DIAMOND_SIZE: 'diamondSize',
  SIDE_STONE_SHAPE: 'sideStoneShape',
  BAND_STYLE: 'bandStyle',
  STONE_SETTING: 'stoneSetting',
  HALO_SIZE: 'haloSize',
  BAND_STONE_STYLE: 'bandStoneStyle',
  BAND_STONE_SHAPE: 'bandStoneShape',
  PRONG_STYLE: 'prongStyle',
  CARAT_WEIGHT: 'caratWeight',
  CENTERSTONE: 'centerStone',
  PAVE_CLUSTER: 'paveCluster',
};

export const ALL_PRODUCT_OPTION_KEYS = [
  PRODUCT_OPTION_KEYS.METAL,
  PRODUCT_OPTION_KEYS.GOLD_PURITY,
  PRODUCT_OPTION_KEYS.RING_SIZE,
  PRODUCT_OPTION_KEYS.BAND_ACCENT,
  PRODUCT_OPTION_KEYS.BAND_WIDTH,
  PRODUCT_OPTION_KEYS.SIDE_STONE_CARAT,
  PRODUCT_OPTION_KEYS.RTS_CARAT_WEIGHT,
  PRODUCT_OPTION_KEYS.DIAMOND_ORIENTATION,
  PRODUCT_OPTION_KEYS.DIAMOND_TYPE,
  PRODUCT_OPTION_KEYS.DIAMOND_SIZE,
  PRODUCT_OPTION_KEYS.BAND_COLOR,
  PRODUCT_OPTION_KEYS.SIDE_STONE_SHAPE,
  PRODUCT_OPTION_KEYS.BAND_STYLE,
  PRODUCT_OPTION_KEYS.STONE_SETTING,
  PRODUCT_OPTION_KEYS.HALO_SIZE,
  PRODUCT_OPTION_KEYS.PRONG_STYLE,
  PRODUCT_OPTION_KEYS.PAVE_CLUSTER,
];

export const PRONG_STYLE_HUMAN_NAMES = {
  plain: 'Plain',
  pave: 'Pavé',
};

export const PAVE_CLUSTER_SHAPE = {
  PAVE_ROUND: 'round',
  PAVE_MARQUISE: 'marquise',
  PAVE_CUSHION: 'cushion',
};

export const PAVE_CLUSTER_SHAPE_HUMAN_NAMES = {
  [PAVE_CLUSTER_SHAPE.PAVE_ROUND]: 'Pave Round',
  [PAVE_CLUSTER_SHAPE.PAVE_MARQUISE]: 'Pave Marquise',
  [PAVE_CLUSTER_SHAPE.PAVE_CUSHION]: 'Pave Cushion',
};

export const HALO_SIZE_HUMAN_NAMES = {
  original: 'Original',
  large: 'Large',
};

export const CARAT_WEIGHT_HUMAN_NAMES = {
  '1.0ct': '1',
  '1.5ct': '1½',
  '2.0ct': '2',
  '2.8ct': '3', // eternity-band
  '4.0ct': '4',
  '4.5ct': '4½',
  '5.0ct': '5',
  '6.5ct': '6½',
  '7.5ct': '7½',
  '8.0ct': '8',
  other: 'Select your diamond',
};

export const BAND_ACCENT_HUMAN_NAMES = {
  plain: 'Plain Band',
  pave: 'Pavé Band',
  'double-pave': 'Double Pavé',
};

export const BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES = {
  plain: 'Plain',
  pave: 'Pavé',
};

export const BAND_ACCENT_SHORT_HUMAN_NAMES = {
  plain: 'Plain',
  pave: 'Pavé',
  'double-pave': 'Double Pavé',
};

// TODO: confirm option names and labels, get the others

export const BAND_WIDTH_HUMAN_NAMES = {
  /**
   * Leaving this translation here
   * to keep human names flexible. Will certainly
   * change in the future from past copywriting experience
   */
  '1.5mm': 'Small - 1.5mm',
  '3mm': 'Medium - 3mm',
  '4.5mm': 'Large - 4.5mm',
  '2.1mm': 'Small',
  '2.7mm': 'Medium',
  '3.2mm': 'Large',
  '0.01ct': 'Original',
  '0.02ct': 'Large',
  '1.9mm': 'Original',
  '2.3mm': 'Large',
  '4.1mm': 'Large',
};

export const BAND_STYLE_HUMAN_NAMES = {
  full: 'Full pavé',
  half: 'Half pavé',
};

export const BAND_STONE_STYLE_HUMAN_NAMES = {
  original: 'Original',
  large: 'Large',
};

export const BAND_STONE_SHAPE_HUMAN_NAMES = {
  'round-brilliant': 'Round Brilliant',
  baguette: 'Baguette',
};

export const STONE_SETTING_HUMAN_NAMES = {
  'full-bezel': 'Full Bezel',
  'half-bezel': 'Half Bezel',
  'semi-bezel': 'Semi Bezel',
};

export const JEWELRY_SUB_CATEGORY_HUMAN_NAMES = {
  eternity: 'Eternity',
  anniversary: 'Anniversary',
  tennis: 'Tennis',
  statement: 'Statement',
  stacking: 'Stacking',
  chain: 'Chain',
  pendant: 'Pendant',
  hoop: 'Hoop',
  'drop-dangle': 'Drop & Dangle',
  'new-arrivals': 'New Arrivals',
  stud: 'Stud',
};

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
  'round-brilliant+baguette+marquise':
    'Round Brilliant, Baguette, and Marquise',
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
  'round-brilliant+baguette+marquise':
    'Round Brilliant, Baguette, and Marquise',
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

export const SIDE_STONE_CARAT_HUMAN_NAMES = {
  '0.10ct': '0.10ct',
  '0.25ct': '0.25ct',
  '0.50ct': '0.50ct',
};

export const SIDE_STONE_CARAT_IMAGE_NAMES = {
  '0.10ct': '0-10ct',
  '0.25ct': '0-25ct',
  '0.50ct': '0-50ct',
};

export const SIDE_STONE_CARAT_DETAILS_HUMAN_NAMES = {
  '0.10ct': '(0.20ct total)',
  '0.25ct': '(0.50ct total)',
  '0.50ct': '(1.0ct total)',
};

export const METALS_IN_HUMAN_NAMES = {
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
  platinum: 'Platinum',
};

export const EXTRAS_IN_HUMAN_NAMES = {
  'ships-in-time': 'Ships In Time',
};

export const METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES = {
  'yellow-gold': '18k Yellow Gold',
  'white-gold': '18k White Gold',
  'rose-gold': '14k Rose Gold',
  platinum: 'Platinum',
};

export const JEWELRY_METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES = {
  'yellow-gold': '14k Yellow Gold',
  'white-gold': '14k White Gold',
  'rose-gold': '14k Rose Gold',
  platinum: 'Platinum',
};

export const JEWELRY_METALS_IN_SOLID_HUMAN_NAMES = {
  'yellow-gold': 'Solid yellow gold',
  'white-gold': 'Solid white gold',
  'rose-gold': 'Solid rose gold',
};

export const METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES = {
  '14k yellow-gold': '14k Yellow Gold',
  '14k white-gold': '14k White Gold',
  '14k rose-gold': '14k Rose Gold',
  '18k yellow-gold': '18k Yellow Gold',
  '18k white-gold': '18k White Gold',
  '18k rose-gold': '18k Rose Gold',
  platinum: 'Platinum',
};

export const READY_TO_SHIP_CARAT_WEIGHTS_HUMAN_NAMES = {
  '0.75ct': '.75ct',
  '1.00ct': '1ct',
  '1.50ct': '1.5ct',
};

export const DIAMOND_ORIENTATION_HUMAN_NAMES = {
  horizontal: 'Horizontal',
};

export const SIZE_UNIT_LABEL_MAP = {
  rs: 'Ring Size',
  ct: 'Carat Weight',
  mm: 'Hoop Length',
  'mm-hoop-size': 'Hoop Size',
  in: 'Size',
  cl: 'Chain Length',
  am: 'Amount',
};

export const EARRING_SIDE_HUMAN_NAMES = {
  left: 'Left',
  right: 'Right',
  pair: 'Pair',
};

export const QUANTITY_OPTION_HUMAN_NAMES = {
  single: 'Single',
  pair: 'Pair',
};

export const BAND_COLOR_OPTION_HUMAN_NAMES = {
  red: 'Red',
  black: 'Black',
};

export const DIAMOND_SIZE_OPTION_HUMAN_NAMES = {
  petite: 'Petite',
  original: 'Original',
  medium: 'Medium',
  large: 'Large',
};

export const BAND_STYLE_OPTION_HUMAN_NAMES = {
  full: 'Full pavé',
  half: 'Half pavé',
};

export const OPTION_QUANTITY_MAP = {
  left: 1,
  right: 1,
  single: 1,
  pair: 2,
};

export const CARAT_OPTIONS = [
  '0.10ct',
  '0.25ct',
  '0.30ct',
  '0.40ct',
  '0.50ct',
  '0.75ct',
  '1.0ct',
  '1.5ct',
  '1.50ct',
  '2ct',
  '2.0ct',
];

export const CARAT_FRACTION_OPTIONS = [
  '1/10ct',
  '1/4ct',
  '1/3ct',
  '2/5ct',
  '1/2ct',
  '3/4ct',
  '1ct',
  '1½ct',
  '2ct',
];

export const CARAT_OPTIONS_IN_HUMAN_NAMES = {
  '0.10ct': '1/10ct',
  '0.25ct': '1/4ct',
  '0.30ct': '1/3ct',
  '0.40ct': '2/5ct',
  '0.50ct': '1/2ct',
  '0.75ct': '3/4ct',
  '1.0ct': '1ct',
  '1.5ct': '1½ct',
  '1.50ct': '1½ct',
  '2ct': '2ct',
  '2.0ct': '2ct',
};

export const PRICE_RANGE_OPTIONS = [
  'below-500',
  '500-1500',
  '1500-3000',
  '3000-plus',
  'custom',
];

export const PRICE_RANGE_OPTIONS_NUMBER_VALUES = {
  'below-500': [0, 50000],
  '500-1500': [50000, 150000],
  '1500-3000': [150000, 300000],
  '3000-plus': [300000, Number.MAX_SAFE_INTEGER],
  custom: [0, Number.MAX_SAFE_INTEGER],
};

export const PRICE_RANGE_OPTIONS_HUMAN_NAMES = {
  'below-500': 'Below %%price%% %%price2%%',
  '500-1500': '%%price%%-%%price2%%',
  '1500-3000': '%%price%%-%%price2%%',
  '3000-plus': '%%price%%+',
  custom: 'Custom',
};

export const PRICE_RANGE_OPTIONS_HUMAN_NAMES_VALUES = {
  'below-500': [500],
  '500-1500': [500, 1500],
  '1500-3000': [1500, 3000],
  '3000-plus': [3000],
  custom: [],
};
