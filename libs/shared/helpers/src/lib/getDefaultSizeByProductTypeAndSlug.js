import getIsRandMRingJewelry from './getIsRandMRingJewelry';
import getIsWholeSizeRingJewelry from './getIsWholeSizeRingJewelry';
import {
  DEFAULT_ENGAGEMENT_RING_SIZE,
  ENGAGEMENT_RING_PRODUCT_TYPE,
  RING_PRODUCT_TYPE,
  DEFAULT_JEWELRY_RING_SIZE,
  DEFAULT_JEWELRY_RANGE_RING_SIZE,
  DEFAULT_JEWELRY_RANDM_RING_SIZE,
  WEDDING_BAND_PRODUCT_TYPE,
  DEFAULT_WEDDING_BAND_SIZE,
  DEFAULT_WHOLE_SIZE_JEWELRY_RING_SIZE,
  RANGE_RINGSIZE_SLUGS,
} from '@diamantaire/shared/constants';

const getDefaultSizeByProductTypeAndSlug = (productType, slug) => {
  switch (productType) {
    case ENGAGEMENT_RING_PRODUCT_TYPE: {
      return DEFAULT_ENGAGEMENT_RING_SIZE;
    }
    case RING_PRODUCT_TYPE: {
      // if ring uses range format ring size variant (e.g. '4-5')
      if (RANGE_RINGSIZE_SLUGS.includes(slug)) {
        return DEFAULT_JEWELRY_RANGE_RING_SIZE;
      } else if (getIsRandMRingJewelry(slug)) {
        return DEFAULT_JEWELRY_RANDM_RING_SIZE;
      } else if (getIsWholeSizeRingJewelry(slug)) {
        return DEFAULT_WHOLE_SIZE_JEWELRY_RING_SIZE;
      } else {
        return DEFAULT_JEWELRY_RING_SIZE;
      }
    }
    case WEDDING_BAND_PRODUCT_TYPE: {
      return DEFAULT_WEDDING_BAND_SIZE;
    }
    default: {
      return null;
    }
  }
};

export default getDefaultSizeByProductTypeAndSlug;
