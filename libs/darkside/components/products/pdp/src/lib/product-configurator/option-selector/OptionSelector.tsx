import { DarksideButton, SwiperStyles } from '@diamantaire/darkside/components/common-ui';
import { useHumanNameMapper } from '@diamantaire/darkside/data/hooks';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import { OptionItemProps } from '@diamantaire/shared/types';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Keyboard, Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { OptionItemContainer } from '../option-item/OptionItem';

interface OptionSelectorProps {
  optionType: string;
  label: string;
  options: OptionItemProps[];
  selectedOptionValue: string;
  onChange?: (option: OptionItemProps) => void;
  renderItemAsLink?: boolean;
  isBuilderFlowOpen?: boolean;
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

    &.ringSize {
      align-items: center;
      .show-more-sizes-button button {
        font-size: var(--font-size-xxxsmall);
        margin-left: 10px;
      }
    }

    &.diamondType {
      margin-top: 10px;
      position: relative;
      /* overflow: hidden; */
      height: 35px;
      max-width: 78%;

      .swiper {
        width: 100%;
        max-width: 100%;
        position: absolute;

        .swiper-slide {
          width: fit-content !important;
          margin-right: 30px;
        }
      }

      .swiper-wrapper {
        display: flex;
        padding-right: 80px;
      }

      a {
        display: inline-block;
      }

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
  isBuilderFlowOpen,
}: OptionSelectorProps) {
  const [showingAllRingSizes, setShowingAllRingSizes] = useState(false);
  const {
    data: {
      DIAMOND_SHAPES: DIAMOND_SHAPES_MAP,
      OPTION_NAMES: OPTION_NAMES_MAP,
      METALS_IN_HUMAN_NAMES: METALS_IN_HUMAN_NAMES_MAP,
      CARAT_WEIGHT_HUMAN_NAMES: CARAT_WEIGHT_HUMAN_NAMES_MAP,
      BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES: BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES_MAP,
    } = {},
  } = useHumanNameMapper('en_US');

  const [swiper, setSwiper] = useState<any>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  useEffect(() => {
    // TODO: Resolve error
    if (swiper && swiper?.params?.navigation) {
      swiper.params.navigation.prevEl = prevButtonRef.current;
      swiper.params.navigation.nextEl = nextButtonRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper, isLastSlide, selectedOptionValue]);

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

  const selectorLabel = OPTION_NAMES_MAP?.[label]?.value;

  const selectorCurrentValue =
    (CARAT_WEIGHT_HUMAN_NAMES_MAP && CARAT_WEIGHT_HUMAN_NAMES_MAP[selectedOptionValue]?.value) ||
    (DIAMOND_SHAPES_MAP && DIAMOND_SHAPES_MAP[selectedOptionValue]?.value) ||
    (METALS_IN_HUMAN_NAMES_MAP && METALS_IN_HUMAN_NAMES_MAP[selectedOptionValue]?.value) ||
    (BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES_MAP && BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES_MAP[selectedOptionValue]?.value);

  const presetRingSizes = ['4.5', '5', '6', '7', '8'];

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
                {DIAMOND_SHAPES_MAP &&
                  options.map((option, index) => {
                    const isSelected = selectedOptionValue === option.value;
                    // human readable value
                    const valueLabel = DIAMOND_SHAPES_MAP[option.value]?.value;

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
        ) : label === 'ringSize' ? (
          <div className={clsx('option-list', label)}>
            {!showingAllRingSizes ? (
              <>
                {options
                  .filter((option) => presetRingSizes.includes(option.value))
                  .map((option) => {
                    const isSelected = selectedOptionValue === option.value;

                    // human readable value
                    const valueLabel = DIAMOND_SHAPES_MAP?.[option.value]?.value;

                    return (
                      <OptionItemContainer
                        key={option.id}
                        optionType={optionType}
                        option={option}
                        valueLabel={valueLabel}
                        isSelected={isSelected}
                        onClick={() => handleOptionClick(option)}
                        isLink={isBuilderFlowOpen ? false : renderItemAsLink}
                      />
                    );
                  })}
                {!showingAllRingSizes && (
                  <DarksideButton
                    className="show-more-sizes-button"
                    type="underline"
                    colorTheme="teal"
                    onClick={() => setShowingAllRingSizes(true)}
                  >
                    Show More Sizes
                  </DarksideButton>
                )}
              </>
            ) : (
              options.map((option) => {
                const isSelected = selectedOptionValue === option.value;

                // human readable value
                const valueLabel = DIAMOND_SHAPES_MAP[option.value]?.value;

                return (
                  <OptionItemContainer
                    key={option.id}
                    optionType={optionType}
                    option={option}
                    valueLabel={valueLabel}
                    isSelected={isSelected}
                    onClick={() => handleOptionClick(option)}
                    isLink={isBuilderFlowOpen ? false : renderItemAsLink}
                  />
                );
              })
            )}
          </div>
        ) : (
          <div className={clsx('option-list', label)}>
            {DIAMOND_SHAPES_MAP &&
              options.map((option) => {
                const isSelected = selectedOptionValue === option.value;

                // human readable value
                const valueLabel = DIAMOND_SHAPES_MAP[option.value]?.value;

                return (
                  <OptionItemContainer
                    key={option.id}
                    optionType={optionType}
                    option={option}
                    valueLabel={valueLabel}
                    isSelected={isSelected}
                    onClick={() => handleOptionClick(option)}
                    isLink={isBuilderFlowOpen ? false : renderItemAsLink}
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
