import Image from 'next/image';
import React from 'react';

import ShowMobileOnly from './ShowMobileOnly';
import ShowTabletAndUpOnly from './ShowTabletAndUpOnly';

type MobileDesktopImage = {
  alt: string;
  desktopImage: {
    url: string;
    responsiveImage: {
      height: number;
      width: number;
    };
  };
  mobileImage: {
    url: string;
    responsiveImage: {
      height: number;
      width: number;
    };
  };
  className?: string;
  isLazyLoaded?: boolean;
};

const MobileDesktopImage = ({ desktopImage, mobileImage, alt, className }: MobileDesktopImage) => {
  return (
    <>
      <ShowTabletAndUpOnly>
        <Image
          className={className}
          src={desktopImage?.url}
          width={desktopImage?.responsiveImage?.width}
          height={desktopImage?.responsiveImage?.height}
          alt={alt}
        />
      </ShowTabletAndUpOnly>
      <ShowMobileOnly>
        <Image
          className={className}
          src={mobileImage?.url}
          width={mobileImage?.responsiveImage?.width}
          height={mobileImage?.responsiveImage?.height}
          alt={alt}
        />
      </ShowMobileOnly>
    </>
  );
};

export default MobileDesktopImage;
