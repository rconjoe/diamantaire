import { MODULAR_UNIQUE_EARRING_PRODUCT_SLUGS } from '@diamantaire/shared/constants';

//TODO: Remove if shopify tagging in product data is found to be a sufficient identifier
const getIsUniqueEarringDiamondsJewelry = (slug) => {
  return MODULAR_UNIQUE_EARRING_PRODUCT_SLUGS.includes(slug);
};

export default getIsUniqueEarringDiamondsJewelry;
