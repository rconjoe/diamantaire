import { MobileDesktopImage, UniLink } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';

import { ModularSkinnyBannerBlockContainer } from './ModularSkinnyBannerBlock.style';

type ModularSkinnyBannerBlockProps = {
  title?: string;
  copy?: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  textColor?: {
    hex: string;
  };
  ctaCopy?: string;
  ctaRoute?: string;
  additionalClass?: string;
};

const ModularSkinnyBannerBlock = (props: ModularSkinnyBannerBlockProps) => {
  const { title, copy, mobileImage, desktopImage, textColor, ctaCopy, ctaRoute, additionalClass } = props || {};

  const alt = getBlockPictureAlt({
    desktopImage,
    mobileImage,
    title,
  });

  return (
    <ModularSkinnyBannerBlockContainer $textColor={textColor?.hex || '#000000'}>
      <MobileDesktopImage
        className="skinny-banner__image-container"
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        alt={alt}
      />

      {(title || (ctaRoute && ctaCopy)) && (
        <div className={clsx('skinny-banner__title-copy-wrapper -center-copy', additionalClass)}>
          {title && <h1 className={clsx('skinny-banner__title primary', additionalClass)}>{title}</h1>}
          {copy && <p className="skinny-banner__subtitle">{copy}</p>}
          {ctaCopy && ctaRoute && (
            <UniLink route={ctaRoute} className="skinny-banner__cta">
              {ctaCopy}
            </UniLink>
          )}
        </div>
      )}
    </ModularSkinnyBannerBlockContainer>
  );
};

export default ModularSkinnyBannerBlock;
