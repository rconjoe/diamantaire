// TODO: go over celebrity grid with ecom team

import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';

import { CelebrityThumbnailSlideContainer } from './CelebrityThumbnailSlide.style';

type CelebrityThumnailSlideProps = {
  onCarouselImageLoad?: () => void;
  desktopImage: DatoImageType;
  onClick: (number) => void;
  slideIndex: number;
  mobileImageWidth?: string;
  extraClass?: string;
  title?: string;
  showBottomCarouselOnly: boolean;
  bottomCarouselImage: DatoImageType;
};

const CelebrityThumbnailSlide = ({
  desktopImage,
  onClick,
  slideIndex,
  extraClass,
  title,
  bottomCarouselImage,
}: CelebrityThumnailSlideProps) => {
  const alt = getBlockPictureAlt({ desktopImage, title });
  const handleClick = () => {
    onClick(slideIndex);
  };
  const hasBottomCarouselImage = Boolean(bottomCarouselImage);

  return (
    <>
      <CelebrityThumbnailSlideContainer className={extraClass} onClick={handleClick}>
        <DatoImage image={hasBottomCarouselImage ? bottomCarouselImage : desktopImage} overrideAlt={alt} />
      </CelebrityThumbnailSlideContainer>

      <CelebrityThumbnailSlideContainer className={extraClass} onClick={handleClick}>
        <div className="slide__image-container">
          <DatoImage image={desktopImage} overrideAlt={alt} />
        </div>
      </CelebrityThumbnailSlideContainer>
    </>
  );
};

export default CelebrityThumbnailSlide;
