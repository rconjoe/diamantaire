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
  shouldLazyLoad?: boolean;
  bottomCarouselImage: DatoImageType;
};

const CelebrityThumbnailSlide = ({
  desktopImage,
  onClick,
  slideIndex,
  extraClass,
  title,
  shouldLazyLoad,
}: CelebrityThumnailSlideProps) => {
  const alt = getBlockPictureAlt({ desktopImage, title });
  const handleClick = () => {
    onClick(slideIndex);
  };

  return (
    <CelebrityThumbnailSlideContainer className={extraClass} onClick={handleClick}>
      <div className="slide__image-container">
        <DatoImage image={desktopImage} overrideAlt={alt} shouldLazyLoad={shouldLazyLoad} />
      </div>
    </CelebrityThumbnailSlideContainer>
  );
};

export default CelebrityThumbnailSlide;
