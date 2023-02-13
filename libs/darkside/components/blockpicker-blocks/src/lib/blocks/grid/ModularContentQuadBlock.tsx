import React from 'react';

import { ModularContentQuadBlockContainer } from './ModularContentQuadBlock.style';
import Heading from '../molecules/Heading';
import ImageTile from '../molecules/ImageTile';
import LazyLoadWrapper from '../molecules/LazyLoadWrapper';

type ModularContentQuadBlock = {
  blocks: Array<any>;
  id?: string;
  shouldLazyLoad?: boolean;
  title?: string;
  subtitle?: string;
  title1?: string;
  ctaCopy1?: string;
  ctaRoute1?: string;
  image1?: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  title2?: string;
  ctaCopy2?: string;
  ctaRoute2?: string;
  image2?: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  title3?: string;
  ctaCopy3?: string;
  ctaRoute3?: string;
  image3?: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  title4?: string;
  ctaCopy4?: string;
  ctaRoute4?: string;
  image4?: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
};

const ModularContentQuadBlock = ({
  title,
  subtitle,
  id,
  shouldLazyLoad,
  title1,
  ctaCopy1,
  ctaRoute1,
  image1,
  title2,
  ctaCopy2,
  ctaRoute2,
  image2,
  title3,
  ctaCopy3,
  ctaRoute3,
  image3,
  title4,
  ctaCopy4,
  ctaRoute4,
  image4,
}: ModularContentQuadBlock) => {
  const blocks = [
    {
      title: title1,
      ctaCopy: ctaCopy1,
      ctaRoute: ctaRoute1,
      image: image1,
    },
    {
      title: title2,
      ctaCopy: ctaCopy2,
      ctaRoute: ctaRoute2,
      image: image2,
    },
    {
      title: title3,
      ctaCopy: ctaCopy3,
      ctaRoute: ctaRoute3,
      image: image3,
    },
    {
      title: title4,
      ctaCopy: ctaCopy4,
      ctaRoute: ctaRoute4,
      image: image4,
    },
  ];

  if (!blocks) {
    return null;
  }

  const block = (
    <ModularContentQuadBlockContainer>
      <div className="content-block__layout">
        <div className="content-block__title">
          {title && (
            <Heading type="h2" className="h1 primary">
              {title}
            </Heading>
          )}
          {title && subtitle && <p className="content-block__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="content-block__container">
        {blocks.map((block, index) => (
          <div key={`${id}-${index}-${block.title}-container`} className="image-tile__container -modular-content-quad-block">
            <ImageTile
              key={`${id}-${index}-${block.title}`}
              isProductImage={true}
              extraClass="-modular-content-quad-block"
              {...block}
            />
          </div>
        ))}
      </div>
    </ModularContentQuadBlockContainer>
  );

  if (shouldLazyLoad) {
    return <LazyLoadWrapper>{block}</LazyLoadWrapper>;
  }

  return block;
};

export default ModularContentQuadBlock;
