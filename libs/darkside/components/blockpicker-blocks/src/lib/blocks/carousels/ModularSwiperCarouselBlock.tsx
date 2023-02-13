import { UniLink } from '@diamantaire/darkside/core';
import { getBlockPictureAlt } from '@diamantaire/shared/helpers';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';

import CarouselContentBlock from './CarouselContentBlock';
import { ModularSwiperCarouselBlockContainer, SlideContainer } from './ModularSwiperCarouselBlock.style';
import LazyLoadWrapper from '../molecules/LazyLoadWrapper';

type SlideProps = {
  image?: {
    url: string;
    responsiveImage: {
      width: number;
      height: number;
    };
  };
  itemName?: string;
  children?: any;
  url?: string;
};

const Slide = ({ image, itemName, children }: SlideProps) => {
  const { url, responsiveImage } = image;
  const hasImage = Boolean(url);

  return (
    <SlideContainer>
      <div className="slide__image-container">
        {hasImage && (
          <Image
            src={url}
            height={responsiveImage?.height}
            width={responsiveImage?.width}
            alt={getBlockPictureAlt({
              desktopImage: image,
              title: itemName,
            })}
          />
        )}
      </div>
      {children}
    </SlideContainer>
  );
};

type ModularSwiperCarouselBlockProps = {
  blocks: Array<any>;
  blocksDesktop?: Array<any>;
  id?: string;
  title?: string;
  ctaCopy?: string;
  ctaLink?: string;
  shouldLazyLoad?: boolean;
  isMobile?: boolean;
  additionalClass?: string;
};

const ModularSwiperCarouselBlock = ({
  title,
  ctaCopy,
  ctaLink,
  shouldLazyLoad,
  blocks,
  blocksDesktop,
  additionalClass,
  isMobile,
}: ModularSwiperCarouselBlockProps) => {
  const [list, setList] = useState(null);
  const [desktopList, setDesktopList] = useState(null);

  useEffect(() => {
    const li = {};
    const desktopLi = {};

    blocks?.length > 0 &&
      blocks.forEach((v, i) => {
        if (!v.url) {
          return {};
        }

        li[i] = { route: v.url };
      });
    setList(li);

    if (blocksDesktop?.length > 0) {
      blocksDesktop.forEach((v, i) => {
        if (!v.url) {
          return {};
        }

        desktopLi[i] = { route: v.url };
      });
      setDesktopList(desktopLi);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!blocks) {
    return null;
  }

  const hasBlocksDesktop = blocksDesktop?.length > 0;

  const mobileSlides =
    list &&
    blocks?.length > 0 &&
    blocks.map(({ image, itemName, url }, idx) => {
      const hasUrl = Boolean(url);

      if (hasUrl) {
        return (
          <SwiperSlide className="product-slide" key={`block-${idx}`}>
            <UniLink route={list[idx].route}>
              <Slide image={image} itemName={itemName}>
                <h3 key={`title-${idx}`} className="mobile-slide__text">
                  {itemName}
                </h3>
              </Slide>
            </UniLink>
          </SwiperSlide>
        );
      }

      return (
        <SwiperSlide className="product-slide" key={`block-no-link-${idx}`}>
          <Slide image={image} itemName={itemName} />
        </SwiperSlide>
      );
    });

  const desktopSlides =
    desktopList &&
    hasBlocksDesktop &&
    blocksDesktop.map(({ image, itemName, url }, idx) => {
      const hasUrl = Boolean(url);

      if (hasUrl) {
        return (
          <SwiperSlide className="product-slide" key={`block-desktop-${idx}`}>
            <UniLink route={desktopList[idx].route}>
              <Slide image={image} itemName={itemName}>
                <h3 key={`title-${idx}`} className="mobile-slide__text">
                  {itemName}
                </h3>
              </Slide>
            </UniLink>
          </SwiperSlide>
        );
      }

      return (
        <SwiperSlide className="product-slide" key={`block-no-link-${idx}`}>
          <Slide image={image} itemName={itemName} />
        </SwiperSlide>
      );
    });

  const getSlides = () => {
    if (hasBlocksDesktop) {
      return isMobile ? mobileSlides : desktopSlides;
    }

    return mobileSlides;
  };

  const block = list && (
    <ModularSwiperCarouselBlockContainer>
      <CarouselContentBlock
        title={title}
        ctaCopy={ctaCopy}
        ctaLink={ctaLink}
        additionalClass={additionalClass}
        breakpoints={{
          200: {
            slidesPerView: 2,
            centeredSlides: true,
            spaceBetween: 25,
          },
          768: {
            slidesPerView: 5,
            centeredSlides: false,
            spaceBetween: 50,
          },
          992: {
            slidesPerView: 5,
            centeredSlides: false,
            spaceBetween: 100,
          },
        }}
      >
        {getSlides()}
      </CarouselContentBlock>
    </ModularSwiperCarouselBlockContainer>
  );

  if (shouldLazyLoad) {
    return <LazyLoadWrapper height={500}>{block}</LazyLoadWrapper>;
  }

  return block;
};

export default ModularSwiperCarouselBlock;
