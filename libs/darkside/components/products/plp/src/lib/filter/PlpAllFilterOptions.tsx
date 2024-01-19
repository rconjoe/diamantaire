import { Heading, Slider, UIString } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  JEWELRY_SUB_CATEGORY_HUMAN_NAMES,
  METALS_IN_HUMAN_NAMES,
  METAL_HUMAN_NAMES,
  PLP_PRICE_RANGES,
  RING_STYLES_MAP,
  formatPrice,
  getFormattedPrice,
  ringStylesWithIconMap,
} from '@diamantaire/shared/constants';
import { FilterIcon, diamondIconsMap } from '@diamantaire/shared/icons';
import { FilterTypeProps } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

const PlpAllFilterOptionsStyles = styled.div`
  width: 100%;
  .filter__body {
    width: 100%;
  }
`;

const PlpAllFilterOptions = ({
  filterTypes,
  filterOptionSetOpen,
  toggleFilterOptionSet,
  filterValue,
  updateFilter,
  handleSliderURLUpdate,
  setFilterValues,
  setIsMobileFilterOpen,
}) => {
  const [isCustomPriceRangeOpen, setIsCustomPriceRangeOpen] = useState(false);

  const priceRange: number[] = filterTypes?.price?.map((val) => parseFloat(val)) || [0, 1000000];

  const router = useRouter();

  const { locale, asPath, pathname } = router;

  const renderCustomPriceRange = (price: { min?: number; max?: number }) => {
    return (
      <>
        {price.min && getFormattedPrice(price?.min, locale)}
        {price.min && price.max && <span className="hyphen">-</span>}
        {price && getFormattedPrice(price?.max, locale)}
      </>
    );
  };

  const isAnyFilterActive = true;

  const handleFormat = (value: number | string) => {
    const num = Number(value);

    return getFormattedPrice(num, locale);
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
    const newFilters = { ...filterValue };

    delete newFilters.price;

    setFilterValues(newFilters);
  }

  const isDiamondFirstFlow = asPath.includes('diamond-to-setting');

  return (
    <PlpAllFilterOptionsStyles>
      <div className="filter">
        <div className="filter__header flex align-center">
          <div className="filter__title">
            <Heading type="h4">
              <UIString>Filter</UIString>:
            </Heading>
          </div>

          <div className="filter__icon">
            <button onClick={() => setIsMobileFilterOpen(true)}>
              <FilterIcon />
            </button>
          </div>

          <ul className="list-unstyled flex filter__options">
            {filterTypes &&
              Object.keys(filterTypes)?.map((optionSet, index) => {
                // Hide filters with no options
                if (filterTypes[optionSet]?.length < 2) {
                  return null;
                }

                // Check diamondType count as + diamonds are removed
                if (
                  (optionSet === 'diamondType' &&
                    filterTypes[optionSet]?.filter((item) => !item.includes('+')).length < 2) ||
                  (optionSet === 'diamondType' && isDiamondFirstFlow)
                ) {
                  return null;
                }

                if ((optionSet === 'styles' && pathname.includes('/jewelry/')) || pathname.includes('/wedding-bands/')) {
                  return null;
                }

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
          </ul>
        </div>

        <div className="filter__body">
          {filterOptionSetOpen === 'diamondType' && !isDiamondFirstFlow && (
            <div className="filter-option-set diamondType ">
              <ul className="list-unstyled flex">
                {filterTypes['diamondType']?.map((diamondType) => {
                  const Icon = diamondIconsMap[diamondType]?.icon;

                  if (diamondType.includes('+')) {
                    return null;
                  }

                  return (
                    <li key={`filter-${diamondType}`}>
                      <button
                        className={clsx('flex align-center', {
                          active: filterValue['diamondType']?.includes(diamondType),
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
                          active: filterValue['metal']?.includes(metal),
                        })}
                        onClick={() => updateFilter('metal', metal)}
                      >
                        <span className={clsx('metal-swatch', metal)}></span>
                        <span className="metal-text">
                          <UIString types={[humanNamesMapperType.METALS_IN_HUMAN_NAMES]}>{metal}</UIString>
                        </span>
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
                {PLP_PRICE_RANGES.map((price) => {
                  const priceArray = [
                    ...(price.min ? [formatPrice(price.min, locale).trim()] : []),
                    ...(price.max ? [formatPrice(price.max, locale).trim()] : []),
                  ];

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
                        <span className="price-text">
                          <UIString replacements={priceArray}>{price.slug}</UIString>
                        </span>
                      </button>
                    </li>
                  );
                })}
                <li>
                  <button
                    className={clsx('flex align-center', {
                      active: isCustomPriceRangeOpen,
                    })}
                    onClick={() => {
                      handlePriceRangeReset();
                      setIsCustomPriceRangeOpen(!isCustomPriceRangeOpen);
                    }}
                  >
                    <span className="price-text">
                      <UIString>custom</UIString>
                    </span>
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

                  return (
                    <li key={`filter-${ringStyle}`}>
                      <button
                        className={clsx('flex align-center', {
                          active: filterValue['style']?.includes(ringStyle),
                        })}
                        onClick={() => updateFilter('style', ringStyle)}
                      >
                        <span className="setting-icon">
                          <Icon />
                        </span>
                        <span className="diamond-text">
                          <UIString types={[humanNamesMapperType.BAND_WIDTH_HUMAN_NAMES]}>
                            {RING_STYLES_MAP[ringStyle]}
                          </UIString>
                        </span>
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
                {filterTypes['subStyles']?.map((style) => (
                  <li key={`filter-${style}`}>
                    <button
                      className={clsx('flex align-center', {
                        active: filterValue['subStyle']?.includes(style.toLowerCase()),
                      })}
                      onClick={() => updateFilter('subStyle', style)}
                    >
                      <span className="subStyle-text">
                        <UIString>{JEWELRY_SUB_CATEGORY_HUMAN_NAMES[style] || style}</UIString>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isAnyFilterActive && (
            <div className="active-filters">
              <ul className="list-unstyled flex">
                {filterValue &&
                  Object.keys(filterValue).map((filterType) => {
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

                    if (!filterValue[filterType] || filterValue[filterType]?.length === 0) {
                      return null;
                    }

                    if (isPrice) {
                      const price = filterValue[filterType];

                      const priceRangeMatchesInitialState = price?.min === priceRange[0] && price?.max === priceRange[1];

                      if (priceRangeMatchesInitialState) return null;

                      const min = (price?.min && price?.min / 100) || 'below';

                      const max = (price?.max && price?.max / 100) || 'plus';

                      const selectedPriceSlug = `${min}-${max}`;

                      const selectedPrice = PLP_PRICE_RANGES.find((v) => v.slug === selectedPriceSlug);

                      const priceArray = [
                        ...(price.min ? [formatPrice(price.min, locale).trim()] : []),
                        ...(price.max ? [formatPrice(price.max, locale).trim()] : []),
                      ];

                      return (
                        <li key={`${filterValue}-${text}`}>
                          <button className="price-filter-tab" onClick={() => handlePriceRangeReset()}>
                            <span className="close">x</span>
                            {selectedPrice ? (
                              <UIString replacements={priceArray}>{selectedPriceSlug}</UIString>
                            ) : (
                              renderCustomPriceRange(price)
                            )}
                          </button>
                        </li>
                      );
                    } else {
                      const filterValueArray = Array.isArray(filterValue[filterType])
                        ? filterValue[filterType]
                        : [filterValue[filterType]];

                      return filterValueArray.map((val, index) => {
                        let title;

                        if (Object.keys(DIAMOND_TYPE_HUMAN_NAMES).includes(val)) {
                          title = <UIString types={[humanNamesMapperType.DIAMOND_SHAPES]}>{val}</UIString>;
                        } else if (METALS_IN_HUMAN_NAMES[val]) {
                          title = (
                            <UIString types={[humanNamesMapperType.METALS_IN_HUMAN_NAMES]}>
                              {METALS_IN_HUMAN_NAMES[val]}
                            </UIString>
                          );
                        } else {
                          title = <UIString>{val}</UIString>;
                        }

                        return (
                          <li key={`${filterValue}-${text}-${index}`}>
                            <button onClick={() => updateFilter(filterType, val)}>
                              <span className="close">x</span>
                              {title}
                            </button>
                          </li>
                        );
                      });
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
