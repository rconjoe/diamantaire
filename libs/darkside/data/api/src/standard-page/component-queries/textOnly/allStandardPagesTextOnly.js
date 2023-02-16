import {
  modularFullWidthBannerBlockTextOnly,
  modularHeroBannerBlockTextOnly,
  modularCollectionHeroBlockTextOnly,
  modularSingleVideoBlockTextOnly,
  modularHalfWidthBannerBlockTextOnly,
  modularTextOnlyBlockTextOnly,
  modularTrio1x1BlockTextOnly,
  modularTrio9x7BlockTextOnly,
  modularTrioSlide9x7BlockTextOnly,
  modularTrioStaggered9x7BlockTextOnly,
  modularQuadBlockTextOnly,
  modularQuoteBlockTextOnly,
  modularHalfWidthQuadBlockTextOnly,
} from './modular';

// TODO: find a way to parse modular fields w/ modular fields
//
// ModularCelebrityCarouselBlockRecord
// ModularCarouselBlockRecord
//
const allStandardPagesTextOnly = `
  query allStandardPagesTextOnly($first: IntType!, $skip: IntType!, $locale: SiteLocale) {
    allStandardPages(first: $first, skip: $skip, locale: $locale) {
      id
      breadcrumb {
        name
        link{
            ... on StandardPageRecord{
              slug
            }

            ... on ListPageRecord{
              slug
            }
        }
      }
      content1 {
        ${modularFullWidthBannerBlockTextOnly},
        ${modularHeroBannerBlockTextOnly},
        ${modularCollectionHeroBlockTextOnly},
        ${modularSingleVideoBlockTextOnly},
        ${modularHalfWidthBannerBlockTextOnly},
        ${modularTextOnlyBlockTextOnly},
        ${modularTrio1x1BlockTextOnly},
        ${modularTrio9x7BlockTextOnly},
        ${modularTrioSlide9x7BlockTextOnly},
        ${modularTrioStaggered9x7BlockTextOnly},
        ${modularQuadBlockTextOnly},
        ${modularQuoteBlockTextOnly},
        ${modularHalfWidthQuadBlockTextOnly},
      }
      content2 {
        ${modularFullWidthBannerBlockTextOnly},
        ${modularHeroBannerBlockTextOnly},
        ${modularCollectionHeroBlockTextOnly},
        ${modularSingleVideoBlockTextOnly},
        ${modularHalfWidthBannerBlockTextOnly},
        ${modularTextOnlyBlockTextOnly},
        ${modularTrio1x1BlockTextOnly},
        ${modularTrio9x7BlockTextOnly},
        ${modularTrioSlide9x7BlockTextOnly},
        ${modularTrioStaggered9x7BlockTextOnly},
        ${modularQuadBlockTextOnly},
        ${modularQuoteBlockTextOnly},
        ${modularHalfWidthQuadBlockTextOnly},
      }
    }
  }
`;

export default allStandardPagesTextOnly;
