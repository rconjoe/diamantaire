import dynamic from 'next/dynamic';

export const DynamicModularBannerBlock = dynamic(() => import('./blocks/banners/ModularBannerBlock'));
export const DynamicModularHalfBannerBlock = dynamic(() => import('./blocks/banners/ModularHalfBannerBlock'));
export const DynamicModularTallHalfWidthBlock = dynamic(() => import('./blocks/ModularTallHalfWidthBlock'));
export const DynamicModularSkinnyBannerBlock = dynamic(() => import('./blocks/banners/ModularSkinnyBannerBlock'));
export const DynamicModularLogoBannerBlock = dynamic(() => import('./blocks/banners/ModularLogoBannerBlock'));

export const DynamicModularContentQuadBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularDiamondLeoBlock = dynamic(() => import('./blocks/misc/ModularDiamondLeoBlock'));
export const DynamicModularVideoBlock = dynamic(() => import('./blocks/ModularVideoBlock'));
export const DynamicModularSwiperCarouselBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularTallHalfWidthBlockLocationCTA = dynamic(
  () => import('./blocks/grid/TallHalfWidthBlockLocationCTA'),
);
export const DynamicModularQuadStatisticsBlock = dynamic(() => import('./blocks/grid/ModularQuadStatisticsBlock'));
export const DynamicModularCarouselBlock = dynamic(() => import('./blocks/carousels/ModularCarouselBlock'));
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

export const DynamicShowroomBlock = dynamic(() => import('./blocks/misc/showrooms/ModularShowroomBlock'));
export const DynamicModularQuoteBlock = dynamic(() => import('./blocks/misc/ModularQuoteBlock'));
