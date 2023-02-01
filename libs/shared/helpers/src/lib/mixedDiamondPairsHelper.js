import { MODULAR_RING_DIAMOND_PAIR_PRODUCT_SLUGS } from '@diamantaire/shared/constants';

import {
  MIX_DIAMOND_TYPE,
  MIX_DIAMOND_SETS,
} from '@diamantaire/shared/constants';

const getIsModularEngRingMixedDiamond = (slug) => {
  return slug && MODULAR_RING_DIAMOND_PAIR_PRODUCT_SLUGS.includes(slug);
};

const getIsDiamondPairEmeraldAndPear = (diamondType) => {
  return diamondType === MIX_DIAMOND_TYPE.EMERALD_AND_PEAR;
};

const getDiamondArrayPairSorted = (diamondPair, diamondType) => {
  if (!MIX_DIAMOND_SETS[diamondType]) {
    return diamondPair;
  }

  return diamondPair.sort((a, b) => {
    const order = MIX_DIAMOND_SETS[diamondType];

    a = order.indexOf(a.diamondType);
    b = order.indexOf(b.diamondType);

    return a - b;
  });
};

export {
  getIsModularEngRingMixedDiamond,
  getIsDiamondPairEmeraldAndPear,
  getDiamondArrayPairSorted,
};
