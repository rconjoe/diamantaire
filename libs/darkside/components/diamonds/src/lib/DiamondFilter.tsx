import {
  Heading,
  Slider,
  Tooltip,
  UIString,
  Markdown,
  MarkdownImageConfig,
} from '@diamantaire/darkside/components/common-ui';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useDiamondTableData, useHumanNameMapper, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TABLE_FILTER_CLARITY_OPTIONS,
  DIAMOND_TABLE_FILTER_COLOR_OPTIONS,
  DIAMOND_TABLE_FILTER_CUT_OPTIONS,
  DIAMOND_TABLE_FILTER_TITLES,
  DIAMOND_TABLE_SHAPES,
  getFormattedCarat,
  getFormattedPrice,
} from '@diamantaire/shared/constants';
import { getDiamondType } from '@diamantaire/shared/helpers';
import { ArrowLeftIcon, ArrowRightIcon, diamondIconsMap } from '@diamantaire/shared/icons';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import { ReactNode, useContext, useRef, useState } from 'react';

import { StyledDiamondFilter } from './DiamondFilter.style';

const SliderFilter = (props) => {
  const { locale, type, ranges, options, handleSliderFilterChange } = props;

  const range: number[] = (ranges[type] && Object.values(ranges[type])) || [];

  if (range.length !== 2 || range[0] === null || range[1] === null) return null;

  const handleChange = (value: number[]) => {
    handleSliderFilterChange(type, value);
  };

  const handleFormat = (value: number | string) => {
    if (type === 'carat') {
      const caratValue = Number(value);

      return getFormattedCarat(caratValue, locale, 1) + 'ct';
    }

    if (type === 'price') {
      return getFormattedPrice(Number(value), locale, true);
    }

    return value.toString();
  };

  const { priceMin, priceMax, caratMin, caratMax } = options;

  const priceValues = priceMin && priceMax ? [priceMin, priceMax] : null;

  const caratValues = caratMin && caratMax ? [caratMin, caratMax] : [1, range[1] + 0.1];

  const roundRange = [roundToNearest100(range[0] / 100, '-'), roundToNearest100(range[1] / 100, '+')];

  return (
    <div title={type} className="vo-filter-slider">
      {type === 'carat' && (
        <Slider
          step={0.1}
          type={type}
          range={{
            min: range[0],
            max: range[1] + 0.1,
          }}
          value={caratValues || range}
          handleChange={handleChange}
          handleFormat={handleFormat}
        />
      )}

      {type === 'price' && (
        <Slider
          step={10000}
          type={type}
          range={{
            min: roundRange[0],
            max: roundRange[1],
          }}
          value={priceValues || roundRange}
          handleChange={handleChange}
          handleFormat={handleFormat}
        />
      )}
    </div>
  );
};

const RadioFilter = (props) => {
  const { stringMap, type, ranges, options, handleRadioFilterChange, availableDiamonds } = props;

  const { isMobile } = useContext(GlobalContext);
  const [useLeftArrow, setUseLeftArrow] = useState(false);
  const [useRightArrow, setUseRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  let optionsUI,
    rangeTypes,
    shapeHandles = [];

  const colorOptions = Object.values(DIAMOND_TABLE_FILTER_COLOR_OPTIONS);

  const cutOptions = Object.values(DIAMOND_TABLE_FILTER_CUT_OPTIONS);

  const clarityOptions = Object.values(DIAMOND_TABLE_FILTER_CLARITY_OPTIONS);

  const optionsDiamondType = options?.diamondType?.split(',') || [];

  const isFancyShape = optionsDiamondType.length > 0 && !optionsDiamondType.includes('round-brilliant');

  switch (type) {
    case 'diamondType':
      rangeTypes = ranges?.diamondType;
      shapeHandles = Object.values(DIAMOND_TABLE_SHAPES);

      if (availableDiamonds) {
        shapeHandles = shapeHandles.filter((handle) => availableDiamonds.includes(handle));
      }

      optionsUI = shapeHandles
        .filter((handle) => {
          return rangeTypes?.includes(handle);
        })
        .reduce((a, v) => {
          return [...a, getDiamondType(v).slug];
        }, []);

      break;
    case 'clarity':
      optionsUI = clarityOptions;
      break;
    case 'color':
      optionsUI = colorOptions;
      break;
    case 'cut':
      optionsUI = isFancyShape ? [cutOptions[2]] : cutOptions;
      break;
  }

  const handleClick = (values) => {
    handleRadioFilterChange(type, values);

    // smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (optionUI, type) => {
    if (type === 'diamondType') {
      return optionUI.join() === options[type];
    }

    if (type === 'cut') {
      if (!options[type]) return false;

      const currentActiveOptions = options[type]?.split(',') || [];

      const option = optionUI[0];

      if (currentActiveOptions.includes(option)) return true;
    }

    if (type === 'clarity' || type === 'color') {
      if (!options[type]) return false;

      const option = optionUI.join(',');

      if (options[type].includes(option)) return true;
    }
  };

  const handleOnScroll = () => {
    if (isMobile && type === 'diamondType') {
      const scrollContainer = scrollContainerRef.current;
      const treshhold = 20;

      if (scrollContainer) {
        setUseLeftArrow(true);
        setUseRightArrow(true);

        if (scrollContainer.scrollLeft < treshhold) {
          setUseLeftArrow(false);
        } else if (scrollContainer.scrollLeft + scrollContainer.clientWidth > scrollContainer.scrollWidth - treshhold) {
          setUseRightArrow(false);
        }
      }
    }
  };

  const handleArrowClick = (direction) => {
    const scrollContainer = scrollContainerRef.current;
    const sliderItems = scrollContainer?.querySelectorAll('.vo-filter-list-item');
    const sliderPositions = Object.values(sliderItems)
      .map((v) => (v as HTMLElement).clientWidth)
      .reduce((a, v, i) => [...a, a[i] + v], [0]);
    const currentPosition = scrollContainer.scrollLeft;
    const closestValue = findClosestValue(currentPosition, sliderPositions);
    const closestValueIndex = sliderPositions.findIndex((v) => v === closestValue);
    const directionCommands = {};

    if (currentPosition < closestValue) {
      directionCommands['+'] = closestValue;
      directionCommands['-'] = sliderPositions[closestValueIndex - 1];
    } else if (currentPosition > closestValue) {
      directionCommands['+'] = sliderPositions[closestValueIndex + 1];
      directionCommands['-'] = closestValue;
    } else {
      directionCommands['+'] = sliderPositions[closestValueIndex + 1];
      directionCommands['-'] = sliderPositions[closestValueIndex - 1];
    }
    scrollContainer.scrollTo({
      top: 0,
      left: directionCommands[direction],
      behavior: 'smooth',
    });
  };

  return (
    <div className="vo-filter-radio" ref={scrollContainerRef} onScroll={handleOnScroll}>
      <ul className="vo-filter-list">
        {optionsUI.map((optionUI: string, index: number) => {
          if (type === 'diamondType') {
            const slug = optionUI;
            const title = getDiamondType(optionUI)?.title;
            const shape = diamondIconsMap[slug];

            if (!shape) return <></>;

            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive([shape.slug], 'diamondType') ? 'active' : '')}>
                <button title={title} onClick={() => handleClick([shape.slug])} name={title}>
                  <shape.icon />
                  {shape.icon2 && (
                    <div className="-pair">
                      <shape.icon2 />
                    </div>
                  )}
                </button>
              </li>
            );
          }

          if (type === 'color') {
            const colorName = stringMap?.option?.[Array.isArray(optionUI) ? optionUI.join('') : optionUI]?.value || '';

            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI, 'color') ? 'active' : '')}>
                <button onClick={() => handleClick(optionUI)} name={colorName}>
                  {colorName}
                </button>
              </li>
            );
          }

          if (type === 'cut') {
            const cutName = stringMap?.option?.[optionUI]?.value || '';

            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI, 'cut') ? 'active' : '')}>
                <button onClick={() => handleClick(optionUI)} name={cutName}>
                  {cutName}
                </button>
              </li>
            );
          }

          if (type === 'clarity') {
            const clarityName = Object.keys(stringMap?.option)?.[index] || '';

            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI, 'clarity') ? 'active' : '')}>
                <button onClick={() => handleClick(optionUI)} name={clarityName}>
                  {clarityName}
                </button>
              </li>
            );
          }
        })}
      </ul>

      {isMobile && type === 'diamondType' && (
        <>
          {useLeftArrow && (
            <div className="arrow arrow-left" onClick={() => handleArrowClick('-')}>
              <ArrowLeftIcon />
            </div>
          )}

          {useRightArrow && (
            <div className="arrow arrow-right" onClick={() => handleArrowClick('+')}>
              <ArrowRightIcon />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export interface DiamondFilterProps {
  handleRadioFilterChange: (type: string, values: string[]) => void;
  handleSliderFilterChange: (type: string, values: number[]) => void;
  options: object;
  ranges: object;
  availableDiamonds?: string[];
}

const DiamondFilter = (props: DiamondFilterProps) => {
  const { locale } = useRouter();
  const { options, ranges, handleRadioFilterChange, handleSliderFilterChange, availableDiamonds } = props;
  const { data: diamondTableData } = useDiamondTableData(locale);
  const { diamondTable } = diamondTableData || {};
  const { colorFilterBelowCopy, color, cut, clarity, carat } = diamondTable || {};
  const { data: humanNameMapperData } = useHumanNameMapper(locale);
  const { DIAMOND_CUTS } = humanNameMapperData || {};
  const { _t } = useTranslations(locale);

  const name_ = (v: string): ReactNode => {
    return v && <UIString>{v}</UIString>;
  };

  const tooltip_ = (v: string, imageConfig?: MarkdownImageConfig): ReactNode => {
    if (v) {
      if (imageConfig) {
        return (
          <Markdown withStyles={false} imageConfig={imageConfig}>
            {v}
          </Markdown>
        );
      } else {
        return <Markdown withStyles={false}>{v}</Markdown>;
      }
    }
  };

  const stringMap = {
    diamondType: {
      type: 'radio',
      name: name_('shape'),
      tooltip: null,
    },
    carat: {
      type: 'slider',
      name: name_('carat'),
      tooltip: tooltip_(carat),
      tooltipDefaultPlace: 'right',
    },
    price: {
      type: 'slider',
      name: name_('price'),
      tooltip: null,
    },
    cut: {
      type: 'radio',
      name: name_('cut'),
      tooltip: tooltip_(cut, { loading: 'eager', w: 70, h: 63, alt: _t('cut') }),
      tooltipDefaultPlace: 'right',
      option: DIAMOND_CUTS,
    },
    clarity: {
      type: 'radio',
      name: name_('clarity'),
      tooltip: tooltip_(clarity, { loading: 'eager', w: 278, h: 108, alt: _t('clarity') }),
      tooltipDefaultPlace: 'right',
      option: { VVS: { value: 'VVS' }, VS: { value: 'VS' }, SI: { value: 'SI' } },
    },
    color: {
      type: 'radio',
      name: name_('color'),
      tooltip: tooltip_(color, { loading: 'eager', w: 220, h: 87, alt: _t('color') }),
      tooltipDefaultPlace: 'right',
      belowCopy: colorFilterBelowCopy,
      option: DIAMOND_CUTS,
    },
  };

  return (
    <StyledDiamondFilter className="vo-filters">
      {DIAMOND_TABLE_FILTER_TITLES.map((filter: string) => {
        const { type, name, tooltip, tooltipDefaultPlace } = stringMap?.[filter] || {};

        return (
          <div key={filter} className={'vo-filter vo-filter-' + filter}>
            <div className="vo-filter-title">
              <Heading type="h4" className="title">
                {name}
              </Heading>

              {tooltip && (
                <Tooltip id={'tooltip-' + filter} place={tooltipDefaultPlace}>
                  {tooltip}
                </Tooltip>
              )}
            </div>

            {type === 'slider' && (
              <SliderFilter
                handleSliderFilterChange={handleSliderFilterChange}
                options={options}
                ranges={ranges}
                locale={locale}
                type={filter}
              />
            )}

            {type === 'radio' && (
              <RadioFilter
                handleRadioFilterChange={handleRadioFilterChange}
                options={options}
                stringMap={stringMap[filter]}
                ranges={ranges}
                type={filter}
                availableDiamonds={availableDiamonds}
              />
            )}
          </div>
        );
      })}
    </StyledDiamondFilter>
  );
};

export { DiamondFilter };

export default DiamondFilter;

function findClosestValue(number, array) {
  let closestValue = array[0];
  let closestDifference = Math.abs(number - closestValue);

  for (let i = 1; i < array.length; i++) {
    const difference = Math.abs(number - array[i]);

    if (difference < closestDifference) {
      closestValue = array[i];
      closestDifference = difference;
    }
  }

  return closestValue;
}

function roundToNearest100(number, type) {
  if (type === '+') {
    return Math.ceil(number / 100) * 100 * 100;
  }
  if (type === '-') {
    return Math.floor(number / 100) * 100 * 100;
  }
}
