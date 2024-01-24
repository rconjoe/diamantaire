interface Options {
  productTitle: string;
  productConfiguration: Record<string, string>;
  configurationsWithoutLabels?: string[];
  configurationSortOrder?: string[];
  _t?: (value: string) => string;
}

export function generatePdpAssetAltTag({
  productTitle,
  productConfiguration,
  configurationsWithoutLabels = ['metal', 'diamondType', 'goldPurity'],
  configurationSortOrder = ['diamondType', 'goldPurity', 'metal'],
  _t = null, // _t is optional and defaults to null
}: Options): string {
  if (!productConfiguration || !configurationSortOrder) {
    return '';
  }
  const sortedConfigurations = Object.entries(productConfiguration).sort(([a], [b]) => {
    const posA = configurationSortOrder.includes(a) ? configurationSortOrder.indexOf(a) : 99;
    const posB = configurationSortOrder.includes(b) ? configurationSortOrder.indexOf(b) : 99;

    if (posA < posB) {
      return -1;
    }

    return 1;
  });

  const configurationDescriptionArr = sortedConfigurations.map(([type, value]) => {
    // Apply translation if _t is provided, otherwise use the value as is
    const translatedType = _t ? _t(type) : type;
    const translatedValue = _t ? _t(value) : value;

    if (configurationsWithoutLabels.includes(type)) {
      return translatedValue;
    }

    return `${translatedType}: ${translatedValue}`;
  });

  return `${productTitle} | ${configurationDescriptionArr.join(' | ')}`;
}
