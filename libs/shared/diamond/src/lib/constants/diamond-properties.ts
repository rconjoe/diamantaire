export const DiamondProperty = {
  diamondType: 'diamondType',
  carat: 'carat',
  color: 'color',
  clarity: 'clarity',
  cut: 'cut',
} as const;

/** Diamond Type (Shape) */

export const DiamondType = {
  Oval: 'oval',
  RoundBrilliant: 'round-brilliant',
  // TODO: Add more shapes
} as const;

export const MixedDiamondTypes = {
  OvalAndRoundBrilliant: 'oval+round-brilliant',
  // TODO: Add more shapes
} as const;

/** CLARITY */

export const DiamondClarity = {
  FL: 'FL',
  VVS1: 'VVS1',
  VVS2: 'VVS2',
  VS1: 'VS1',
  VSPlus: 'VS+',
  VS2: 'VS2',
  SI1: 'SI1',
  SI2: 'SI2',
} as const;

export const DiamondClarities: string[] = Object.values(DiamondClarity);

export const DiamondClarityGroup: {
  [key: string]: (typeof DiamondClarity)[keyof typeof DiamondClarity][];
} = {
  VVS: [DiamondClarity.FL, DiamondClarity.VVS1, DiamondClarity.VVS2],
  VS: [DiamondClarity.FL, DiamondClarity.VVS1, DiamondClarity.VVS2, DiamondClarity.VS1, DiamondClarity.VS2],
};

/** COLOR */

export const DiamondColor = {
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
  I: 'I',
  J: 'J',
  K: 'K',
  L: 'L',
  M: 'M',
  N: 'N',
  NearColorless: 'NearColorless',
  Colorless: 'Colorless',
} as const;

export const DiamondColorGroup: { [key: string]: (typeof DiamondColor)[keyof typeof DiamondColor][] } = {
  DEF: [DiamondColor.D, DiamondColor.E, DiamondColor.F],
  GHI: [DiamondColor.G, DiamondColor.H, DiamondColor.I],
  JKL: [DiamondColor.J, DiamondColor.K, DiamondColor.L],
};

export const DiamondColors: string[] = Object.values(DiamondColor);

/** CUT **/

export const DiamondCut = {
  IdealPlusHearts: 'Ideal+Hearts',
  Ideal: 'Ideal',
  Excellent: 'Excellent',
  ExcellentPlus: 'Excellent+',
  VeryGood: 'Very Good',
} as const;

export const DiamondCuts: string[] = Object.values(DiamondCut);
