import { DarksideButton, UIString, Heading } from '@diamantaire/darkside/components/common-ui';
import {
  useHumanNameMapper,
  useSingleHumanNameMapper,
  useTranslations,
  humanNamesMapperType,
} from '@diamantaire/darkside/data/hooks';
import { getDiamondType, getLanguage } from '@diamantaire/shared/helpers';
import { ArrowLeftIcon, ArrowRightIcon } from '@diamantaire/shared/icons';
import { OptionItemProps } from '@diamantaire/shared/types';
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
  &.diamondType {
    width: 100%;
  }
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
    flex-wrap: no-wrap;
    gap: 0.25rem;
    list-style: none;
    padding: 0;
    margin: 0;

    &.bandStoneShape {
      gap: 25px;
    }
    &.ringSize {
      flex-wrap: wrap;
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
      .image-item {
        max-width: 3.8rem;
        max-height: 3.8rem;
        min-width: unset;
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
      min-height: 4.4rem;

      .diamond-shape__slider {
        width: 100%;
        max-width: 100%;
        .embla__container {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          gap: 25px;
        }
        .embla__slide {
          flex: 0 0 auto;
        }
      }

      a {
        display: inline-block;
      }

      .carousel-arrow {
        position: absolute;
        top: 1rem;
        background-color: white;
        top: -3px;
        height: 100%;
        &:disabled {
          opacity: 0;
          cursor: default; /* Optional: Changes the cursor to indicate the button is not clickable */
        }
        &.arrow-left {
          left: -15px;
        }

        &.arrow-right {
          right: -15px;
        }
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
    &.bandStyle,
    &.haloSize,
    &.bandWidth,
    &.size {
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
  selectedConfiguration,
  setProductSlug,
  areDiamondShapesHorizontal,
  selectedDiamond,
}: OptionSelectorProps) {
  const [showingAllRingSizes, setShowingAllRingSizes] = useState(false);
  const {
    locale,
    query: { collectionSlug },
  } = useRouter();
  const { data: { DIAMOND_SHAPES: DIAMOND_SHAPES_MAP } = {} } = useHumanNameMapper(locale);
  const { data: { ETERNITY_STYLE_HUMAN_NAMES } = {} } = useSingleHumanNameMapper(locale, 'ETERNITY_STYLE_HUMAN_NAMES');
  const { data: { CARAT_WEIGHT_HUMAN_NAMES } = {} } = useSingleHumanNameMapper(locale, 'CARAT_WEIGHT_HUMAN_NAMES');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  const [_, setUpdateFlag] = useState(false);

  const { _t } = useTranslations(locale);
  const language = getLanguage(locale);
  const { _t: translateOptionNames } = useTranslations(locale, [humanNamesMapperType.OPTION_NAMES]);
  const { _t: translateBandwidthValues } = useTranslations(locale, [humanNamesMapperType.BAND_WIDTH_LABEL_HUMAN_NAMES]);

  const diamondSliderOptions: any = {
    loop: false,
    dragFree: true,
    containScroll: 'trimSnaps',
    align: 'center',
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(diamondSliderOptions);

  useEffect(() => {
    if (!emblaApi) return;

    const initialIndex = options.findIndex((option) => option.value === selectedOptionValue);

    if (initialIndex > -1) {
      setTimeout(() => {
        emblaApi.scrollTo(initialIndex);
      }, 300);
    }
  }, [emblaApi, options, selectedOptionValue]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateArrowVisibility = () => {
      // triggers a re-render
      setUpdateFlag((prevFlag) => !prevFlag);
    };

    emblaApi.on('select', updateArrowVisibility);
    emblaApi.on('scroll', updateArrowVisibility);

    updateArrowVisibility(); // Initial update

    return () => {
      emblaApi.off('select', updateArrowVisibility);
      emblaApi.off('scroll', updateArrowVisibility);
    };
  }, [emblaApi]);

  if (!options) {
    return null;
  }

  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option);
    }
  };

  const presetRingSizes = ['4.5', '5', '6', '7', '8'];

  function renderDiamondSpecs() {
    const shouldLowercase = language !== 'de';

    return (
      <>
        {', '}
        {diamondSpecs.color && (
          <>
            <UIString>{diamondSpecs.color}</UIString> {shouldLowercase ? _t('color').toLowerCase() : _t('color')}
            {', '}
          </>
        )}
        {diamondSpecs.clarity && (
          <>
            <UIString>{diamondSpecs.clarity}</UIString> {shouldLowercase ? _t('clarity').toLowerCase() : _t('clarity')}{' '}
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
              {CARAT_WEIGHT_HUMAN_NAMES?.[selectedOptionValue].value} ct
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
        } else if (selectedOptionValue === 'other' && productType !== 'Engagement Ring') {
          return _t('Select diamond');
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

  function getOptionHeaderName({ label, productType, collectionSlug }) {
    if (label === 'caratWeight' && productType === 'Engagement Ring') {
      return 'centerstone';
    }

    if (
      label === 'caratWeight' &&
      ['signature-duo-drop-earring', 'solitaire-stud-ear-jacket-set'].includes(collectionSlug)
    ) {
      return 'Carat weight per earring';
    }

    return label;
  }

  const labelName = getOptionHeaderName({ label, productType, collectionSlug });

  function renderDiamondTypeOptions() {
    const isCarousel = options.length > 7;

    const renderCarousel = () => (
      <>
        <div className={clsx('embla diamond-shape__slider')} ref={emblaRef}>
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
                      productType={productType}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <button
          className="carousel-arrow arrow-left"
          disabled={!emblaApi?.canScrollPrev()}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ArrowLeftIcon />
        </button>
        <button
          className="carousel-arrow arrow-right"
          disabled={!emblaApi?.canScrollNext()}
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
            productType={productType}
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
            productType={productType}
          />
        );
      });
    };

    const renderShowMoreSizesButton = () => {
      const shouldShowButton = options?.length > 5;

      return (
        !showingAllRingSizes &&
        shouldShowButton && (
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
        {options?.map((option) => {
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
              productType={productType}
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
        {options?.map((option) => {
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
              productType={productType}
            />
          );
        })}
      </div>
    );
  }

  const renderOptionsMap = {
    diamondType: renderDiamondTypeOptions,
    topDiamondShape: renderDiamondTypeOptions,
    bottomDiamondShape: renderDiamondTypeOptions,
    paveCluster: renderDiamondTypeOptions,
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
