import _ from 'lodash';

import { IDiamondCollection } from '../interface/diamond.interface';

export function hideIdenticalDiamond4Cs(diamonds: IDiamondCollection) {
  return _.uniqWith(diamonds, isIdenticalDiamond);
}

export function isIdenticalDiamond(a: IDiamondCollection, b: IDiamondCollection) {
  // Just do a string match on diamond carat
  return a.color === b.color && a.clarity === b.clarity && a.cut === b.cut && Number(a.carat) === Number(b.carat);
}
