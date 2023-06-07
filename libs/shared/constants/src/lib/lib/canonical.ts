import { ProductOption } from './productOption';

export const CANONICAL_OPTIONS_TO_MATCH = [ProductOption.DiamondType, ProductOption.Metal];
export const OPTIONS_SORT_ORDER = [
  ProductOption.DiamondType,
  ProductOption.SideStoneShape,
  ProductOption.SideStoneCarat,
  ProductOption.Metal,
  ProductOption.BandAccent,
];
export const CANONICAL_OPTIONS_SORT_ORDER = OPTIONS_SORT_ORDER.filter(
  (optionType) => !CANONICAL_OPTIONS_TO_MATCH.includes(optionType),
);
