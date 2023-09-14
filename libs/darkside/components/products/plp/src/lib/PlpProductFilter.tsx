import { Slider } from '@diamantaire/darkside/components/common-ui';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_TYPE_HUMAN_NAMES, FACETED_NAV_ORDER, METAL_HUMAN_NAMES } from '@diamantaire/shared/constants';
import { makeCurrency, removeUrlParameter, updateUrlParameter } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';

import { PlpProductFilterStyles } from './PlpProductFilter.style';

const PlpProductFilter = ({
  availableFilters,
  filterValue,
  setFilterValues,
  isParamBased,
}: {
  gridRef: MutableRefObject<HTMLDivElement>;
  availableFilters: { [key in FilterTypeProps]: string[] };
  filterValue: FilterValueProps;
  setFilterValues: Dispatch<SetStateAction<FilterValueProps>>;
  isParamBased: boolean;
}) => {
  console.log(filterValue);
  const router = useRouter();
  const [plpSlug] = router.query.plpSlug;
  const filterTypes = availableFilters;
  const priceRange: number[] = filterTypes?.price.map((val) => parseFloat(val)) || [0, 1000000];

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

  const [filterOptionSetOpen, setFilterOptionSetOpen] = useState<FilterTypeProps | null>(null);
  const [isCustomPriceRangeOpen, setIsCustomPriceRangeOpen] = useState(false);
  const { headerHeight } = useGlobalContext();

  function toggleFilterOptionSet(filterSlug: FilterTypeProps) {
    if (filterOptionSetOpen === filterSlug) {
      setFilterOptionSetOpen(null);
    } else {
      setFilterOptionSetOpen(filterSlug);
    }
  }

  function updateFilter(filterType: string, value) {
    const newFilters = { ...filterValue, [filterType]: value };

    // Remove attributes with undefined values
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] === undefined) {
        delete newFilters[key];
      }
    });

    if (filterType !== 'price') {
      // Update the browser URL
      if (!isParamBased) {
        // Build the new URL path based on the filter values
        const sortedQParams = Object.entries(newFilters)
          .sort(([k], [k2]) => (k > k2 ? 1 : 0))
          .reduce((acc: Record<string, string | number>, [k, v]: [string, string | { min?: number; max?: number }]) => {
            if (k === 'price' && typeof v === 'object') {
              if (v.min) acc['priceMin'] = v.min;
              if (v.max) acc['priceMax'] = v.max;
            } else if (!FACETED_NAV_ORDER.includes(k) && typeof v === 'string') {
              acc[k] = v;
            }

            return acc;
          }, {});

        // Construct the new URL with the updated path
        router.push(
          {
            pathname: router.pathname,
            query: { plpSlug: [plpSlug], ...sortedQParams },
          },
          undefined,
          { shallow: true },
        );
      } else {
        // Param Filter Behavior
        const sortedPathEntries = FACETED_NAV_ORDER.map((key) => [key, newFilters[key]])
          .filter(([key, v]) => v !== null && key in newFilters)
          .map(([, v]) => v);

        const sortedQParams = Object.entries(newFilters)
          .sort(([k], [k2]) => (k > k2 ? 1 : 0))
          .reduce((acc: Record<string, string | number>, [k, v]: [string, string | { min?: number; max?: number }]) => {
            if (k === 'price' && typeof v === 'object') {
              if (v.min) acc['priceMin'] = v.min;
              if (v.max) acc['priceMax'] = v.max;
            } else if (!FACETED_NAV_ORDER.includes(k) && typeof v === 'string') {
              acc[k] = v;
            }

            return acc;
          }, {});

        router.push({
          pathname: router.pathname,
          query: {
            plpSlug: [plpSlug, ...sortedPathEntries],
            ...sortedQParams,
          },
        });
      }
    } else {
      handleSliderURLUpdate(value.min, value.max);
    }

    setFilterValues(newFilters);
  }

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

  function handleSliderURLUpdate(min, max) {
    if (min && min !== priceRange[0]) {
      updateUrlParameter('priceMin', min);
    } else {
      removeUrlParameter('priceMin');
    }

    if (max && max !== priceRange[1]) {
      updateUrlParameter('priceMax', max);
    } else {
      removeUrlParameter('priceMax');
    }
  }

  const renderCustomPriceRange = (price: { min?: number; max?: number }) => {
    return (
      <>
        {price.min && makeCurrency(price?.min)}
        {price.min && price.max && <span className="hyphen">-</span>}
        {price && makeCurrency(price?.max)}
      </>
    );
  };

  return (
    availableFilters && (
      <PlpProductFilterStyles headerHeight={headerHeight}>
        <div className="filter__sticky-container">
          <div className="filter container-wrapper ">
            <div className="filter__header flex align-center">
              <div className="filter__title">
                <h4>Filter</h4>
              </div>

              <ul className="list-unstyled flex filter__options">
                {filterTypes &&
                  Object.keys(filterTypes)?.map((optionSet, index) => {
                    return (
                      <li className={clsx('filter__option-selector', optionSet)} key={`option-set-${optionSet}-${index}`}>
                        <button
                          className={clsx({
                            active: filterOptionSetOpen === optionSet,
                          })}
                          onClick={() => toggleFilterOptionSet(optionSet as FilterTypeProps)}
                        >
                          {optionSet} <span className="arrow-up"></span>
                        </button>
                      </li>
                    );
                  })}
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
                          <button className="flex align-center" onClick={() => updateFilter('diamondType', diamondType)}>
                            <span className="diamond-icon">
                              <Icon />
                            </span>
                            <span className="diamond-text">{DIAMOND_TYPE_HUMAN_NAMES[diamondType]}</span>
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
                          <button className="flex align-center" onClick={() => updateFilter('metal', metal)}>
                            <span className={clsx('metal-swatch', metal)}></span>
                            <span className="metal-text">{METAL_HUMAN_NAMES[metal]}</span>
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
                        value={[filterValue?.price.min || priceRange[0], filterValue?.price.max || priceRange[1]]}
                        handleChange={handleChange}
                        handleFormat={handleFormat}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="active-filters">
                <ul className="list-unstyled flex">
                  {filterValue &&
                    Object.keys(filterValue).map((filterType) => {
                      const isMetal = filterType === 'metal';
                      const isDiamondType = filterType === 'diamondType';
                      const isPrice = filterType === 'price';
                      const text = isMetal
                        ? METAL_HUMAN_NAMES[filterValue[filterType]]
                        : isDiamondType
                        ? DIAMOND_TYPE_HUMAN_NAMES[filterValue[filterType]]
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
            </div>
          </div>
        </div>
      </PlpProductFilterStyles>
    )
  );
};

export default PlpProductFilter;
