export * from './lib/ariaLabel';
export * from './lib/band';
export * from './lib/brand';
export * from './lib/blockPicker';
export * from './lib/canonical';
export * from './lib/carat';
export * from './lib/cart';
export * from './lib/color';
export * from './lib/country';
export * from './lib/countries-map';
export * from './lib/currency';
export * from './lib/diamond';
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
export * from './lib/shipping';
export * from './lib/showRoom';
export * from './lib/states-map';
export * from './lib/tags';
export * from './lib/url';
export * from './lib/video';

export const DF_API_KEY = '';

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
}

export const pdpTypePluralAsConst = {
  ['Engagement Rings']: 'Engagement Rings',
  ['Jewelry']: 'Jewelry',
} as const;

export const pdpTypeHandleAsConst = {
  ['engagement-rings']: 'Engagement Rings',
  ['jewelry']: 'Jewelry',
} as const;

export const pdpTypeHandleSingleToPluralAsConst = {
  ['engagement-ring']: 'Engagement Rings',
  ['jewelry']: 'Jewelry',
} as const;

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
