import dynamic from 'next/dynamic';

export const DynamicModularBannerBlock = dynamic(() => import('./blocks/banners/ModularBannerBlock'));
export const DynamicRandomModularBannerBlock = dynamic(() => import('./blocks/banners/ModularRandomBannerBlock'));
export const DynamicModularHalfBannerBlock = dynamic(() => import('./blocks/banners/ModularHalfBannerBlock'));
export const DynamicModularTallHalfWidthBlock = dynamic(() => import('./blocks/ModularTallHalfWidthBlock'));
export const DynamicModularSkinnyBannerBlock = dynamic(() => import('./blocks/banners/ModularSkinnyBannerBlock'));
export const DynamicModularLogoBannerBlock = dynamic(() => import('./blocks/banners/ModularLogoBannerBlock'));
export const DynamicModularQuadStatisticsBlock = dynamic(() => import('./blocks/grid/ModularQuadStatisticsBlock'));

export const DynamicModularContentQuadBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularDiamondLeoBlock = dynamic(() => import('./blocks/misc/ModularDiamondLeoBlock'), {
  ssr: false,
});
export const DynamicModularVideoBlock = dynamic(() => import('./blocks/ModularVideoBlock'), {
  ssr: false,
});
export const DynamicModularSwiperCarouselBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularTallHalfWidthBlockLocationCTA = dynamic(
  () => import('./blocks/grid/TallHalfWidthBlockLocationCTA'),
  {
    ssr: false,
  },
);
export const DynamicModularCarouselBlock = dynamic(() => import('./blocks/carousels/ModularCarouselBlock'), {
  ssr: false,
});
export const DynamicModularQuadImageGrid = dynamic(() => import('./blocks/grid/ModularQuadImageGrid'));
export const DynamicTextOnlyBlock = dynamic(() => import('./blocks/misc/ModularTextOnlyBlock'));
export const DynamicModularLogoGrid = dynamic(() => import('./blocks/grid//ModularLogoGrid'));
export const DynamicModularAccordion = dynamic(() => import('./blocks/misc/accordion/ModularAccordion'));
export const DynamicTrioBlock = dynamic(() => import('./blocks/grid/ModularTrioBlock'));
export const DynamicModularDuoBlock = dynamic(() => import('./blocks/grid/ModularDuoBlock'));
export const DynamicModularCollectionHeroBlock = dynamic(() => import('./blocks/banners/ModularCollectionHeroBlock'));
export const DynamicModularTrioStaggeredBlock = dynamic(() => import('./blocks/grid/ModularTrioStaggeredBlock'));
export const DynamicModularSideBySideBlock = dynamic(() => import('./blocks/grid/ModularSideBySideBlock'));
export const DynamicEmailSignup = dynamic(() => import('./blocks/misc/email-signup/ModularEmailSignup'));
export const DynamicModularHalfWidthQuadBlock = dynamic(() => import('./blocks/grid/ModularHalfWidthQuadBlock'));
export const DynamicSocialMediaSection = dynamic(() => import('./blocks/misc/SocialMediaSection'));
export const DynamicModularQuadGrid = dynamic(() => import('./blocks/grid/ModularQuadGrid'));
export const DynamicModularTriGridWithOrderTracking = dynamic(() => import('./blocks/grid/ModularTriGridWithOrderTracking'));
export const DynamicModularCelebrityReelRow = dynamic(() => import('./blocks/grid/ModularCelebrityReelRow'));

export const DynamicShowroomBlock = dynamic(() => import('./blocks/misc/showrooms/ModularShowroomBlock'));
export const DynamicModularQuoteBlock = dynamic(() => import('./blocks/misc/ModularQuoteBlock'));
export const DynamicModularSplitVideoBlock = dynamic(() => import('./blocks/ModularSplitVideoBlock'));
export const DynamicStandAloneCelebrityGallery = dynamic(() => import('./blocks/misc/StandAloneCelebrityGallery'));
