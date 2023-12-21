// The _spec attribute controls what details are shown on a per-line-item basis in cart + checkout
export function specGenerator(configuration, productType, _t, earring_t) {
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
    clarity,
    ringSize,
  } = configuration || {};

  const specArray = [];

  const isEngagementRing = productType === 'Engagement Ring';

  // Need to duplicate the first 2 to catch all cases
  if (diamondShape) {
    specArray.push(`${_t('shape')}: ${_t(diamondShape)}`);
  }

  if (diamondType) {
    specArray.push(`${_t('shape')}: ${_t(diamondType)}`);
  }

  // ER specific
  if (isEngagementRing) {
    specArray.push(`${_t('centerstone')}: ${caratWeightOverride + ', ' + color + ', ' + clarity}`);
  }

  if (metalType) {
    specArray.push(`${_t('metal')}: ${_t(metalType)}`);
  }

  if (metal) {
    specArray.push(`${_t('metal')}: ${_t(metal)}`);
  }

  if (diamondSize) {
    specArray.push(`${_t('diamondSize')}: ${_t(diamondSize)}`);
  }

  if (caratWeight && !isEngagementRing) {
    specArray.push(`${_t('carat weight')}: ${_t(caratWeight)}ct`);
  }

  if (bandWidth) {
    specArray.push(`${_t('band')}: ${_t(bandWidth)}`);
  }

  if (diamondCount) {
    specArray.push(`${_t('diamondCount')}: ${diamondCount}`);
  }

  if (bandAccent) {
    specArray.push(`${_t('bandAccent')}: ${_t(bandAccent)}`);
  }

  if (chainLength) {
    specArray.push(`${_t('chain length')}: ${chainLength}"`);
  }

  if (earringSize) {
    specArray.push(`${_t('earringSize')}: ${earring_t(earringSize)}`);
  }

  if (productType === 'Necklace' && !chainLength) {
    specArray.push(`${_t('chain length')}: 16-18"`);
  }

  // ER specific
  if (isEngagementRing || productType === 'Wedding Band') {
    specArray.push(`${_t('ringSize')}: ${ringSize}`);
  }

  return specArray.join(';');
}
