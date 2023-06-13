import { DIAMOND_TYPE_INTERNAL_NAMES } from './diamond';
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
  limit: 20,
  sortBy: 'carat',
  sortOrder: 'asc',
};
export const DIAMOND_TABLE_VALID_QUERIES = [
  'limit',
  'page',
  'sortBy',
  'sortOrder',
  'priceMax',
  'priceMin',
  'caratMax',
  'caratMin',
];
export const DIAMOND_TABLE_FACETED_NAV = ['diamondType', 'clarity', 'cut', 'color'];
export const DIAMOND_TABLE_VALID_COLORS = getOptionValues(DIAMOND_TABLE_FILTER_COLOR_OPTIONS);
export const DIAMOND_TABLE_VALID_CLARITIES = getOptionValues(DIAMOND_TABLE_FILTER_CLARITY_OPTIONS);
export const DIAMOND_TABLE_VALID_CUTS = getOptionValues(DIAMOND_TABLE_FILTER_CUT_OPTIONS);
export const DIAMOND_TABLE_VALID_TYPES = DIAMOND_TYPE_INTERNAL_NAMES;
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
}
export const TABLE_SHAPE_EDIT = 'table-shape';
export const TABLE_DIAMOND_EDIT_FROM_SUMMARY = 'table-diamond-from-summary';
export const TABLE_DIAMOND_EDIT_FROM_PDP = 'table-diamond-from-pdp';
