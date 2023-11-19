import { Slider, UIString } from '@diamantaire/darkside/components/common-ui';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  JEWELRY_SUB_CATEGORY_HUMAN_NAMES,
  METALS_IN_HUMAN_NAMES,
  METAL_HUMAN_NAMES,
  RING_STYLES_MAP,
  ringStylesWithIconMap,
} from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { FilterIcon, diamondIconsMap } from '@diamantaire/shared/icons';
import { FilterTypeProps } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

const PlpAllFilterOptionsStyles = styled.div``;

const priceRanges = [
  {
    title: 'Below $500',
    min: undefined, //priceRange[0],
    max: 50000,
    slug: 'below-50000',
  },
  {
    title: '$500-$1,500',
    min: 50000,
    max: 150000,
    slug: '50000-150000',
  },
  {
    title: '$1,500-$3000',
    min: 150000,
    max: 300000,
    slug: '150000-300000',
  },
  {
    title: '$3000+',
    min: 300000,
    max: undefined, // priceRange[1],
    slug: '300000-plus',
  },
];

const PlpAllFilterOptions = ({
  filterTypes,
  filterOptionSetOpen,
  toggleFilterOptionSet,
  filterValue,
  updateFilter,
  handleSliderURLUpdate,
  setFilterValues,
}) => {
  const [isCustomPriceRangeOpen, setIsCustomPriceRangeOpen] = useState(false);

  const priceRange: number[] = filterTypes?.price.map((val) => parseFloat(val)) || [0, 1000000];

  const renderCustomPriceRange = (price: { min?: number; max?: number }) => {
    return (
      <>
        {price.min && makeCurrency(price?.min)}
        {price.min && price.max && <span className="hyphen">-</span>}
        {price && makeCurrency(price?.max)}
      </>
    );
  };

  const isAnyFilterActive = useMemo(() => {
    return filterValue && Object.values(filterValue).some((value) => value !== null);
  }, [filterValue]);

  const handleFormat = (value: number | string) => {
    return makeCurrency(value);
  };

  const handleChange = (value: number[]) => {
    const sliderValue = Array.isArray(value) ? value : [value];

    const newFilters = {
      ...filterValue,
      price: { min: sliderValue[0], max: sliderValue[1] },
    };

    setFilterValues(newFilters);

    handleSliderURLUpdate(sliderValue[0], sliderValue[1]);
  };

  function handlePriceRangeReset() {
    handleChange(priceRange);
  }

  return (
    <PlpAllFilterOptionsStyles>
      <div className="filter">
        <div className="filter__header flex align-center">
          <div className="filter__title">
            <h4>Filter</h4>
          </div>
          <div className="filter__icon">
            <FilterIcon />
          </div>

          <ul className="list-unstyled flex filter__options">
            {filterTypes &&
              Object.keys(filterTypes)?.map((optionSet, index) => {
                // Hide filters with no options
                if (filterTypes[optionSet]?.length === 0) return null;

                return (
                  <li className={clsx('filter__option-selector', optionSet)} key={`option-set-${optionSet}-${index}`}>
                    <button
                      className={clsx({
                        active: filterOptionSetOpen === optionSet,
                      })}
                      onClick={() => toggleFilterOptionSet(optionSet as FilterTypeProps)}
                    >
                      <UIString>{optionSet.replace('subStyles', 'Styles').replace('styles', 'Styles')}</UIString>{' '}
                      <span className="arrow-up"></span>
                    </button>
                  </li>
                );
              })}
            <li className="mobile-filter-toggle">
              <button>
                <UIString>more</UIString>
              </button>
            </li>
          </ul>
        </div>

        <div className="filter__body">
          {filterOptionSetOpen === 'diamondType' && (
            <div className="filter-option-set diamondType ">
              <ul className="list-unstyled flex">
                {filterTypes['diamondType']?.map((diamondType) => {
                  const Icon = diamondIconsMap[diamondType]?.icon;

                  if (diamondType.includes('+')) return null;

                  return (
                    <li key={`filter-${diamondType}`}>
                      <button
                        className={clsx('flex align-center', {
                          active: filterValue['diamondType'] === diamondType,
                        })}
                        onClick={() => updateFilter('diamondType', diamondType)}
                      >
                        <span className="diamond-icon">
                          <Icon />
                        </span>
                        {/* We might want this later ;) - @div */}
                        {/* <span className="diamond-text">{DIAMOND_TYPE_HUMAN_NAMES[diamondType]}</span> */}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {filterOptionSetOpen === 'metal' && (
            <div className="filter-option-set metal">
              <ul className="list-unstyled flex ">
                {filterTypes['metal']?.map((metal) => {
                  return (
                    <li key={`filter-${metal}`}>
                      <button
                        className={clsx('flex align-center', {
                          active: filterValue['metal'] === metal,
                        })}
                        onClick={() => updateFilter('metal', metal)}
                      >
                        <span className={clsx('metal-swatch', metal)}></span>
                        <span className="metal-text">{METALS_IN_HUMAN_NAMES[metal]}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {filterOptionSetOpen === 'price' && (
            <div className="filter-option-set priceRange">
              <ul className="list-unstyled flex ">
                {priceRanges?.map((price) => {
                  return (
                    <li key={`filter-${price.title}`}>
                      <button
                        className="flex align-center"
                        onClick={() => {
                          setIsCustomPriceRangeOpen(false);
                          updateFilter('price', {
                            min: price.min,
                            max: price.max,
                          });
                        }}
                      >
                        <span className="price-text">{price.title}</span>
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    className={clsx('flex align-center', {
                      active: isCustomPriceRangeOpen,
                    })}
                    onClick={() => setIsCustomPriceRangeOpen(!isCustomPriceRangeOpen)}
                  >
                    <span className="price-text">Custom</span>
                  </button>
                </li>
              </ul>
              {isCustomPriceRangeOpen && (
                <div className="filter-slider">
                  <Slider
                    step={100}
                    type={'price'}
                    range={{
                      min: priceRange[0],
                      max: priceRange[1],
                    }}
                    value={[filterValue?.price?.min || priceRange[0], filterValue?.price?.max || priceRange[1]]}
                    handleChange={handleChange}
                    handleFormat={handleFormat}
                  />
                </div>
              )}
            </div>
          )}

          {filterOptionSetOpen === 'styles' && (
            <div className="filter-option-set styles ">
              <ul className="list-unstyled flex">
                {filterTypes['styles']?.map((ringStyle) => {
                  const Icon = ringStylesWithIconMap?.[ringStyle]?.icon;

                  if (ringStyle.includes('+')) return null;
                  if (!Icon) return <p>icon missing for {ringStyle}</p>;

                  return (
                    <li key={`filter-${ringStyle}`}>
                      <button className="flex align-center" onClick={() => updateFilter('style', ringStyle)}>
                        <span className="setting-icon">
                          <Icon />
                        </span>
                        <span className="diamond-text">{RING_STYLES_MAP[ringStyle]} </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {filterOptionSetOpen === 'subStyles' && (
            <div className="filter-option-set styles ">
              <ul className="list-unstyled flex">
                {filterTypes['subStyles']?.map((style) => {
                  return (
                    <li key={`filter-${style}`}>
                      <button className="flex align-center" onClick={() => updateFilter('subStyle', style)}>
                        <span className="subStyle-text">{JEWELRY_SUB_CATEGORY_HUMAN_NAMES[style] || style} </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {isAnyFilterActive && (
            <div className="active-filters">
              <ul className="list-unstyled flex">
                {filterValue &&
                  Object.keys(filterValue).map((filterType) => {
                    // This could be better.....
                    const isMetal = filterType === 'metal';
                    const isDiamondType = filterType === 'diamondType';
                    const isPrice = filterType === 'price';
                    const isStyle = filterType === 'style';
                    const isSubStyle = filterType === 'subStyle';

                    const text = isMetal
                      ? METAL_HUMAN_NAMES[filterValue[filterType]]
                      : isDiamondType
                      ? DIAMOND_TYPE_HUMAN_NAMES[filterValue[filterType]]
                      : isStyle
                      ? RING_STYLES_MAP[filterValue[filterType]]
                      : isSubStyle
                      ? JEWELRY_SUB_CATEGORY_HUMAN_NAMES[filterValue[filterType]]
                      : filterType;

                    if (filterValue[filterType] === null) return null;

                    if (isPrice) {
                      const price = filterValue[filterType];

                      const priceRangeMatchesInitialState = price?.min === priceRange[0] && price?.max === priceRange[1];

                      if (priceRangeMatchesInitialState) return null;

                      // generate slug to match predefined filters
                      const selectedPriceSlug = `${price?.min ? price.min : 'below'}-${price?.max ? price.max : 'plus'}`;
                      const priceLabel = priceRanges.find((r) => r.slug === selectedPriceSlug)?.title;

                      return (
                        <li key={`${filterValue}-${text}`}>
                          <button className="price-filter-tab" onClick={() => handlePriceRangeReset()}>
                            <span className="close">x</span>
                            {priceLabel ? priceLabel : renderCustomPriceRange(price)}
                          </button>
                        </li>
                      );
                    } else {
                      return (
                        <li key={`${filterValue}-${text}`}>
                          <button onClick={() => updateFilter(filterType, undefined)}>
                            <span className="close">x</span> {text}
                          </button>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </PlpAllFilterOptionsStyles>
  );
};

export default PlpAllFilterOptions;
