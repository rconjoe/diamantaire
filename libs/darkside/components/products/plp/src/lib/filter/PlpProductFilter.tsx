import { FACETED_NAV_ORDER } from '@diamantaire/shared/constants';
import { removeUrlParameter, updateUrlParameter } from '@diamantaire/shared/helpers';
import { FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Dispatch, MutableRefObject, SetStateAction, useState } from 'react';

import PlpAllFilterOptions from './PlpAllFilterOptions';
import PlpMobileFilter from './PlpMobileFilter';
import { PlpProductFilterStyles } from './PlpProductFilter.style';
import PlpSpecificFilterOptions from './PlpSpecificFilterOptions';

type PriceType = {
  min?: number;
  max?: number;
};

const PlpProductFilter = ({
  availableFilters,
  filterValue,
  setFilterValues,
  urlFilterMethod,
  plpSlug,
  filterOptionsOverride,
}: {
  gridRef: MutableRefObject<HTMLDivElement>;
  availableFilters: { [key in FilterTypeProps]: string[] };
  filterValue: FilterValueProps;
  setFilterValues: Dispatch<SetStateAction<FilterValueProps>>;
  plpSlug: string;
  urlFilterMethod: 'facet' | 'param' | 'none';
  filterOptionsOverride?: {
    filterLabel: string;
    filterValue: string;
  }[];
}) => {
  const router = useRouter();
  const filterTypes = availableFilters;
  const priceRange: number[] = filterTypes?.price.map((val) => parseFloat(val)) || [0, 1000000];
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  console.log('filterOptions', filterOptionsOverride);

  const [filterOptionSetOpen, setFilterOptionSetOpen] = useState<FilterTypeProps | null>(null);

  function toggleFilterOptionSet(filterSlug: FilterTypeProps) {
    if (filterOptionSetOpen === filterSlug) {
      setFilterOptionSetOpen(null);
    } else {
      setFilterOptionSetOpen(filterSlug);
    }
  }

  function updateFilter(filterType: string, value) {
    // Reset all filters
    if (filterType === 'all') {
      setFilterValues({});

      return router.push({
        pathname: router.query.plpSlug.toString(),
      });
    }

    // const newFilters = { ...filterValue, [filterType]: value };

    // // Remove attributes with undefined values
    // Object.keys(newFilters).forEach((key) => {
    //   if (newFilters[key] === undefined || newFilters[key] === null) {
    //     delete newFilters[key];
    //   }
    // });

    if (filterType !== 'price') {
      // Push multiple filters to the URL

      console.log('check val', filterValue[filterType], filterValue, filterType);

      let newFilterValue = filterValue[filterType];

      if (!newFilterValue || newFilterValue.length === 0) {
        newFilterValue = [value];
      } else if (newFilterValue.includes(value)) {
        // update newFilterValue to remove the value
        newFilterValue = newFilterValue.filter((val) => val !== value || val === undefined || val === null);
      } else {
        newFilterValue.push(value);
      }

      console.log('newFilterValue', newFilterValue);

      const newFilters = { ...filterValue, [filterType]: newFilterValue };

      // Update the browser URL
      if (urlFilterMethod === 'param') {
        // Build the new URL path based on the filter values
        console.log('newFilters', newFilters);
        const sortedQParams = Object.entries(newFilters)
          .sort(([k1], [k2]) => (k1 > k2 ? 1 : 0))
          .reduce((acc: Record<string, string | number>, [k, v]: [string, string[] | { min?: number; max?: number }]) => {
            if (k === 'price' && typeof v === 'object') {
              const { min, max } = (v as PriceType) || {};

              if (min) acc['priceMin'] = min;
              if (max) acc['priceMax'] = max;
            } else if (
              FACETED_NAV_ORDER.includes(k) &&
              Array.isArray(v) &&
              v.every((item: string) => typeof item === 'string') &&
              v.length > 0
            ) {
              acc[k] = v.join(',');
            }

            return acc;
          }, {});

        setFilterValues(newFilters);

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
          .reduce(
            (acc: Record<string, string | number>, [k, v]: [string, string | string[] | { min?: number; max?: number }]) => {
              if (k === 'price' && typeof v === 'object') {
                const { min, max } = (v as PriceType) || {};

                if (min) acc['priceMin'] = min;
                if (max) acc['priceMax'] = max;
              } else if (!FACETED_NAV_ORDER.includes(k) && typeof v === 'string') {
                acc[k] = v;
              }

              return acc;
            },
            {},
          );

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
    availableFilters && (
      <PlpProductFilterStyles>
        <div className="filter__sticky-container">
          <div
            className={clsx('filter__wrapper container-wrapper', {
              'specific-filter-options': filterOptionsOverride?.length > 0,
            })}
          >
            {filterOptionsOverride?.length > 0 ? (
              <PlpSpecificFilterOptions
                filterTypes={filterTypes}
                filterValue={filterValue}
                updateFilter={updateFilter}
                filterOptionsOverride={filterOptionsOverride}
              />
            ) : (
              <PlpAllFilterOptions
                filterTypes={filterTypes}
                filterOptionSetOpen={filterOptionSetOpen}
                toggleFilterOptionSet={toggleFilterOptionSet}
                filterValue={filterValue}
                updateFilter={updateFilter}
                setFilterValues={setFilterValues}
                handleSliderURLUpdate={handleSliderURLUpdate}
                setIsMobileFilterOpen={setIsMobileFilterOpen}
              />
            )}
            {isMobileFilterOpen && (
              <PlpMobileFilter
                filterTypes={filterTypes}
                filterValue={filterValue}
                updateFilter={updateFilter}
                handleSliderURLUpdate={handleSliderURLUpdate}
                close={() => setIsMobileFilterOpen(false)}
              />
            )}
          </div>
        </div>
      </PlpProductFilterStyles>
    )
  );
};

export default PlpProductFilter;
