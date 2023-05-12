import _ from 'lodash';

import { IDiamondCollection } from '../interface/diamond.interface';

export function removeIdenticalDiamond4Cs(diamonds: IDiamondCollection) {
  return _.uniqWith(diamonds, isIdenticalDiamond);
}

export function isIdenticalDiamond(a: IDiamondCollection, b: IDiamondCollection) {
  // Just do a string match on diamond carat
  return a.color === b.color && a.clarity === b.clarity && a.cut === b.cut && Number(a.carat) === Number(b.carat);
}

// Diamond Properties

export const DiamondProperty = {
  carat: 'carat',
  color: 'color',
  clarity: 'clarity',
  cut: 'cut',
};

// Diamond Color Definitions

export const DiamondColor = {
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
  I: 'I',
  J: 'J',
  K: 'K',
};

export const DiamondColors: string[] = Object.values(DiamondColor);

export const DiamondColorGroup: { [key: string]: string[] } = {
  DEF: [DiamondColor.D, DiamondColor.E, DiamondColor.F],
  GHI: [DiamondColor.G, DiamondColor.H, DiamondColor.I],
  JK: [DiamondColor.J, DiamondColor.K],
};

export function isDEF(color: string): boolean {
  return DiamondColorGroup.DEF.includes(color);
}

export function isGHI(color: string): boolean {
  return DiamondColorGroup.GHI.includes(color);
}

export function isJK(color: string): boolean {
  return DiamondColorGroup.JK.includes(color);
}

// Diamond Clarity definitions

export enum DiamondClarity {
  VVS1 = 'VVS1',
  VVS2 = 'VVS2',
  VS1 = 'VS1',
  VS2 = 'VS2',
  SI1 = 'SI1',
  SI2 = 'SI2',
}

export const DiamondClarities: string[] = Object.values(DiamondClarity);

export const DiamondClarityGroup: {
  [key: string]: string[];
} = {
  VVS: [DiamondClarity.VVS1, DiamondClarity.VVS2],
  VS: [DiamondClarity.VVS1, DiamondClarity.VVS2, DiamondClarity.VS1, DiamondClarity.VS2],
};

export function isVVSPlus(clarity: string): boolean {
  return DiamondClarityGroup.VVS.includes(clarity);
}

export function isVSPlus(clarity: string): boolean {
  return isVVSPlus(clarity) || DiamondClarityGroup.VS.includes(clarity);
}

// Diamond Cut definitions
export const DiamondCut = {
  IdealPlusHearts: 'Ideal+Hearts',
  Ideal: 'Ideal',
  Excellent: 'Excellent',
  VeryGood: 'Very Good',
};

export const DiamondCuts: string[] = Object.values(DiamondCut);

/**
 *
 * Comparator function to sort diamonds by carat, color, clarity and cut
 *
 * @param {IDiamondCollection} a - Diamond A in the comparator
 * @param {IDiamondCollection} b - Diamond B in the comparator
 * @returns {integer} -1, 0 or 1 based on the sort order
 */
export function sortDiamondsBy4cs(a: IDiamondCollection, b: IDiamondCollection): number {
  const colorIndex = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
  const clarityIndex = ['VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
  const cutIndex = ['Ideal+Hearts', 'Ideal', 'Excellent', 'Very Good'];

  // Primary sort by Carat
  if (a.carat === b.carat) {
    // Secondary sort by Color
    if (a.color === b.color) {
      // Tertiary sort by Clarity
      if (a.clarity === b.clarity) {
        // If all other C's are the same, sort by Cut
        return cutIndex.indexOf(a.cut) - cutIndex.indexOf(b.cut);
      } else {
        return clarityIndex.indexOf(a.clarity) - clarityIndex.indexOf(b.clarity);
      }
    } else {
      return colorIndex.indexOf(a.color) - colorIndex.indexOf(b.color);
    }
  } else {
    return a.carat - b.carat;
  }
}

const diamondPropertyAscendingComparitors: { [key: string]: (a: IDiamondCollection, b: IDiamondCollection) => number } = {
  [DiamondProperty.carat]: (a: IDiamondCollection, b: IDiamondCollection) => a.carat - b.carat,
  [DiamondProperty.color]: (a: IDiamondCollection, b: IDiamondCollection) =>
    DiamondColors.indexOf(a.color) - DiamondColors.indexOf(b.color),
  [DiamondProperty.clarity]: (a: IDiamondCollection, b: IDiamondCollection) =>
    DiamondClarities.indexOf(a.clarity) - DiamondClarities.indexOf(b.clarity),
  [DiamondProperty.cut]: (a: IDiamondCollection, b: IDiamondCollection) =>
    DiamondCuts.indexOf(a.cut) - DiamondCuts.indexOf(b.cut),
};

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

export function sortDiamonds(diamonds: IDiamondCollection[], propertySortOrder = caratFirstSortOrder) {
  if (!propertySortOrder.length) {
    return diamonds;
  }

  const sortedDiamonds = [...diamonds];

  sortedDiamonds.sort((a, b) => {
    const sortResult = 0;

    for (const property of propertySortOrder) {
      const propCompareVal = diamondPropertyAscendingComparitors[property](a, b);

      if (propCompareVal !== 0) {
        return propCompareVal;
      }
    }

    return sortResult;
  });

  return sortedDiamonds;
}
