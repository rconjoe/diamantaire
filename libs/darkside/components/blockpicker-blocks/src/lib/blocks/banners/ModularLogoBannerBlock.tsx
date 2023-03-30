import {
  MobileDesktopImage,
  ShowTabletAndUpOnly,
  ShowMobileOnly,
  DatoImage,
} from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';
import clsx from 'clsx';

import { ModularLogoBannerBlockContainer } from './ModularLogoBannerBlock.style';

type ModularLogoBannerBlockProps = {
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  desktopLogo?: DatoImageType;
  mobileLogo?: DatoImageType;
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
