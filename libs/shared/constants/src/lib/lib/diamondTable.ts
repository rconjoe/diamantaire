import { getOptionValues } from '../constant.helpers';

export const DIAMOND_TABLE_FILTER_TITLES = ['diamondType', 'carat', 'price', 'cut', 'clarity', 'color'];
export const DIAMOND_TABLE_FILTER_CLARITY_OPTIONS = {
  VVS: ['VVS1', 'VVS2'],
  VS: ['VS1', 'VS2'],
  SI: ['SI1', 'SI2'],
};
export const DIAMOND_TABLE_FILTER_COLOR_OPTIONS = {
  DEF: ['D', 'E', 'F'],
  GHI: ['G', 'H', 'I'],
  JKL: ['J', 'K', 'L'],
};
export const DIAMOND_TABLE_FILTER_CUT_OPTIONS = {
  'Ideal+Hearts': ['Ideal+Hearts'],
  Ideal: ['Ideal'],
  Excellent: ['Excellent'],
};
export const DIAMOND_TABLE_DEFAULT_OPTIONS = {
  page: 1,
  limit: 40,
  sortBy: 'carat',
  sortOrder: 'desc',
};
export const DIAMOND_VALID_QUERIES = [
  'lotId',
  'limit',
  'page',
  'sortBy',
  'sortOrder',
  'priceMax',
  'priceMin',
  'caratMax',
  'caratMin',
  'flow',
];
export const DIAMOND_DETAIL_FACETED_NAV = ['slug'];
export const DIAMOND_TABLE_FACETED_NAV = ['diamondType', 'clarity', 'cut', 'color'];
export const DIAMOND_TABLE_VALID_COLORS = getOptionValues(DIAMOND_TABLE_FILTER_COLOR_OPTIONS);
export const DIAMOND_TABLE_VALID_CLARITIES = getOptionValues(DIAMOND_TABLE_FILTER_CLARITY_OPTIONS);
export const DIAMOND_TABLE_VALID_CUTS = getOptionValues(DIAMOND_TABLE_FILTER_CUT_OPTIONS);
export const DIAMOND_TABLE_VALID_SORT_BY = ['diamondType', 'carat', 'price', 'color', 'cut', 'clarity'];
export const DIAMOND_TABLE_VALID_SORT_ORDER = ['asc', 'desc'];
export enum DIAMOND_TABLE_SHAPES {
  'Round Brilliant' = 'round-brilliant',
  Oval = 'oval',
  Emerald = 'emerald',
  Pear = 'pear',
  Radiant = 'radiant',
  Cushion = 'cushion',
  Marquise = 'marquise',
  Trillion = 'trillion',
  Asscher = 'asscher',
  Princess = 'princess',
  'Emerald and Pear' = 'emerald+pear',
  'Round and Brilliant Pear' = 'round-brilliant+pear',
  'Round and Brilliant Oval' = 'round-brilliant+oval',
}
export const TABLE_SHAPE_EDIT = 'table-shape';
export const TABLE_DIAMOND_EDIT_FROM_SUMMARY = 'table-diamond-from-summary';
export const TABLE_DIAMOND_EDIT_FROM_PDP = 'table-diamond-from-pdp';
