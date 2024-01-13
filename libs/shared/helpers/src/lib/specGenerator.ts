// The _spec attribute controls what details are shown on a per-line-item basis in cart + checkout
//

type SpecGenerator = {
  configuration: {
    [key: string]: any;
  };
  productType: string;
  _t: (key: string) => string;
  alt_t?: (key: string) => string;
  // Builder flow product indicator
  hasChildDiamond?: boolean;
};

export function specGenerator({ configuration, productType, _t, alt_t, hasChildDiamond }: SpecGenerator) {
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

  console.log('specGenerator', configuration);

  const specArray = [];

  const isEngagementRing = productType === 'Engagement Ring';
  const isDiamond = productType === 'Diamond';

  // Three stone
  if (sideStoneCarat) {
    specArray.push(`${_t('sideStoneShape')}: ${sideStoneShape ? _t(sideStoneShape) : _t(diamondType)}`);
    specArray.push(`${_t('sideStoneCarat')}: ${_t(sideStoneCarat)}ct`);
  }

  // Need to duplicate next 2 to catch all cases
  if (diamondShape && !sideStoneCarat) {
    specArray.push(`${_t('shape')}: ${_t(diamondShape)}`);
  }

  if (diamondType && !sideStoneCarat) {
    specArray.push(`${_t('shape')}: ${_t(diamondType)}`);
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
    specArray.push(`${_t('carat weight')}: ${_t(caratWeight)}ct`);
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
      `${_t(hasChildDiamond || bandAccent.includes('pave-twisted') ? 'Hidden Halo' : 'bandAccent')}: ${_t(
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
  if (isEngagementRing || productType === 'Wedding Band') {
    specArray.push(`${_t('ringSize')}: ${ringSize}`);
  }

  // Loose diamond Specifc
  if (isDiamond) {
    specArray.push(`${_t('color')}: ${color}`);
    specArray.push(`${_t('clarity')}: ${clarity}`);
    specArray.push(`${_t('cut')}: ${cut}`);
  }

  return specArray.join(';');
}
