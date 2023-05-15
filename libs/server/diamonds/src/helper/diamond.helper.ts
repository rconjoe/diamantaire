import _ from 'lodash';

import { IDiamondCollection } from '../interface/diamond.interface';

export function removeIdenticalDiamond4Cs(diamonds: IDiamondCollection) {
  return _.uniqWith(diamonds, isIdenticalDiamond);
}

export function isIdenticalDiamond(a: IDiamondCollection, b: IDiamondCollection) {
  // Just do a string match on diamond carat
  return a.color === b.color && a.clarity === b.clarity && a.cut === b.cut && Number(a.carat) === Number(b.carat);
}

// export type ObjectValues<T> = T[keyof T];

// Diamond Properties

export const DiamondProperty = {
  carat: 'carat',
  color: 'color',
  clarity: 'clarity',
  cut: 'cut',
} as const;

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
  L: 'L',
  M: 'M',
  N: 'N',
  NearColorless: 'NearColorless',
  Colorless: 'Colorless',
} as const;

export const DiamondColors: string[] = Object.values(DiamondColor);

export const DiamondColorGroup: { [key: string]: (typeof DiamondColor)[keyof typeof DiamondColor][] } = {
  DEF: [DiamondColor.D, DiamondColor.E, DiamondColor.F],
  GHI: [DiamondColor.G, DiamondColor.H, DiamondColor.I],
  JKL: [DiamondColor.J, DiamondColor.K, DiamondColor.L],
};

export function isDEF(color: any): boolean {
  // (typeof DiamondColor)[keyof typeof DiamondColor]
  return DiamondColorGroup.DEF.includes(color);
}

export function isGHI(color: (typeof DiamondColor)[keyof typeof DiamondColor]): boolean {
  return DiamondColorGroup.GHI.includes(color);
}

export function isJK(color: (typeof DiamondColor)[keyof typeof DiamondColor]): boolean {
  return DiamondColorGroup.JK.includes(color);
}

// Diamond Clarity definitions

export const DiamondClarity = {
  FL: 'FL',
  VVS1: 'VVS1',
  VVS2: 'VVS2',
  VS1: 'VS1',
  VSPlus: 'VS+',
  VS2: 'VS2',
  SI1: 'SI1',
  SI2: 'SI2',
} as const;

export const DiamondClarities: string[] = Object.values(DiamondClarity);

export const DiamondClarityGroup: {
  [key: string]: (typeof DiamondClarity)[keyof typeof DiamondClarity][];
} = {
  VVS: [DiamondClarity.FL, DiamondClarity.VVS1, DiamondClarity.VVS2],
  VS: [DiamondClarity.FL, DiamondClarity.VVS1, DiamondClarity.VVS2, DiamondClarity.VS1, DiamondClarity.VS2],
};

export function isVVSPlus(clarity: any): boolean {
  // (typeof DiamondClarity)[keyof typeof DiamondClarity]

  return DiamondClarityGroup.VVS.includes(clarity);
}

export function isVSPlus(clarity: any): boolean {
  // (typeof DiamondClarity)[keyof typeof DiamondClarity]

  return isVVSPlus(clarity) || DiamondClarityGroup.VS.includes(clarity);
}

export function isSIMinus(clarity) {
  return !isVSPlus(clarity);
}

// Diamond Cut definitions
export const DiamondCut = {
  IdealPlusHearts: 'Ideal+Hearts',
  Ideal: 'Ideal',
  Excellent: 'Excellent',
  ExcellentPlus: 'Excellent+',
  VeryGood: 'Very Good',
} as const;

export const DiamondCuts: string[] = Object.values(DiamondCut);

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

    return Math.abs(aDelta) - Math.abs(bDelta);
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
