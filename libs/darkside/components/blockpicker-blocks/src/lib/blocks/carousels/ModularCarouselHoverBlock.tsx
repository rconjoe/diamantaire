// import { connect } from 'react-redux';
import { BasicImageRequirements } from '@diamantaire/shared/types';
import { default as URI } from 'jsuri';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import { SwiperSlide } from 'swiper/react';

import CarouselContentBlock from './CarouselContentBlock';
import { ModularCarouselHoverBlockItemContainer, SliderWrapper } from './ModularCarouselHoverBlock.style';
import LazyLoadWrapper from '../molecules/LazyLoadWrapper';

const ReactPlayer = dynamic(() => import('react-player'));

interface ModularCarouselHoverBlockItemProps extends BasicImageRequirements {
  title: string;
  hover: {
    url: string;
    alt?: string;
    height: number;
    width: number;
    video?: {
      streamingUrl: string;
    };
  };
  list: object;
  idx: number;
  isMobile: boolean;
  url?: string;
}

const ModularCarouselHoverBlockItem = ({ title, image, hover, list, idx, isMobile }: ModularCarouselHoverBlockItemProps) => {
  const video = hover?.video;
  const [isHovered, setIsHovered] = useState(false);
  const uri = new URI(list[idx].url);
  const href = uri.uriParts.relative;

  const imageObject = {
    src: image.url,
    width: image.responsiveImage.width,
    height: image.responsiveImage.height,
    alt: image.alt,
  };

  const hoverImageObject = {
    src: hover?.url,
    width: hover?.width,
    height: hover?.height,
    alt: hover?.alt,
  };

  return (
    <ModularCarouselHoverBlockItemContainer>
      <a href={href}>
        <div
          onMouseLeave={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
          onContextMenu={(e) => e.preventDefault()}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <div className="list-item__media">
            <Image alt={imageObject?.alt} src={imageObject.src} width={imageObject.width} height={imageObject.height} />

            {Boolean(hover) && !isMobile && (
              <div className="list-item__media--hover">
                {video?.streamingUrl ? (
                  <ReactPlayer
                    url={video.streamingUrl}
                    volume={0}
                    muted
                    loop
                    height="100%"
                    width="100%"
                    playing={isHovered ? true : false}
                    playsinline
                    css={{
                      position: `absolute`,
                      top: 0,
                      left: 0,
                    }}
                  />
                ) : (
                  <Image
                    alt={hoverImageObject?.alt}
                    src={hoverImageObject.src}
                    width={hoverImageObject.width}
                    height={hoverImageObject.height}
                  />
                )}
              </div>
            )}
          </div>

          <div className="list-item__copy">{title && <span className="list-item__copy-title">{title}</span>}</div>
        </div>
      </a>
    </ModularCarouselHoverBlockItemContainer>
  );
};

type ModularCarouselHoverBlockProps = {
  title: string;
  blocks: Array<any>;
  additionalClass: string;
  isMobile: boolean;
  shouldLazyLoad?: boolean;
};

const ModularCarouselHoverBlock = ({
  title,
  blocks,
  additionalClass,
  shouldLazyLoad,
  isMobile,
}: ModularCarouselHoverBlockProps) => {
  const [list, setList] = useState(null);

  useEffect(() => {
    const li = {};

    blocks.forEach((v, i) => {
      if (!v.url) {
        return {};
      }

      li[i] = { url: v.url };
    });
    setList(li);
  }, [blocks]);

  if (!blocks || !blocks?.length) {
    return null;
  }

  const block = list && (
    <SliderWrapper className={additionalClass}>
      <CarouselContentBlock additionalClass={additionalClass} title={title}>
        {blocks.map((v, idx) => {
          const { hover, image, title, url, id } = v;

          return (
            // TODO: what do these additional props do?

            // <SwiperSlide key={id} preventClicks={false} preventClicksPropagation={false} className="slide-item">
            <SwiperSlide key={id} className="slide-item">
              <ModularCarouselHoverBlockItem
                title={title}
                image={image}
                hover={hover}
                url={url}
                list={list}
                idx={idx}
                isMobile={isMobile}
              />
            </SwiperSlide>
          );
        })}
      </CarouselContentBlock>
    </SliderWrapper>
  );

  if (shouldLazyLoad) {
    return <LazyLoadWrapper>{block}</LazyLoadWrapper>;
  }

  return block;
};

export default ModularCarouselHoverBlock;
