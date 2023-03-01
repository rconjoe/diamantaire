import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';

import { CelebrityThumbnailSlideContainer } from './CelebrityThumbnailSlide.style';

type CelebrityThumnailSlideProps = {
  onCarouselImageLoad?: () => void;
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
  onClick: (number) => void;
  slideIndex: number;
  mobileImageWidth?: string;
  extraClass?: string;
  title?: string;
  showBottomCarouselOnly: boolean;
  bottomCarouselImage: {
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

  if (showBottomCarouselOnly) {
    return (
      <CelebrityThumbnailSlideContainer className={extraClass} onClick={handleClick}>
        <DatoImage image={hasBottomCarouselImage ? bottomCarouselImage : desktopImage} overrideAlt={alt} />
      </CelebrityThumbnailSlideContainer>
    );
  }

  return (
    <CelebrityThumbnailSlideContainer className={extraClass} onClick={handleClick}>
      <div className="slide__image-container">
        <DatoImage image={desktopImage} overrideAlt={alt} />
      </div>
    </CelebrityThumbnailSlideContainer>
  );
};

export default CelebrityThumbnailSlide;
