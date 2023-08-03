export const ProductType = {
  EngagementRing: 'Engagement Ring',
  WeddingBand: 'Wedding Band',
  Earrings: 'Earrings',
  Necklace: 'Necklace',
  Bracelet: 'Bracelet',
  Ring: 'Ring',
} as const;

export const productTypeToCategoryMap = {
  [ProductType.Necklace]: 'necklaces',
  [ProductType.Bracelet]: 'bracelets',
  [ProductType.Earrings]: 'earrings',
  [ProductType.Ring]: 'rings',
  [ProductType.WeddingBand]: 'wedding-bands',
  [ProductType.EngagementRing]: 'engagement-ring',
};

/** CONFIG */

export const productConfigProperties = {
  DiamondType: 'diamondType',
  SideStoneShape: 'sideStoneShape',
  Metal: 'metal',
  GoldPurity: 'goldPurity',
  BandAccent: 'bandAccent',
  SideStoneCarat: 'sideStoneCarat',
  CaratWeight: 'caratWeight',
  DiamondOrientation: 'diamondOrientation',
  RingSize: 'ringSize',
} as const;

export const propertiesOrder = [
  productConfigProperties.DiamondType,
  productConfigProperties.SideStoneShape,
  productConfigProperties.Metal,
  productConfigProperties.GoldPurity,
  productConfigProperties.BandAccent,
  productConfigProperties.SideStoneCarat,
  productConfigProperties.CaratWeight,
  productConfigProperties.DiamondOrientation,
  productConfigProperties.RingSize,
] as const;

export const metalTypes = {
  YellowGold: 'yellow-gold',
  WhiteGold: 'white-gold',
  RoseGold: 'rose-gold',
  Platinum: 'platinum',
  Silver: 'sterling-silver',
} as const;

export const DiamondOrientations = {
  Horizontal: 'horizontal',
  Verical: 'vertical',
} as const;

export const CenterStoneCaratWeights = {
  HalfCarat: '0.5',
  OneCarat: '1',
  OneAndHalfCarat: '1.5',
  TwoCarat: '2',
  Other: 'other',
} as const;

export const GoldPurity = {
  EighteenKarat: '18k',
  FourteenKarat: '14k',
} as const;

export const PaveStyles = {
  Pave: 'pave',
  Plain: 'plain',
} as const;

export const BandAccentTypes = PaveStyles;

export const SideStoneCaratWeight = {
  QuarterCarat: 0.25,
  HalfCarat: 0.5,
} as const;

export const DiamondSizes = {
  Petite: 'petite',
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
} as const;

export const ChainLengths = {
  SixteenToEighteen: '16 - 18"',
  EighteenToTwenty: '18 - 20"',
} as const;

export const BandSizes = {
  Original: 'original',
  Large: 'large',
} as const;

export const ProngStyles = PaveStyles;

export const HaloSizes = {
  Original: 'original',
  Large: 'large',
} as const;
