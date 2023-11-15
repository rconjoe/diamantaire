const CONFIG_TYPE_ORDER = [
  'diamondType',
  'sideStoneShape',
  'sideStoneCarat',
  'prongStyle',
  'metal',
  'ceramicColor',
  'bandWidth',
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
