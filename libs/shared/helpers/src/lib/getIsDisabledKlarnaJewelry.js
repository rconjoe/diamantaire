import { GIFT_CARD_PRODUCT_SLUGS } from '@diamantaire/shared/constants';

const getIsDisabledKlarnaJewelry = (slug) => {
  return GIFT_CARD_PRODUCT_SLUGS.includes(slug);
};

export default getIsDisabledKlarnaJewelry;
