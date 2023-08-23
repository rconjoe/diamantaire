import {
  MIN_DIAMOND_CARAT,
  CARAT_SIZE_TO_ONLY_APPLY_COLOR_FILTER,
  ACCEPTABLE_COLORS_FOR_LARGEST_STONES,
  BIG_DIAMOND_CARAT_THRESHOLD,
  BIG_DIAMOND_COLORS,
  BIG_DIAMOND_CUTS,
  BIG_DIAMOND_CLARITIES,
  SMALL_DIAMOND_CARAT_THRESHOLD,
  SMALL_DIAMOND_COLORS,
  SMALL_DIAMOND_CUTS,
  SMALL_DIAMOND_CLARITIES,
  ACCEPTABLE_COLORS,
  ACCEPTABLE_CUTS,
  ACCEPTABLE_CLARITIES,
  COLORS_TO_IGNORE_FILTERS,
} from '@diamantaire/shared/constants';
import _, { orderBy } from 'lodash';

import { IDiamondCollection } from '../interface/diamond.interface';

export function removeIdenticalDiamond4Cs(diamonds): IDiamondCollection[] {
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
export const DiamondColorsInOrder: string[] = [
  DiamondColor.D,
  DiamondColor.E,
  DiamondColor.F,
  DiamondColor.Colorless,
  DiamondColor.G,
  DiamondColor.H,
  DiamondColor.I,
  DiamondColor.NearColorless,
  DiamondColor.J,
  DiamondColor.K,
  DiamondColor.L,
  DiamondColor.M,
  DiamondColor.N,
];

export const DiamondColorGroup: { [key: string]: (typeof DiamondColor)[keyof typeof DiamondColor][] } = {
  DEF: [DiamondColor.D, DiamondColor.E, DiamondColor.F],
  GHI: [DiamondColor.G, DiamondColor.H, DiamondColor.I],
  JKL: [DiamondColor.J, DiamondColor.K, DiamondColor.L],
};

export function isColorGte(color: string, colorMin: (typeof DiamondColor)[keyof typeof DiamondColor]) {
  return DiamondColorsInOrder.indexOf(color) <= DiamondColorsInOrder.indexOf(colorMin);
}

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

export const DiamondType = {
  OVAL: 'oval',
  EMERALD: 'emerald',
  PEAR: 'pear',
  RADIANT: 'radiant',
  CUSHION: 'cushion',
  MARQUISE: 'marquise',
  TRILLION: 'trillion',
  ASSCHER: 'asscher',
  PRINCESS: 'princess',
  ROUND_BRILLIANT: 'round-brilliant',
};

export const DiamondTypes: string[] = Object.values(DiamondType);

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

export const DiamondClaritiesInOrder: string[] = [
  DiamondClarity.FL,
  DiamondClarity.VVS1,
  DiamondClarity.VVS2,
  DiamondClarity.VS1,
  DiamondClarity.VS2,
  DiamondClarity.VSPlus,
  DiamondClarity.SI1,
  DiamondClarity.SI2,
];

export function isClarityGte(
  clarity: string, // (typeof DiamondClarity)[keyof typeof DiamondClarity],
  clarityMin: (typeof DiamondClarity)[keyof typeof DiamondClarity],
) {
  return DiamondClaritiesInOrder.indexOf(clarity) <= DiamondClaritiesInOrder.indexOf(clarityMin);
}

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

export const filterDiamonds = (diamonds, removeDuplicates = true) => {
  const filteredDiamonds = filterByColorCutCaratAndClarity(diamonds, removeDuplicates);

  if (removeDuplicates) {
    const hideDupFilteredDiamonds = hideDuplicateDiamond4Cs(filteredDiamonds);

    const uniqFilteredDiamonds = hideDuplicateDiamondLotId(hideDupFilteredDiamonds);

    return uniqFilteredDiamonds;
  }

  return filteredDiamonds;
};

export function hideDuplicateDiamondLotId(diamonds) {
  return _.uniqWith(diamonds, isDuplicateLotId);
}

export function isDuplicateLotId(a, b) {
  return a.lotId === b.lotId;
}

export function hideDuplicateDiamond4Cs(diamonds) {
  return _.uniqWith(diamonds, isDuplicate);
}

// Should we hide duplicates of this diamond or not?
export function shouldHideDuplicates(diamond) {
  const caratWeight = diamond.carat;

  if (
    caratWeight < SMALL_DIAMOND_CARAT_THRESHOLD ||
    (caratWeight < CARAT_SIZE_TO_ONLY_APPLY_COLOR_FILTER && !COLORS_TO_IGNORE_FILTERS.includes(diamond.color))
  ) {
    return true;
  }

  return false;
}

export function isDuplicate(a, b) {
  if (shouldHideDuplicates(b)) {
    // Just do a string match on diamond carat
    return a.color === b.color && a.clarity === b.clarity && a.cut === b.cut && a.carat === b.carat;
  }

  return false;
}

function filterByColorCutCaratAndClarity(diamonds, _removeDuplicates?) {
  return diamonds.filter(isDiamondAcceptable);
}

export function skipPinkFilters(diamond) {
  if (diamond.color.toLowerCase().includes('pink')) {
    return true;
  }

  return false;
}

export function skipFilters(diamond) {
  const caratWeight = diamond.carat;

  if (caratWeight >= MIN_DIAMOND_CARAT && COLORS_TO_IGNORE_FILTERS.includes(diamond.color)) {
    return true;
  }

  return false;
}

export function isDiamondAcceptable(diamond) {
  // if the diamond is null, then remove it
  if (!diamond) {
    return false;
  }

  const diamondCarat = diamond.carat;

  if (skipFilters(diamond)) {
    return true; // if the diamond should bypass filters, then return true
  } else if (diamondCarat < MIN_DIAMOND_CARAT) {
    return false; // if the diamond is too small then remove it
  } else {
    if (diamondCarat > CARAT_SIZE_TO_ONLY_APPLY_COLOR_FILTER) {
      // if the diamond is in the largest size tier, then only filter on color
      return ACCEPTABLE_COLORS_FOR_LARGEST_STONES.includes(diamond.color);
    } else if (diamondCarat >= BIG_DIAMOND_CARAT_THRESHOLD) {
      // if the diamond is big, then use the big diamond filter settings
      return (
        BIG_DIAMOND_COLORS.includes(diamond.color) &&
        BIG_DIAMOND_CUTS.includes(diamond.cut) &&
        BIG_DIAMOND_CLARITIES.includes(diamond.clarity)
      );
    } else if (diamondCarat <= SMALL_DIAMOND_CARAT_THRESHOLD) {
      // if the diamond is small, then use the small diamond filter settings
      return (
        SMALL_DIAMOND_COLORS.includes(diamond.color) &&
        SMALL_DIAMOND_CUTS.includes(diamond.cut) &&
        SMALL_DIAMOND_CLARITIES.includes(diamond.clarity)
      );
    } else {
      // if the diamond is between MIN_DIAMOND_CARAT and BIG_DIAMOND_CARAT_THRESHOLD then just use regular filter settings
      return (
        ACCEPTABLE_COLORS.includes(diamond.color) &&
        ACCEPTABLE_CUTS.includes(diamond.cut) &&
        ACCEPTABLE_CLARITIES.includes(diamond.clarity)
      );
    }
  }
}

export const sortAscCarat = (diamonds) => {
  return orderBy(
    diamonds,
    [
      (diamond) => {
        return getDiamondCarat(diamond);
      },
    ],
    'asc',
  );
};

export const getDiamondCarat = (diamond: IDiamondCollection): number => {
  return diamond.carat;
};

export const findCurrentCaratWeight = (diamonds, minCaratWeight: number, type?) => {
  const diamondsArray = type ? diamonds.filter((v) => v.type === type) : diamonds;

  return diamondsArray.find((diamond) => diamond.carat >= minCaratWeight).carat;
};
