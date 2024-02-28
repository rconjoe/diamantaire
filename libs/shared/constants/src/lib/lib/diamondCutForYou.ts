export const ALL_CFY_DIAMOND_TYPES = [
  'round-brilliant',
  'oval',
  'emerald',
  'pear',
  'radiant',
  'cushion',
  'asscher',
  'brilliant-emerald',
  'capri',
  'cushion-princess',
  'elongated-cushion',
  'felix',
  'fusion',
  'harmonia',
  'heart',
  'hexagon',
  'kite',
  'long-hexagon',
  'lozenge',
  'lucky',
  'marquise',
  'octavia',
  'oval-rose',
  'passion',
  'princess',
  'rand',
  'regulus',
  'round-rose',
  'shield',
  'trillion',
];

export const POPULAR_CFY_DIAMOND_TYPES = ['round-brilliant', 'oval', 'emerald', 'pear', 'radiant', 'cushion'];

export const STANDARD_CFY_DIAMOND_TYPES = [
  'round-brilliant',
  'oval',
  'emerald',
  'pear',
  'radiant',
  'cushion',
  'marquise',
  'trillion',
  'asscher',
  'princess',
];

export const CUSTOM_CFY_DIAMOND_TYPES = ALL_CFY_DIAMOND_TYPES.filter((v) => {
  return !POPULAR_CFY_DIAMOND_TYPES.includes(v);
});

export const DIAMOND_CFY_VALID_QUERIES = ['product', 'carat'];

export const DIAMOND_CFY_FACETED_NAV = ['diamondType'];

export const DIAMOND_CFY_CARAT_RANGE_MAP = {
  'round-brilliant': [1, 8],
  oval: [1, 11],
  emerald: [1, 13],
  pear: [1, 10],
  radiant: [1, 12],
  cushion: [1, 9],
  asscher: [1, 12],
  'brilliant-emerald': [1, 11],
  capri: [1, 10],
  'cushion-princess': [1, 10],
  'elongated-cushion': [1, 11],
  felix: [1, 12],
  fusion: [1, 12],
  harmonia: [1, 8],
  heart: [1, 8],
  hexagon: [1, 10],
  kite: [1, 9],
  'long-hexagon': [1, 12],
  lozenge: [1, 11],
  lucky: [1, 11],
  marquise: [1, 10],
  octavia: [1, 9],
  'oval-rose': [1, 13],
  passion: [1, 9],
  princess: [1, 9],
  rand: [1, 8],
  regulus: [1, 9],
  'round-rose': [1, 13],
  shield: [1, 13],
  trillion: [1, 10],
  magnat: [1, 9],
};

export const DIAMOND_CFY_CARAT_DEFAULT = 3.0;
