import {
  JEWELRY_EMERALD_CUT,
  JEWELRY_PEAR_SHAPED,
  JEWELRY_ROUND_BRILLIANT,
  JEWELRY_OVAL,
  JEWELRY_MARQUISE,
  JEWELRY_TRILLION,
  JEWELRY_BAGUETTE,
} from '@diamantaire/shared/constants';

export const mapShapeToSeoTitle = (path: string) => {
  if (path === JEWELRY_TRILLION) {
    return 'Trillion Shaped Jewelry | VRAI';
  }
  if (path === JEWELRY_BAGUETTE) {
    return 'Baguette Jewelry | VRAI';
  }
  if (path === JEWELRY_MARQUISE) {
    return 'Marquise Jewelry | VRAI';
  }
  if (path === JEWELRY_OVAL) {
    return 'Oval Diamond Jewelry | VRAI';
  }
  if (path === JEWELRY_ROUND_BRILLIANT) {
    return 'Round Diamond Jewelry | VRAI';
  }
  if (path === JEWELRY_PEAR_SHAPED) {
    return 'Pear Shaped Diamond Jewelry | VRAI';
  }
  if (path === JEWELRY_EMERALD_CUT) {
    return 'Emerald Cut Jewelry | VRAI';
  }

  return null;
};
