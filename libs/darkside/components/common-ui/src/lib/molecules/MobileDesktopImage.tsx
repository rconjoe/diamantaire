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
  quality?: number;
};

const MobileDesktopImage = ({
  desktopImage,
  mobileImage,
  alt,
  className,
  shouldLazyLoad,
  quality,
}: MobileDesktopImageProps) => {
  return (
    <>
      <ShowTabletAndUpOnly>
        <h2>Mobile desktop {shouldLazyLoad ? 'Lazy' : 'eager'}</h2>
        <DatoImage
          image={desktopImage}
          className={className}
          overrideAlt={alt}
          shouldLazyLoad={shouldLazyLoad}
          quality={quality}
        />
      </ShowTabletAndUpOnly>
      <ShowMobileOnly>
        <DatoImage
          image={mobileImage}
          className={className}
          overrideAlt={alt}
          shouldLazyLoad={shouldLazyLoad}
          quality={quality}
        />
      </ShowMobileOnly>
    </>
  );
};

export { MobileDesktopImage };
