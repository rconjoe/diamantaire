import { BAND_ACCENTS_IN_ORDER, BandAccentType } from './band';
import { DIAMOND_SHAPES_IN_ORDER, DiamondTypes } from './diamond';
import { METAL_TYPES_IN_ORDER, MetalType } from './metal';
import { DEFAULT_RING_SIZE } from './ring';
import {
  EARRING_SIDE_HUMAN_NAMES,
  PAVE_CLUSTER_SHAPE_HUMAN_NAMES,
  QUANTITY_OPTION_HUMAN_NAMES,
  DIAMOND_SIZE_OPTION_HUMAN_NAMES,
  STONE_SETTING_HUMAN_NAMES,
  PRONG_STYLE_HUMAN_NAMES,
  HALO_SIZE_HUMAN_NAMES,
} from '../../maps/variantOptionMaps';
import { createDisplayOrderFromOptionNames } from '../constant.helpers';

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
  BandStyle = 'bandStyle',
}
export const PRODUCT_DEFAULT_OPTIONS = {
  [ProductOption.DiamondType]: DiamondTypes.RoundBrilliant,
  [ProductOption.SideStone]: DiamondTypes.RoundBrilliant,
  [ProductOption.Metal]: MetalType.Platinum,
  [ProductOption.BandAccent]: BandAccentType.Plain,
  [ProductOption.RingSize]: DEFAULT_RING_SIZE,
};
export const OPTION_ORDER_BY_TYPE = {
  [ProductOption.BandAccent]: BAND_ACCENTS_IN_ORDER,
  [ProductOption.DiamondType]: DIAMOND_SHAPES_IN_ORDER,
  [ProductOption.Metal]: METAL_TYPES_IN_ORDER,
  [ProductOption.SideStoneShape]: DIAMOND_SHAPES_IN_ORDER,
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
export const HALO_SIZE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['original', 'large'],
  HALO_SIZE_HUMAN_NAMES,
);
export const QUANTITY_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['single', 'pair'],
  QUANTITY_OPTION_HUMAN_NAMES,
);
export const DIAMOND_SIZE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['petite', 'original', 'medium', 'large'],
  DIAMOND_SIZE_OPTION_HUMAN_NAMES,
);
export const STONE_SETTING_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['half-bezel', 'semi-bezel', 'full-bezel'],
  STONE_SETTING_HUMAN_NAMES,
);
export const PRONG_STYLE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['plain', 'pave'],
  PRONG_STYLE_HUMAN_NAMES,
);
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
export const EARRING_SIDE_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['left', 'right', 'pair'],
  EARRING_SIDE_HUMAN_NAMES,
);
export const PAVE_CLUSTER_SHAPES_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['round', 'marquise', 'cushion'],
  PAVE_CLUSTER_SHAPE_HUMAN_NAMES,
);
export const JEWELRY_SUB_CATEGORY_OPTIONS_LABEL_ID = 'style-options';
export const OPTION_TYPES = {
  metal: 'metal',
  diamondType: 'diamondType',
  tag: 'tag',
};
