import { DarksideButton, DatoDarksideButtonProps, Heading, SwiperStyles } from '@diamantaire/darkside/components/common-ui';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Keyboard, Lazy, Navigation } from 'swiper';
import { Swiper } from 'swiper/react';

import { CarouselSliderContainer } from './CarouselSlider.style';

type CarouselContentBlockProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  shouldLazyLoad?: boolean;
  additionalClass?: string;
  loopItems?: boolean;
  children: ReactNode;
  breakpoints?: any;
  className?: string;
  darksideButtons?: DatoDarksideButtonProps[];
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
  children,
  breakpoints = DEFAULT_BREAKPOINTS,
  additionalClass,
  loopItems = true,
  className,
  darksideButtons,
}: CarouselContentBlockProps) => {
  console.log('darksideButtons', darksideButtons);
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

  return (
    <SwiperStyles>
      <CarouselSliderContainer className={className}>
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
            watchSlidesProgress={true}
            onSwiper={setSwiper}
          >
            {children}
          </Swiper>
        </div>

        {darksideButtons?.length > 0 && (
          <div className="carousel-footer">
            {darksideButtons?.map((button) => {
              return (
                <DarksideButton
                  colorTheme={button.ctaButtonColorTheme}
                  mobileColorTheme={button.ctaButtonMobileColorTheme}
                  href={button.ctaLinkUrl}
                  key={button.id}
                  type={button.ctaButtonType}
                >
                  {button.ctaCopy}
                </DarksideButton>
              );
            })}
          </div>
        )}
      </CarouselSliderContainer>
    </SwiperStyles>
  );
};

export default CarouselSlider;
