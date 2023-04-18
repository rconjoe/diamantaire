import getRootURL from './getRootURL';
import {
  BAND_ACCENT_HUMAN_NAMES,
  BAND_WIDTH_HUMAN_NAMES,
  DIAMOND_TYPE_HUMAN_NAMES,
  SIDE_STONE_CARAT_HUMAN_NAMES,
  METALS_IN_HUMAN_NAMES,
  EARRING_SIDE_HUMAN_NAMES,
  QUANTITY_OPTION_HUMAN_NAMES,
  BAND_COLOR_OPTION_HUMAN_NAMES,
  DIAMOND_SIZE_OPTION_HUMAN_NAMES,
  BAND_STYLE_OPTION_HUMAN_NAMES,
  STONE_SETTING_HUMAN_NAMES,
  BAND_STONE_SHAPE_HUMAN_NAMES,
  BAND_STONE_STYLE_HUMAN_NAMES,
  PRONG_STYLE_HUMAN_NAMES,
  HALO_SIZE_HUMAN_NAMES,
  CARAT_WEIGHT_HUMAN_NAMES,
  PAVE_CLUSTER_SHAPE_HUMAN_NAMES,
} from '../maps/variantOptionMaps';

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

export const isValidBoolean = [true, false];
export const CYF_DIAMOND_LIMIT = 3;

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

// TODO: Fix or remove
// const { ENV_SUBDOMAIN } = getEnvConfig();
const ENV_SUBDOMAIN = 'vrai.com';

export const COMPANY = 'VRAI';

export const VO_ROOT_URL = 'https://www.vrai.com';
export const VO_SHOPIFY_URL = 'https://vrai.com';
export const VRAI_SHOPIFY_CART_JSON_URL = 'https://vrai.com/cart.json';
export const BOOK_AN_APPOINTMENT_URL = 'https://www.vrai.com/book-appointment';

// IOS BPs +1px to account for min-width strat
export const BP_IOS = '376px';
export const BP_IOS_PLUS = '415px';

export const MIN_OTHER_CARAT_WEIGHT = 1.01;
export const MIN_OTHER_CARAT_WEIGHT_TWO_PLUS = 2.0;
export const MIN_ENGAGEMENT_RING_CARAT_WEIGHT = 0.5;
export const MIN_CARAT_WEIGHT_DEFAULT = 0.9;
// Below constants are the equivalent of DrawerHandles, used to differentiate specific drawers
export const DIAMOND = 'diamond';
export const RING_SIZE = 'ringSize';
export const ENGRAVING = 'engraving';
export const DIAMOND_BUYBACK = 'diamondBuybackDrawer';
export const RING_SPECS = 'ringSpecs';

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

export const HEADER_HEIGHT_MOBILE = '5.6rem';
export const HEADER_HEIGHT_DESKTOP = '6.4rem';

const MATCH_EVERYTHING_BUT_NUMBERS = /[^0-9]/g;

export const HEADER_HEIGHT_MOBILE_PX_NUM = HEADER_HEIGHT_MOBILE.replace(MATCH_EVERYTHING_BUT_NUMBERS, '');
export const HEADER_HEIGHT_DESKTOP_PX_NUM = HEADER_HEIGHT_DESKTOP.replace(MATCH_EVERYTHING_BUT_NUMBERS, '');
export const METAL_ROSE_GOLD = 'rose-gold';
export const PAVE_BAND_ACCENT = 'pave';
export const PLAIN_BAND_ACCENT = 'plain';
export const DEFAULT_ER_CARAT_WEIGHT = '2.0ct';
export const DEFAULT_BAND_ACCENT = PLAIN_BAND_ACCENT;
export const DEFAULT_COLOR = 'yellow-gold';
export const DEFAULT_CATEGORY_COLOR = 'platinum';
export const DEFAULT_PRODUCT_CONFIGURATION_OPTIONS = {
  metal: 'platinum',
  diamondType: 'round-brilliant',
  bandAccent: 'plain',
  sideStoneCarat: '0.25ct',
  ringSize: '7',
};
export const DEFAULT_RTS_PRODUCT_CONFIGURATION_OPTIONS = {
  rtsCaratWeight: '1.00ct',
};
export const DEFAULT_ENGAGEMENT_RING_SIZE = '5';
export const DEFAULT_WEDDING_BAND_SIZE = '6';
export const DEFAULT_JEWELRY_RING_SIZE = '5';
export const DEFAULT_WHOLE_SIZE_JEWELRY_RING_SIZE = '5';
export const DEFAULT_JEWELRY_RANDM_RING_SIZE = '6';
export const DEFAULT_JEWELRY_RANGE_RING_SIZE = '4-5';

export const RING_SIZE_OTHER = 'other';
export const DEFAULT_DIGITAL_GIFT_CARD_SIZE = '100';
export const FEED_ID_ATTRIBUTE_KEY = 'feedId';
export const PDP_URL_ATTRIBUTY_KEY = 'pdpUrl';

export const CUSTOM_ATTRIBUTE_KEY_NAME_MAP = {
  productGroupKey: 'productGroupKey',
  _EngravingKey: 'engravingKey',
  _EngravingFont: 'engravingRenderedFont',
  _EngravingBack: 'engravingBack',
  note: 'note',
  productAsset: 'productAsset',
  productIconListShippingCopy: 'productIconListShippingCopy',
  feedId: FEED_ID_ATTRIBUTE_KEY,
  pdpUrl: PDP_URL_ATTRIBUTY_KEY,
};

export const CONFIGURED_OPTIONS = {
  DIAMOND_TYPE: 'diamondType',
  DIAMOND_PRICE: 'diamondPrice',
  DIAMOND_CARAT: 'diamondCarat',
  DIAMOND_SHAPE: 'diamondShape',
  DIAMOND_COLOR: 'diamondColor',
  DIAMOND_CUT: 'diamondCut',
  DIAMOND_CLARITY: 'diamondClarity',
  DIAMOND_ID: 'diamondId',
  DIAMOND_LOT_ID: 'diamondLotId',
  ENGRAVING: 'engraving',
  HAS_BEEN_SUBMITTED: 'hasBeenSubmitted',
};

export const HORIZONTAL_DIAMOND_ORIENTATION = 'horizontal';
export const ENGAGEMENT_RING_CATEGORY = 'engagement-rings';
export const WEDDING_BAND_CATEGORY = 'wedding-bands';
export const ENGAGEMENT_RING_CATEGORY_PAGE = ['engagement-rings'];

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

export const SIDE_STONE_CARAT_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['0.10ct', '0.25ct', '0.50ct'],
  SIDE_STONE_CARAT_HUMAN_NAMES,
);

export const METALS_FOR_WEDDING = ['platinum', 'yellow-gold', 'white-gold', 'rose-gold'];

export const TAGS = [
  'solitaire',
  'cathedral',
  'three-stone',
  'halo',
  'vintage-inspired',
  'two-tone',
  'hidden-halo',
  'bezel',
];

export const TAGS_STORE = {
  solitaire: 'Solitaire',
  cathedral: 'Cathedral',
  'three-stone': 'Three-Stone',
  halo: 'Halo',
  'vintage-inspired': 'Vintage-inspired',
  'two-tone': 'Two Tone',
  'hidden-halo': 'Hidden Halo',
  bezel: 'Signature Bezel',
};

export const ENGAGEMENT_RING_STYLE_TAGS_IN_DISPLAY_ORDER = [
  'solitaire',
  'cathedral',
  'three-stone',
  'halo',
  'vintage-inspired',
  'two-tone',
  'hidden-halo',
  'bezel',
];

export const GOLD_PURITY_IN_ORDER = ['14k', '18k'];

export const BAND_ACCENTS_FOR_WEDDING = ['plain', 'pave'];
export const METALS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(METALS_FOR_WEDDING, METALS_IN_HUMAN_NAMES);

/**
 * This is a default metal map. It allows us to set a default metal
 * for a given slug.
 */
export const DEFAULT_METAL_OVERRIDES = {
  'solitaire-cross-necklace': 'yellow-gold',
  'star-of-david-pendant': 'yellow-gold',
  'crescent-moon-pendant': 'yellow-gold',
};

export const BAND_ACCENTS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['plain', 'pave', 'double-pave'],
  BAND_ACCENT_HUMAN_NAMES,
);

export const HALO_SIZE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['original', 'large'],
  HALO_SIZE_HUMAN_NAMES,
);

export const CARAT_WEIGHT_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['1.0ct', '1.5ct', '2.0ct', '2.8ct', '4.0ct', '4.5ct', '5.0ct', '6.5ct', '7.5ct', '8.0ct', 'other'],
  CARAT_WEIGHT_HUMAN_NAMES,
);

export const ER_CARAT_WEIGHT_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['1.0ct', '1.5ct', '2.0ct', 'other'],
  CARAT_WEIGHT_HUMAN_NAMES,
);

export const BAND_WIDTHS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['1.5mm', '1.9mm', '2.1mm', '2.3mm', '2.7mm', '3mm', '3.2mm', '4.1mm', '4.5mm', '0.01ct', '0.02ct'],
  BAND_WIDTH_HUMAN_NAMES,
);

export const DIAMOND_TYPES_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  DIAMOND_TYPES_FOR_WEDDING,
  DIAMOND_TYPE_HUMAN_NAMES,
);

export const EARRING_SIDE_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['left', 'right', 'pair'],
  EARRING_SIDE_HUMAN_NAMES,
);

export const QUANTITY_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['single', 'pair'],
  QUANTITY_OPTION_HUMAN_NAMES,
);

export const BAND_COLOR_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['black', 'red'],
  BAND_COLOR_OPTION_HUMAN_NAMES,
);

export const DIAMOND_SIZE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['petite', 'original', 'medium', 'large'],
  DIAMOND_SIZE_OPTION_HUMAN_NAMES,
);

export const BAND_STYLE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['full', 'half'],
  BAND_STYLE_OPTION_HUMAN_NAMES,
);

export const STONE_SETTING_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['half-bezel', 'semi-bezel', 'full-bezel'],
  STONE_SETTING_HUMAN_NAMES,
);

export const BAND_STONE_SHAPE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['round-brilliant', 'baguette'],
  BAND_STONE_SHAPE_HUMAN_NAMES,
);

export const BAND_STONE_STYLE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['original', 'large'],
  BAND_STONE_STYLE_HUMAN_NAMES,
);

export const PRONG_STYLE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['plain', 'pave'],
  PRONG_STYLE_HUMAN_NAMES,
);

export const PAVE_CLUSTER_SHAPES_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['round', 'marquise', 'cushion'],
  PAVE_CLUSTER_SHAPE_HUMAN_NAMES,
);

export const PRODUCT_GROUP_KEY = 'productGroupKey';
export const PRODUCT_TITLE_ATTRIBUTE_KEY = '_productTitle';
export const PRODUCT_SPECS_ATTRIBUTE_KEY = '_specs';
export const PRODUCT_ASSET_ATTRIBUTE_KEY = 'productAsset';

export const PRODUCT_ICON_LIST_SHIPPING_COPY_ATTRIBUTE_KEY = 'productIconListShippingCopy';

export const SHIPPING_BUSINESS_DAYS_KEY = 'shippingBusinessDays';
export const SHIPPING_TEXT_KEY = 'shippingText';
export const EXPIRES_AT_KEY = 'expires_at';

export const OMEGA_WEDDING_BAND_PRODUCT_TYPE = 'Omega Wedding Band';
export const OMEGA_ENGAGEMENT_RING_PRODUCT_TYPE = 'Omega Engagement Ring';

export const MOCK_WEDDING_BAND_PRODUCT_TYPE = 'Mock Wedding Band';
export const MOCK_ENGAGEMENT_RING_PRODUCT_TYPE = 'Mock Engagement Ring';
export const MOCK_WEDDING_BAND_DEFAULT_SIZE = '7';
export const MOCK_ENAGEMENT_RING_DEFAULT_SIZE = '1ct';

export const GCAL_CERTIFICATE_ROOT_URL = 'http://images.gemfacts.com/GCALimages/Certs/';
export const DF_CERTIFICATE_ROOT_URL = 'https://certificate.diamondfoundry.com/download/';

export const MAX_MOCK_RINGS_ALLOWED = 3;

export const SAMPLE_RING_DEPOSIT_PRICE_CENTS = 5000;
export const ENGRAVING_PRICE_CENTS = 6000;
export const MIN_DIAMOND_PRICE_FOR_BUYBACK = 250000;
export const MIN_DIAMOND_CARAT_WEIGHT_FOR_BUYBACK = 1.5;

// Element references for focus and unfocus scroll effects:
export const CART_SCROLL_TARGET = 'cart-drawer';
export const MOBILE_NAV_SCROLL_TARGET = 'mobile-nav-drawer';
export const DIAMOND_TABLE_SCROLL_TARGET = 'diamond-table-drawer';
export const RING_SIZE_SCROLL_TARGET = 'ring-size-drawer';
export const DIAMOND_SPEC_SCROLL_TARGET = 'diamond-spec-drawer';
export const SHIPPING_FINANCE_SCROLL_TARGET = 'shipping-finance-drawer';
export const MOBILE_SEARCH_RESULTS_SCROLL_TARGET = 'mobile-search-results-scroll-target';
export const RING_SPEC_SCROLL_TARGET = 'ring-spec-drawer-scroll-target';
export const ENGRAVING_SCROLL_TARGET = 'engraving-drawer-scroll-target';
export const DIAMOND_BUYBACK_SCROLL_TARGET = 'diamond-buyback-drawer-scroll-target';
export const RING_SIZE_GUIDE_SCROLL_TARGET = 'ring-size-guide-drawer';

const PRODUCT_SPECS_HUMAN_NAMES = {
  bandWidth: { label: 'Band Width', isNumbered: true },
  bandDepth: { label: 'Band Depth', isNumbered: true },
  bandHeight: { label: 'Band Height', isNumbered: false },
  settingHeight: { label: 'Setting Height', isNumbered: true },
  metalWeight: { label: 'Metal Weight', isNumbered: false },
  paveCaratWeight: { label: 'Pave Carat Weight', isNumbered: false },
  caratWeight: { label: 'Carat Weight', isNumbered: false },
  goldWeight: { label: 'Gold Weight', isNumbered: false },
  diamondColor: { label: 'Diamond Color', isNumbered: false },
  diamondClarity: { label: 'Diamond Clarity', isNumbered: false },
  ringSize: { label: 'Ring Size', isNumbered: false },
};

export const RTS_PRODUCT_SPECS_IN_DISPLAY_ORDER = [
  'ringSize',
  'diamondColor',
  'diamondClarity',
  'bandWidth',
  'bandHeight',
  'settingHeight',
  'metalWeight',
  'paveCaratWeight',
].map((name) => {
  const label = PRODUCT_SPECS_HUMAN_NAMES[name].label;

  return {
    name,
    label,
  };
});

export const PRODUCT_SPECS_IN_DISPLAY_ORDER = [
  'bandWidth',
  'bandDepth',
  'settingHeight',
  'metalWeight',
  'paveCaratWeight',
].map((name) => {
  const label = PRODUCT_SPECS_HUMAN_NAMES[name].label;
  const isNumbered = PRODUCT_SPECS_HUMAN_NAMES[name].isNumbered;

  return {
    name,
    label,
    isNumbered,
  };
});

export const READY_TO_SHIP_CARAT_WEIGHTS = ['0.75ct', '1.00ct', '1.50ct'];

export const NAV_SHOP_BY_DIAMOND_SHAPE = 'Shop By Shape';

export const NAV_SHOP_BY_DIAMOND_SHAPE_KEY = 'shop_by_shape';
export const NAV_SHOP_BY_STYLE_KEY = 'shop_by_style';

// Used in Diamonds page & Diamond notifier
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

export const OPTION_TYPES = {
  metal: 'metal',
  diamondType: 'diamondType',
  tag: 'tag',
};

export const DIAMOND_TYPE_INTERNAL_NAMES = {
  'Brilliant Round': 'round-brilliant',
  'Round Brilliant': 'round-brilliant',
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

export const DEFAULT_ANIMATE_HEIGHT_TRANSITION = {
  transition: 'height .2s ease,opacity .2s ease-in-out,transform .2s ease-in-out',
  '&.rah-animating--to-height-zero': {
    opacity: 0,
    transform: 'translateY(-0.625rem)',
  },
};

export const SETTING_FLOW = 'setting';
export const DIAMOND_FLOW = 'diamond';
export const MODULAR_JEWELRY_FLOW = 'modular-jewelry';

export const DIAMOND_TABLE_HEADER_HEIGHT = 37;
export const STICKY_ROW_HEIGHT = 56;

export const TABLE_SHAPE_EDIT = 'table-shape';
export const TABLE_DIAMOND_EDIT_FROM_SUMMARY = 'table-diamond-from-summary';
export const TABLE_DIAMOND_EDIT_FROM_PDP = 'table-diamond-from-pdp';

export const SHOPIFY_PRODUCT_HANDLE = 'shopifyProductHandle';

export const ENGRAVING_INITIALS_OPTIONS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
export const DEFAULT_LINE_ITEM_QUANTITY = 1;

export const KLAVIYO_WISHLIST_TRACKING_EVENT = 'Added to Wishlist';
export const KLAVIYO_DROP_A_HINT_TRACKING_EVENT = 'Added to Drop A Hint';
export const KLAVIYO_EMAIL_PROMO_TRACKING_EVENT = 'Added to Email Promo';
export const KLAVIYO_MASTER_LIST_ID = 'NbwUGy';
export const KLAVIYO_FOOTER_LIST_ID = 'Jk35FS';
export const KLAVIYO_DROP_A_HINT_LIST_ID = 'QRTL9T';
export const KLAVIYO_EMAIL_POP_UP_LIST_ID = 'S3aWh3'; // 'XBuDUz';
export const KLAVIYO_AUCTION_LIST_ID = 'WnXShW';

export const HUBSPOT_FOOTER_FORM_ID = '5bbd7e7f-a3dd-457b-a79c-7aec147b9ea1';
export const HUBSPOT_EMAIL_POPUP_FORM_ID = '2c8aea7c-c2b2-4bf8-92dc-2127fa15b9df';
export const HUBSPOT_DROP_A_HINT_FORM_ID = 'e1e27d69-025c-4cac-88ff-402b0cc59197';
export const HUBSPOT_NEED_MORE_TIME_FORM_ID = '148fcc3b-3e18-4307-88c6-4586b504fe0b';
export const HUBSPOT_BACK_IN_STOCK_FORM_ID = 'ef5ffa4e-7f36-489e-8c27-6da515959978';
export const HUBSPOT_CONTENT_BLOCK_FORM_ID = 'c03da3ce-a7ac-4ad6-8290-92b6d483d7b6';
export const HUBSPOT_PORTAL_ID = '21830550';
export const HUBSPOT_CAMPAIGN_ID = '7012E000001lWbSQAU';
export const HUBSPOT_FORM_SUBMIT_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';
export const HUBSPOT_CONSENT_TEXT =
  'By clicking submit below, you consent to allow VRAI to store and process the personal information submitted above to provide you the content requested..';

export const HUBSPOT_FOOTER_LIST = {
  source: 'Email Sub - Footer Signup',
  listId: HUBSPOT_FOOTER_FORM_ID,
  sfdcCampaignId: HUBSPOT_CAMPAIGN_ID,
};

export const HUBSPOT_CONTENT_BLOCK_LIST = {
  source: 'Email Sub - Content Block Signup',
  listId: HUBSPOT_CONTENT_BLOCK_FORM_ID,
  sfdcCampaignId: HUBSPOT_CAMPAIGN_ID,
};

export const HUBSPOT_WISHLIST_SHARE_FORM_ID = '905f6151-0abd-4514-81ae-e76dccacf87d';

export const FORM_SUBSCRIPTION_SOURCE_NAME = {
  diamondNotifierSource: 'Email Sub - Diamond Notifier Signup',
  popupEmailSource: 'Email Sub - Popup Signup',
  smsSub: 'SMS Subscription',
  dropAHintSource: 'Email Subscription - Drop a hint',
  backInStockSource: 'Email Sub - Back in stock',
  needTimeToThinkSource: 'Email Sub - Need time to think',
  wishlistShareSource: 'Email Sub - Wishlisters',
};

export const GIFT_CARD_SLUG = 'digital-gift-card';

export const DIAMOND_TYPE_BUILDER_ENGAGEMENT_RING_LIST_PAGE_SLUGS = {
  'round-brilliant': 'round-brilliant-cut-diamond-engagement-rings',
  oval: 'oval-cut-diamond-engagement-rings',
  emerald: 'emerald-cut-diamond-engagement-rings',
  marquise: 'marquise-cut-diamond-engagement-rings',
  cushion: 'cushion-cut-diamond-engagement-rings',
  pear: 'pear-cut-diamond-engagement-rings',
  trillion: 'trillion-cut-diamond-engagement-rings',
  asscher: 'asscher-cut-diamond-engagement-rings',
  princess: 'princess-cut-diamond-engagement-rings',
  radiant: 'radiant-cut-diamond-engagement-rings',
};

export const INVERTED_DIAMOND_TYPE_BUILDER_ENGAGEMENT_RING_LIST_PAGE_SLUGS = {
  'round-brilliant-cut-diamond-engagement-rings': 'round-brilliant',
  'oval-cut-diamond-engagement-rings': 'oval',
  'emerald-cut-diamond-engagement-rings': 'emerald',
  'marquise-cut-diamond-engagement-rings': 'marquise',
  'cushion-cut-diamond-engagement-rings': 'cushion',
  'pear-cut-diamond-engagement-rings': 'pear',
  'trillion-cut-diamond-engagement-rings': 'trillion',
  'asscher-cut-diamond-engagement-rings': 'asscher',
  'princess-cut-diamond-engagement-rings': 'princess',
  'radiant-cut-diamond-engagement-rings': 'radiant',
};

export const DIAMOND_TYPE_BUILDER_ENGAGEMENT_RING_LIST_PAGE_ROUTES = {
  'round-brilliant': 'https://www.vrai.com/round-brilliant-cut-diamond-engagement-rings',
  oval: 'https://www.vrai.com/oval-cut-diamond-engagement-rings',
  emerald: 'https://www.vrai.com/emerald-cut-diamond-engagement-rings',
  marquise: 'https://www.vrai.com/marquise-cut-diamond-engagement-rings',
  cushion: 'https://www.vrai.com/cushion-cut-diamond-engagement-rings',
  pear: 'https://www.vrai.com/pear-cut-diamond-engagement-rings',
  trillion: 'https://www.vrai.com/trillion-cut-diamond-engagement-rings',
  asscher: 'https://www.vrai.com/asscher-cut-diamond-engagement-rings',
  princess: 'https://www.vrai.com/princess-cut-diamond-engagement-rings',
  radiant: 'https://www.vrai.com/radiant-cut-diamond-engagement-rings',
};

export const REMOVE_FTC_COPY_WEDDING_BAND_SLUG = ['flat-band', 'domed-band'];

export const JEWELRY_CATEGORY_PRODUCT_TYPES = {
  [RINGS_CATEGORY]: RING_PRODUCT_TYPE,
  [NECKLACES_CATEGORY]: NECKLACE_PRODUCT_TYPE,
  [EARRINGS_CATEGORY]: EARRING_PRODUCT_TYPE,
  [BRACELETS_CATEGORY]: BRACELET_PRODUCT_TYPE,
  [ACCESSORIES_CATEGORY]: ACCESSORY_PRODUCT_TYPE,
};

export const ACCOUNT_DETAILS_PATH = '/account/details';

export const PRIMARY_DOMAIN_COUNTRIES = ['US', 'CA', 'AU', 'JP', 'SG', 'KR', 'International'];
export const PRIMARY_DOMAIN_URL = getRootURL(ENV_SUBDOMAIN); //VO_ROOT_URL;

export const EU_DOMAIN_COUNTRIES = [
  'FI',
  'IE',
  'PT',
  'BG',
  'CY',
  'CZ',
  'EE',
  'GR',
  'HR',
  'HU',
  'LT',
  'LU',
  'LV',
  'MT',
  'PL',
  'RO',
  'SI',
  'SK',
];
export const EU_DOMAIN_URL = getRootURL(ENV_SUBDOMAIN, 'eu'); // 'https://eu.vrai.com';

export const DE_DOMAIN_COUNTRIES = ['DE', 'AT'];
export const DE_DOMAIN_URL = getRootURL(ENV_SUBDOMAIN, 'de'); // 'https://de.vrai.com';

export const VRAI_CHINA_URL = 'http://www.vrai.cn';

export const REGIONAL_REDIRECTS = {
  CN: VRAI_CHINA_URL,
  TW: VRAI_CHINA_URL,
  HK: VRAI_CHINA_URL,
  GB: getRootURL(ENV_SUBDOMAIN, 'uk'), // 'https://uk.vrai.com',
  DE: DE_DOMAIN_URL,
  AT: DE_DOMAIN_URL,
  CH: getRootURL(ENV_SUBDOMAIN, 'ch'), // 'https://ch.vrai.com',
  FR: getRootURL(ENV_SUBDOMAIN, 'fr'), // 'https://fr.vrai.com',
  ES: getRootURL(ENV_SUBDOMAIN, 'es'), // 'https://es.vrai.com',
  IT: getRootURL(ENV_SUBDOMAIN, 'it'), // 'https://it.vrai.com',
  NL: getRootURL(ENV_SUBDOMAIN, 'nl'), // 'https://nl.vrai.com',
  SE: getRootURL(ENV_SUBDOMAIN, 'se'), // 'https://se.vrai.com',
  NO: getRootURL(ENV_SUBDOMAIN, 'no'), // 'https://no.vrai.com',
  BE: getRootURL(ENV_SUBDOMAIN, 'be'), // 'https://be.vrai.com',
  DK: getRootURL(ENV_SUBDOMAIN, 'dk'), // 'https://dk.vrai.com',
};

// This is the map of domains for each language
export const HREFLANG_MAP = {
  'en-us': [PRIMARY_DOMAIN_URL],
  de: [DE_DOMAIN_URL],
  'de-de': [DE_DOMAIN_URL],
  'de-at': [DE_DOMAIN_URL],
  'de-ch': [getRootURL(ENV_SUBDOMAIN, 'ch')],
  'en-gb': [getRootURL(ENV_SUBDOMAIN, 'uk')],
  'en-ca': [PRIMARY_DOMAIN_URL],
  fr: [getRootURL(ENV_SUBDOMAIN, 'fr')],
  'fr-fr': [getRootURL(ENV_SUBDOMAIN, 'fr')],
  'es-es': [getRootURL(ENV_SUBDOMAIN, 'es')],
  'en-it': [getRootURL(ENV_SUBDOMAIN, 'it')],
  'en-nl': [getRootURL(ENV_SUBDOMAIN, 'nl')],
  'en-se': [getRootURL(ENV_SUBDOMAIN, 'se')],
  'en-no': [getRootURL(ENV_SUBDOMAIN, 'no')],
  'en-dk': [getRootURL(ENV_SUBDOMAIN, 'dk')],
  'en-be': [getRootURL(ENV_SUBDOMAIN, 'be')],
  'x-default': [PRIMARY_DOMAIN_URL],
};

export const DEFAULT_CURRENCY_FOR_COUNTRY = {
  CA: 'CAD', // Canada
  US: 'USD', // United States
  AT: 'EUR', // Austria
  BE: 'EUR', // Belgium
  DK: 'EUR', // Denmark
  FI: 'EUR', // Finland
  FR: 'EUR', // France
  DE: 'EUR', // Germany
  IE: 'EUR', // Ireland
  IT: 'EUR', // Italy
  NL: 'EUR', // Netherlands
  NO: 'EUR', // Norway
  PT: 'EUR', // Portugal
  ES: 'EUR', // Spain
  SE: 'EUR', // Sweden
  CH: 'EUR', // Switzerland
  GB: 'GBP', // Great Britain = United Kingdom
  AU: 'AUD', // Australia
  JP: 'USD', // Japan
  SG: 'USD', // Singapore
  KR: 'USD', // South Korea
  BG: 'EUR', // Bulgaria
  CY: 'EUR', // Cyprus
  CZ: 'EUR', // Czechia
  EE: 'EUR', // Estonia
  GR: 'EUR', // Greece
  HR: 'EUR', // Croatia
  HU: 'EUR', // Hungary
  LT: 'EUR', // Lithuania
  LU: 'EUR', // Luxemborg
  LV: 'EUR', // Latvia
  MT: 'EUR', // Malta
  PL: 'EUR', // Poland
  RO: 'EUR', // Romania
  SI: 'EUR', // Slovenia
  SK: 'EUR', // Slovakia
  International: 'USD',
};

export const COUNTRY_CODES = {
  Canada: 'CA',
  'United States': 'US',
  Austria: 'AT',
  Belgium: 'BE',
  Denmark: 'DK',
  Finland: 'FI',
  France: 'FR',
  Germany: 'DE',
  Ireland: 'IE',
  Italy: 'IT',
  Netherlands: 'NL',
  Norway: 'NO',
  Portugal: 'PT',
  Spain: 'ES',
  Sweden: 'SE',
  Switzerland: 'CH',
  'United Kingdom': 'GB', // GB = Great Britain
  Australia: 'AU',
  'Japan 日本': 'JP',
  Singapore: 'SG',
  'South Korea 한국': 'KR',
  'Mainland China 中国大陆': 'CN',
  'Taiwan 台湾': 'TW',
  'Hong Kong 香港': 'HK',
  Bulgaria: 'BG',
  Cyprus: 'CY',
  Czechia: 'CZ',
  Estonia: 'EE',
  Greece: 'GR',
  Croatia: 'HR',
  Hungary: 'HU',
  Lithuania: 'LT',
  Luxembourg: 'LU',
  Latvia: 'LV',
  Malta: 'MT',
  Poland: 'PL',
  Romania: 'RO',
  Slovenia: 'SI',
  Slovakia: 'SK',
  International: 'International',
};

export const EU_COUNTRY_CODES = [
  'AT',
  'BE',
  'DK',
  'FI',
  'FR',
  'DE',
  'IE',
  'IT',
  'NL',
  'NO',
  'PT',
  'ES',
  'SE',
  'CH',
  'GB', // GB = Great Britain = United Kingdom
  'BG',
  'CY',
  'CZ',
  'EE',
  'GR',
  'HR',
  'HU',
  'LT',
  'LU',
  'LV',
  'MT',
  'PL',
  'RO',
  'SI',
  'SK',
];

export const VAT_ENABLED_COUNTRIES = [
  'AT',
  'BE',
  'DK',
  'FI',
  'FR',
  'DE',
  'IE',
  'IT',
  'NL',
  'PT',
  'ES',
  'SE',
  'GB',
  'BG',
  'CY',
  'CZ',
  'EE',
  'GR',
  'HR',
  'HU',
  'LT',
  'LU',
  'LV',
  'MT',
  'PL',
  'RO',
  'SI',
  'SK',
];

export const DATO_PRICES_COUNTRY_CODES = [
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

export const NAV_FLAGS = {
  EU_HIDE: 'eu-hide',
  NON_US_HIDE: 'non-us-hide',
  NON_US_OR_INTERNATIONAL_HIDE: 'non-us-or-international-hide',
};

// round brilliant, oval, emerald, marquise, cushion, pear, asscher, princess, radiant, trillion

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

export const OMEGA_ENGAGEMENT_AND_WEDDING_SLUGS_TO_WARM = [
  'twist',
  'three-stone',
  'signature-prong',
  'signature-bezel',
  'curator',
  'hover',
  'knife-edge',
  'signature-halo',
  'baguette-bar-band',
  'dip-band',
  'knife-edge-band',
  'curator-band',
  'domed-band',
  'flat-band',
  'infinity-band',
  'cathedral',
  'classic-4-prong-dome',
  'signature-6-prong',
  'signature-v-ring',
  'signature-v-band',
  'half-pave-band',
  'classic-hidden-halo',
  'classic-two-tone-ring',
];

export const NAV_HEADER_LINKS = {
  loveEngagement: '/engagement-rings',
  VRAIcreatedDiamond: '/how-to-buy-diamonds',
  fineJewelry: '/all-jewelry',
  Gifts: '/best-selling-gifts-jewelry',
  about: '/vrai-sustainability',
};

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

export const STYLE_TO_ENGAGEMENT_RING_STYLE_LIST_PAGE_SLUG_MAP = {
  solitaire: 'solitaire-engagement-rings',
  'vintage-inspired': 'vintage-inspired-engagement-rings',
  halo: 'halo-engagement-rings',
  cathedral: 'cathedral-engagement-rings',
  'three-stone': 'three-stone-engagement-rings',
  'two-tone': 'two-tone-engagement-rings',
  'hidden-halo': 'hidden-halo-engagement-rings',
  bezel: 'signature-bezel-engagement-rings',
};

export const ENGAGEMENT_RING_LIST_PAGE_SLUG_TO_STYLE_MAP = {
  'solitaire-engagement-rings': 'solitaire',
  'vintage-inspired-engagement-rings': 'vintage-inspired',
  'halo-engagement-rings': 'halo',
  'cathedral-engagement-rings': 'cathedral',
  'three-stone-engagement-rings': 'three-stone',
  'two-tone-engagement-rings': 'two-tone',
  'hidden-halo-engagement-rings': 'hidden-halo',
  'signature-bezel-engagement-rings': 'bezel',
};

export const ENGAGEMENT_RING_METAL_LIST_PAGE_SLUGS = [
  'yellow-gold-engagement-rings',
  'rose-gold-engagement-rings',
  'white-gold-engagement-rings',
  'platinum-engagement-rings',
];

export const METAL_TO_ENGAGEMENT_RING_METAL_LIST_PAGE_SLUG_MAP = {
  'yellow-gold': 'yellow-gold-engagement-rings',
  'rose-gold': 'rose-gold-engagement-rings',
  'white-gold': 'white-gold-engagement-rings',
  platinum: 'platinum-engagement-rings',
};

export const ENGAGEMENT_RING_LIST_PAGE_SLUG_TO_METAL_MAP = {
  'yellow-gold-engagement-rings': 'yellow-gold',
  'rose-gold-engagement-rings': 'rose-gold',
  'white-gold-engagement-rings': 'white-gold',
  'platinum-engagement-rings': 'platinum',
};

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

export const LIST_PAGE_SLUGS = [
  ...DIAMOND_LIST_PAGE_SLUGS,
  ...JEWELRY_LIST_PAGE_SLUGS,
  ...ER_LIST_PAGE_SLUGS,
  'wedding-bands',
];

export const JEWELRY_SUB_CATEGORY_OPTIONS_LABEL_ID = 'style-options';
export const METAL_OPTIONS_ARIA_LABEL_ID = 'metal-options';
export const METAL_OPTIONS_DESKTOP_ARIA_LABEL_ID = 'metal-options-desktop';
export const SHAPE_OPTIONS_ARIA_LABEL_ID = 'shape-options';
export const SORT_OPTIONS_ARIA_LABEL_ID = 'sort-options';
export const BAND_ACCENT_OPTIONS_ARIA_LABEL_ID = 'band-accent-options';
export const RING_SIZE_OPTIONS_ARIA_LABEL_ID = 'ring-size-options';
export const PRICE_OPTIONS_ARIA_LABEL_ID = 'price-options';
export const BAND_ACCENT_OPTIONS_DESKTOP_ARIA_LABEL_ID = 'band-accent-options-desktop';
export const SIDE_STONE_CARAT_OPTIONS_ARIA_LABEL_ID = 'side-stone-carat-options';
export const SIDE_STONE_CARAT_OPTIONS_DESKTOP_ARIA_LABEL_ID = 'side-stone-carat-options-desktop';
export const SIDE_STONE_SHAPE_OPTIONS_ARIA_LABEL_ID = 'side-stone-shape-options';
export const SIDE_STONE_SHAPE_OPTIONS_DESKTOP_ARIA_LABEL_ID = 'side-stone-shape-options-desktop';
export const SIZE_GUIDE_MENU_ARIA_LABEL_ID = 'size-guide-menu';
export const SIZE_GUIDE_MENU_BUTTON_ARIA_LABEL_ID = 'size-guide-menu-button';
export const SIZE_GUIDE_MENU_BUTTON_DESKTOP_ARIA_LABEL_ID = 'size-guide-menu-button-desktop';

export const EMAIL_FORM_GTM_LABELS = {
  diamondNotifier: 'diamond notifier',
  footerMailingList: 'footer mailing list',
  contentBlockMailingList: 'content block mailing list',
  waitlist: 'waitlist',
  auctionWaitlist: 'auctionWaitlist',
  dropAHint: 'drop a hint',
  needTimeToThink: 'need time to think',
  unsubscribeDiamondNotifier: 'unsubscribe diamond notifier',
  wishlist: 'share wishlist',
};

export const TWO_TONE_PLAT_ONLY_SLUG = 'classic-two-tone-ring';

/*
    This list contains any slugs that shouldn't be added to the 
    sitemap dynamically, nor appear at root/slug.
  
    That includes internal pages like blocks_demo and any pages that
    have fixed routes.
  */
export const HIDDEN_STANDARD_PAGE_SLUGS = [
  'blocks_demo',
  'annual-gift-thank-you',
  'VRAI-x-RANDM',
  'unsubscribe',
  'diamond-notifier',
  'toi_moi',
  'diamond_tolerance',
  'special_shapes',
  'hearst_collection',
  'appointment-booking',
  'appointment-confirmation',
  'appointment-landing',
  'spotted',
  'our-mission',
  'about',
  'test-standard-page',
  'blog-home',
  'education',
  'latest-stories',
  'jewelry',
  'styling-and-gifting',
  'engagement-and-wedding',
  'los-angeles',
];

export const DESKTOP_NAV_ABOUT = 'about';

export const SHAPE_INCLUDED_PRODUCT_SLUGS = ['baguette-bar-band', 'baguette-bar-ring'];
export const PAIR_ONLY_CARAT_WEIGHTS = ['0.10ct', '0.25ct', '0.33ct', '0.30ct'];
export const FILTER_COLOR_OPTIONS = {
  DEF: ['D', 'E', 'F'],
  GHI: ['G', 'H', 'I'],
  JKL: ['J', 'K', 'L'],
};

export const FILTER_CLARITY_OPTIONS = {
  VVS: ['VVS1', 'VVS2'],
  VS: ['VS1', 'VS2'],
  SI: ['SI1', 'SI2'],
};

export const FILTER_CUT_OPTIONS = {
  'Ideal+Hearts': ['Ideal+Hearts'],
  Ideal: ['Ideal'],
  Excellent: ['Excellent'],
};

export const SUBSCRIPTION_PRODUCT_SLUG = 'annual-gift-2022-500';

// use Hoop Size instead of Hoop Length, and use Hoop Size Human Names
export const HOOP_SIZE_SLUGS = ['eternity-hoop'];

export const CUT = 'CUT';

export const OMIT_SLUG_LIST = [
  // new necklaces remove from omit list Nov 16
  'petite-pave-bar-necklace',
  'petite-pave-v-necklace',
  // new pave cluster
  'pave-cluster-necklace',
  'pave-cluster-stud',
  'pave-cluster-ring',
];

export const POPULAR_RING_SIZES = ['4.5', '5', '6', '7', '8'];

export const DEFAULT_BLOG_SORT = 'updatedAt';

export const MADRID_DEV_IP = '139.47.80.104';

// Colors
export const teal = '#719093';

// PDP
export const IMAGE_BASE_URL = 'https://images.vraiandoro.com';
