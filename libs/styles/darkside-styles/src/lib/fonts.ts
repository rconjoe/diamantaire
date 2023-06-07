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
  Script: 'Script MT Bold',
  Monogram: 'Monogram',
};
export const HOME_PAGE_P_FONT_SIZE = '18px';
export const HOME_PAGE_CTA_FONT_SIZE = '18px';

// match rendered font size illusion
export const ENGRAVING_FONT_SIZE_MAP = {
  Script: '16px',
  Serif: '14px',
  'Sans Serif': '13px',
  Monogram: '16px',
};
export const ENGRAVING_FONT_SIZE_MAP_MOBILE = {
  Script: '19px',
  Serif: '17px',
  'Sans Serif': '16px',
  Monogram: '19px',
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
    font-family: '${ENGRAVING_FONT_RENDER_MAP[selectedEngravingFont]}';
    font-size: ${ENGRAVING_FONT_SIZE_MAP_MOBILE[selectedEngravingFont]};
    ${tabletAndUp(`
      font-size: ${ENGRAVING_FONT_SIZE_MAP[selectedEngravingFont]};
    `)};
  `;
};

export const FONT_SIZE_1 = '3.2rem';
export const FONT_SIZE_2 = '2.8rem';
export const FONT_SIZE_3 = '2.4rem';
export const FONT_SIZE_4 = '2.2rem';
export const FONT_SIZE_5 = '1.8rem';
export const FONT_SIZE_6 = '1.6rem';
export const FONT_SIZE_7 = '1.4rem';
export const FONT_SIZE_8 = '1.2rem';
export const FONT_SIZE_9 = '1rem';
