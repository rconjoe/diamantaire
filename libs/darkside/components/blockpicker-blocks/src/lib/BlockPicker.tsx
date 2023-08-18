import { LazyLoadWrapper } from '@diamantaire/darkside/components/common-ui';
import {
  MODULAR_RANDOM_BANNER_BLOCK,
  MODULAR_TALL_HALF_WIDTH_BLOCK,
  MODULAR_QUAD_BLOCK,
  MODULAR_FULL_WIDTH_BANNER_BLOCK,
  MODULAR_LEO_BLOCK,
  MODULAR_SINGLE_VIDEO_BLOCK,
  MODULAR_CELEBRITY_CAROUSEL_BLOCK,
  MODULAR_TALL_HALF_WIDTH_BLOCK_LOCATION_CTA,
  MODULAR_INSTAGRAM_REEL_BLOCK,
  MODULAR_CAROUSEL_HOVER_BLOCK,
  MODULAR_SLICK_CAROUSEL_BLOCK,
  MODULAR_GRID_CAROUSEL_BLOCK,
  MODULAR_TEXT_ONLY_BLOCK,
  MODULAR_QUAD_LOGO_BLOCK,
  MODULAR_HERO_BANNER_BLOCK,
  MODULAR_ACCORDION_BLOCK,
  MODULAR_TRIO_9x7_BLOCK,
  MODULAR_CAROUSEL_BLOCK,
  MODULAR_COLLECTION_HERO_BLOCK,
  MODULAR_HALF_WIDTH_BANNER_BLOCK,
  MODULAR_DUO_BLOCK,
  MODULAR_TRIO_STAGGERED_9x7_BLOCK,
  MODULAR_HALF_WIDTH_BLOG_SUMMARY_BLOCK,
  MODULAR_BLOG_LIST_TRIO_BLOCK,
  MODULAR_SIDE_BY_SIDE_BLOCK,
  MODULAR_SKINNY_HERO_BANNER_BLOCK,
  MODULAR_EMAIL_SIGNUP_BLOCK,
  MODULAR_SHOWROOM_BLOCK,
  MODULAR_QUOTE_BLOCK,
  MODULAR_LOGO_BANNER_BLOCK,
  MODULAR_QUAD_STATISTICS_BLOCK,
  MODULAR_HALF_WIDTH_QUAD_BLOCK,
  MODULAR_TRIO_1x1_BLOCK,
  SOCIAL_MEDIA_SECTION,
  MODULAR_QUAD_GRID,
  MODULAR_TRI_GRID_WITH_ORDER_TRACKING,
  MODULAR_SPLIT_VIDEO_BLOCK,
  MODULAR_SINGLE_MEDIA_BLOCK,
} from '@diamantaire/shared/constants';
import { forceVisible } from 'react-lazyload';

import {
  DynamicEmailSignup,
  DynamicModularAccordion,
  DynamicModularBannerBlock,
  DynamicModularCarouselBlock,
  DynamicModularCollectionHeroBlock,
  DynamicModularContentQuadBlock,
  DynamicModularDiamondLeoBlock,
  DynamicModularDuoBlock,
  DynamicModularHalfBannerBlock,
  DynamicModularHalfWidthQuadBlock,
  DynamicModularLogoBannerBlock,
  DynamicModularLogoGrid,
  DynamicModularQuadGrid,
  DynamicModularQuadImageGrid,
  DynamicModularQuadStatisticsBlock,
  DynamicModularQuoteBlock,
  DynamicModularSideBySideBlock,
  DynamicModularSkinnyBannerBlock,
  DynamicModularSplitVideoBlock,
  DynamicModularTallHalfWidthBlock,
  DynamicModularTallHalfWidthBlockLocationCTA,
  DynamicModularTriGridWithOrderTracking,
  DynamicModularTrioStaggeredBlock,
  DynamicModularVideoBlock,
  DynamicRandomModularBannerBlock,
  DynamicShowroomBlock,
  DynamicSocialMediaSection,
  DynamicTextOnlyBlock,
  DynamicTrioBlock,
  DynamicModularSingleMediaBlock,
} from './dynamic-export';

type configProps = {
  [key: string]: any;
};

const config: configProps = {
  // CAROUSELS
  [MODULAR_CAROUSEL_HOVER_BLOCK]: DynamicModularCarouselBlock,
  [MODULAR_CELEBRITY_CAROUSEL_BLOCK]: DynamicModularCarouselBlock,
  [MODULAR_INSTAGRAM_REEL_BLOCK]: DynamicModularCarouselBlock,
  [MODULAR_SLICK_CAROUSEL_BLOCK]: DynamicModularCarouselBlock,
  [MODULAR_CAROUSEL_BLOCK]: DynamicModularCarouselBlock,
  [MODULAR_GRID_CAROUSEL_BLOCK]: DynamicModularQuadImageGrid,
  // [MODULAR_GRID_CAROUSEL_BLOCK]: DynamicModularQuadImageGrid,

  // BANNERS

  [MODULAR_RANDOM_BANNER_BLOCK]: DynamicRandomModularBannerBlock,
  // [MODULAR_RANDOM_BANNER_BLOCK]: ModularBannerBlock,
  [MODULAR_FULL_WIDTH_BANNER_BLOCK]: DynamicModularBannerBlock,
  [MODULAR_COLLECTION_HERO_BLOCK]: DynamicModularCollectionHeroBlock,
  [MODULAR_HERO_BANNER_BLOCK]: DynamicModularBannerBlock,
  [MODULAR_HALF_WIDTH_BANNER_BLOCK]: DynamicModularHalfBannerBlock,
  [MODULAR_HALF_WIDTH_BLOG_SUMMARY_BLOCK]: DynamicModularHalfBannerBlock,
  [MODULAR_SKINNY_HERO_BANNER_BLOCK]: DynamicModularSkinnyBannerBlock,
  [MODULAR_LOGO_BANNER_BLOCK]: DynamicModularLogoBannerBlock,

  [MODULAR_TALL_HALF_WIDTH_BLOCK]: DynamicModularTallHalfWidthBlock,
  [MODULAR_QUAD_BLOCK]: DynamicModularContentQuadBlock,
  [MODULAR_LEO_BLOCK]: DynamicModularDiamondLeoBlock,
  [MODULAR_SINGLE_VIDEO_BLOCK]: DynamicModularVideoBlock,

  [MODULAR_TEXT_ONLY_BLOCK]: DynamicTextOnlyBlock,
  [MODULAR_SINGLE_MEDIA_BLOCK]: DynamicModularSingleMediaBlock,

  // GRID
  [MODULAR_TRIO_9x7_BLOCK]: DynamicTrioBlock,
  [MODULAR_BLOG_LIST_TRIO_BLOCK]: DynamicTrioBlock,
  [MODULAR_TRIO_1x1_BLOCK]: DynamicTrioBlock,
  [MODULAR_TRIO_STAGGERED_9x7_BLOCK]: DynamicModularTrioStaggeredBlock,
  [MODULAR_SIDE_BY_SIDE_BLOCK]: DynamicModularSideBySideBlock,
  [MODULAR_QUAD_LOGO_BLOCK]: DynamicModularLogoGrid,
  [MODULAR_DUO_BLOCK]: DynamicModularDuoBlock,
  [MODULAR_TALL_HALF_WIDTH_BLOCK_LOCATION_CTA]: DynamicModularTallHalfWidthBlockLocationCTA,
  [MODULAR_QUAD_STATISTICS_BLOCK]: DynamicModularQuadStatisticsBlock,
  [MODULAR_HALF_WIDTH_QUAD_BLOCK]: DynamicModularHalfWidthQuadBlock,
  [MODULAR_QUAD_GRID]: DynamicModularQuadGrid,
  [MODULAR_TRI_GRID_WITH_ORDER_TRACKING]: DynamicModularTriGridWithOrderTracking,

  // MISC
  [MODULAR_EMAIL_SIGNUP_BLOCK]: DynamicEmailSignup,
  [MODULAR_SPLIT_VIDEO_BLOCK]: DynamicModularSplitVideoBlock,
  [MODULAR_ACCORDION_BLOCK]: DynamicModularAccordion,
  [MODULAR_SHOWROOM_BLOCK]: DynamicShowroomBlock,
  [MODULAR_QUOTE_BLOCK]: DynamicModularQuoteBlock,
  [SOCIAL_MEDIA_SECTION]: DynamicSocialMediaSection,
};

type BlockPickerProps = {
  _modelApiKey: string;
  modularBlockData: object;
  countryCode?: string;
  currencyCode?: string;
  shouldLazyLoad?: boolean;
};

const BlockPicker = ({ _modelApiKey, modularBlockData, countryCode, currencyCode, shouldLazyLoad }: BlockPickerProps) => {
  const BlockComponent = config?.[_modelApiKey];

  forceVisible();

  return (
    <>
      {!BlockComponent && <p>No block found for: {_modelApiKey}</p>}

      {BlockComponent && shouldLazyLoad ? (
        <LazyLoadWrapper>
          <BlockComponent
            countryCode={countryCode}
            currencyCode={currencyCode}
            shouldLazyLoad={shouldLazyLoad}
            {...modularBlockData}
          />
        </LazyLoadWrapper>
      ) : BlockComponent ? (
        <BlockComponent
          countryCode={countryCode}
          currencyCode={currencyCode}
          shouldLazyLoad={shouldLazyLoad}
          {...modularBlockData}
        />
      ) : (
        ''
      )}
    </>
  );
};

export { BlockPicker };
