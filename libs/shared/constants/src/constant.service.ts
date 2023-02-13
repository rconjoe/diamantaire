export const environment = process.env.NODE_ENV;
export const isDevEnv = Object.is(environment, 'development');
export const isStagingEnv = Object.is(environment, 'staging');
export const isProdEnv = Object.is(environment, 'production');
export const isTestEnv = Object.is(environment, 'test');

export default {
  isDevEnv,
  isProdEnv,
  isStagingEnv,
  isTestEnv,
  environment,
};

export const CROSS_DOMAIN = {
  allowedOrigins: ['https://vrai.com', 'https://us.vrai.com', 'https://uk.vrai.com'],
  allowedReferer: 'vrai.com',
};

export const SHOPIFY_ITEM_TYPE = {
  PRODUCT: 'product',
  COLLECTION: 'collection',
  PRICE: 'price',
};

export const PaginatedLabels = {
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

export const RTS_CATEGORY = 'ready-to-give-engagement-rings';
export const EARRINGS_CATEGORY = 'earrings';
export const NECKLACES_CATEGORY = 'necklaces';
export const BRACELETS_CATEGORY = 'bracelets';
export const RINGS_CATEGORY = 'rings';
export const ACCESSORIES_CATEGORY = 'accessories';
export const GIFT_CARDS_CATEGORY = 'gift-cards';
export const GIFTS_WITH_PURCHASE_CATEGORY = 'gifts-with-purchase';
export const DIAMONDS_CATEGORY = 'diamonds';

export const GIA_CERTIFICATE_HANDLE = 'gia-certificate';
export const ENGRAVING_PRODUCT_HANDLE = 'engraving';
export const DIAMOND_BUYBACK_WARRANTY_HANDLE = 'buyback-warranty';
export const WEDDING_BAND_PRODUCT_TYPE = 'Wedding Band';
export const ENGAGEMENT_RING_PRODUCT_TYPE = 'Engagement Ring';
export const DIAMOND_SPEC = 'diamondSpec';
export const SHIPPING_FINANCE = 'shippingFinance';

export const EARRING_PRODUCT_TYPE = 'Earrings';
export const NECKLACE_PRODUCT_TYPE = 'Necklace';
export const BRACELET_PRODUCT_TYPE = 'Bracelet';
export const DIAMONDS_PRODUCT_TYPE = 'Diamonds';
export const RING_PRODUCT_TYPE = 'Ring';
export const RING_SIZER_PRODUCT_TYPE = 'Ring Sizer';
export const GIFT_CARD_PRODUCT_TYPE = 'Gift Card';
export const ACCESSORY_PRODUCT_TYPE = 'Accessory';
export const GWP_PRODUCT_TYPE = 'GWP';

export const RETIRED_DIAMOND_BEZEL_NECKLACE_VARIANT = {
  slug: 'diamond-bezel-necklace',
  ringSize: '18-20',
};

export const GOLD_PURITY_DEFAULTS_FOR_WEDDING = {
  'yellow-gold': '18k',
  'white-gold': '18k',
  'rose-gold': '14k',
  platinum: undefined,
};

export const COLOR_NAMING_MAP = {
  '18k Rose Gold': 'rose-gold',
  '18k White Gold': 'white-gold',
  '18k Yellow Gold': 'yellow-gold',
  '18K Rose Gold': 'rose-gold',
  '18K White Gold': 'white-gold',
  '18K Yellow Gold': 'yellow-gold',
  'Rose Gold': 'rose-gold',
  'White Gold': 'white-gold',
  'Yellow Gold': 'yellow-gold',
  Platinum: 'platinum',

  // TODO: Jewelry
  '14K Yellow Gold': 'yellow-gold',
  '14K White Gold': 'white-gold',
  '14K Rose Gold': 'rose-gold',
};

export const COLOR_HUMAN_NAMES = {
  'rose-gold': '18k Rose Gold',
  'white-gold': '18k White Gold',
  'yellow-gold': '18k Yellow Gold',
  platinum: 'Platinum',
};

export const METAL_HUMAN_NAMES = {
  'rose-gold': 'Rose Gold',
  'white-gold': 'White Gold',
  'yellow-gold': 'Yellow Gold',
  platinum: 'Platinum',
};

export const RANDM_RING_SLUGS = ['contract-ring', 'compass-ring', 'unity-ring'];

export const createDisplayOrderFromOptionNames = (namesInOrder, humanNames) => {
  return namesInOrder.map((name) => {
    const label = humanNames[name];

    return {
      name,
      label,
    };
  });
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

export const METALS_WITH_GOLD_PURITIES_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['14k yellow-gold', '14k white-gold', '14k rose-gold', '18k yellow-gold', '18k white-gold', '18k rose-gold', 'platinum'],
  METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES,
);

export const SHOPIFY_PRICES_COUNTRY_CODES = [
  'AD',
  'AT',
  'AU',
  'BE',
  'CA',
  'CY',
  'DE',
  'EE',
  'ES',
  'FI',
  'FR',
  'GB',
  'GR',
  'IE',
  'IT',
  'LT',
  'LU',
  'LV',
  'MC',
  'ME',
  'MT',
  'NL',
  'PT',
  'SL',
  'SK',
  'SM',
  'XK',
  'US',
];

export const COUNTRY_CURRENCY_CODES = [
  { countryCode: 'AU', currencyCode: 'AUD' },
  { countryCode: 'CA', currencyCode: 'CAD' },
  { countryCode: 'DE', currencyCode: 'EUR' },
  { countryCode: 'GB', currencyCode: 'GBP' },
  { countryCode: 'US', currencyCode: 'USD' },
];

export const DEFAULT_LOCALE = 'en_US';

export const DEFAULT_RING_SIZE = '4.5';

// Defines all diamond types
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

export enum ProductType {
  EngagementRing = 'Engagement Ring',
  WeddingBand = 'Wedding Band',
  Bracelet = 'Bracelet',
  Earrings = 'Earrings',
  Necklace = 'Necklace',
  Ring = 'Ring',
}

export enum ProductOption {
  BandAccent = 'bandAccent',
  CaratWeight = 'caratWeight',
  DiamondType = 'diamondType',
  GoldPurity = 'goldPurity',
  Metal = 'metal',
  ProngStyle = 'prongStyle',
  RingSize = 'ringSize',
  SideStone = 'sideStone',
  SideStoneCarat = 'sideStoneCarat',
  SideStoneShape = 'sideStoneShape',
}

export enum MetalType {
  Platinum = 'platinum',
  YellowGold = 'yellow-gold',
  WhiteGold = 'white-gold',
  RoseGold = 'rose-gold',
}

export enum BandAccentType {
  Plain = 'plain',
  Pave = 'pave',
  DoublePave = 'double-pave',
}

export enum GoldPurityValue {
  _18K = '18k',
  _14k = '14k',
}

export enum ProngStyles {
  Plain = 'plain',
  Pave = 'pave',
}

export const OPTIONS_SORT_ORDER = [
  ProductOption.DiamondType,
  ProductOption.SideStoneShape,
  ProductOption.SideStoneCarat,
  ProductOption.Metal,
  ProductOption.BandAccent,
  // TODO: list is incomplete
];

export const CANONICAL_OPTIONS_TO_MATCH = [ProductOption.DiamondType, ProductOption.Metal];

// The canonical configuration will have some fixed options
// but everything else should the default (first when sorted)
export const CANONICAL_OPTIONS_SORT_ORDER = OPTIONS_SORT_ORDER.filter(
  (optionType) => !CANONICAL_OPTIONS_TO_MATCH.includes(optionType),
);

// These configuration options are considered default
export const PRODUCT_DEFAULT_OPTIONS = {
  [ProductOption.DiamondType]: DiamondTypes.RoundBrilliant,
  [ProductOption.SideStone]: DiamondTypes.RoundBrilliant,
  [ProductOption.Metal]: MetalType.Platinum,
  [ProductOption.BandAccent]: BandAccentType.Plain,
  [ProductOption.RingSize]: DEFAULT_RING_SIZE,
  // TODO: incomplete list
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

export const METAL_TYPES_IN_ORDER = [MetalType.Platinum, MetalType.YellowGold, MetalType.WhiteGold, MetalType.RoseGold];
export const BAND_ACCENTS_IN_ORDER = [BandAccentType.Plain, BandAccentType.Pave, BandAccentType];

/* The first option is the 'default' one */
export const OPTION_ORDER_BY_TYPE = {
  [ProductOption.BandAccent]: BAND_ACCENTS_IN_ORDER,
  [ProductOption.DiamondType]: DIAMOND_SHAPES_IN_ORDER,
  [ProductOption.Metal]: METAL_TYPES_IN_ORDER,
  [ProductOption.SideStoneShape]: DIAMOND_SHAPES_IN_ORDER,
  // TODO: incomplete
};

export const JEWELRY_TYPES = [
  '/all-jewelry/trillion',
  '/all-jewelry/oval',
  '/all-jewelry/round-brilliant',
  '/all-jewelry/emerald-cut',
  '/all-jewelry/pear-shaped',
  '/all-jewelry/marquise',
  '/all-jewelry/baguette',
];
