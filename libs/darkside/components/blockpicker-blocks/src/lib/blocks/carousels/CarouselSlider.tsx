import { DarksideButton, Heading } from '@diamantaire/darkside/components/common-ui';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import { DatoDarksideButtonProps } from '@diamantaire/shared/types';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { ReactNode } from 'react';

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
}: CarouselContentBlockProps) => {
  const sliderOptions: any = {
    loop: loopItems,
    dragFree: false,
    align: 'center',
    breakpoints: {
      '(min-width: 768px)': { align: 'start' },
    },
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(sliderOptions);

  // defensive check to ensure the rest of the page renders even if this block isn't set up yet
  if (!children) {
    return null;
  }

  return (
    <CarouselSliderContainer className={clsx(className, _modelApiKey)}>
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
