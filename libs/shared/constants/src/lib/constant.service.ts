export * from './hardcodedModularJewelryProducts.service';
export * from './lib/ariaLabel';
export * from './lib/band';
export * from './lib/blockPicker';
export * from './lib/brand';
export * from './lib/canonical';
export * from './lib/carat';
export * from './lib/cart';
export * from './lib/color';
export * from './lib/countries-map';
export * from './lib/country';
export * from './lib/currency';
export * from './lib/diamond';
export * from './lib/diamondCutForYou';
export * from './lib/diamondTable';
export * from './lib/email';
export * from './lib/engagementRing';
export * from './lib/engraving';
export * from './lib/environment';
export * from './lib/flow';
export * from './lib/gift';
export * from './lib/goldPurity';
export * from './lib/hiddenPage';
export * from './lib/hubspot';
export * from './lib/image';
export * from './lib/internationalization';
export * from './lib/jewelry';
export * from './lib/klaviyo';
export * from './lib/listPage';
export * from './lib/metal';
export * from './lib/nav';
export * from './lib/pair';
export * from './lib/plp';
export * from './lib/productOption';
export * from './lib/productSpec';
export * from './lib/productType';
export * from './lib/ring';
export * from './lib/ringStyles';
export * from './lib/shipping';
export * from './lib/showRoom';
export * from './lib/states-map';
export * from './lib/tags';
export * from './lib/url';
export * from './lib/video';

export const DF_API_KEY = '';
export const MIN_CARAT_WEIGHT = 1.01;
export const INCREMENT_WEIGHT = 0.05;

// TODO: tidy up the rest of the list
export enum ProngStyles {
  Plain = 'plain',
  Pave = 'pave',
}

export const isValidBoolean = [true, false];
export const EXPIRES_AT_KEY = 'expires_at';
export const SHOPIFY_PRODUCT_HANDLE = 'shopifyProductHandle';
export const TWO_TONE_PLAT_ONLY_SLUG = 'classic-two-tone-ring';
export const SHAPE_INCLUDED_PRODUCT_SLUGS = ['baguette-bar-band', 'baguette-bar-ring'];
export const HOOP_SIZE_SLUGS = ['eternity-hoop'];
export const OMIT_SLUG_LIST = [
  'petite-pave-bar-necklace',
  'petite-pave-v-necklace',
  'pave-cluster-necklace',
  'pave-cluster-stud',
  'pave-cluster-ring',
];
export const CUSTOM_ATTRIBUTE_KEY_NAME_MAP = {
  productGroupKey: 'productGroupKey',
  _EngravingKey: 'engravingKey',
  _EngravingFont: 'engravingRenderedFont',
  _EngravingBack: 'engravingBack',
  note: 'note',
  productAsset: 'productAsset',
  productIconListShippingCopy: 'productIconListShippingCopy',
  feedId: 'feedId',
  pdpUrl: 'pdpUrl',
};

// TODO: discuss a strategy for using this in PDP - https://diamondfoundry.atlassian.net/jira/software/projects/DIA/boards/99/backlog?selectedIssue=DIA-180
export enum PdpTypePlural {
  EngagementRings = 'Engagement Rings',
  WeddingBands = 'Wedding Bands',
  Jewelry = 'Jewelry',
  RingSizer = 'Ring Sizer',
  Accessories = 'Accessories',
  GiftCards = 'Gift Cards',
  'Ring Sizer' = 'Ring Sizer',
}

export const pdpTypePluralAsConst = {
  ['Engagement Rings']: 'Engagement Rings',
  ['Wedding Bands']: 'Wedding Bands',
  ['Jewelry']: 'Jewelry',
  ['Accessories']: 'Accessory',
  ['Gift Cards']: 'Gift Cards',
  ['Ring Sizer']: 'Ring Sizer',
} as const;

export const pdpTypeHandleAsConst = {
  ['engagement-rings']: 'Engagement Rings',
  ['jewelry']: 'Jewelry',
  ['accessories']: 'Accessory',
  ['gift-cards']: 'Gift Cards',
  ['ring-sizer']: 'Ring Sizer',
} as const;

export const pdpTypeTitleSingleToPluralHandleAsConst = {
  ['Engagement Ring']: 'engagement-rings',
  ['Necklace']: 'necklaces',
  ['Ring']: 'rings',
  ['Earring']: 'earrings',
  ['Earrings']: 'earrings',
  ['Bracelet']: 'bracelets',
  ['Wedding Band']: 'wedding-bands',
} as const;

export const pdpTypeHandleSingleToPluralAsConst = {
  ['engagement-ring']: 'Engagement Rings',
  ['jewelry']: 'Jewelry',
  ['wedding-bands']: 'Wedding Bands',
  ['accessories']: 'Accessory',
  ['gift-cards']: 'Gift Cards',
  ['ring-sizer']: 'Ring Sizer',
} as const;

export const pdpTypeSingleToPluralAsConst = {
  ['Engagement Ring']: 'Engagement Rings',
  ['Jewelry']: 'Jewelry',
  ['Necklace']: 'Necklaces',
  ['Bracelet']: 'Bracelets',
  ['Ring']: 'Rings',
  ['Earring']: 'Earrings',
  ['Wedding Band']: 'Wedding Bands',
  ['Accessory']: 'Accessories',
  ['Gift Card']: 'Gift Cards',
} as const;

export const jewelryTypes = ['Necklace', 'Bracelet', 'Earrings', 'Ring'];

export const metalTypeAsConst = {
  platinum: 'Platinum',
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
  'sterling-silver': 'Sterling Silver',
} as const;

export const MOCK_COLOR_DISPLAY_NAMING_MAP = {
  '18k Rose Gold': 'Rose Gold',
  '18k White Gold': 'White Gold / Platinum',
  '18k Yellow Gold': 'Yellow Gold',
  '18K Rose Gold': 'Rose Gold',
  '18K White Gold': 'White Gold / Platinum',
  '18K Yellow Gold': 'Yellow Gold',
  'Rose Gold': 'Rose Gold',
  'White Gold': 'White Gold / Platinum',
  'Yellow Gold': 'Yellow Gold',
} as const;

export const EAST_WEST_SIDE_STONE_SHAPES = ['pear', 'trillion', 'tapered-baguette'];

export const EAST_WEST_SHAPES = ['oval', 'emerald', 'pear', 'radiant', 'cushion', 'marquise'];

// Source of truth - Sam D.
export const JEWELRY_THAT_CAN_TAKE_CUSTOM_DIAMONDS = [
  'solitaire-diamond-studs',
  'halo-diamond-stud',
  'bezel-solitaire-stud',
  'solitaire-diamond-necklace',
  'solitaire-diamond-pendant',
  'halo-diamond-necklace',
  'bezel-solitaire-necklace',
  'halo-diamond-pendant',
];
