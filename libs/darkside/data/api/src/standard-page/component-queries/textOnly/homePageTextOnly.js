import {
  modularFullWidthBannerBlockTextOnly,
  modularHalfWidthBannerBlockTextOnly,
  modularHeroBannerBlockTextOnly,
  modularLeoBlockTextOnly,
  modularTextOnlyBlockTextOnly,
  modularTrioSlide9x7BlockTextOnly,
  modularTrioStaggered9x7BlockTextOnly,
  modularCelebrityReelBlockTextOnly,
} from './modular';

const homePageTextOnly = `
  query homePageTextOnly($locale: SiteLocale) {
    homePage(locale: $locale){
      id
      content {
        ${modularHeroBannerBlockTextOnly},
        ${modularHalfWidthBannerBlockTextOnly},
        ${modularTrioStaggered9x7BlockTextOnly},
        ${modularFullWidthBannerBlockTextOnly},
        ${modularLeoBlockTextOnly},
        ${modularTrioSlide9x7BlockTextOnly},
        ${modularTextOnlyBlockTextOnly},
        ${modularHalfWidthBannerBlockTextOnly},
        ${modularCelebrityReelBlockTextOnly},
      }
    }
  }
`;

export default homePageTextOnly;
