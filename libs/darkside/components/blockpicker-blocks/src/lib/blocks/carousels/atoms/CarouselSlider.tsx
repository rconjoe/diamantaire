// This is the slider instance that wraps all sliders
import { UniLink } from '@diamantaire/darkside/core';
import { ArrowRightIcon, ArrowLeftIcon } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Navigation, Keyboard, Lazy } from 'swiper';
import { Swiper } from 'swiper/react';

import { CarouselSliderContainer } from './CarouselSlider.style';
import Button from '../../molecules/Button';
import Heading from '../../molecules/Heading';

type CarouselContentBlockProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  ctaCopy?: string;
  ctaLink?: string;
  shouldLazyLoad?: boolean;
  additionalClass?: string;
  loopItems?: boolean;
  children: ReactNode;
  breakpoints?: any;
};

const DEFAULT_BREAKPOINTS = {
  200: { slidesPerView: 1.5, slidesPerGroup: 1, centeredSlides: true },

  768: {
    slidesPerView: 4,
    slidesPerGroup: 1,
    centeredSlides: false,
  },
};

const CarouselSlider = ({
  title,
  subtitle,
  ctaCopy,
  ctaLink,
  children,
  breakpoints = DEFAULT_BREAKPOINTS,
  additionalClass,
  loopItems = true,
}: CarouselContentBlockProps) => {
  // LIST REF
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [swiper, setSwiper] = useState<any>();

  useEffect(() => {
    // TODO: Resolve error
    if (swiper) {
      swiper.params.navigation.prevEl = prevButtonRef.current;
      swiper.params.navigation.nextEl = nextButtonRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  // defensive check to ensure the rest of the page renders even if this block isn't set up yet
  if (!children) {
    return null;
  }

  const shouldShowCTA = ctaCopy && ctaLink;

  return (
    <CarouselSliderContainer>
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
      <div className="content-block__layout">
        <nav className={clsx('carousel-nav', additionalClass)}>
          <div
            ref={nextButtonRef}
            className={clsx(
              'carousel-arrow arrow-right',
              {
                '-celebrity-bottom-carousel': additionalClass === 'celebrityBottomCarousel',
                '-diamond-carousel': additionalClass === 'diamondCarousel',
              },
              additionalClass,
            )}
          >
            <ArrowRightIcon />
          </div>

          <div
            ref={prevButtonRef}
            className={clsx(
              'carousel-arrow arrow-left',
              {
                '-celebrity-bottom-carousel': additionalClass === 'celebrityBottomCarousel',
                '-diamond-carousel': additionalClass === 'diamondCarousel',
              },
              additionalClass,
            )}
          >
            <ArrowLeftIcon />
          </div>
        </nav>

        <Swiper
          className={clsx('carousel-container', additionalClass)}
          spaceBetween={20}
          loop={loopItems}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          modules={[Navigation, Keyboard, Lazy]}
          breakpoints={breakpoints}
          keyboard={true}
          onSwiper={setSwiper}
          watchSlidesProgress={true}
        >
          {children}
        </Swiper>

        {shouldShowCTA && (
          <div className="centered">
            <UniLink route={ctaLink} className="cta">
              <Button className="primary">{ctaCopy}</Button>
            </UniLink>
          </div>
        )}
      </div>
    </CarouselSliderContainer>
  );
};

export default CarouselSlider;
