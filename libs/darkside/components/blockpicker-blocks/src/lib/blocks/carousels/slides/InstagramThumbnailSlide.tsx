import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import Image from 'next/image';
import React from 'react';

import { InstagramThumnailSlideContainer } from './InstagramThumbnailSlide.style';

type InstagramThumnailSlideProps = {
  image: {
    url: string;
    responsiveImage: {
      height: number;
      width: number;
    };
  };
  imageUrl?: string;
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
  const imageObject = {
    src: image.url,
    width: image?.responsiveImage?.width,
    height: image?.responsiveImage?.height,
  };

  const imageItem = <Image src={imageObject.src} width={imageObject.width} height={imageObject.height} alt={alt} />;

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
