import { RING_PRODUCT_TYPE } from '@diamantaire/shared/constants';

const getModularJewelryOptions = (options, productType) => {
  if (!options) {
    return {};
  }
  // eslint-disable-next-line
  const { goldPurity, ...optionsWithoutGoldPurity } = options;
  let modularJewelryOptions = optionsWithoutGoldPurity;
  const isModularJewelryRing = productType === RING_PRODUCT_TYPE;

  if (isModularJewelryRing) {
    const {
      // eslint-disable-next-line
      ringSize,
      ...optionsWithoutGoldPurityAndRingSize
    } = optionsWithoutGoldPurity;

    modularJewelryOptions = optionsWithoutGoldPurityAndRingSize;
  }

  return modularJewelryOptions;
};

export default getModularJewelryOptions;
