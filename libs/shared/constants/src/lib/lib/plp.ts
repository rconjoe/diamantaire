export const PRICE_RANGE_OPTIONS_HUMAN_NAMES_VALUES = {
  'below-500': [500],
  '500-1500': [500, 1500],
  '1500-3000': [1500, 300000],
  '3000-plus': [3000],
  custom: [],
};

export const FACETED_NAV_ORDER = ['subStyle', 'style', 'diamondType', 'metal'];

export const PLP_PRICE_RANGES = [
  {
    title: 'Below $500',
    min: undefined, //priceRange[0],
    max: 50000,
    slug: 'below-500',
  },
  {
    title: '$500-$1,500',
    min: 50000,
    max: 150000,
    slug: '500-1500',
  },
  {
    title: '$1,500-$3000',
    min: 150000,
    max: 300000,
    slug: '1500-3000',
  },
  {
    title: '$3000+',
    min: 300000,
    max: undefined, // priceRange[1],
    slug: '3000-plus',
  },
];
