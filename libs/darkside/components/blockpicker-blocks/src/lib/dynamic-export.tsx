import dynamic from 'next/dynamic';

export const DynamicModularBannerBlock = dynamic(() => import('./blocks/banners/ModularBannerBlock'));
export const DynamicModularTallHalfWidthBlock = dynamic(() => import('./blocks/ModularTallHalfWidthBlock'));

export const DynamicModularContentQuadBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularDiamondLeoBlock = dynamic(() => import('./blocks/misc/ModularDiamondLeoBlock'));
export const DynamicModularVideoBlock = dynamic(() => import('./blocks/ModularVideoBlock'));
export const DynamicModularSwiperCarouselBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularTallHalfWidthBlockLocationCTA = dynamic(
  () => import('./blocks/grid/TallHalfWidthBlockLocationCTA'),
);
export const DynamicModularCarouselBlock = dynamic(() => import('./blocks/carousels/ModularCarouselBlock'));
export const DynamicModularQuadImageGrid = dynamic(() => import('./blocks/grid/ModularQuadImageGrid'));
export const DynamicTextOnlyBlock = dynamic(() => import('./blocks/misc/ModularTextOnlyBlock'));
export const DynamicModularLogoGrid = dynamic(() => import('./blocks/grid//ModularLogoGrid'));
export const DynamicModularAccordion = dynamic(() => import('./blocks/misc/accordion/ModularAccordion'));
export const DynamicTrioBlock = dynamic(() => import('./blocks/grid/ModularTrioBlock'));
