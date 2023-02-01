import { MIX_DIAMOND_PRODUCT_SLUGS } from '../shopify/hardcodedModularJewelryProducts';

const shouldHideDiamondTypeOptionsBySlug = slug => {
  const slugs = [...MIX_DIAMOND_PRODUCT_SLUGS];

  return slugs.includes(slug);
};

export default shouldHideDiamondTypeOptionsBySlug;
