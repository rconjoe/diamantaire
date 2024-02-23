import { tabletAndUp } from './mediaQueries';

export const BOLD_WEIGHT = '600';
export const WEDDING_TITLE_FONTS = "'Big Caslon', 'Georgia', serif";
export const ENGRAVING_FONTS = ['Serif', 'Sans Serif', 'Script', 'Monogram'];
export const DEFAULT_ENGRAVING_FONT = ENGRAVING_FONTS[0];
export const DEFAULT_BUILDER_ENGRAVING_FONT = ENGRAVING_FONTS[2];
export const DEFAULT_SINGLE_ENGRAVING_FONT = ENGRAVING_FONTS[3];
export const ENGRAVING_FONT_RENDER_MAP = {
  Serif: 'Times New Roman',
  'Sans Serif': 'Lucida Sans Demibold Roman',
  Script: 'Script MT Bold', //'Script MT Bold'
  Monogram: 'Monogram',
};
export const ENGRAVING_FONT_INPUT_RENDER_MAP = {
  Serif: 'Times New Roman',
  'Sans Serif': 'Lucida Sans Demibold Roman',
  Script: '--font-family-script-mt', //'Script MT Bold'
  Monogram: 'Monogram',
};
export const HOME_PAGE_P_FONT_SIZE = '1.8rem';
export const HOME_PAGE_CTA_FONT_SIZE = '1.8rem';

// match rendered font size illusion
export const ENGRAVING_FONT_SIZE_MAP = {
  Script: '1.6rem',
  Serif: '1.4rem',
  'Sans Serif': '1.3rem',
  Monogram: '1.6rem',
};
export const ENGRAVING_FONT_SIZE_MAP_MOBILE = {
  Script: '1.9rem',
  Serif: '1.7rem',
  'Sans Serif': '1.6rem',
  Monogram: '1.9rem',
};

export const getRenderedEngravingFontStyles = (selectedEngravingFont) => {
  return `
    font-family: '${ENGRAVING_FONT_RENDER_MAP[selectedEngravingFont]}';
    font-size: ${ENGRAVING_FONT_SIZE_MAP[selectedEngravingFont]};
  `;
};

const getFontSizeForRenderedFont = (engravingRenderedFont) => {
  const renderedFontToGenericFontNameMap = ENGRAVING_FONT_RENDER_MAP;
  const genericFontName = renderedFontToGenericFontNameMap[engravingRenderedFont];
  const selectedFontSize = ENGRAVING_FONT_SIZE_MAP[genericFontName];

  return selectedFontSize;
};

export const getRenderedEngravingFontStylesForCart = (engravingRenderedFont) => {
  return `
    font-family: '${engravingRenderedFont}';
    font-size: ${getFontSizeForRenderedFont(engravingRenderedFont)};
  `;
};

export const getRenderedInputEngravingFontStyles = (selectedEngravingFont) => {
  return `
    font-family: ${getFontFamily(ENGRAVING_FONT_INPUT_RENDER_MAP[selectedEngravingFont])};
    font-size: ${ENGRAVING_FONT_SIZE_MAP_MOBILE[selectedEngravingFont]};
    ${tabletAndUp(`
      font-size: ${ENGRAVING_FONT_SIZE_MAP[selectedEngravingFont]};
    `)};
  `;
};

function getFontFamily(font) {
  // Check if the font is a CSS variable
  if (font.startsWith('--')) {
    // If it is, use var()
    return `var(${font})`;
  } else {
    // If it's not, return the font name directly
    return font;
  }
}
