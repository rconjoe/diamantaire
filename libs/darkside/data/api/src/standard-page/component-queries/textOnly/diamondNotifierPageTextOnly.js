import {
  modularFullWidthBannerBlockTextOnly,
  modularCopyWithCtaBlockTextOnly,
} from './modular';

const diamondNotifierPageTextOnly = `
  query diamondNotifierPageTextOnly($locale: SiteLocale) {
    diamondNotifierPage(locale: $locale){
      id
      content {
        ${modularFullWidthBannerBlockTextOnly},
      }
      optInText
      emailSignUpColumn {
        ${modularCopyWithCtaBlockTextOnly},
      }
      ctaCopy
      successCopy
    }
  }
`;

export default diamondNotifierPageTextOnly;
