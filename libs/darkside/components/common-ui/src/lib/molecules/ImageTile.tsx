import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType, DarksideButtonProps } from '@diamantaire/shared/types';
import clsx from 'clsx';

import { DarksideButton } from './DarksideButton';
import { DatoImage } from './DatoImage';
import { ImageTileContainer } from './ImageTile.style';
import { UniLink } from './UniLink';

type ImageTilePropTypes = {
  title?: string;
  copy?: string;
  ctaCopy?: string;
  ctaRoute?: string;
  image: DatoImageType;
  imageName?: string;
  extraClass?: string;
  isSvg?: boolean;
  isProductImage?: boolean;
  backgroundColorRgba?: string;
  subtitle?: string;
  forceAspectRatio?: boolean;
  shouldLazyLoad?: boolean;
  darksideButtons: DarksideButtonProps[];
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
  shouldLazyLoad,
  darksideButtons,
}: ImageTilePropTypes) => {
  const hasCopy = Boolean(copy);

  const alt = getBlockPictureAlt({ desktopImage: image, title });

  return (
    <ImageTileContainer
      backgroundColorRgba={backgroundColorRgba}
      className={clsx(
        {
          '-is-svg': isSvg,
          '-background-color': backgroundColorRgba,
          '-modular-content-quad-block': extraClass === '-modular-content-quad-block',
        },
        extraClass,
      )}
    >
      {ctaRoute ? (
        <UniLink route={ctaRoute}>
          <DatoImage
            image={image}
            overrideAlt={alt}
            className={clsx('image-tile__image', String(extraClass), {
              svg: isSvg,
              '-blog': forceAspectRatio,
            })}
            shouldLazyLoad={shouldLazyLoad}
          />
        </UniLink>
      ) : (
        <DatoImage
          image={image}
          overrideAlt={alt}
          className={clsx('image-tile__image', String(extraClass), {
            svg: isSvg,
            '-blog': forceAspectRatio,
          })}
          shouldLazyLoad={shouldLazyLoad}
        />
      )}

      {title && (
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
          {hasCopy && (
            <div className="image-tile__copy">
              <p>{copy}</p>
            </div>
          )}
          {ctaCopy && ctaRoute && (
            <DarksideButton
              type="underline"
              colorTheme="teal"
              className={clsx(hasCopy ? '' : 'image-tile__button', 'secondary')}
              href={ctaRoute}
            >
              {ctaCopy}
            </DarksideButton>
          )}
          {darksideButtons?.map((button) => {
            return (
              <DarksideButton
                colorTheme={button.ctaButtonColorTheme}
                mobileColorTheme={button.ctaButtonMobileColorTheme}
                href={button.ctaLinkUrl}
                key={button.id}
                type={button.ctaButtonType}
              >
                {button.ctaCopy}
              </DarksideButton>
            );
          })}
        </div>
      )}
    </ImageTileContainer>
  );
};

export { ImageTile };
