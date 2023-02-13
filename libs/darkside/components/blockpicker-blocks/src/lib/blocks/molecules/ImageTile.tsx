import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import clsx from 'clsx';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
// import { Image } from 'react-datocms';

import Button from './Button';
import { ImageTileContainer } from './ImageTile.style';
// import { Image as CustomImage } from '../library';

const propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  ctaCopy: PropTypes.string,
  ctaRoute: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    responsiveImage: PropTypes.object,
  }),
  imageName: PropTypes.string,
  extraClass: PropTypes.string,
  isSvg: PropTypes.bool,
  isProductImage: PropTypes.bool,
  backgroundColorRgba: PropTypes.string,
  subtitle: PropTypes.string,
  forceAspectRatio: PropTypes.bool,
};

type ImageTilePropTypes = {
  title?: string;
  copy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  image?: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  imageName?: string;
  extraClass?: string;
  isSvg?: boolean;
  isProductImage?: boolean;
  backgroundColorRgba?: string;
  subtitle?: string;
  forceAspectRatio?: boolean;
};

const ImageTile = ({
  title,
  copy,
  ctaCopy,
  ctaRoute,
  // imageName,
  // isProductImage,
  image,
  isSvg = false,
  extraClass,
  backgroundColorRgba,
  subtitle,
  forceAspectRatio,
}: ImageTilePropTypes) => {
  const hasCopy = Boolean(copy);

  const alt = getBlockPictureAlt({ desktopImage: image, title });

  const tileImageObject = {
    src: image?.url,
    width: image?.responsiveImage?.width,
    height: image?.responsiveImage?.height,
  };

  return (
    <ImageTileContainer
      backgroundColorRgba={backgroundColorRgba}
      className={clsx({
        '-is-svg': isSvg,
        '-background-color': backgroundColorRgba,
        '-modular-content-quad-block': extraClass === '-modular-content-quad-block',
      })}
    >
      <UniLink route={ctaRoute}>
        <Image
          className={clsx('image-tile__image', String(extraClass), {
            svg: isSvg,
            '-blog': forceAspectRatio,
          })}
          src={tileImageObject.src}
          height={tileImageObject.height}
          width={tileImageObject.width}
          alt={alt}
        />
      </UniLink>

      <div
        className={clsx('image-tile__copy-container', {
          svgCopyContainer: isSvg,
          '-background-color': backgroundColorRgba,
          '-modular-content-quad-block': extraClass === '-modular-content-quad-block',
        })}
      >
        {title && <span className="image-tile__title primary">{title}</span>}
        {subtitle && (
          <div className="image-tile__subtitle">
            <p>{subtitle}</p>
          </div>
        )}
        {hasCopy && <p>{copy}</p>}
        {ctaCopy && ctaRoute && (
          <UniLink route={ctaRoute} className={isSvg ? 'image-tile__anchor' : ''}>
            <Button className={clsx(hasCopy ? '' : 'image-tile__button', 'secondary')}>{ctaCopy}</Button>
          </UniLink>
        )}
      </div>
    </ImageTileContainer>
  );
};

ImageTile.propTypes = propTypes;

export default ImageTile;
