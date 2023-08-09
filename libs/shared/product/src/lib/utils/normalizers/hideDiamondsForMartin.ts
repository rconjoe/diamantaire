import { orderBy, uniqWith } from 'lodash';

// The smallest acceptable carat weight. Currently 0.3ct
const MIN_DIAMOND_CARAT = 0.3;

// Filters for regular size diamonds
const ACCEPTABLE_COLORS = ['J', 'I', 'H', 'G', 'F', 'E', 'D'];
const ACCEPTABLE_CUTS = ['Excellent', 'Ideal', 'Ideal+Hearts'];
const ACCEPTABLE_CLARITIES = ['SI1', 'SI2', 'VS2', 'VS1', 'VVS1', 'VVS2'];

// Flters for big diamonds.
// These are very similar to regular diamonds right now,
// but I imagine these will change in the future so I am
// leaving the settings here for now.
const BIG_DIAMOND_CARAT_THRESHOLD = 2.0;
const BIG_DIAMOND_COLORS = ACCEPTABLE_COLORS;
const BIG_DIAMOND_CUTS = ACCEPTABLE_CUTS;
const BIG_DIAMOND_CLARITIES = ACCEPTABLE_CLARITIES;

// Filters for small diamonds
const SMALL_DIAMOND_CARAT_THRESHOLD = 0.85;
const SMALL_DIAMOND_COLORS = ['H', 'G', 'F', 'E', 'D'];
const SMALL_DIAMOND_CUTS = ACCEPTABLE_CUTS;
const SMALL_DIAMOND_CLARITIES = ['VS1', 'VVS1', 'VVS2'];

// Settings to ignore filters entirely
const CARAT_SIZE_TO_ONLY_APPLY_COLOR_FILTER = 2.5;
const ACCEPTABLE_COLORS_FOR_LARGEST_STONES = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'N', 'YELLOW'];

const COLORS_TO_IGNORE_FILTERS = ['D', 'E', 'F', 'YELLOW'];

/**
 * Carat size 2.5 carat and above will bypass all filters.
 *
 * Colors D, E, F, will bypass all filters.
 *
 * Remove any diamonds with a carat size less than MIN_DIAMOND_CARAT.
 *
 * A duplicate carat is defined by having the same color, cut, clarity and
 * carat.
 *
 * See also helpers/constants.js
 * See MIN_ENGAGEMENT_RING_CARAT_WEIGHT and MIN_OTHER_CARAT_WEIGHT
 */

export default function hideDiamondsForMartin(diamonds) {
  // If there are no diamonds, then return an empty array.
  if (!diamonds || !diamonds.length) {
    return [];
  }

  return filterDiamonds(diamonds);
}

export function filterDiamonds(diamonds, removeDuplicates = true) {
  const filteredDiamonds = filterByColorCutCaratAndClarity(diamonds);

  if (removeDuplicates) {
    const hideDupFilteredDiamonds = hideDuplicateDiamond4Cs(filteredDiamonds);

    const uniqFilteredDiamonds = hideDuplicateDiamondLotId(hideDupFilteredDiamonds);

    return uniqFilteredDiamonds;
  }

  return filteredDiamonds;
}

function filterByColorCutCaratAndClarity(diamonds) {
  return diamonds.filter(isDiamondAcceptable);
}

export function isDiamondAcceptable(diamond) {
  // if the diamond is null, then remove it
  if (!diamond) {
    return false;
  }

  const diamondCarat = getDiamondCarat(diamond);

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

export function hideDuplicateDiamond4Cs(diamonds) {
  return uniqWith(diamonds, isDuplicate);
}

export function isDuplicate(a, b) {
  if (shouldHideDuplicates(b)) {
    // Just do a string match on diamond carat
    return a.color === b.color && a.clarity === b.clarity && a.cut === b.cut && a.carat === b.carat;
  }

  return false;
}

export function hideDuplicateDiamondLotId(diamonds) {
  return uniqWith(diamonds, isDuplicateLotId);
}

export function isDuplicateLotId(a, b) {
  return a.lotId === b.lotId;
}

// HELPER METHODS

export function sortDescCarat(diamonds) {
  return orderBy(
    diamonds,
    [
      function (diamond) {
        return getDiamondCarat(diamond);
      },
    ],
    'desc',
  );
}

export function sortAscCarat(diamonds) {
  return orderBy(
    diamonds,
    [
      function (diamond) {
        return getDiamondCarat(diamond);
      },
    ],
    'asc',
  );
}

// convert a string representation of carat weight to a floating point number
export function getDiamondCarat(diamond) {
  return parseFloat(diamond.carat);
}

export function skipFilters(diamond) {
  const caratWeight = getDiamondCarat(diamond);

  if (caratWeight >= MIN_DIAMOND_CARAT && COLORS_TO_IGNORE_FILTERS.includes(diamond.color)) {
    return true;
  }

  return false;
}

// Should we hide duplicates of this diamond or not?
export function shouldHideDuplicates(diamond) {
  const caratWeight = getDiamondCarat(diamond);

  if (
    caratWeight < SMALL_DIAMOND_CARAT_THRESHOLD ||
    (caratWeight < CARAT_SIZE_TO_ONLY_APPLY_COLOR_FILTER && !COLORS_TO_IGNORE_FILTERS.includes(diamond.color))
  ) {
    return true;
  }

  return false;
}

export function skipPinkFilters(diamond) {
  if (diamond.color.toLowerCase().includes('pink')) {
    return true;
  }

  return false;
}

export function isPinkDiamondAcceptable(diamond) {
  // if the diamond is null, then remove it
  if (!diamond) {
    return false;
  }

  return null;

  if (skipPinkFilters(diamond)) {
    return true; // if the diamond should bypass filters, then return true
  }
}

export function filterPinkDiamonds(diamonds) {
  return diamonds.filter(isPinkDiamondAcceptable);
}

export function filterOnlyPinkDiamonds(diamonds) {
  // If there are no diamonds, then return an empty array.
  if (!diamonds || !diamonds.length) {
    return [];
  }

  return filterPinkDiamonds(diamonds);
}
