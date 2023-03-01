import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { UniLink } from '@diamantaire/darkside/core';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';

import { SlideContainer } from './DiamondSlide.style';

type DiamondSlideProps = {
  image?: {
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
  itemName?: string;
  url?: string;
};

const DiamondSlide = ({ image, itemName, url }: DiamondSlideProps) => {
  const hasImage = Boolean(url);
  const { getRelativeUrl } = useGlobalContext();

  return (
    <SlideContainer>
      <div className="slide__image-container">
        <UniLink route={getRelativeUrl(url)}>
          {hasImage && (
            <DatoImage
              image={image}
              overrideAlt={getBlockPictureAlt({
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
