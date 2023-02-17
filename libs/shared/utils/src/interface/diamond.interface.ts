interface NumericalRange {
  min: number;
  max: number;
}

export interface DiamondsDataRanges {
  carat?: NumericalRange;
  price?: NumericalRange;
  type?: string[];
}
