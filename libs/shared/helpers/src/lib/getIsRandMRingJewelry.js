import { RANDM_RING_SLUGS } from '@diamantaire/shared/constants';

const getIsRandMRingJewelry = (slug) => {
  return RANDM_RING_SLUGS.includes(slug);
};

export default getIsRandMRingJewelry;
