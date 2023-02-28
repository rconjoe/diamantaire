import Image from 'next/image';
import React from 'react';

import DatoImage from './DatoImage';
import { ShowMobileOnly } from '../media-queries/ShowMobileOnly';
import { ShowTabletAndUpOnly } from '../media-queries/ShowTabletAndUpOnly';

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
  console.log('desktopImage', desktopImage);

  return (
    <>
      <ShowTabletAndUpOnly>
        {/* <p>weee</p> */}
        {/* <Image
          className={className}
          src={desktopImage?.url}
          width={desktopImage?.responsiveImage?.width}
          height={desktopImage?.responsiveImage?.height}
          alt={alt}
        /> */}
        <DatoImage image={desktopImage} className={className} />
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

export { MobileDesktopImage };
