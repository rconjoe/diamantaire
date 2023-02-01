import {
  EARRING_PRODUCT_TYPE,
  NECKLACE_PRODUCT_TYPE,
  RING_PRODUCT_TYPE,
  BRACELET_PRODUCT_TYPE,
  GIFT_CARD_PRODUCT_TYPE,
} from '@diamantaire/shared/constants';

const getProductTypeSizeUnit = (availableSizes, productType) => {
  switch (productType) {
    // TODO: check against other necklaces as we add more necklace productTypes
    case NECKLACE_PRODUCT_TYPE: {
      return getNecklaceSizeUnit(availableSizes);
    }
    case EARRING_PRODUCT_TYPE: {
      return getEarringSizeUnit(availableSizes);
    }
    case RING_PRODUCT_TYPE: {
      return 'rs';
    }
    case BRACELET_PRODUCT_TYPE: {
      return getBraceletSizeUnit(availableSizes);
    }
    case GIFT_CARD_PRODUCT_TYPE: {
      return 'am';
    }
    // TODO: returning nothing across all product types?
    // 'rs' might not make sense because what if a product size is numeral but
    // shouldn't be ringSize, etc.
    default:
      return 'rs';
  }
};

// Apparently not all earrings will have ctw as size, some could use mm
function getEarringSizeUnit(availableSizes) {
  // We are assuming that first size is indicative of all sizes
  const [firstSize] = availableSizes;

  switch (true) {
    case firstSize.endsWith('ct'):
      return 'ct';
    case firstSize.endsWith('mm'):
      return 'mm';
  }
}

function getNecklaceSizeUnit(availableSizes) {
  const [firstSize] = availableSizes;

  switch (true) {
    case firstSize.endsWith('ct'):
      return 'ct';
    default:
      return 'cl';
  }
}

function getBraceletSizeUnit(availableSizes) {
  const [firstSize] = availableSizes;

  switch (true) {
    case firstSize.endsWith('ct'):
      return 'ct';
    default:
      return 'in';
  }
}

export default getProductTypeSizeUnit;
