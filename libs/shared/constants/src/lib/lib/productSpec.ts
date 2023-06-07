const PRODUCT_SPECS_HUMAN_NAMES = {
  bandWidth: { label: 'Band Width', isNumbered: true },
  bandDepth: { label: 'Band Depth', isNumbered: true },
  bandHeight: { label: 'Band Height', isNumbered: false },
  settingHeight: { label: 'Setting Height', isNumbered: true },
  metalWeight: { label: 'Metal Weight', isNumbered: false },
  paveCaratWeight: { label: 'Pave Carat Weight', isNumbered: false },
  caratWeight: { label: 'Carat Weight', isNumbered: false },
  goldWeight: { label: 'Gold Weight', isNumbered: false },
  diamondColor: { label: 'Diamond Color', isNumbered: false },
  diamondClarity: { label: 'Diamond Clarity', isNumbered: false },
  ringSize: { label: 'Ring Size', isNumbered: false },
};

export const RTS_PRODUCT_SPECS_IN_DISPLAY_ORDER = [
  'ringSize',
  'diamondColor',
  'diamondClarity',
  'bandWidth',
  'bandHeight',
  'settingHeight',
  'metalWeight',
  'paveCaratWeight',
].map((name) => {
  const label = PRODUCT_SPECS_HUMAN_NAMES[name].label;

  return {
    name,
    label,
  };
});
export const PRODUCT_SPECS_IN_DISPLAY_ORDER = [
  'bandWidth',
  'bandDepth',
  'settingHeight',
  'metalWeight',
  'paveCaratWeight',
].map((name) => {
  const label = PRODUCT_SPECS_HUMAN_NAMES[name].label;
  const isNumbered = PRODUCT_SPECS_HUMAN_NAMES[name].isNumbered;

  return {
    name,
    label,
    isNumbered,
  };
});
export const PRODUCT_GROUP_KEY = 'productGroupKey';
export const PRODUCT_TITLE_ATTRIBUTE_KEY = '_productTitle';
export const PRODUCT_SPECS_ATTRIBUTE_KEY = '_specs';
export const PRODUCT_ASSET_ATTRIBUTE_KEY = 'productAsset';
export const PRODUCT_ICON_LIST_SHIPPING_COPY_ATTRIBUTE_KEY = 'productIconListShippingCopy';
