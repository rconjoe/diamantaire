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
  'topDiamondShape',
  'bottomDiamondShape',
  'paveCluster',
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
  'hoopAccent',
  'domeWidth',
  'wristSize',
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

export const CONFIG_TYPE_TRANSLATION_MAP = {
  diamondType: 'DIAMOND_SHAPES',
  hiddenHalo: 'HIDDEN_HALO_HUMAN_NAMES',
  bandWidth: 'BAND_WIDTH_LABEL_HUMAN_NAMES',
  sideStoneShape: 'DIAMOND_SHAPES',
  sideStoneCarat: 'CARAT_WEIGHT_HUMAN_NAMES',
  bandStoneShape: 'DIAMOND_SHAPES',
  bandStoneStyle: 'BAND_STONE_STYLE_HUMAN_NAMES',
  prongStyle: 'PRONG_STYLE_HUMAN_NAMES',
  haloSize: 'HALO_SIZE_HUMAN_NAMES',
  topDiamondShape: 'DIAMOND_SHAPES',
  bottomDiamondShape: 'DIAMOND_SHAPES',
  paveCluster: 'PAVE_CLUSTER_SHAPES_HUMAN_NAMES',
  metal: 'METALS_IN_HUMAN_NAMES',
  ceramicColor: 'CERAMIC_COLOR_OPTION_HUMAN_NAMES',
  bandAccent: 'BAND_ACCENT_HUMAN_NAMES',
  caratWeight: 'CARAT_WEIGHT_HUMAN_NAMES',
  eternityStyle: 'ETERNITY_STYLE_HUMAN_NAMES',
  stoneSetting: 'STONE_SETTING_HUMAN_NAMES',
  bandStyle: 'BAND_STYLE_HUMAN_NAMES',
};

function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
}

// Pull translation map from human names mapper with a fallback to the optionType in snake case + HUMAN_NAMES (ie bandAccent -> BAND_ACCENT_HUMAN_NAMES)
export function getTranslatedName({
  optionType,
  selectedOptionValue,
  translations,
  translationKeyMap = CONFIG_TYPE_TRANSLATION_MAP,
  _t,
}) {
  // Convert optionType from camelCase to SNAKE_UPPERCASE
  const defaultKey = camelToSnakeCase(optionType) + '_HUMAN_NAMES';

  // Retrieve the correct translation key from the map
  const translationKey = translationKeyMap[optionType] || defaultKey;
  const typeTranslations = translations?.[translationKey];

  // Fetch the translated value using the selectedOptionValue as the key
  const translation = typeTranslations?.[selectedOptionValue]?.value;

  // Return the translated value if available, otherwise return the original selectedOptionValue
  return translation ?? _t(selectedOptionValue);
}
