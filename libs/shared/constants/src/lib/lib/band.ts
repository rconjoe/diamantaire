import {
  BAND_WIDTH_HUMAN_NAMES,
  BAND_ACCENT_HUMAN_NAMES,
  BAND_STONE_STYLE_HUMAN_NAMES,
  BAND_STONE_SHAPE_HUMAN_NAMES,
  BAND_STYLE_OPTION_HUMAN_NAMES,
  BAND_COLOR_OPTION_HUMAN_NAMES,
} from '../../maps/variantOptionMaps';
import { createDisplayOrderFromOptionNames } from '../constant.helpers';

export enum BandAccentType {
  Plain = 'plain',
  Pave = 'pave',
  DoublePave = 'double-pave',
}
export const OMEGA_WEDDING_BAND_PRODUCT_TYPE = 'Omega Wedding Band';
export const MOCK_WEDDING_BAND_PRODUCT_TYPE = 'Mock Wedding Band';
export const MOCK_WEDDING_BAND_DEFAULT_SIZE = '7';
export const PAVE_BAND_ACCENT = 'pave';
export const PLAIN_BAND_ACCENT = 'plain';
export const DEFAULT_BAND_ACCENT = PLAIN_BAND_ACCENT;
export const DEFAULT_WEDDING_BAND_SIZE = '6';
export const BAND_ACCENTS_IN_ORDER = [BandAccentType.Plain, BandAccentType.Pave, BandAccentType];
export const BAND_ACCENTS_FOR_WEDDING = ['plain', 'pave'];
export const BAND_ACCENTS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['plain', 'pave', 'double-pave'],
  BAND_ACCENT_HUMAN_NAMES,
);
export const WEDDING_BAND_CATEGORY = 'wedding-bands';
export const BAND_WIDTHS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['1.5mm', '1.9mm', '2.1mm', '2.3mm', '2.7mm', '3mm', '3.2mm', '4.1mm', '4.5mm', '0.01ct', '0.02ct'],
  BAND_WIDTH_HUMAN_NAMES,
);
export const BAND_STYLE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['full', 'half'],
  BAND_STYLE_OPTION_HUMAN_NAMES,
);
export const BAND_STONE_SHAPE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['round-brilliant', 'baguette'],
  BAND_STONE_SHAPE_HUMAN_NAMES,
);
export const BAND_STONE_STYLE_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['original', 'large'],
  BAND_STONE_STYLE_HUMAN_NAMES,
);
export const BAND_COLOR_OPTIONS_IN_DISPLAY_ORDER = createDisplayOrderFromOptionNames(
  ['black', 'red'],
  BAND_COLOR_OPTION_HUMAN_NAMES,
);
export const REMOVE_FTC_COPY_WEDDING_BAND_SLUG = ['flat-band', 'domed-band'];
