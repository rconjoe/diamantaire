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
