export const environment = process.env['NODE_ENV'];
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

// Old Constants

// BP = Break Points
export const BP_XS = '0px';
export const BP_SM = '576px';
export const BP_MD = '768px';
export const BP_LG = '992px';
export const BP_XL = '1200px';
export const BP_XXL = '1440px';

export const MOBILE_MAX_WIDTH = '768px';
export const BP_CONTENT_BLOCK = '1024px';

// BlockPicker Blocks
export const FULL_WIDTH_BANNER_BLOCK = 'full_width_banner_block';
export const HALF_WIDTH_BANNER_BLOCK = 'half_width_banner_block';
export const TRIO_BLOCK = 'trio_block';
export const MODULAR_DUO_BLOCK = 'modular_duo_block';
export const CELEBRITY_BLOCK = 'celebrity_block';
export const QUOTE_BLOCK = 'quote_block';
export const MODULAR_HERO_BANNER_BLOCK = 'modular_hero_banner_block';
export const MODULAR_FULL_WIDTH_BANNER_BLOCK = 'modular_full_width_banner_block';
export const MODULAR_HALF_WIDTH_BANNER_BLOCK = 'modular_half_width_banner_block';
export const MODULAR_TEXT_ONLY_BLOCK = 'modular_text_only_block';
export const MODULAR_TRIO_SVG_BLOCK = 'modular_triosvg_block';
export const MODULAR_TRIO_1x1_BLOCK = 'modular_trio1x1_block';
export const MODULAR_TRIO_9x7_BLOCK = 'modular_trio9x7_block';
export const MODULAR_TRIO_STAGGERED_9x7_BLOCK = 'modular_trio_staggered9x7_block';
export const MODULAR_TRIO_SLIDE_9x7_BLOCK = 'modular_trio_slide9x7_block';
export const MODULAR_SIDE_BY_SIDE_BLOCK = 'modular_side_by_side_block';
export const MODULAR_SINGLE_SVG_BLOCK = 'modular_singlesvg_block';
export const MODULAR_SINGLE_VIDEO_BLOCK = 'modular_single_video_block';
export const MODULAR_LEO_BLOCK = 'modular_leo_block';
export const MODULAR_QUAD_GRID = 'modular_quad_grid';
export const SOCIAL_MEDIA_SECTION = 'social_media_section';
export const MODULAR_TRI_GRID_WITH_ORDER_TRACKING = 'modular_tri_grid_with_order_tracking';
export const MODULAR_QUAD_BLOCK = 'modular_quad_block';
export const MODULAR_QUOTE_BLOCK = 'modular_quote_block';
export const MODULAR_COLLECTION_HERO_BLOCK = 'modular_collection_hero_block';
export const MODULAR_HALF_WIDTH_QUAD_BLOCK = 'modular_half_width_quad_block';
export const MODULAR_CAROUSEL_BLOCK = 'modular_carousel_block';
export const MODULAR_ACCORDION_BLOCK = 'modular_accordion_block';
export const MODULAR_CELEBRITY_CAROUSEL_BLOCK = 'modular_celebrity_carousel_block';
export const MODULAR_CELEBRITY_REEL_BLOCK = 'modular_celebrity_reel_block';
export const MODULAR_LOGO_BANNER_BLOCK = 'modular_logo_banner_block';
export const MODULAR_PRODUCT_ICON_LIST_ITEM = 'modular_product_icon_list_item';
export const MODULAR_SHIPPING_PRODUCT_ICON_LIST_ITEM = 'modular_shipping_product_icon_list_item';
export const MODULAR_HORIZONTAL_LINE_BLOCK = 'modular_horizontal_line_block';
export const MODULAR_SKINNY_HERO_BANNER_BLOCK = 'modular_skinny_hero_banner_block';
export const MODULAR_LIST_TITLE_BLOCK = 'modular_list_title_block';
export const MODULAR_PRODUCT_SLIDER_BLOCK = 'modular_product_slider_block';
export const MODULAR_PRODUCT_SUGGESTION_QUAD_BLOCK = 'modular_product_suggestion_quad_block';
export const MODULAR_BLOG_LIST_TRIO_BLOCK = 'modular_blog_list_trio_block';
export const MODULAR_INSTAGRAM_REEL_BLOCK = 'modular_instagram_reel_block';
export const MODULAR_HALF_WIDTH_BLOG_SUMMARY_BLOCK = 'modular_half_width_blog_summary_block';
export const MODULAR_SLICK_CAROUSEL_BLOCK = 'modular_slick_carousel_block';
export const MODULAR_SHOWROOM_BLOCK = 'modular_showroom_block';
export const MODULAR_QUAD_LOGO_BLOCK = 'modular_quad_logo_block';
export const MODULAR_QUAD_STATISTICS_BLOCK = 'modular_quad_statistics_block';
export const DATO_NAVIGATION_IMAGE_LINK = 'navigation_image_link';
export const DATO_NAVIGATION_LINK = 'navigation_link';
export const MODULAR_RANDOM_BANNER_BLOCK = 'modular_random_banner_block';
export const MODULAR_GRID_CAROUSEL_BLOCK = 'modular_grid_carousel_block';
export const MODULAR_MINI_BANNER_BLOCK = 'modular_mini_banner_block';
export const MODULAR_TALL_HALF_WIDTH_BLOCK = 'modular_tall_half_width_block';
export const MODULAR_TALL_HALF_WIDTH_BLOCK_LOCATION_CTA = 'modular_tall_half_width_block_location_cta';
export const MODULAR_CAROUSEL_HOVER_BLOCK = 'modular_carousel_hover_block';
export const MODULAR_EMAIL_SIGNUP_BLOCK = 'modular_email_signup_block';

// Showroom
export const SHOWROOM_LOCATIONS = [
  {
    title: 'Visit our Los Angeles Showroom',
    handle: 'los-angeles',
    location: 'Los Angeles',
  },
  {
    title: 'Visit our London Showroom',
    handle: 'london',
    location: 'London',
  },
  {
    title: 'Visit our Chicago Showroom',
    handle: 'chicago',
    location: 'Chicago',
  },
  {
    title: 'Visit our Madrid Showroom',
    handle: 'madrid',
    location: 'Madrid',
  },
  {
    title: 'Visit our New York Showroom',
    handle: 'new-york',
    location: 'New York',
  },
  {
    title: 'Visit our San Francisco Showroom',
    handle: 'san-francisco',
    location: 'San Francisco',
  },
];

/** @type {Number}  - .8 equals 8px in rems */
export const BASE = 0.8;

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
export const DIAMOND_LIST_PAGE_SLUGS = [...DIAMOND_TYPES, 'round'].map((v) => v + '-cut-diamonds');

export const JEWELRY_EMERALD_CUT = '/all-jewelry/emerald-cut';
export const JEWELRY_PEAR_SHAPED = '/all-jewelry/pear-shaped';
export const JEWELRY_ROUND_BRILLIANT = '/all-jewelry/round-brilliant';
export const JEWELRY_OVAL = '/all-jewelry/oval';
export const JEWELRY_MARQUISE = '/all-jewelry/marquise';
export const JEWELRY_TRILLION = '/all-jewelry/trillion';
export const JEWELRY_BAGUETTE = '/all-jewelry/baguette';
export const JEWELRY_SLUG = 'all-jewelry';

export const PAIR_ONLY_PRODUCT_SLUGS = ['solitaire-diamond-studs', 'bezel-solitaire-stud'];
export const PAIR_ONLY_PRODUCT_SLUGS_ANY_CARAT_WEIGHT = [
  'petite-solitaire-stud',
  'petite-pave-bar-stud',
  'petite-pave-v-stud',
  'pave-cluster-stud',
];

export const ALL_PAIR_ONLY_PRODUCT_SLUGS = [...PAIR_ONLY_PRODUCT_SLUGS, ...PAIR_ONLY_PRODUCT_SLUGS_ANY_CARAT_WEIGHT];

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

export const BUILDER_ENGAGEMENT_RING_LIST_PAGE_SLUGS = [...SHAPED_BASED_ENGAGEMENT_RING_LIST_PAGE_SLUGS, 'engagement-rings'];
