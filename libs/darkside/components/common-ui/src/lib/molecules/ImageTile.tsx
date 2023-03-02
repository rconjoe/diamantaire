import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import clsx from 'clsx';

import { Button } from './Button';
import { DatoImage } from './DatoImage';
import { ImageTileContainer } from './ImageTile.style';

type ImageTilePropTypes = {
  title?: string;
  copy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
    responsiveImage?: {
      width: number;
      height: number;
      base64: string;
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
  image,
  isSvg = false,
  extraClass,
  backgroundColorRgba,
  subtitle,
  forceAspectRatio,
}: ImageTilePropTypes) => {
  const hasCopy = Boolean(copy);

  const alt = getBlockPictureAlt({ desktopImage: image, title });

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
        <DatoImage
          image={image}
          overrideAlt={alt}
          className={clsx('image-tile__image', String(extraClass), {
            svg: isSvg,
            '-blog': forceAspectRatio,
          })}
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

export { ImageTile };
