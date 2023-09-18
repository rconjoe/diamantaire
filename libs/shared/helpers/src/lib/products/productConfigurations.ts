const CONFIG_TYPE_ORDER = [
  'diamondType',
  'sideStoneShape',
  'sideStoneCarat',
  'metal',
  'bandWidth',
  'bandAccent',
  'caratWeight',
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
