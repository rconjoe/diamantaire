// https://webdesign.tutsplus.com/tutorials/quick-tip-how-to-use-html5-picture-for-responsive-images--cms-21015

import { css, cx } from '@emotion/css';
import { stripIndent } from 'common-tags';
import React from 'react';

import LazyLoadWrapper from './LazyLoadWrapper';
import makeSrcSet from './makeSrcSet';

type PictureProps = {
  additionalDPIs?: Array<number>;
  className: string;
  desktopSource: {
    height?: number;
    width?: number;
    imageUrl: string;
    mediaMinThreshold: number;
    sizes: string;
    srcSet1XSizes: Array<number>;
  };
  isLazyLoaded: boolean;
  lazyLoadHeight?: number;
  maxWidth: number;
  mobileSource: {
    height?: number;
    width?: number;
    imageUrl: string;
    mediaMinThreshold: number;
    sizes: string;
    srcSet1XSizes: Array<number>;
  };
  zoom?: number;
  alt?: string;
  onImgLoad?: () => void;
};

/**
 * Enhancements:
 * https://css-tricks.com/preventing-content-reflow-from-lazy-loaded-images/ (SVG trick)
 * Fix lazyload reflowing
 * Animated lazyloading
 * Support (max-width) as well as (min-width)
 * Support single image for both desktop + mobile
 */

export default function Picture({
  onImgLoad,
  additionalDPIs = [2, 3],
  desktopSource,
  isLazyLoaded = true,
  lazyLoadHeight = 0,
  maxWidth,
  mobileSource,
  zoom,
  className,
  alt = '',
  ...rest
}: PictureProps) {
  /**
   * Unforunately, setting width, height for the browser to calculate
   * aspect ratio to prevent layout reflow doesn't work yet for <picture>
   * so min-height styles must be placed manually in css. This unfortunately
   * couples HTML + CSS. Luckily it is easy to by taking the resolution:
   *
   * min-height: calc(100vw / 375 * 180); // 375x180 mobile image
   * ${tabletAndUp(css`
   *   min-height: calc(100vw / 1440 * 388); // 1440x388 desktop image
   * `)};
   *
   * https://www.afasterweb.com/2019/10/30/a-new-way-to-prevent-layout-jank-during-image-load/
   */

  // Makes image same height as container
  const basePictureStyles = css`
    display: flex;
  `;
  const baseImgStyles = css`
    max-width: 100%;
  `;
  const pictureStyles = cx(basePictureStyles, className);
  const responsivePicture = (
    <picture onLoad={onImgLoad} className={pictureStyles} {...rest}>
      <source
        width={desktopSource.width}
        height={desktopSource.height}
        media={makeMedia(desktopSource)}
        sizes={makeSizes(desktopSource)}
        srcSet={makeSrcSet({
          additionalDPIs,
          zoom,
          imageUrl: desktopSource.imageUrl,
          srcSet1XSizes: desktopSource.srcSet1XSizes,
        })}
      />
      <source
        width={mobileSource.width}
        height={mobileSource.height}
        media={makeMedia(mobileSource)}
        sizes={makeSizes(mobileSource)}
        srcSet={makeSrcSet({
          additionalDPIs,
          zoom,
          imageUrl: mobileSource.imageUrl,
          srcSet1XSizes: mobileSource.srcSet1XSizes,
        })}
      />
      <img
        className={baseImgStyles}
        src={makeSrc(desktopSource, maxWidth)}
        width={desktopSource.width}
        height={desktopSource.height}
        alt={alt}
      />
    </picture>
  );

  return isLazyLoaded ? (
    <LazyLoadWrapper height={lazyLoadHeight} once={true} resize={true}>
      {responsivePicture}
    </LazyLoadWrapper>
  ) : (
    <>{responsivePicture}</>
  );
}

function makeMedia(source) {
  return `(min-width: ${source.mediaMinThreshold}px)`;
}

function makeSrc(source, maxWidth) {
  return `${source.imageUrl}&w=${maxWidth}`;
}

function makeSizes(source) {
  return stripIndent(source.sizes);
}
