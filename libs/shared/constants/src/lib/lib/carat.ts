import { CARAT_WEIGHT_HUMAN_NAMES, SIDE_STONE_CARAT_HUMAN_NAMES } from '../../maps/variantOptionMaps';
import { createDisplayOrderFromOptionNames } from '../constant.helpers';

export const MIN_OTHER_CARAT_WEIGHT = 1.01;
export const MIN_OTHER_CARAT_WEIGHT_TWO_PLUS = 2.0;
export const MIN_ENGAGEMENT_RING_CARAT_WEIGHT = 0.5;
export const MIN_CARAT_WEIGHT_DEFAULT = 0.9;
export const DEFAULT_ER_CARAT_WEIGHT = '2.0ct';
export const MIN_CARAT_EMPTY_RESULT = 1;
export const MIN_DIAMOND_CARAT_WEIGHT_FOR_BUYBACK = 1.5;
export const READY_TO_SHIP_CARAT_WEIGHTS = ['0.75ct', '1.00ct', '1.50ct'];
export const PAIR_ONLY_CARAT_WEIGHTS = ['0.10ct', '0.25ct', '0.33ct', '0.30ct'];
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
export const CARAT_WEIGHT_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['1.0ct', '1.5ct', '2.0ct', '2.8ct', '4.0ct', '4.5ct', '5.0ct', '6.5ct', '7.5ct', '8.0ct', 'other'],
  CARAT_WEIGHT_HUMAN_NAMES,
);
export const ER_CARAT_WEIGHT_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['1.0ct', '1.5ct', '2.0ct', 'other'],
  CARAT_WEIGHT_HUMAN_NAMES,
);
export const SIDE_STONE_CARAT_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['0.10ct', '0.25ct', '0.50ct'],
  SIDE_STONE_CARAT_HUMAN_NAMES,
);
