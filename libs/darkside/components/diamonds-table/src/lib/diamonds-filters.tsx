import { Heading, Slider, Tooltip } from '@diamantaire/darkside/components/common-ui';
import {
  DIAMOND_TABLE_FILTER_CLARITY_OPTIONS,
  DIAMOND_TABLE_FILTER_CUT_OPTIONS,
  DIAMOND_TABLE_FILTER_COLOR_OPTIONS,
  DIAMOND_TABLE_SHAPES,
  DIAMOND_TABLE_FILTER_TITLES,
} from '@diamantaire/shared/constants';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { clsx } from 'clsx';

import { StyledDiamondsFilters } from './diamonds-filters.style';

const SliderFilter = (props) => {
  const { countryCode, currencyCode, locale, type, ranges, options, handleSliderFilterChange } = props;

  const range: number[] = (ranges[type] && Object.values(ranges[type])) || [];

  if (range.length !== 2) return;

  const handleChange = (value: number[]) => {
    const sliderValue = Array.isArray(value) ? value : [value];

    handleSliderFilterChange(type, sliderValue);
  };

  const values = !!options[type + 'Min'] && !!options[type + 'Max'] ? [options[type + 'Min'], options[type + 'Max']] : null;

  return (
    <div title={type} className="vo-filter-slider">
      <Slider
        locale={locale}
        type={type}
        handleChange={handleChange}
        range={range}
        value={values}
        step={type === 'carat' ? 0.01 : 1}
        currencyCode={currencyCode}
        countryCode={countryCode}
      />
    </div>
  );
};

const RadioFilter = (props) => {
  const { type, ranges, options, handleRadioFilterChange } = props;

  let optionsUI = [];

  const rangesType = ranges?.type;

  switch (type) {
    case 'diamondType':
      optionsUI = Object.keys(DIAMOND_TABLE_SHAPES)
        .filter((k) => rangesType?.includes(k))
        .reduce((a, v) => [...a, [v]], []);
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
      <ul className={clsx('vo-filter-list', 'vo-filter-list-' + type)}>
        {optionsUI.map((optionUI: string[], index: number) => {
          // SHAPES
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

          // COLORS, CUTS, CLARITIES
          return (
            <li key={index} className={clsx('vo-filter-list-item', isActive(optionUI) ? 'active' : '')}>
              <a onClick={() => handleClick(optionUI)}>{optionUI}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export interface DiamondsFiltersProps {
  handleRadioFilterChange: (type: string, values: string[]) => void;
  handleSliderFilterChange: (type: string, values: number[]) => void;
  loading: boolean;
  options: object;
  ranges: object;
  locale: string;
  currencyCode: string;
  countryCode: string;
}

const DiamondsFilters = (props: DiamondsFiltersProps) => {
  const { countryCode, locale, currencyCode, options, ranges, loading, handleRadioFilterChange, handleSliderFilterChange } =
    props;

  const withSlider = (filter: string) => ['carat', 'price'].includes(filter);

  const withRadio = (filter: string) => !['carat', 'price'].includes(filter);

  return (
    <StyledDiamondsFilters className="vo-filters">
      {DIAMOND_TABLE_FILTER_TITLES.map((filter: string) => {
        return (
          <div key={filter} className="vo-filter">
            <div className="vo-filter-title">
              <Heading type="h4" className="title">
                {filter}
              </Heading>

              <Tooltip id={'tooltip-' + filter}>content goes here</Tooltip>
            </div>

            {withSlider(filter) && (
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

            {withRadio(filter) && (
              <RadioFilter
                handleRadioFilterChange={handleRadioFilterChange}
                options={options}
                ranges={ranges}
                type={filter}
              />
            )}

            {loading && <div className="vo-filter-loading" />}
          </div>
        );
      })}
    </StyledDiamondsFilters>
  );
};

export { DiamondsFilters };

export default DiamondsFilters;
