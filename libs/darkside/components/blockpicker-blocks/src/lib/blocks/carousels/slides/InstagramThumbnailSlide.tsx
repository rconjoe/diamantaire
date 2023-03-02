import { DatoImage } from '@diamantaire/darkside/components/common-ui';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';

import { InstagramThumnailSlideContainer } from './InstagramThumbnailSlide.style';

type InstagramThumnailSlideProps = {
  image: {
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
  extraClass?: string;
  shouldLinkToVraiInstagram?: boolean;
  postLink?: string;
  productLink?: string;
};

const VRAI_INSTAGRAM_URL = 'https://www.instagram.com/vraiofficial/';

const InstagramThumnailSlide = ({
  image,
  extraClass,
  shouldLinkToVraiInstagram: _shouldLinkToInstagram,
  postLink,
  productLink,
}: InstagramThumnailSlideProps) => {
  const shouldLinkToVraiInstagram = _shouldLinkToInstagram || (!postLink && !productLink);

  const getLink = () => {
    if (shouldLinkToVraiInstagram) {
      return VRAI_INSTAGRAM_URL;
    }

    /**
     * May need extra field or way of handling priority of
     * postLink vs. productLink, though for now these will likely go unused
     */
    return postLink || productLink || '';
  };

  const link = getLink();
  const alt = getBlockPictureAlt({ image });

  const imageItem = <DatoImage image={image} overrideAlt={alt} />;

  if (!link) {
    return <InstagramThumnailSlideContainer className={extraClass}>{imageItem}</InstagramThumnailSlideContainer>;
  }

  const shouldLinkToNewTab = link === VRAI_INSTAGRAM_URL || link === postLink;

  if (shouldLinkToNewTab) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <InstagramThumnailSlideContainer className={extraClass}>{imageItem}</InstagramThumnailSlideContainer>
      </a>
    );
  }

  return (
    <a href={link}>
      <InstagramThumnailSlideContainer>{imageItem}</InstagramThumnailSlideContainer>
    </a>
  );
};

export default InstagramThumnailSlide;
