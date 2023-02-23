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
} from '@diamantaire/shared/constants';

import {
  DynamicModularBannerBlock,
  DynamicModularCarouselBlock,
  DynamicModularContentQuadBlock,
  DynamicModularDiamondLeoBlock,
  DynamicModularLogoGrid,
  DynamicModularQuadImageGrid,
  DynamicModularTallHalfWidthBlock,
  DynamicModularTallHalfWidthBlockLocationCTA,
  DynamicModularVideoBlock,
  DynamicTextOnlyBlock,
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
  [MODULAR_GRID_CAROUSEL_BLOCK]: DynamicModularQuadImageGrid,

  [MODULAR_RANDOM_BANNER_BLOCK]: DynamicModularBannerBlock,
  [MODULAR_FULL_WIDTH_BANNER_BLOCK]: DynamicModularBannerBlock,
  [MODULAR_HERO_BANNER_BLOCK]: DynamicModularBannerBlock,
  [MODULAR_TALL_HALF_WIDTH_BLOCK]: DynamicModularTallHalfWidthBlock,
  [MODULAR_QUAD_BLOCK]: DynamicModularContentQuadBlock,
  [MODULAR_LEO_BLOCK]: DynamicModularDiamondLeoBlock,
  [MODULAR_SINGLE_VIDEO_BLOCK]: DynamicModularVideoBlock,

  [MODULAR_TALL_HALF_WIDTH_BLOCK_LOCATION_CTA]: DynamicModularTallHalfWidthBlockLocationCTA,
  [MODULAR_TEXT_ONLY_BLOCK]: DynamicTextOnlyBlock,
  [MODULAR_QUAD_LOGO_BLOCK]: DynamicModularLogoGrid,
};

const BlockPicker = ({ _modelApiKey, modularBlockData, isMobile, countryCode, currencyCode }) => {
  const BlockComponent = config?.[_modelApiKey];
  const { shouldLazyLoad } = modularBlockData;

  return (
    <>
      {!BlockComponent && <p>No block found for: {_modelApiKey}</p>}
      {BlockComponent && shouldLazyLoad ? (
        <LazyLoadWrapper>
          <BlockComponent isMobile={isMobile} countryCode={countryCode} currencyCode={currencyCode} {...modularBlockData} />
        </LazyLoadWrapper>
      ) : BlockComponent ? (
        <BlockComponent isMobile={isMobile} countryCode={countryCode} currencyCode={currencyCode} {...modularBlockData} />
      ) : (
        ''
      )}
    </>
  );
};

export { BlockPicker };
