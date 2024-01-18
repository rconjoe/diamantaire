interface Options {
  productTitle: string;
  productConfiguration: Record<string, string>;
  configurationsWithoutLabels?: string[];
  configurationSortOrder?: string[];
  _t: (value: string) => string;
}

export function generatePdpAssetAltTag({
  productTitle,
  productConfiguration,
  configurationsWithoutLabels = ['metal', 'diamondType', 'goldPurity'],
  configurationSortOrder = ['diamondType', 'goldPurity', 'metal'],
  _t,
}: Options) {
  const sortedConfigurations = Object.entries(productConfiguration).sort(([a], [b]) => {
    const posA = configurationSortOrder.includes(a) ? configurationSortOrder.indexOf(a) : 99;
    const posB = configurationSortOrder.includes(b) ? configurationSortOrder.indexOf(b) : 99;

    if (posA < posB) {
      return -1;
    }

    return 1;
  });

  const configurationDescriptionArr = sortedConfigurations.map(([type, value]) => {
    if (configurationsWithoutLabels.includes(type)) {
      return _t(value);
    }

    return `${_t(type)}: ${_t(value)}`;
  });

  return `${productTitle} | ${configurationDescriptionArr.join(' | ')}`;
}
