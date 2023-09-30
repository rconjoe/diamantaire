export const prongStyleValues = ['plain', 'pave'] as const;
export const bandVersionValues = ['petite', 'original', 'large'] as const;
export const bandStoneStyleValues = ['original', 'large'] as const;
export const hoopAccentValues = ['plain', 'pave'] as const;
export const haloSizeValues = ['original', 'large'] as const;
export const sideStoneCaratValues = ['0.10ct', '0.25ct', '0.50ct'] as const;
export const ceramicColorValues = ['black', 'dark-green', 'turquoise', 'white', 'yellow'] as const;
export const diamondCountValues = ['3', '4', '5', '6'] as const;
export const diamondOrientationValues = ['horizontal', 'vertical'] as const;
export const sizeValues = ['Large', 'Medium'] as const;
export const bandWidthValues = [
  '0.01ct',
  '0.02ct',
  '1.5mm',
  '1.9mm',
  '2.1mm',
  '2.3mm',
  '2.7mm',
  '3.2mm',
  '3mm',
  '4.5mm',
] as const;
export const sideStoneShapeValues = [
  'emerald',
  'emerald+round-brilliant',
  'marquise',
  'oval',
  'pear',
  'round-brilliant',
  'round-brilliant+emerald',
  'round-brilliant+pear',
  'tapered-baguette',
  'trillion',
] as const;
export const goldPurityValues = ['14k', '18k'] as const;
export const bandAccentValues = ['plain', 'pave', 'double-pave', 'double-pave-twisted', 'pave-twisted'] as const;
export const metalValues = ['platinum', 'yellow-gold', 'white-gold', 'rose-gold', 'sterling-silver'] as const;
export const stoneSettingValues = ['semi-bezel', 'full-bezel'] as const;
export const eternityStyleValues = ['half', 'full'] as const;
export const bandStyleValues = ['full', 'half'] as const;
export const diamondSizeValues = ['petite', 'original', 'medium', 'large'] as const;
export const paveClusterValues = ['round', 'cushion'] as const;
export const sideValues = ['left', 'right'] as const;

export const standardDiamondTypeValues = [
  'round-brilliant',
  'oval',
  'emerald',
  'pear',
  'radiant',
  'cushion',
  'marquise',
  'trillion',
  'asscher',
  'princess',
] as const;

export const nonStandardDiamondTypes = [
  'baguette',
  'half-moon',
  'hexagon',
  'keystone',
  'longHexagon',
  'lozenge',
  'octavia',
  'shield',
];
export const mixedDiamondTypes = [
  'oval+trillion',
  'pear+emerald',
  'hexagon+lozenge+marquise',
  'pear+round-brilliant',
  'pear+round-brilliant+baguette',
  'pear+round-brilliant+baguette+trillion+marquise',
  'pear+round-brilliant+emerald',
  'round-brilliant+baguette',
  'round-brilliant+baguette+marquise',
  'round-brilliant+emerald',
  'round-brilliant+marquise',
  'round-brilliant+oval',
  'round-brilliant+pear',
  'round-brilliant+pear+marquise',
  'trillion+half-moon+round-brilliant+marquise+baguette',
  'trillion+pear+marquise+half-moon+lozenge+kite+hexagon',
  'lozenge+half-moon+hexagon+baguette+round-brilliant+marquise',
  'lozenge+round-brilliant',
  'marquise+baguette',
  'marquise+pear',
  'marquise+round-brilliant',
  'marquise+trillion',
  'baguette+lozenge+hexagon+marquise+round-brilliant+half-moon',
  'baguette+marquise',
  'baguette+oval',
  'baguette+trillion',
  'emerald+marquise+round-brilliant+lozenge',
  'emerald+pear',
];

export const diamondTypeValues = [...standardDiamondTypeValues, ...nonStandardDiamondTypes, ...mixedDiamondTypes];
export const bandStoneShapeValues = diamondTypeValues;

export const earringSizeValues = ['10mm', '12mm', '15mm', '18mm', 'One Size'] as const;
export const caratWeightValues = [
  '0.10ct',
  '0.25ct',
  '0.30ct',
  '0.40ct',
  '0.50ct',
  '0.55ct',
  '0.75ct',
  '1.0ct',
  '1.5ct',
  '1.7ct',
  '1.85ct',
  '13.0ct',
  '2.0ct',
  '2.8ct',
  '3ct',
  '4.0ct',
  '4.25ct',
  '4.5ct',
  '5.0ct',
  '6.5ct',
  '6.6ct',
  '7.5ct',
  '8.0ct',
  'other',
] as const;
export const chainLengthValues = [
  '15',
  '16',
  '16-18',
  '18',
  '18-20',
  '20',
  '5.5',
  '6',
  '6.5',
  '6.5-7',
  '7',
  '7.5',
  '8',
] as const;

export const configurationTypes = {
  prongStyle: 'prongStyle',
  bandVersion: 'bandVersion',
  bandStoneStyle: 'bandStoneStyle',
  hoopAccent: 'hoopAccent',
  haloSize: 'haloSize',
  sideStoneCarat: 'sideStoneCarat',
  ceramicColor: 'ceramicColor',
  diamondCount: 'diamondCount',
  diamondOrientation: 'diamondOrientation',
  bandStoneShape: 'bandStoneShape',
  size: 'size',
  bandWidth: 'bandWidth',
  sideStoneShape: 'sideStoneShape',
  goldPurity: 'goldPurity',
  bandAccent: 'bandAccent',
  metal: 'metal',
  stoneSetting: 'stoneSetting',
  eternityStyle: 'eternityStyle',
  bandStyle: 'bandStyle',
  diamondSize: 'diamondSize',
  paveCluster: 'paveCluster',
  side: 'side',
  diamondType: 'diamondType',
  earringSize: 'earringSize',
  caratWeight: 'caratWeight',
  chainLength: 'chainLength',
} as const;

export const configurationOptionValues = {
  [configurationTypes.bandVersion]: bandVersionValues,
  [configurationTypes.bandStoneStyle]: bandStoneStyleValues,
  [configurationTypes.hoopAccent]: hoopAccentValues,
  [configurationTypes.haloSize]: haloSizeValues,
  [configurationTypes.sideStoneShape]: sideStoneShapeValues,
  [configurationTypes.sideStoneCarat]: sideStoneCaratValues,
  [configurationTypes.ceramicColor]: ceramicColorValues,
  [configurationTypes.diamondCount]: diamondCountValues,
  [configurationTypes.diamondOrientation]: diamondOrientationValues,
  [configurationTypes.bandStoneShape]: bandStoneShapeValues,
  [configurationTypes.prongStyle]: prongStyleValues,
  [configurationTypes.size]: sizeValues,
  [configurationTypes.bandWidth]: bandWidthValues,
  [configurationTypes.goldPurity]: goldPurityValues,
  [configurationTypes.bandAccent]: bandAccentValues,
  [configurationTypes.metal]: metalValues,
  [configurationTypes.stoneSetting]: stoneSettingValues,
  [configurationTypes.eternityStyle]: eternityStyleValues,
  [configurationTypes.bandStyle]: bandStyleValues,
  [configurationTypes.diamondSize]: diamondSizeValues,
  [configurationTypes.paveCluster]: paveClusterValues,
  [configurationTypes.side]: sideValues,
  [configurationTypes.diamondType]: diamondTypeValues,
  [configurationTypes.earringSize]: earringSizeValues,
  [configurationTypes.caratWeight]: caratWeightValues,
  [configurationTypes.chainLength]: chainLengthValues,
} as const;

export const optionTypeOrder = [
  configurationTypes.diamondOrientation,
  configurationTypes.diamondType,
  configurationTypes.sideStoneShape,
  configurationTypes.sideStoneCarat,
  configurationTypes.metal,
  configurationTypes.bandAccent,
  configurationTypes.prongStyle,
  configurationTypes.bandVersion,
  configurationTypes.bandStoneStyle,
  configurationTypes.hoopAccent,
  configurationTypes.haloSize,
  configurationTypes.ceramicColor,
  configurationTypes.diamondCount,
  configurationTypes.bandStoneShape,
  configurationTypes.size,
  configurationTypes.bandWidth,
  configurationTypes.stoneSetting,
  configurationTypes.eternityStyle,
  configurationTypes.bandStyle,
  configurationTypes.diamondSize,
  configurationTypes.paveCluster,
  configurationTypes.side,
  configurationTypes.earringSize,
  configurationTypes.caratWeight,
  configurationTypes.chainLength,
] as const;

export type prongStyle = (typeof prongStyleValues)[number];
export type bandVersion = (typeof bandVersionValues)[number];
export type bandStoneStyle = (typeof bandStoneStyleValues)[number];
export type hoopAccent = (typeof hoopAccentValues)[number];
export type haloSize = (typeof haloSizeValues)[number];
export type sideStoneCarat = (typeof sideStoneCaratValues)[number];
export type ceramicColor = (typeof ceramicColorValues)[number];
export type diamondCount = (typeof diamondCountValues)[number];
export type diamondOrientation = (typeof diamondOrientationValues)[number];
export type bandStoneShape = (typeof bandStoneShapeValues)[number];
export type size = (typeof sizeValues)[number];
export type bandWidth = (typeof bandWidthValues)[number];
export type sideStoneShape = (typeof sideStoneShapeValues)[number];
export type goldPurity = (typeof goldPurityValues)[number];
export type bandAccent = (typeof bandAccentValues)[number];
export type metal = (typeof metalValues)[number];
export type stoneSetting = (typeof stoneSettingValues)[number];
export type eternityStyle = (typeof eternityStyleValues)[number];
export type bandStyle = (typeof bandStyleValues)[number];
export type diamondSize = (typeof diamondSizeValues)[number];
export type paveCluster = (typeof paveClusterValues)[number];
export type side = (typeof sideValues)[number];
export type diamondType = (typeof diamondTypeValues)[number];
export type earringSize = (typeof earringSizeValues)[number];
export type caratWeight = (typeof caratWeightValues)[number];
export type ChainLength = (typeof chainLengthValues)[number];

export type OptionType = keyof typeof configurationOptionValues;
export type OptionTypeValue = (typeof configurationOptionValues)[keyof typeof configurationOptionValues][number];
