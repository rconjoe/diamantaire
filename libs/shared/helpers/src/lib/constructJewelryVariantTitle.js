import { JEWELRY_METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES } from '@diamantaire/shared/constants';

function constructJewelryVariantTitle(options) {
  return `${
    JEWELRY_METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES[options?.metal]
  } / ${options.ringSize || options.side}`;
}

export default constructJewelryVariantTitle;
