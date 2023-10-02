import { createDisplayOrderFromOptionNames } from '../constant.helpers';

export enum MetalType {
  Platinum = 'platinum',
  YellowGold = 'yellow-gold',
  WhiteGold = 'white-gold',
  RoseGold = 'rose-gold',
  SterlingSilver = 'sterling-silver',
}
export const METALS_IN_HUMAN_NAMES = {
  'yellow-gold': 'Yellow Gold',
  'white-gold': 'White Gold',
  'rose-gold': 'Rose Gold',
  platinum: 'Platinum',
  'sterling-silver': 'Sterling Silver',
};
export const METAL_HUMAN_NAMES = {
  'rose-gold': 'Rose Gold',
  'white-gold': 'White Gold',
  'yellow-gold': 'Yellow Gold',
  platinum: 'Platinum',
  ['sterling-silver']: 'Sterling Silver',
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
export const METALS_FOR_WEDDING = ['platinum', 'yellow-gold', 'white-gold', 'rose-gold'];
export const METALS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(METALS_FOR_WEDDING, METALS_IN_HUMAN_NAMES);
export const DEFAULT_METAL_OVERRIDES = {
  'solitaire-cross-necklace': 'yellow-gold',
  'star-of-david-pendant': 'yellow-gold',
  'crescent-moon-pendant': 'yellow-gold',
};
export const METAL_TYPES_IN_ORDER = [MetalType.Platinum, MetalType.YellowGold, MetalType.WhiteGold, MetalType.RoseGold];
export const METAL_ROSE_GOLD = 'rose-gold';
