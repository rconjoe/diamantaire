import { DatoImage } from './DatoImage';
import { ShowMobileOnly } from '../media-queries/ShowMobileOnly';
import { ShowTabletAndUpOnly } from '../media-queries/ShowTabletAndUpOnly';

type MobileDesktopImageProps = {
  alt: string;
  desktopImage: {
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
