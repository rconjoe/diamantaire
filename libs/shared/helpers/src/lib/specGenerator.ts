// The _spec attribute controls what details are shown on a per-line-item basis in cart + checkout
//

import { getFormattedCarat } from '@diamantaire/shared/constants';

type SpecGenerator = {
  configuration: {
    [key: string]: any;
  };
  productType: string;
  _t: (key: string) => string;
  alt_t?: (key: string) => string;
  // Builder flow product indicator
  hasChildDiamond?: boolean;
  locale?: string;
};

export function specGenerator({ configuration, productType, _t, alt_t, hasChildDiamond, locale }: SpecGenerator) {
  const {
    diamondShape,
    diamondSize,
    caratWeight,
    metalType,
    metal,
    bandWidth,
    chainLength,
    diamondCount,
    earringSize,
    bandAccent,
    diamondType,
    caratWeightOverride,
    color,
    cut,
    clarity,
    ringSize,
    goldPurity,
    hiddenHalo,
    sideStoneCarat,
    sideStoneShape,
  } = configuration || {};

  const specArray = [];

  if (!alt_t) {
    alt_t = _t;
  }

  const isEngagementRing = productType === 'Engagement Ring';
  const isDiamond = productType === 'Diamond';

  // Three stone
  if (sideStoneCarat) {
    specArray.push(`${_t('sideStoneShape')}: ${sideStoneShape ? _t(sideStoneShape) : _t(diamondType)}`);
    specArray.push(`${_t('sideStoneCarat')}: ${_t(sideStoneCarat)}ct`);
  }

  // Need to duplicate next 2 to catch all cases
  if (diamondShape && !sideStoneCarat && diamondShape?.split('').filter((c) => c === '+').length < 2) {
    specArray.push(`${_t('shape')}: ${alt_t(diamondShape)}`);
  }

  if (diamondType && !sideStoneCarat && diamondType?.split('').filter((c) => c === '+').length < 2) {
    specArray.push(
      `${_t('shape')}:  ${diamondType
        ?.split('+')
        .map((diamondType) => alt_t(diamondType))
        .join(' + ')}`,
    );
  }

  // ER specific
  if (isEngagementRing && !hasChildDiamond && !sideStoneCarat) {
    specArray.push(`${_t('centerstone')}: ${caratWeightOverride + ', ' + color + ', ' + clarity}`);
  }

  if (metalType) {
    specArray.push(`${_t('metal')}: ${_t(metalType)}`);
  }

  if (metal) {
    const metalWithGoldPurity = _t(`${goldPurity ? `${goldPurity} ` : ''}${metal}`);

    specArray.push(`${_t('metal')}: ${metalWithGoldPurity}`);
  }

  if (diamondSize) {
    specArray.push(`${_t('diamondSize')}: ${_t(diamondSize)}`);
  }

  if (caratWeight && !isEngagementRing && parseFloat(caratWeight)) {
    const formattedCarat = getFormattedCarat(caratWeight, locale);

    specArray.push(`${_t('carat weight')}: ${formattedCarat}ct`);
  }

  if (bandWidth) {
    specArray.push(`${_t('bandWidth')}: ${_t(bandWidth)}`);
  }

  if (diamondCount) {
    specArray.push(`${_t('diamondCount')}: ${diamondCount}`);
  }

  // ER specific
  if (isEngagementRing && configuration?.diamondOrientation === 'horizontal') {
    specArray.push(`${_t('diamondOrientation')}: ${_t('horizontal')}`);
  }

  if (bandAccent) {
    specArray.push(
      `${_t(bandAccent.includes('pave-twisted') ? 'Hidden Halo' : 'bandAccent')}: ${_t(
        bandAccent.replace('pave-twisted', 'double-pave'),
      )}`,
    );
  }

  if (hiddenHalo === 'yes') {
    specArray.push(`${_t('Hidden Halo')}: ${_t('yes')}`);
  }

  if (chainLength) {
    specArray.push(`${_t('chain length')}: ${chainLength}"`);
  }

  if (earringSize) {
    specArray.push(`${_t('earringSize')}: ${alt_t(earringSize)}`);
  }

  if (productType === 'Necklace' && !chainLength) {
    specArray.push(`${_t('chain length')}: 16-18"`);
  }

  // ER specific
  if (isEngagementRing || productType === 'Wedding Band' || productType === 'Ring') {
    specArray.push(`${_t('ringSize')}: ${ringSize}`);
  }

  // Loose diamond Specifc
  if (isDiamond) {
    specArray.push(`${_t('color')}: ${color}`);
    specArray.push(`${_t('clarity')}: ${clarity}`);
    specArray.push(`${_t('cut')}: ${_t(cut)}`);
  }

  return specArray.join(';');
}
