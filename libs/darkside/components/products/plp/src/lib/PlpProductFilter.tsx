import { Slider, UIString } from '@diamantaire/darkside/components/common-ui';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  FACETED_NAV_ORDER,
  METAL_HUMAN_NAMES,
  RING_STYLES_MAP,
  ringStylesWithIconMap,
  JEWELRY_SUB_CATEGORY_HUMAN_NAMES,
} from '@diamantaire/shared/constants';
import { makeCurrency, removeUrlParameter, updateUrlParameter } from '@diamantaire/shared/helpers';
import { diamondIconsMap } from '@diamantaire/shared/icons';
import { PlpBasicFieldSortOption } from '@diamantaire/shared/types';
import { FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';

import { PlpProductFilterStyles } from './PlpProductFilter.style';
import { SortProperties } from './PlpSortOption';
import { PlpSortOptions } from './PlpSortOptions';

const PlpProductFilter = ({
  availableFilters,
  filterValue,
  setFilterValues,
  urlFilterMethod,
  plpSlug,
  sortOptions,
  handleSortChange,
}: {
  gridRef: MutableRefObject<HTMLDivElement>;
  availableFilters: { [key in FilterTypeProps]: string[] };
  filterValue: FilterValueProps;
  setFilterValues: Dispatch<SetStateAction<FilterValueProps>>;
  plpSlug: string;
  urlFilterMethod: 'facet' | 'param' | 'none';
  sortOptions?: PlpBasicFieldSortOption[];
  handleSortChange: ({ id, sortBy, sortOrder }: SortProperties) => void;
}) => {
  const router = useRouter();
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
    console.log('urlFilterMethodxxxx', urlFilterMethod);
    const newFilters = { ...filterValue, [filterType]: value };

    // Remove attributes with undefined values
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] === undefined) {
        delete newFilters[key];
      }
    });

    if (filterType !== 'price') {
      // Update the browser URL
      if (urlFilterMethod === 'param') {
        // Build the new URL path based on the filter values
        console.log('newFilters', newFilters);
        const sortedQParams = Object.entries(newFilters)
          .sort(([k], [k2]) => (k > k2 ? 1 : 0))
          .reduce((acc: Record<string, string | number>, [k, v]: [string, string | { min?: number; max?: number }]) => {
            if (FACETED_NAV_ORDER.includes(k) && typeof v === 'string') {
              acc[k] = v;
            }

            return acc;
          }, {});

        // Construct the new URL with the updated path
        router.push(
          {
            pathname: router.pathname,
            query: { plpSlug: plpSlug[0], ...sortedQParams },
          },
          undefined,
          { shallow: true },
        );
      } else if (urlFilterMethod === 'facet') {
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
            // For faceted nav, we only want the base slug, not the full path
            plpSlug: [plpSlug?.[0], ...sortedPathEntries],
            ...sortedQParams,
          },
        });
      } else {
        // No URL update
      }
    } else {
      if (urlFilterMethod !== 'none') {
        handleSliderURLUpdate(value.min, value.max);
      }
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
          <div className="filter__wrapper container-wrapper">
            <div className="filter">
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
                            <UIString>{optionSet}</UIString> <span className="arrow-up"></span>
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
                              <span className="subStyle-text">{JEWELRY_SUB_CATEGORY_HUMAN_NAMES[style]} </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

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
              </div>
            </div>
            <div className="sort-container">
              {sortOptions && <PlpSortOptions sortOptions={sortOptions} onSortOptionChange={handleSortChange} />}
            </div>
          </div>
        </div>
      </PlpProductFilterStyles>
    )
  );
};

export default PlpProductFilter;
