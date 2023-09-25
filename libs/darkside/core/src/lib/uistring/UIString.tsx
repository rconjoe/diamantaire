// import { createLogger } from '../utils';

// const logger = createLogger('UIString');

interface UIStringProps {
  children: string | string[];
  placeholders?: string[];
  values?: string[];
  mapType?: (typeof HumanNameMapperTypes)[keyof typeof HumanNameMapperTypes];
}

// interface StringValue {
//   key: string;
//   value: string;
// }

// interface StringMapper {
//   title: string;
//   map: StringValue[];
// }

export const HumanNameMapperTypes = {
  OptionNames: 'OPTION_NAMES',
  SizeUnitLabel: 'SIZE_UNIT_LABEL_MAP',
  UIStrings: 'UI_STRINGS',
  UIStrings2: 'UI_STRINGS_2',
  DiamondShapes: 'DIAMOND_SHAPES',
  CeramicColorOptions: 'CERAMIC_COLOR_OPTION_HUMAN_NAMES',
  Tags: 'TAGS',
  MetalsWithGoldPurity: 'METALS_WITH_GOLD_PURITY_IN_HUMAN_NAMES',
  CaratWeight: 'CARAT_WEIGHT_HUMAN_NAMES',
  BandAccentCategoryShortNames: 'BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES',
  DiamondSpecs: 'DIAMOND_SPECS',
  DiamondCuts: 'DIAMOND_CUTS',
  DiamondColorGroupTypes: 'DIAMOND_COLOR_GROUP_TYPES',
  DiamondColorGroups: 'DIAMOND_COLOR_GROUPS',
  Metals: 'METALS_IN_HUMAN_NAMES',
  MetalsWithDefaultGoldPurities: 'METALS_IN_HUMAN_NAMES_WITH_DEFAULT_GOLD_PURITIES',
  StoneSettingNames: 'STONE_SETTING_HUMAN_NAMES',
  BandAccentNames: 'BAND_ACCENT_HUMAN_NAMES',
  ProductTypes: 'PRODUCT_TYPES',
  DiamondTypeStyles: 'DIAMOND_TYPE_STYLES',
  EternityNames: 'ETERNITY_STYLE_HUMAN_NAMES',
  PaveClusterNames: 'PAVE_CLUSTER_SHAPES_HUMAN_NAMES',
  BandWidthNames: 'BAND_WIDTH_HUMAN_NAMES',
  JewelrySubcategoryNames: 'JEWELRY_SUB_CATEGORY_HUMAN_NAMES',
  ProngStyleNames: 'PRONG_STYLE_HUMAN_NAMES',
  PriceRangeOptionNames: 'PRICE_RANGE_OPTIONS_HUMAN_NAMES',
  DiamondSizeNames: 'DIAMOND_SIZE_HUMAN_NAMES',
  Languages: 'LANGUAGES',
} as const;

/**
 * Maps a key to a string object for localization.  Will attempt key in lowercase before fallingback to return key if mapped inital kay value not found..
 * @param {object} map - string map
 * @param {string} key - map key
 * @param {string} fallbackString - optional fallback string override (defaults to key value)
 * @returns {string} - returns mapped string or fallback string.
 */

const UIString = ({ children, placeholders, values, mapType = HumanNameMapperTypes.UIStrings }: UIStringProps) => {
  console.log(`**`);
  console.log(`UIString: children`, children);
  console.log(`UIString: placeholders`, placeholders);
  console.log(`UIString: values`, values);
  console.log(`UIString: mapType`, mapType);

  return children;
};

// const UIString = ({ children, placeholders, values, mapType = HumanNameMapperTypes.UIStrings }: UIStringProps) => {
//   const router = useRouter();
//   const { data } = useGlobalData(router.locale);
//   const { allHumanNamesMappers } = data || {};

//   logger.debug('allHumanNamesMappers', allHumanNamesMappers);

//   if (!allHumanNamesMappers) {
//     logger.warn('allHumanNamesMappers is not defined');

//     return children;
//   }

//   let stringArr = [];

//   // Join UI_STRING with UI_STRING_2
//   if (mapType === HumanNameMapperTypes.UIStrings) {
//     stringArr = [
//       ...getMapByType(allHumanNamesMappers, HumanNameMapperTypes.UIStrings),
//       ...getMapByType(allHumanNamesMappers, HumanNameMapperTypes.UIStrings2),
//     ];
//   } else {
//     stringArr = getMapByType(allHumanNamesMappers, mapType);
//   }

//   // Transform from array to map
//   const map = stringArr.reduce((acc, item) => {
//     acc[item.key] = item.value;

//     return acc;
//   }, {});

//   logger.debug(`Map: ${mapType}`, map);

//   if ((placeholders && !values) || (values && !placeholders)) {
//     logger.warn('Requires both placeholders and values to be defined if either is defined');
//   } else if (placeholders && values) {
//     return <>{replacePlaceholders(children.toString(), placeholders, values)}</>;
//   }

//   return map[children.toString()] || map[String(children).toLowerCase()] || children;
// };

export { UIString };

// function getMapByType(allMappers: StringMapper[], type: (typeof HumanNameMapperTypes)[keyof typeof HumanNameMapperTypes]) {
//   return allMappers.find((m) => m.title === type)?.map || [];
// }
