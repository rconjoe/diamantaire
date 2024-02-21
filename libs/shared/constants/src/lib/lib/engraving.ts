export const ENGRAVING_PRICE_CENTS = 6000;
export const ENGRAVING_PRICE_DOLLARS = 60;
export const ENGRAVING_INITIALS_OPTIONS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
export const ENGRAVING_SYMBOL_OPTIONS = ['&', '/', '-', '_', '!', '?', '.', ' ', '(', ')'];

export const ENGRAVING_REGEX = new RegExp(/^[A-Z0-9&/_!?. ()-]+$/i);

export const JEWELRY_ENGRAVING_MAX_LENGTH = 16;
export const JEWELRY_INPUT_STYLE = 'jewelryInput';
export const JEWELRY_ENGRAVING_TEXT_STYLE = 'jewleryEngravingText';
export const FREE_ENGRAVING_HANDLES = ['engravable-bar-necklace'];

export const ENGRAVING_CHARACTER_LIMITS = {
  // solitaire-bar-necklace temp, as slugs don't match up
  'solitaire-bar-necklace': 12,
  'engravable-bar-necklace': 12,
  'solitaire-bar-pendant': 8,
};

// Source of truth for jewlry products that can be engraved
export const ENGRAVEABLE_JEWELRY_SLUGS = ['solitaire-bar-necklace', 'solitaire-bar-pendant'];

// Wedding Bands
export const NON_ENGRAVEABLE_WEDDING_BAND_SLUGS = [
  'baguette-bar-band',
  'alternating-shapes-band',
  'devotion-band',
  'eternity-band',
];
