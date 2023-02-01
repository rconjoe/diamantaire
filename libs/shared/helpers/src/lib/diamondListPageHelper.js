import {
  DIAMOND_LIST_PAGE_SLUGS,
  JEWELRY_EMERALD_CUT,
  JEWELRY_PEAR_SHAPED,
  JEWELRY_ROUND_BRILLIANT,
  JEWELRY_OVAL,
  JEWELRY_MARQUISE,
  JEWELRY_TRILLION,
  JEWELRY_BAGUETTE,
  DIAMOND_TYPES,
} from '@diamantaire/shared/constants';

export const getIsDiamondListPageSlug = (slug) => {
  return DIAMOND_LIST_PAGE_SLUGS.includes(slug);
};

export const getIsValidDiamondForDiamondListPageSlug = (diamondType) => {
  return DIAMOND_TYPES.includes(diamondType);
};

export const getDiamondListPageType = (slug) => {
  if (slug.includes('round')) {
    return 'round-brilliant';
  }

  return slug.replace('-cut-diamonds', '');
};

export const mapShapeToSeoTitle = (path) => {
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
};
