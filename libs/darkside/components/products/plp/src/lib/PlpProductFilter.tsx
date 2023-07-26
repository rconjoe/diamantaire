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
}: {
  gridRef: MutableRefObject<HTMLDivElement>;
  availableFilters: { [key in FilterTypeProps]: string[] };
  filterValue: FilterValueProps;
  setFilterValues: Dispatch<SetStateAction<FilterValueProps>>;
}) => {
  const filterTypes = availableFilters;
  const priceRange: number[] = filterTypes?.price.map((val) => parseFloat(val)) || [0, 1000000];

  const priceRanges = [
    {
      title: 'Below $500',
      min: priceRange[0],
      max: 50000,
      slug: 'below-500',
    },
    {
      title: '$500-$1,500',
      min: 50000,
      max: 150000,
      slug: '500-1500',
    },
    {
      title: '$1,500-$3000',
      min: 150000,
      max: 300000,
      slug: '1500-3000',
    },
    {
      title: '$3000+',
      min: 300000,
      max: priceRange[1],
      slug: '3000-plus',
    },
  ];

  const [filterOptionSetOpen, setFilterOptionSetOpen] = useState<FilterTypeProps | null>(null);
  const [isCustomPricRangeOpen, setIsCustomPriceRangeOpen] = useState(false);
  const router = useRouter();
  const { headerHeight } = useGlobalContext();

  function toggleFilterOptionSet(filterSlug: FilterTypeProps) {
    if (filterOptionSetOpen === filterSlug) {
      setFilterOptionSetOpen(null);
    } else {
      setFilterOptionSetOpen(filterSlug);
    }
  }

  function updateFilter(filterType: string, value) {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter((segment) => segment !== '');
    const updatedSegments = [...pathSegments];
    const collectionURL = updatedSegments[0];

    // console.log('updatedSegments', updatedSegments);
    // console.log('newValue', value);
    const newFilters = { ...filterValue, [filterType]: value };

    // Remove attributes with undefined values
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key] === undefined) {
        delete newFilters[key];
      }
    });

    if (filterType !== 'price') {
      // Build the new URL path based on the filter values
      const sortedEntries = FACETED_NAV_ORDER.map((key) => [key, newFilters[key]]).filter(
        ([key, value]) => value !== null && key in newFilters,
      );

      console.log('sortedEntries', sortedEntries);

      const newPath = sortedEntries.map(([_key, value]) => `${value}`).join('/');

      // Construct the new URL with the updated path
      const newUrl = `${window.location.origin}/${collectionURL}/${router.query.plpSlug[0]}/${newPath}${window.location.search}`;

      // Update the browser URL
      window.history.pushState({ path: newUrl }, '', newUrl);
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
      price: {
        min: sliderValue[0],
        max: sliderValue[1],
      },
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

  return (
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
                        active: isCustomPricRangeOpen,
                      })}
                      onClick={() => setIsCustomPriceRangeOpen(!isCustomPricRangeOpen)}
                    >
                      <span className="price-text">Custom</span>
                    </button>
                  </li>
                </ul>
                {isCustomPricRangeOpen && (
                  <div className="filter-slider">
                    <Slider
                      step={100}
                      type={'price'}
                      range={priceRange}
                      value={[filterValue?.price?.min || priceRange[0], filterValue?.price?.max || priceRange[1]]}
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

                      return (
                        <li key={`${filterValue}-${text}`}>
                          <button className="price-filter-tab" onClick={() => handlePriceRangeReset()}>
                            <span className="close">x</span>
                            {price.min && makeCurrency(price?.min)}
                            {price.min && price.max && <span className="hyphen">-</span>}
                            {price && makeCurrency(price?.max)}
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
  );
};

export default PlpProductFilter;
