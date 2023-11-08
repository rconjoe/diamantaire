import { useTopBar } from '@diamantaire/darkside/data/hooks';
import { isUserCloseToShowroom } from '@diamantaire/shared/geolocation';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

type TopBarTypes = {
  setIsTopbarShowing: React.Dispatch<React.SetStateAction<boolean>>;
};

const TopBarContainer = styled.div`
  background-color: var(--color-teal);
  padding: 1rem 0;
  position: relative;
  z-index: 5000;
  min-height: 38px;

  * {
    color: #fff;
  }

  .top-bar__wrapper {
    .slider__wrapper {
      max-width: 550px;
      margin: 0 auto;
      display: flex;
      justify-content: center;

      .slides {
        flex: 1;
        text-align: center;
      }
      p {
        margin: 0;
        font-size: 1.3rem;

        ${media.small`font-size: var(--font-size-xxxsmall);`}

        span {
          margin-left: 8px;
        }
      }

      .slider-nav {
        &.disabled {
          opacity: 0.5;
        }
      }

      .arrow-right,
      .arrow-left {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 8px solid var(--color-white);
        display: inline-block;
        transform: rotate(90deg);
      }
      .arrow-left {
        transform: rotate(270deg);
      }
    }
  }

  /* Mandatory slider styles */
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  .slider-nav {
    button {
      background-color: transparent;
      border: none;
    }
  }

  .close__container {
    transform: scale(0.6);
    position: absolute;
    right: 1rem;
    top: 0.7rem;
    height: 2.4rem;
    width: 2.4rem;

    button {
      padding: 0;
      background-color: transparent;
      border: none;

      svg {
        stroke: #fff;
        stroke-width: 1px;
      }
    }
  }
`;

const TopBar: FC<TopBarTypes> = ({ setIsTopbarShowing }): JSX.Element => {
  const { locale } = useRouter();
  const { data } = useTopBar(locale);
  const canSliderLoop = data?.announcementBar?.loop || true;
  const [isFirstSlide, setIsFirstSlide] = useState(false);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const showroomLocation = isUserCloseToShowroom();

  const options: EmblaOptionsType = { loop: canSliderLoop };
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const isThereMoreThanOneSlide = data?.announcementBar?.data.length > 1;

  const onSelect = useCallback((emblaApi) => {
    const isLastSlideTemp = emblaApi?.selectedScrollSnap() === emblaApi?.scrollSnapList().length - 1;
    const isFirstSlideTemp = emblaApi?.selectedScrollSnap() === 0;

    setIsFirstSlide(isFirstSlideTemp);
    setIsLastSlide(isLastSlideTemp);
  }, []);

  useEffect(() => {
    if (emblaApi && !canSliderLoop) {
      emblaApi.on('select', onSelect);
    }

    return () => {
      if (emblaApi && !canSliderLoop) {
        emblaApi.off('select', onSelect);
      }
    };
  }, [emblaApi]);

  return (
    <TopBarContainer id="top-bar">
      <div className="top-bar__wrapper">
        <div className="slider__wrapper">
          {isThereMoreThanOneSlide && (
            <div
              className={clsx('slider-nav prev', {
                disabled: isFirstSlide,
              })}
            >
              <button onClick={() => emblaApi.scrollPrev()}>
                <span className="arrow-left"></span>
              </button>
            </div>
          )}
          <div className="embla slides" ref={isThereMoreThanOneSlide ? emblaRef : null}>
            <div className="embla__container">
              {data?.announcementBar?.data?.map((slide, index) => {
                const { link, copy: defaultCopy, enableGeoCopy, nonGeoCopy, geoCopy } = slide || {};

                return (
                  <div className="embla__slide" key={`top-bar-slide-${index}`}>
                    {/* If there is a location, and the slide has geo on it 🪄 */}
                    {enableGeoCopy && showroomLocation ? (
                      <p>
                        <Link href={link}>
                          {replacePlaceholders(geoCopy, ['%%location-name%%'], [showroomLocation?.location]) as string}{' '}
                          <span className="arrow-right"></span>
                        </Link>
                      </p>
                    ) : enableGeoCopy ? (
                      <p>{nonGeoCopy}</p>
                    ) : (
                      <p>{defaultCopy}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {isThereMoreThanOneSlide && (
            <div
              className={clsx('slider-nav next', {
                disabled: isLastSlide,
              })}
            >
              <button onClick={() => emblaApi.scrollNext()}>
                <span className="arrow-right"></span>
              </button>
            </div>
          )}
        </div>

        <div className="close__container">
          <button aria-label="Close Top Bar" onClick={() => setIsTopbarShowing(false)}>
            <XIcon />
          </button>
        </div>
      </div>
    </TopBarContainer>
  );
};

export default TopBar;
