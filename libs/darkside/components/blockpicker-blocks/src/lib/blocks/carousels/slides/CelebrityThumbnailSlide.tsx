import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import Image from 'next/image';
import React from 'react';

import { CelebrityThumbnailSlideContainer } from './CelebrityThumbnailSlide.style';

type CelebrityThumnailSlideProps = {
  onCarouselImageLoad?: () => void;
  desktopImage: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  onClick: (number) => void;
  slideIndex: number;
  mobileImageWidth?: string;
  extraClass?: string;
  title?: string;
  showBottomCarouselOnly: boolean;
  bottomCarouselImage: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
};

const CelebrityThumbnailSlide = ({
  desktopImage,
  onClick,
  slideIndex,
  extraClass,
  title,
  showBottomCarouselOnly,
  bottomCarouselImage,
}: CelebrityThumnailSlideProps) => {
  const alt = getBlockPictureAlt({ desktopImage, title });
  const handleClick = () => {
    onClick(slideIndex);
  };
  const hasBottomCarouselImage = Boolean(bottomCarouselImage);

  const slideImage = {
    bottomCarouselImage: {
      src: bottomCarouselImage.url,
      height: bottomCarouselImage.responsiveImage.height,
      width: bottomCarouselImage.responsiveImage.width,
    },
    desktopImage: {
      src: desktopImage.url,
      height: desktopImage.responsiveImage.height,
      width: desktopImage.responsiveImage.width,
    },
  };

  if (showBottomCarouselOnly) {
    return (
      <CelebrityThumbnailSlideContainer className={extraClass} onClick={handleClick}>
        <Image
          src={hasBottomCarouselImage ? slideImage.bottomCarouselImage.src : slideImage.desktopImage.src}
          width={hasBottomCarouselImage ? slideImage.bottomCarouselImage.width : slideImage.desktopImage.width}
          height={hasBottomCarouselImage ? slideImage.bottomCarouselImage.height : slideImage.desktopImage.height}
          alt={alt}
        />
      </CelebrityThumbnailSlideContainer>
    );
  }

  return (
    <CelebrityThumbnailSlideContainer className={extraClass} onClick={handleClick}>
      <div className="slide__image-container">
        <Image
          src={slideImage.desktopImage.src}
          width={slideImage.desktopImage.width}
          height={slideImage.desktopImage.height}
          alt={alt}
        />
      </div>
    </CelebrityThumbnailSlideContainer>
  );
};

export default CelebrityThumbnailSlide;
