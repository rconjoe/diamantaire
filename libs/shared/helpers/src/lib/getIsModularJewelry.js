import { MODULAR_JEWELRY_PRODUCT_SLUGS } from '@diamantaire/shared/constants';

const getIsModularJewelry = (slug) => {
  return MODULAR_JEWELRY_PRODUCT_SLUGS.includes(slug);
};

export default getIsModularJewelry;
