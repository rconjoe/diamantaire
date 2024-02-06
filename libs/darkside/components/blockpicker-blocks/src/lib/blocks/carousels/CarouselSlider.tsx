import { DarksideButton, Heading } from '@diamantaire/darkside/components/common-ui';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import { DatoDarksideButtonProps } from '@diamantaire/shared/types';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { ReactNode, useEffect, useState } from 'react';

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
  hasPagination?: boolean;
  _modelApiKey?: string;
  blocksCount: number;
  showDots: boolean;
};

const CarouselSlider = ({
  title,
  subtitle,
  children,
  additionalClass,
  loopItems = true,
  className,
  darksideButtons,
  _modelApiKey,
  blocksCount,
  showDots,
  id,
}: CarouselContentBlockProps) => {
  // https://github.com/davidjerleke/embla-carousel/issues/647
  const sliderOptions: any = {
    loop: loopItems,
    dragFree: false,
    align: 'center',
    breakpoints: {
      '(min-width: 768px)': { align: 'start' },
    },
  };
  const [activeSlide, setActiveSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(sliderOptions);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveSlide = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
    };

    // Initialize the active slide
    updateActiveSlide();

    // Add event listeners to track the active slide
    emblaApi.on('select', updateActiveSlide);

    // Clean up the event listeners when the component unmounts
    return () => {
      emblaApi.off('select', updateActiveSlide);
    };
  }, [emblaApi]);

  // defensive check to ensure the rest of the page renders even if this block isn't set up yet
  if (!children) {
    return null;
  }

  return (
    <CarouselSliderContainer className={clsx(className, _modelApiKey)}>
      <div className="content-block__layout">
        <div className="content-block__title">
          {title && (
            <Heading type="h2" className="h1 secondary">
              {title}
            </Heading>
          )}
          {title && subtitle && <p className="content-block__subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="content-block__layout">
        <nav className={clsx('carousel-nav', additionalClass)}>
          <div
            className={clsx(
              'carousel-arrow arrow-right',
              {
                '-celebrity-bottom-carousel': additionalClass === 'celebrityBottomCarousel',
                '-diamond-carousel': additionalClass === 'diamondCarousel',
              },
              additionalClass,
            )}
          >
            <button onClick={() => emblaApi.scrollNext()}>
              <ArrowRightIcon />
            </button>
          </div>

          <div
            className={clsx(
              'carousel-arrow arrow-left',
              {
                '-celebrity-bottom-carousel': additionalClass === 'celebrityBottomCarousel',
                '-diamond-carousel': additionalClass === 'diamondCarousel',
              },
              additionalClass,
            )}
          >
            <button onClick={() => emblaApi.scrollPrev()}>
              <ArrowLeftIcon />
            </button>
          </div>
        </nav>
        <div className={clsx('carousel-container embla', additionalClass)} ref={emblaRef}>
          <div className="embla__container">{children}</div>
        </div>
      </div>

      {showDots && blocksCount && (
        <div className="slider-dots">
          <ul>
            {Array.from(Array(blocksCount).keys())?.map((_slide, index) => {
              return (
                <li key={`${id}-block-nav-${index}`}>
                  <button
                    onClick={() => emblaApi.scrollTo(index)}
                    className={activeSlide === index ? 'active' : ''}
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

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
  );
};

export default CarouselSlider;
