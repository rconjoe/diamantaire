import { MODULAR_UNIQUE_NECKLACE_PRODUCT_SLUGS } from '@diamantaire/shared/constants';

//TODO: Remove if shopify tagging in product data is found to be a sufficient identifier
const getIsUniqueNecklaceDiamondsJewelry = (slug) => {
  return MODULAR_UNIQUE_NECKLACE_PRODUCT_SLUGS.includes(slug);
};

export default getIsUniqueNecklaceDiamondsJewelry;
