import { DiamondProperty, DiamondColors, DiamondClarities, DiamondCuts } from '../constants/diamond-properties';
import { IDiamondCollection } from '../types';

export const diamondPropertyAscendingComparitors: {
  [key: string]: (a: IDiamondCollection, b: IDiamondCollection) => number;
} = {
  [DiamondProperty.carat]: (a: IDiamondCollection, b: IDiamondCollection) => a.carat - b.carat,
  [DiamondProperty.color]: (a: IDiamondCollection, b: IDiamondCollection) =>
    DiamondColors.indexOf(a.color) - DiamondColors.indexOf(b.color),
  [DiamondProperty.clarity]: (a: IDiamondCollection, b: IDiamondCollection) =>
    DiamondClarities.indexOf(a.clarity) - DiamondClarities.indexOf(b.clarity),
  [DiamondProperty.cut]: (a: IDiamondCollection, b: IDiamondCollection) =>
    DiamondCuts.indexOf(a.cut) - DiamondCuts.indexOf(b.cut),
};

export const descendingCaratComparator = (a: IDiamondCollection, b: IDiamondCollection) =>
  diamondPropertyAscendingComparitors[DiamondProperty.carat](a, b) * -1;

/**
 * Creates a comparator to sort by closest to the specified carat.
 * Will prefer larger carats over smaller ones at the same delta
 * @param {number} targetCarat - carat to compare against
 * @returns {number} - determins sort order based on value
 */
export function createSortCaratByDistanceFromTargetComparator(targetCarat: number) {
  return (a: IDiamondCollection, b: IDiamondCollection) => {
    const aDelta = targetCarat - a.carat;
    const bDelta = targetCarat - b.carat;
    const absDiff = Math.abs(aDelta) - Math.abs(bDelta);

    // If two carat are the same  distance from target, sort largest first
    if (absDiff === 0) {
      return b.carat - a.carat;
    }

    return absDiff;
  };
}

/**
 * Creates a comparator to sort by carat to the specified carat
 * where values < target are sorted at the end
 * @param {number} targetCarat - carat to compare against
 * @param {number} lowerCaratWeight - additional weight on values < target
 * @returns {number} - determins sort order based on value
 */
export function createSortCaratFromTargetWithWeightComparator(targetCarat: number, lowerCaratWeight = 100) {
  return (a: IDiamondCollection, b: IDiamondCollection) => {
    let aDelta = targetCarat - a.carat;
    let bDelta = targetCarat - b.carat;

    // Add a weight to carats < target so they are sorted last
    if (aDelta > 0) {
      aDelta += lowerCaratWeight;
    }

    // Add a weight to carats < target so they are sorted last
    if (bDelta > 0) {
      bDelta += lowerCaratWeight;
    }

    const diff = Math.abs(aDelta) - Math.abs(bDelta);

    // If two carat are the same  distance from target, sort largest first
    if (diff === 0) {
      return b.carat - a.carat;
    }

    return diff;
  };
}

export const caratFirstSortOrder = [
  DiamondProperty.carat,
  DiamondProperty.color,
  DiamondProperty.clarity,
  DiamondProperty.cut,
];
export const colorFirstSortOrder = [
  DiamondProperty.color,
  DiamondProperty.carat,
  DiamondProperty.clarity,
  DiamondProperty.cut,
];

export function sortDiamonds(
  diamonds: IDiamondCollection[],
  propertySortOrder = caratFirstSortOrder,
  propertyComparitors = diamondPropertyAscendingComparitors,
) {
  if (!propertySortOrder.length) {
    return diamonds;
  }

  const sortedDiamonds = [...diamonds];

  sortedDiamonds.sort((a, b) => {
    const sortResult = 0;

    for (const property of propertySortOrder) {
      const comparitor = propertyComparitors[property];
      const propCompareVal = comparitor(a, b);

      if (propCompareVal !== 0) {
        return propCompareVal;
      }
    }

    return sortResult;
  });

  return sortedDiamonds;
}
