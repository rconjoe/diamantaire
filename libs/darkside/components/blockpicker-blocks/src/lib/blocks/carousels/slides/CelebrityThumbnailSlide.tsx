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
  toggleModal: (celebrity: any) => void;
};

const CelebrityThumbnailSlide = (props: CelebrityThumnailSlideProps) => {
  const { desktopImage, extraClass, title, shouldLazyLoad, toggleModal } = props;
  const alt = getBlockPictureAlt({ desktopImage, title });

  return (
    <CelebrityThumbnailSlideContainer className={extraClass} onClick={() => toggleModal(props)}>
      <div className="slide__image-container">
        <DatoImage image={desktopImage} overrideAlt={alt} shouldLazyLoad={shouldLazyLoad} />
      </div>
    </CelebrityThumbnailSlideContainer>
  );
};

export default CelebrityThumbnailSlide;
