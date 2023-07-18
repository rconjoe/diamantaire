import { Heading, Slider, Tooltip } from '@diamantaire/darkside/components/common-ui';
import { UIString } from '@diamantaire/darkside/core';
import { useDiamondTableData, useHumanNameMapper } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TABLE_FILTER_CLARITY_OPTIONS,
  DIAMOND_TABLE_FILTER_CUT_OPTIONS,
  DIAMOND_TABLE_FILTER_COLOR_OPTIONS,
  DIAMOND_TABLE_SHAPES,
  DIAMOND_TABLE_FILTER_TITLES,
} from '@diamantaire/shared/constants';
import { shopifyNumberToHumanPrice } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { clsx } from 'clsx';
import Markdown from 'markdown-to-jsx';
import { ReactNode } from 'react';

import { StyledDiamondFilter } from './DiamondFilter.style';

const SliderFilter = (props) => {
  const { countryCode, currencyCode, locale, type, ranges, options, handleSliderFilterChange } = props;

  const range: number[] = (ranges[type] && Object.values(ranges[type])) || [];

  if (range.length !== 2) return;

  const handleChange = (value: number[]) => {
    handleSliderFilterChange(type, value);
  };

  const handleFormat = (value: number | string) => {
    if (type === 'carat') {
      return value.toString() + 'ct';
    }

    if (type === 'price') {
      return shopifyNumberToHumanPrice(Number(value), locale, currencyCode, countryCode, {}, false, false, '');
    }

    return value.toString();
  };

  const values = !!options[type + 'Min'] && !!options[type + 'Max'] ? [options[type + 'Min'], options[type + 'Max']] : null;

  const step = type === 'carat' ? 0.01 : 1;

  return (
    <div title={type} className="vo-filter-slider">
      <Slider
        step={step}
        type={type}
        range={range}
        value={values || range}
        handleChange={handleChange}
        handleFormat={handleFormat}
      />
    </div>
  );
};

const RadioFilter = (props) => {
  const { stringMap, type, ranges, options, handleRadioFilterChange } = props;

  let optionsUI,
    rangeTypes,
    shapeTitles,
    shapeHandles = [];

  switch (type) {
    case 'diamondType':
      rangeTypes = ranges?.diamondType;
      shapeTitles = Object.keys(DIAMOND_TABLE_SHAPES);
      shapeHandles = Object.values(DIAMOND_TABLE_SHAPES);
      optionsUI = shapeHandles
        .filter((handle) => rangeTypes?.includes(handle))
        .reduce((a, _, i) => [...a, [shapeTitles[i]]], []);
      break;
    case 'clarity':
      optionsUI = Object.values(DIAMOND_TABLE_FILTER_CLARITY_OPTIONS);
      break;
    case 'color':
      optionsUI = Object.values(DIAMOND_TABLE_FILTER_COLOR_OPTIONS);
      break;
    case 'cut':
      optionsUI = Object.values(DIAMOND_TABLE_FILTER_CUT_OPTIONS);
      break;
  }

  const handleClick = (values) => {
    handleRadioFilterChange(type, values);
  };

  const isActive = (optionUI) => {
    return optionUI.join() === options[type];
  };

  return (
    <div className="vo-filter-radio">
      <ul className="vo-filter-list">
        {optionsUI.map((optionUI: string, index: number) => {
          if (type === 'diamondType') {
            const slug = DIAMOND_TABLE_SHAPES[optionUI[0]];
            const shape = diamondIconsMap[slug];

            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI) ? 'active' : '')}>
                <a onClick={() => handleClick(optionUI)}>
                  <shape.icon />
                </a>
              </li>
            );
          }

          if (type === 'color') {
            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI) ? 'active' : '')}>
                <a onClick={() => handleClick(optionUI)}>
                  {stringMap?.option?.[Array.isArray(optionUI) ? optionUI.join('') : optionUI]?.value || ''}
                </a>
              </li>
            );
          }

          if (type === 'cut') {
            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI) ? 'active' : '')}>
                <a onClick={() => handleClick(optionUI)}>{stringMap?.option?.[optionUI]?.value || ''}</a>
              </li>
            );
          }

          if (type === 'clarity') {
            return (
              <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI) ? 'active' : '')}>
                <a onClick={() => handleClick(optionUI)}>{Object.keys(stringMap?.option)?.[index] || ''}</a>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export interface DiamondFilterProps {
  handleRadioFilterChange: (type: string, values: string[]) => void;
  handleSliderFilterChange: (type: string, values: number[]) => void;
  loading: boolean;
  options: object;
  ranges: object;
  locale: string;
  currencyCode: string;
  countryCode: string;
}

const DiamondFilter = (props: DiamondFilterProps) => {
  const { countryCode, locale, currencyCode, options, ranges, loading, handleRadioFilterChange, handleSliderFilterChange } =
    props;

  const { data: diamondTableData } = useDiamondTableData(locale);
  const { diamondTable } = diamondTableData || {};
  const { colorFilterBelowCopy, color, cut, clarity, carat } = diamondTable || {};

  const { data: humanNameMapperData } = useHumanNameMapper(locale);
  const { DIAMOND_CUTS } = humanNameMapperData || {};

  const name_ = (v: string): ReactNode => {
    return v && <UIString>{v}</UIString>;
  };

  const tooltip_ = (v: string): ReactNode => {
    return v && <Markdown>{v}</Markdown>;
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
    },
    price: {
      type: 'slider',
      name: name_('price'),
      tooltip: null,
    },
    cut: {
      type: 'radio',
      name: name_('cut'),
      tooltip: tooltip_(cut),
      option: DIAMOND_CUTS,
    },
    clarity: {
      type: 'radio',
      name: name_('clarity'),
      tooltip: tooltip_(clarity),
      option: { VVS: { value: 'VVS' }, VS: { value: 'VS' }, SI: { value: 'SI' } },
    },
    color: {
      type: 'radio',
      name: name_('color'),
      tooltip: tooltip_(color),
      belowCopy: colorFilterBelowCopy,
      option: DIAMOND_CUTS,
    },
  };

  return (
    <StyledDiamondFilter className="vo-filters">
      {DIAMOND_TABLE_FILTER_TITLES.map((filter: string) => {
        const { type, name, tooltip, belowCopy } = stringMap?.[filter] || {};

        return (
          <div key={filter} className={'vo-filter vo-filter-' + filter}>
            <div className="vo-filter-title">
              <Heading type="h4" className="title">
                {name}
              </Heading>

              {tooltip && <Tooltip id={'tooltip-' + filter}>{tooltip}</Tooltip>}
            </div>

            {type === 'slider' && (
              <SliderFilter
                handleSliderFilterChange={handleSliderFilterChange}
                options={options}
                ranges={ranges}
                locale={locale}
                type={filter}
                countryCode={countryCode}
                currencyCode={currencyCode}
              />
            )}

            {type === 'radio' && (
              <RadioFilter
                handleRadioFilterChange={handleRadioFilterChange}
                options={options}
                stringMap={stringMap[filter]}
                ranges={ranges}
                type={filter}
              />
            )}

            {belowCopy && <div className="vo-below-copy">{belowCopy}</div>}

            {loading && <div className="vo-filter-loading" />}
          </div>
        );
      })}
    </StyledDiamondFilter>
  );
};

export { DiamondFilter };

export default DiamondFilter;
