import { DatoImageType } from '@diamantaire/shared/types';

import { DatoImage } from './DatoImage';
import { ShowMobileOnly } from '../media-queries/ShowMobileOnly';
import { ShowTabletAndUpOnly } from '../media-queries/ShowTabletAndUpOnly';

type MobileDesktopImageProps = {
  alt: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  className?: string;
  shouldLazyLoad?: boolean;
};

const MobileDesktopImage = ({ desktopImage, mobileImage, alt, className, shouldLazyLoad }: MobileDesktopImageProps) => {
  return (
    <>
      <ShowTabletAndUpOnly>
        <DatoImage image={desktopImage} className={className} overrideAlt={alt} shouldLazyLoad={shouldLazyLoad} />
      </ShowTabletAndUpOnly>
      <ShowMobileOnly>
        <DatoImage image={mobileImage} className={className} overrideAlt={alt} shouldLazyLoad={shouldLazyLoad} />
      </ShowMobileOnly>
    </>
  );
};

export { MobileDesktopImage };
