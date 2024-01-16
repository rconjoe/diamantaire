const CONFIG_TYPE_ORDER = [
  'diamondType',
  'hiddenHalo',
  'bandWidth',
  'sideStoneShape',
  'sideStoneCarat',
  'bandStoneShape',
  'bandStoneStyle',
  'prongStyle',
  'haloSize',
  'metal',
  'ceramicColor',
  'bandAccent',
  'size',
  'caratWeight',
  'diamondSize',
  'chainLength',
  'diamondCount',
  'eternityStyle',
  'stoneSetting',
  'earringSize',
  'bandStyle',
  'bandVersion',
  'value',
];

function getConfigTypeOrderPosition(configType, order = CONFIG_TYPE_ORDER) {
  const pos = order.indexOf(configType);

  return pos >= 0 ? pos : Infinity;
}

export function configTypesComparitor(a: string, b: string) {
  return getConfigTypeOrderPosition(a) - getConfigTypeOrderPosition(b);
}

export function filterConfigurationTypes(configType, validTypes = CONFIG_TYPE_ORDER) {
  return validTypes.includes(configType);
}
