import dynamic from 'next/dynamic';

export const DynamicModularBannerBlock = dynamic(() => import('./blocks/banners/ModularBannerBlock'));
export const DynamicModularTallHalfWidthBlock = dynamic(() => import('./blocks/ModularTallHalfWidthBlock'));
// export const DynamicModularGridCarouselBlock = dynamic(() => import('./blocks/carousels/ModularGridCarouselBlock'));
export const DynamicModularCarouselHoverBlock = dynamic(() => import('./blocks/carousels/ModularCarouselHoverBlock'));
export const DynamicModularContentQuadBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularDiamondLeoBlock = dynamic(() => import('./blocks/misc/ModularDiamondLeoBlock'));
export const DynamicModularVideoBlock = dynamic(() => import('./blocks/ModularVideoBlock'));
export const DynamicModularSwiperCarouselBlock = dynamic(() => import('./blocks/grid/ModularContentQuadBlock'));
export const DynamicModularTallHalfWidthBlockLocationCTA = dynamic(
  () => import('./blocks/grid/TallHalfWidthBlockLocationCTA'),
);
export const DynamicModularCarouselBlock = dynamic(() => import('./blocks/carousels/ModularCarouselBlock'));
