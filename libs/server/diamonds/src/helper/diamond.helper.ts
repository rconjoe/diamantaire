import _ from 'lodash';

export function hideIdenticalDiamond4Cs(diamonds) {
  // TODO: uniqWith is a lodash function
  return _.uniqWith(diamonds, isIdenticalDiamond);
}

export function isIdenticalDiamond(a, b) {
  // Just do a string match on diamond carat
  return a.color === b.color && a.clarity === b.clarity && a.cut === b.cut && a.carat === b.carat;
}

/* A more optimized "Unique Diamond Algorythm*/
/*******
 * * sort by 4cs
 * keep track of how many unique diamonds we currently have, starting at 1 and we are done at 3
 * look at last unique diamond and compare it to the next one
 * if they are identical, move onto the next one
 * If not, increment the "unique diamond counter"
 */
