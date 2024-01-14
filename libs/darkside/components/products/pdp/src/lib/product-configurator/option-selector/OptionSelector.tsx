import { DarksideButton, UIString, Heading } from '@diamantaire/darkside/components/common-ui';
import {
  useHumanNameMapper,
  useSingleHumanNameMapper,
  useTranslations,
  humanNamesMapperType,
} from '@diamantaire/darkside/data/hooks';
import { getDiamondType, sortBandWidth, sortRingSize } from '@diamantaire/shared/helpers';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import { OptionItemProps } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  selectedOptionIndex?: number;
  selectedConfiguration?: {
    [key: string]: string;
  };
  setProductSlug?: (_value: string) => void;
  areDiamondShapesHorizontal?: boolean;
  selectedDiamond?: Array<{
    diamondType?: string;
    carat?: string;
    color?: string;
    clarity?: string;
    price?: number;
  }>;
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

    &.bandStoneShape {
      gap: 25px;
    }
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

    &.bandWidth {
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
      ${media.medium`max-width: 66%;`}

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

      svg {
        transition: 0.25s;
      }

      &.isRotated {
        .canRotate {
          svg {
            transform: rotate(90deg);
          }
        }
      }
    }

    /* For selectors with medium sized buttons */
    &.prongStyle,
    &.stoneSetting,
    &.bandVersion,
    &.bandStoneStyle,
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

  .diamond-shape__slider {
    .embla__slide {
      flex: 0 0 50px;
      justify-content: center;
      text-align: center;
      flex: 0 0 auto;
      margin-right: 25px;
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
  selectedOptionIndex = 0,

  selectedConfiguration,
  setProductSlug,
  areDiamondShapesHorizontal,
  selectedDiamond,
}: OptionSelectorProps) {
  const [showingAllRingSizes, setShowingAllRingSizes] = useState(false);
  const { locale } = useRouter();
  const { data: { DIAMOND_SHAPES: DIAMOND_SHAPES_MAP } = {} } = useHumanNameMapper(locale);
  const { data: { ETERNITY_STYLE_HUMAN_NAMES } = {} } = useSingleHumanNameMapper(locale, 'ETERNITY_STYLE_HUMAN_NAMES');

  const [isLastSlide, setIsLastSlide] = useState(false);

  const { _t } = useTranslations(locale);
  const { _t: translateOptionNames } = useTranslations(locale, [humanNamesMapperType.OPTION_NAMES]);
  const { _t: translateBandwidthValues } = useTranslations(locale, [humanNamesMapperType.BAND_WIDTH_LABEL_HUMAN_NAMES]);

  const diamondSliderOptions: any = {
    loop: false,
    dragFree: false,
    align: 'start',
    slidesToScroll: 4,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(diamondSliderOptions);

  // Track if next/prev button should show on diamondType slider
  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveSlide = () => {
      const selectedSlide = emblaApi.selectedScrollSnap();

      // Check if the current slide is the last slide
      const isLastSlide = selectedSlide === emblaApi.scrollSnapList().length - 1;

      // If it's the last slide, do something (you can call a function or set state here)
      if (isLastSlide) {
        // You can set state or call a function here to handle being on the last slide
        setIsLastSlide(true);
      } else {
        setIsLastSlide(false);
      }
    };

    // Initialize the active slide
    updateActiveSlide();

    // scroll to init slide
    const setInitSlide = () => {
      if (selectedOptionIndex > 6) {
        emblaApi.scrollTo(selectedOptionIndex);
        setIsLastSlide(true);
      }
    };

    setInitSlide();

    // Add event listeners to track the active slide
    emblaApi.on('select', updateActiveSlide);
    emblaApi.on('reInit', () => {
      setInitSlide();
      updateActiveSlide();
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      emblaApi.off('select', updateActiveSlide);
      emblaApi.off('reInit', setInitSlide);
    };
  }, [emblaApi, selectedOptionIndex]);

  if (!options) {
    return null;
  }

  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option);
    }
  };

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

  const metal = _t(
    `${selectedConfiguration?.goldPurity ? `${selectedConfiguration.goldPurity} ` : ''}${selectedConfiguration?.metal}`,
  );

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
        return (
          <>
            <UIString>{selectedOptionValue}</UIString>
            {'ct x 2'}
          </>
        );

      case 'caratWeight':
        if (selectedOptionValue !== 'other') {
          return (
            <>
              {selectedOptionValue}
              {productType === 'Engagement Ring' && renderDiamondSpecs()}
            </>
          );
        } else if (selectedDiamond?.length > 0) {
          const [diamond] = selectedDiamond || [{}];
          const {
            carat,
            diamondType,
            color,
            clarity,
          }: { carat?: string; diamondType?: string; color?: string; clarity?: string } = diamond;

          return (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
              {productType === 'Engagement Ring' &&
                `${_t(getDiamondType(diamondType)?.slug)}, ${carat}ct, ${color}, ${clarity}`}
            </>
          );
        }

        break;
      case 'bandWidth':
        return translateBandwidthValues(selectedOptionValue);
      case 'metal':
        return metal;
      case 'value': // used for US only digital-gift-card
        return `$${selectedOptionValue}`;

      default:
        return <UIString>{selectedOptionValue}</UIString>;
    }
  }

  function getOptionHeaderName({ label, productType }) {
    if (label === 'caratWeight' && productType === 'Engagement Ring') {
      return 'centerstone';
    }

    return label;
  }

  const labelName = getOptionHeaderName({ label, productType });

  function renderDiamondTypeOptions() {
    const isCarousel = options.length > 7;

    const renderCarousel = () => (
      <>
        <div className="embla diamond-shape__slider" ref={emblaRef}>
          <div className="embla__container">
            {DIAMOND_SHAPES_MAP &&
              options.map((option, index) => {
                const isSelected = selectedOptionValue === option.value;
                const valueLabel = DIAMOND_SHAPES_MAP[option.value]?.value;

                return (
                  <div className="embla__slide" key={`diamondType-${index}`}>
                    <OptionItemContainer
                      key={option.id}
                      optionType={optionType}
                      option={option}
                      valueLabel={valueLabel}
                      isSelected={isSelected}
                      onClick={() => handleOptionClick(option)}
                      isLink={renderItemAsLink}
                      setProductSlug={setProductSlug}
                      selectedConfiguration={selectedConfiguration}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <button
          className="carousel-arrow arrow-left"
          style={{ display: isLastSlide ? 'block' : 'none' }}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ArrowLeftIcon />
        </button>
        <button
          className="carousel-arrow arrow-right"
          style={{ display: isLastSlide ? 'none' : 'block' }}
          onClick={() => emblaApi?.scrollNext()}
        >
          <ArrowRightIcon />
        </button>
      </>
    );

    const renderList = () =>
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
            setProductSlug={setProductSlug}
            selectedConfiguration={selectedConfiguration}
          />
        );
      });

    return (
      <div
        className={clsx('option-list diamondType', {
          'space-between-items': options.length < 8,
          isRotated: areDiamondShapesHorizontal,
        })}
      >
        {isCarousel ? renderCarousel() : renderList()}
      </div>
    );
  }

  function renderRingSizeOptions() {
    const renderRingSizes = () => {
      const visibleOptions = showingAllRingSizes
        ? options
        : options.filter((option) => presetRingSizes.includes(option.value));

      return visibleOptions.map((option) => {
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
            setProductSlug={setProductSlug}
            selectedConfiguration={selectedConfiguration}
          />
        );
      });
    };

    const renderShowMoreSizesButton = () => {
      return (
        !showingAllRingSizes && (
          <DarksideButton
            className="show-more-sizes-button"
            type="underline"
            colorTheme="teal"
            onClick={() => setShowingAllRingSizes(true)}
          >
            <UIString>Show more sizes</UIString>
          </DarksideButton>
        )
      );
    };

    const renderSizeGuideButton = () => {
      return (
        (isWeddingBandProduct || productType === 'Ring') && (
          <div className="size-guide-button">
            <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsWeddingBandSizeGuideOpen(true)}>
              <UIString>Size Guide</UIString>
            </DarksideButton>
          </div>
        )
      );
    };

    return (
      <div className={clsx('option-list ringSize')}>
        {renderRingSizes()}
        {renderShowMoreSizesButton()}
        {renderSizeGuideButton()}
      </div>
    );
  }

  function renderCaratWeightOptions() {
    if (selectedDiamond?.length > 0) {
      return null;
    }

    return (
      <div className={clsx('option-list caratWeight')}>
        {options.map((option) => {
          const isSelected = selectedOptionValue === option.value;
          // caratWeight we remove the 'ct' from the value assuming this is size
          const valueLabel = option.value.replace(/[a-zA-Z]+/, '');

          return (
            <OptionItemContainer
              key={option.id}
              optionType={optionType}
              option={option}
              valueLabel={valueLabel}
              isSelected={isSelected}
              onClick={() => handleOptionClick(option)}
              isLink={renderItemAsLink}
              setProductSlug={setProductSlug}
              selectedConfiguration={selectedConfiguration}
            />
          );
        })}
      </div>
    );
  }

  function renderDefaultOptions() {
    // Default rendering logic for other types
    return (
      <div className={clsx('option-list', label)}>
        {handleOptionValueSort(options, optionType).map((option) => {
          const isSelected = selectedOptionValue === option.value || selectedOptionValue === option.id;
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
              setProductSlug={setProductSlug}
              selectedConfiguration={selectedConfiguration}
            />
          );
        })}
      </div>
    );
  }

  const renderOptionsMap = {
    diamondType: renderDiamondTypeOptions,
    ringSize: renderRingSizeOptions,
    caratWeight: renderCaratWeightOptions,
  };

  return (
    <StyledOptionSelector className={optionType}>
      {!hideSelectorLabel && label && (
        <div className="selector-label">
          <Heading type="h2" className="selector-title">
            {translateOptionNames(labelName)}:
          </Heading>
          <span>{renderOptionValue()}</span>
        </div>
      )}

      <div>{renderOptionsMap[label] ? renderOptionsMap[label]() : renderDefaultOptions()}</div>
    </StyledOptionSelector>
  );
}

export default OptionSelector;
