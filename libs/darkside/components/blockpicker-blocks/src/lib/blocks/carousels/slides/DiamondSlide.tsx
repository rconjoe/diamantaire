import { UniLink } from '@diamantaire/darkside/core';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import Image from 'next/image';
import React from 'react';

import { SlideContainer } from './DiamondSlide.style';

type DiamondSlideProps = {
  image?: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  itemName?: string;
  children?: any;
  url?: string;
};

const DiamondSlide = ({ image, itemName, url }: DiamondSlideProps) => {
  const { url: imageUrl, responsiveImage } = image;
  const hasImage = Boolean(url);
  const { getRelativeUrl } = useGlobalContext();

  return (
    <SlideContainer>
      <div className="slide__image-container">
        <UniLink route={getRelativeUrl(url)}>
          {hasImage && (
            <Image
              src={imageUrl}
              height={responsiveImage?.height}
              width={responsiveImage?.width}
              alt={getBlockPictureAlt({
                desktopImage: image,
                title: itemName,
              })}
            />
          )}
        </UniLink>
      </div>
      <h3 key={`title-${itemName}`} className="mobile-slide__text">
        <UniLink route={getRelativeUrl(url)}>{itemName}</UniLink>
      </h3>
    </SlideContainer>
  );
};

export default DiamondSlide;
