import { DatoImageType } from '@diamantaire/shared/types';

import { DatoImage } from './DatoImage';
import { ShowMobileOnly } from '../media-queries/ShowMobileOnly';
import { ShowTabletAndUpOnly } from '../media-queries/ShowTabletAndUpOnly';

type MobileDesktopImageProps = {
  alt: string;
  desktopImage: DatoImageType;
  mobileImage: DatoImageType;
  className?: string;
  isLazyLoaded?: boolean;
};

const MobileDesktopImage = ({ desktopImage, mobileImage, alt, className }: MobileDesktopImageProps) => {
  return (
    <>
      <ShowTabletAndUpOnly>
        <DatoImage image={desktopImage} className={className} overrideAlt={alt} />
      </ShowTabletAndUpOnly>
      <ShowMobileOnly>
        <DatoImage image={mobileImage} className={className} overrideAlt={alt} />
      </ShowMobileOnly>
    </>
  );
};

export { MobileDesktopImage };
