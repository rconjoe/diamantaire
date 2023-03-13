import {
  MobileDesktopImage,
  ShowTabletAndUpOnly,
  ShowMobileOnly,
  DatoImage,
} from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import clsx from 'clsx';

import { ModularLogoBannerBlockContainer } from './ModularLogoBannerBlock.style';

type ModularLogoBannerBlockProps = {
  desktopImage: {
    mimeType?: string;
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
  mobileImage: {
    mimeType?: string;
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
  desktopLogo?: {
    mimeType?: string;
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
  mobileLogo?: {
    mimeType?: string;
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
  additionalClass?: string;
};

const ModularLogoBannerBlock = ({
  desktopImage,
  mobileImage,
  desktopLogo,
  mobileLogo,
  additionalClass,
}: ModularLogoBannerBlockProps) => {
  const alt = getBlockPictureAlt({
    desktopImage,
    mobileImage,
  });
  const logoAlt = getBlockPictureAlt({
    desktopImage: desktopLogo,
    mobileImage: mobileLogo,
    title: 'logo',
  });

  return (
    <ModularLogoBannerBlockContainer className={additionalClass}>
      <MobileDesktopImage
        desktopImage={desktopImage}
        mobileImage={mobileImage}
        className="logo-banner__fw-image-container"
        alt={alt}
      />
      {mobileLogo && mobileLogo.url && desktopLogo && desktopLogo.url && (
        <div className={clsx('logo-banner__logo-container', additionalClass)}>
          <ShowMobileOnly>
            <div className={clsx('logo-banner__logo', additionalClass)}>
              <DatoImage image={mobileLogo} overrideAlt={logoAlt} />
            </div>
          </ShowMobileOnly>
          <ShowTabletAndUpOnly>
            <div className={clsx('logo-banner__logo', additionalClass)}>
              <DatoImage image={desktopLogo} overrideAlt={logoAlt} />
            </div>
          </ShowTabletAndUpOnly>
        </div>
      )}
    </ModularLogoBannerBlockContainer>
  );
};

export default ModularLogoBannerBlock;
