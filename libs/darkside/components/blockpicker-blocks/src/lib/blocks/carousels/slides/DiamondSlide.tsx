import { DatoImage, UniLink } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt, getRelativeUrl } from '@diamantaire/shared/helpers';
import { DatoImageType } from '@diamantaire/shared/types';

import { SlideContainer } from './DiamondSlide.style';

type DiamondSlideProps = {
  image?: DatoImageType;
  itemName?: string;
  url?: string;
  shouldLazyLoad?: boolean;
};

const DiamondSlide = ({ image, itemName, url, shouldLazyLoad }: DiamondSlideProps) => {
  const hasImage = Boolean(url);

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
              quality={70}
              shouldLazyLoad={shouldLazyLoad}
            />
          )}
        </UniLink>
      </div>
      {itemName ? (
        <h3 key={`title-${itemName}`} className="mobile-slide__text">
          <UniLink route={getRelativeUrl(url)}>{itemName}</UniLink>
        </h3>
      ) : null}
    </SlideContainer>
  );
};

export default DiamondSlide;
