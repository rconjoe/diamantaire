import { WHOLE_SIZE_RING_SLUGS } from '@diamantaire/shared/constants';

const getIsWholeSizeRingJewelry = (slug) => {
  return WHOLE_SIZE_RING_SLUGS.includes(slug);
};

export default getIsWholeSizeRingJewelry;
