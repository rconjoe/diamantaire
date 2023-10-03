import { DiamondClarityGroup, DiamondClarity, DiamondColor, DiamondColorGroup } from '../constants/diamond-properties';

/** CLARITY */

export function isVVSPlus(clarity: (typeof DiamondClarity)[keyof typeof DiamondClarity]): boolean {
  return DiamondClarityGroup['VVS'].includes(clarity);
}

export function isVSPlus(clarity: (typeof DiamondClarity)[keyof typeof DiamondClarity]): boolean {
  return isVVSPlus(clarity) || DiamondClarityGroup['VS'].includes(clarity);
}

export function isSIMinus(clarity) {
  return !isVSPlus(clarity);
}

/** COLOR */

export function isDEF(color: (typeof DiamondColor)[keyof typeof DiamondColor]): boolean {
  return DiamondColorGroup['DEF'].includes(color);
}

export function isGHI(color: (typeof DiamondColor)[keyof typeof DiamondColor]): boolean {
  return DiamondColorGroup['GHI'].includes(color);
}

export function isJK(color: (typeof DiamondColor)[keyof typeof DiamondColor]): boolean {
  return DiamondColorGroup['JK'].includes(color);
}

/**
 * Removes any non numerical [^0-9] characters from lotId
 * @param {string} lotId diamond id
 * @returns {string} lotId without any letters
 */
export function getNumericalLotId(lotId: string) {
  const numericalLotId = lotId.replace(/\D/g, '');

  return numericalLotId;
}
