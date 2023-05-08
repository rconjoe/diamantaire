import _ from 'lodash';

import { IDiamondCollection } from '../interface/diamond.interface';

export function hideIdenticalDiamond4Cs(diamonds: IDiamondCollection) {
  return _.uniqWith(diamonds, isIdenticalDiamond);
}

export function isIdenticalDiamond(a: IDiamondCollection, b: IDiamondCollection) {
  // Just do a string match on diamond carat
  return a.color === b.color && a.clarity === b.clarity && a.cut === b.cut && Number(a.carat) === Number(b.carat);
}

/**
 *
 * Comparator function to sort diamonds by carat, color, clarity and cut
 *
 * @param {IDiamondCollection} a - Diamond A in the comparator
 * @param {IDiamondCollection} b - Diamond B in the comparator
 * @returns {integer} -1, 0 or 1 based on the sort order
 */
export function sortDiamondsBy4cs(a: IDiamondCollection, b: IDiamondCollection) {
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
