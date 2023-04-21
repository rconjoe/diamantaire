import { SwiperStyles } from '@diamantaire/darkside/components/common-ui';
import { useHumanNameMapper } from '@diamantaire/darkside/data/hooks';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Keyboard, Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { OptionItem, OptionItemContainer } from '../option-item/OptionItem';

interface OptionSelectorProps {
  optionType: string;
  label: string;
  options: OptionItem[];
  selectedOptionValue: string;
  onChange?: (option: OptionItem) => void;
  renderItemAsLink?: boolean;
}

const StyledOptionSelector = styled.div`
  .selector-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;

    h4 {
      font-size: 1.7rem;
      font-weight: 500;
    }

    span {
      font-size: 1.7rem;
      font-weight: 300;
    }
  }
  .option-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    list-style: none;
    padding: 0;
    margin: 0;

    &.diamondType {
      margin-top: 10px;
      position: relative;
      /* overflow: hidden; */
      height: 35px;
      max-width: 75%;

      .swiper {
        width: 100%;
        max-width: 100%;
        position: absolute;
      }

      .swiper-wrapper {
        display: flex;
        /* max-width: 450px; */
        /* column-gap: 20px; */
      }

      /* .swiper-slide-next,
      .swiper-slide-prev {
        display: none;
        pointer-events: none;
      } */

      .carousel-arrow {
        position: absolute;
        right: -40px;
        top: 10px;
        background-color: transparent;
      }
    }
  }
`;

function OptionSelector({
  optionType,
  options,
  selectedOptionValue,
  onChange,
  label,
  renderItemAsLink = false,
}: OptionSelectorProps) {
  const {
    data: { DIAMOND_SHAPES, OPTION_NAMES, METALS_IN_HUMAN_NAMES, BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES } = {},
  }: {
    data: {
      [key: string]: {
        [key: string]: {
          [key: string]: string;
        };
      };
    };
  } = useHumanNameMapper('en_US');

  const [swiper, setSwiper] = useState<any>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  useEffect(() => {
    // TODO: Resolve error
    if (swiper) {
      console.log('swiper', swiper);
      swiper.params.navigation.prevEl = prevButtonRef.current;
      swiper.params.navigation.nextEl = nextButtonRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper, isLastSlide, selectedOptionValue]);

  console.log('DIAMOND_SHAPES', DIAMOND_SHAPES);
  console.log('OPTION_NAMES', OPTION_NAMES);
  console.log('selectedOptionValue', selectedOptionValue);
  console.log('label', label);

  if (!options) {
    return null;
  }

  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option);
    }
  };

  function handleSlideChange(swiper) {
    setIsLastSlide(swiper.isEnd);
  }

  const selectorLabel = OPTION_NAMES?.[label]?.value;

  console.log('selectorLabel', selectorLabel);
  console.log('label', label);
  const selectorCurrentValue =
    (DIAMOND_SHAPES && DIAMOND_SHAPES[selectedOptionValue]?.value) ||
    (METALS_IN_HUMAN_NAMES && METALS_IN_HUMAN_NAMES[selectedOptionValue]?.value) ||
    (BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES && BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES[selectedOptionValue]?.value);

  return (
    <StyledOptionSelector>
      {selectorLabel && (
        <div className="selector-label">
          <h4>{selectorLabel}:</h4>
          <span>{selectorCurrentValue}</span>
        </div>
      )}

      <div>
        {label === 'diamondType' ? (
          <div className={clsx('option-list', label)}>
            <SwiperStyles>
              <Swiper
                slidesPerView={7}
                slidesPerGroup={3}
                loop={false}
                // spaceBetween={20}
                modules={[Navigation, Keyboard, Lazy]}
                navigation={{
                  prevEl: prevButtonRef.current,
                  nextEl: nextButtonRef.current,
                }}
                preventClicksPropagation={true}
                preventClicks={true}
                draggable={false}
                onSwiper={setSwiper}
                allowSlideNext={true}
                allowSlidePrev={true}
                keyboard={true}
                height={40}
                watchSlidesProgress={true}
                onSlideChange={handleSlideChange}
                allowTouchMove={false}
              >
                {DIAMOND_SHAPES &&
                  options.map((option, index) => {
                    const isSelected = selectedOptionValue === option.value;
                    // human readable value
                    const valueLabel = DIAMOND_SHAPES[option.value]?.value;

                    console.log('DIAMOND_SHAPES[option.value]', DIAMOND_SHAPES[option.value]);

                    return (
                      <SwiperSlide key={label + '-' + index}>
                        <OptionItemContainer
                          key={option.id}
                          optionType={optionType}
                          option={option}
                          valueLabel={valueLabel}
                          isSelected={isSelected}
                          onClick={() => handleOptionClick(option)}
                          isLink={renderItemAsLink}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

              <button
                ref={prevButtonRef}
                className="carousel-arrow arrow-left"
                style={{
                  display: isLastSlide ? 'block' : 'none',
                }}
              >
                <ArrowLeftIcon />
              </button>

              <button
                ref={nextButtonRef}
                className="carousel-arrow arrow-right"
                style={{
                  display: isLastSlide ? 'none' : 'block',
                }}
              >
                <ArrowRightIcon />
              </button>
            </SwiperStyles>
          </div>
        ) : (
          <div className={clsx('option-list', label)}>
            {DIAMOND_SHAPES &&
              options.map((option) => {
                const isSelected = selectedOptionValue === option.value;
                // human readable value
                const valueLabel = DIAMOND_SHAPES[option.value]?.value;

                console.log('DIAMOND_SHAPES[option.value]', DIAMOND_SHAPES[option.value]);

                return (
                  <OptionItemContainer
                    key={option.id}
                    optionType={optionType}
                    option={option}
                    valueLabel={valueLabel}
                    isSelected={isSelected}
                    onClick={() => handleOptionClick(option)}
                    isLink={renderItemAsLink}
                  />
                );
              })}
          </div>
        )}
      </div>
    </StyledOptionSelector>
  );
}

export default OptionSelector;
