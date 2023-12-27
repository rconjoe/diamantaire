import { DarksideButton, SwiperStyles, UIString, Heading } from '@diamantaire/darkside/components/common-ui';
import { useHumanNameMapper, useSingleHumanNameMapper, useTranslations } from '@diamantaire/darkside/data/hooks';
import { sortBandWidth, sortRingSize } from '@diamantaire/shared/helpers';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import { OptionItemProps } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
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
  isWeddingBandProduct?: boolean;
  setIsWeddingBandSizeGuideOpen?: (value: boolean) => void;
  hideSelectorLabel?: boolean;
  productType?: string;
  diamondSpecs?: {
    color: string;
    clarity: string;
  };
}

const StyledOptionSelector = styled.div`
  .selector-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;

    .selector-title {
      font-size: 1.7rem;
      font-weight: 500;
    }

    span {
      font-size: 1.7rem;
      font-weight: 400;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: 1.6rem;
      }
    }
  }
  .option-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
    margin: 0;

    &.ringSize {
      align-items: center;
      margin-bottom: 2rem;
      .show-more-sizes-button button {
        font-size: var(--font-size-xxxsmall);
        margin-left: 1rem;
      }
      .size-guide-button {
        flex: 0 0 100%;
        margin-top: 0.5rem;
        button {
          font-size: var(--font-size-xxxsmall);
        }
      }
    }

    &.soldAsDouble {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      button {
        flex: 1 1 50%;
        height: 4.8rem;
        text-transform: capitalize;
      }
    }

    &.soldAsLeftRight {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      button {
        flex: 1 1 33.33%;
        height: 4.8rem;
      }
    }

    &.bandAccent {
      button {
        max-width: 3.8rem;
        max-height: 3.8rem;
      }
    }

    &.sideStoneShape {
      button {
        margin-right: 2rem;
      }
    }

    &.bandVersion {
      button {
        text-transform: capitalize;
      }
    }

    &.prongStyle {
      button {
        text-transform: capitalize;
      }
    }

    &.stoneSetting {
      button {
        text-transform: capitalize;
      }
    }

    &.diamondSize {
      button {
        min-width: 6.4rem;
      }
    }

    &.diamondType {
      margin-top: 1rem;
      position: relative;
      max-width: 100%;
      gap: 1.5rem;
      min-height: 4.4rem;
      ${media.medium`max-width: 80%;`}

      .swiper {
        width: 100%;
        max-width: 100%;
        position: absolute;

        .swiper-slide {
          width: fit-content !important;
          margin-right: 2.5rem;
          ${media.medium`margin-right: 3rem;`}
          &:last-child {
            margin-right: 10rem;
          }
        }
      }

      .swiper-wrapper {
        display: flex;
      }

      a {
        display: inline-block;
      }

      .carousel-arrow {
        position: absolute;
        top: 1rem;
        background-color: transparent;
        right: -3rem;
        ${media.medium`right: -4rem;`}
      }
    }

    /* For selectors with medium sized buttons */
    &.prongStyle,
    &.bandWidth,
    &.stoneSetting,
    &.bandVersion,
    &.bandStyle {
      button {
        min-width: 11.5rem;
        font-size: var(--font-size-xxxsmall);
      }
    }

    &.space-between-items {
      max-width: 100%;
      gap: 2rem;
      min-height: 0;
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
  isWeddingBandProduct = false,
  setIsWeddingBandSizeGuideOpen,
  hideSelectorLabel = false,
  productType,
  diamondSpecs,
}: OptionSelectorProps) {
  const [showingAllRingSizes, setShowingAllRingSizes] = useState(false);
  const { locale } = useRouter();
  const { data: { DIAMOND_SHAPES: DIAMOND_SHAPES_MAP } = {} } = useHumanNameMapper(locale);
  const { data: { ETERNITY_STYLE_HUMAN_NAMES } = {} } = useSingleHumanNameMapper(locale, 'ETERNITY_STYLE_HUMAN_NAMES');

  const [swiper, setSwiper] = useState<any>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);

  const { _t } = useTranslations(locale);
  const { _t: translateOptionNames } = useTranslations(locale, ['OPTION_NAMES']);

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

  const presetRingSizes = ['4.5', '5', '6', '7', '8'];

  function handleOptionValueSort(options, optionType) {
    if (optionType === 'bandWidth') {
      return sortBandWidth(options);
    } else if (optionType === 'ringSize') {
      return sortRingSize(options);
    } else {
      return options;
    }
  }

  function renderDiamondSpecs() {
    return (
      <>
        {', '}
        {diamondSpecs.color && (
          <>
            <UIString>{diamondSpecs.color}</UIString> {_t('color').toLowerCase()}
            {', '}
          </>
        )}
        {diamondSpecs.clarity && (
          <>
            <UIString>{diamondSpecs.clarity}</UIString> {_t('clarity').toLowerCase()}
          </>
        )}
      </>
    );
  }

  function renderOptionValue() {
    switch (optionType) {
      case 'eternityStyle':
        return ETERNITY_STYLE_HUMAN_NAMES?.[selectedOptionValue]?.value;

      case 'chainLength':
        return (
          <>
            <UIString>{selectedOptionValue}</UIString>
            {'"'}
          </>
        );

      case 'sideStoneCarat':
      case 'caratWeight':
        if (selectedOptionValue !== 'other') {
          return (
            <>
              <UIString>{selectedOptionValue}</UIString>
              {' ct'}
              {productType === 'Engagement Ring' && optionType !== 'sideStoneCarat' && renderDiamondSpecs()}
            </>
          );
        }
        break;

      case 'value': // used for US only digital-gift-card
        return `$${selectedOptionValue}`;

      default:
        return <UIString>{selectedOptionValue}</UIString>;
    }
  }

  return (
    <StyledOptionSelector className={optionType}>
      {!hideSelectorLabel && label && (
        <div className="selector-label">
          <Heading type="h2" className="selector-title">
            {translateOptionNames(label.replace('caratWeight', 'centerstone'))}:
          </Heading>
          <span>{renderOptionValue()}</span>
        </div>
      )}

      <div>
        {label === 'diamondType' ? (
          <div
            className={clsx('option-list', label, {
              'space-between-items': options.length < 8,
            })}
          >
            {options.length > 7 ? (
              <SwiperStyles>
                <Swiper
                  slidesPerView={7}
                  slidesPerGroup={8}
                  loop={false}
                  spaceBetween={25}
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
            ) : (
              DIAMOND_SHAPES_MAP &&
              options.map((option) => {
                const isSelected = selectedOptionValue === option.value;

                const valueLabel = option.value;

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
              })
            )}
          </div>
        ) : label === 'ringSize' ? (
          <div className={clsx('option-list', label)}>
            {!showingAllRingSizes ? (
              <>
                {options
                  .filter((option) => presetRingSizes.includes(option.value))
                  .map((option) => {
                    const isSelected = selectedOptionValue === option.value;

                    const valueLabel = option.value;

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
                    <UIString>Show more sizes</UIString>
                  </DarksideButton>
                )}
              </>
            ) : (
              handleOptionValueSort(options, optionType)?.map((option) => {
                const isSelected = selectedOptionValue === option.value;

                // human readable value
                const valueLabel = option.value;

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

            {(isWeddingBandProduct || productType === 'Ring') && (
              <div className="size-guide-button">
                <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsWeddingBandSizeGuideOpen(true)}>
                  <UIString>Size Guide</UIString>
                </DarksideButton>
              </div>
            )}
          </div>
        ) : (
          <div className={clsx('option-list', label)}>
            {handleOptionValueSort(options, optionType).map((option) => {
              const isSelected = selectedOptionValue === option.value || selectedOptionValue === option.id;

              // if (optionType === 'soldAsDouble') {
              //   console.log('selectedOptionValue', selectedOptionValue);
              //   console.log('option.value', option.id);
              //   console.log('isSelected', isSelected);
              // }

              // human readable value
              const valueLabel = option.value;

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
