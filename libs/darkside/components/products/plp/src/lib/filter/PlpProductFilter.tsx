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
  subcategoryFilter,
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
  subcategoryFilter;
}) => {
  const router = useRouter();
  const filterTypes = availableFilters;
  const priceRange: number[] = filterTypes?.price.map((val) => parseFloat(val)) || [0, 1000000];
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

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

      if (urlFilterMethod === 'param') {
        return router.push({
          pathname: router.query.plpSlug.toString(),
          query: {},
        });
      } else {
        // for facet nav, give us the path without the filters
        return router.push({
          pathname: router.query.plpSlug[0],
        });
      }
    }

    let newFilterValue = filterValue[filterType];

    if (filterType !== 'price') {
      // Push multiple filters to the URL

      if (urlFilterMethod === 'param') {
        // Manage multiple param filters in the URL
        if (!newFilterValue || newFilterValue.length === 0) {
          newFilterValue = [value];
        } else if (newFilterValue.includes(value)) {
          // update newFilterValue to remove the value
          newFilterValue = newFilterValue.filter((val) => val !== value || val === undefined || val === null);
        } else {
          newFilterValue.push(value);
        }

        const newFilters = { ...filterValue, [filterType]: newFilterValue };

        // Update the browser URL
        // Build the new URL path based on the filter values
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
        // Facet Filter Behavior

        if (newFilterValue && newFilterValue.includes(value)) {
          // update newFilterValue to remove the value it exists
          newFilterValue = newFilterValue.filter((val) => val !== value || val === undefined || val === null);
        } else {
          // otherwise set it to the new value
          newFilterValue = [value];
        }

        const newFilters = { ...filterValue, [filterType]: newFilterValue };

        const sortedPathEntries = FACETED_NAV_ORDER.map((key) => [key, newFilters[key]])
          .filter(([key, v]) => v !== null && key in newFilters)
          .map(([, v]) => v)
          .flat();

        const sortedQParams = Object.entries(newFilters)
          .sort(([k], [k2]) => (k > k2 ? 1 : 0))
          .reduce(
            (
              acc: Record<string, string | string[] | number>,
              [k, v]: [string, string | string[] | { min?: number; max?: number }],
            ) => {
              if (k === 'price' && typeof v === 'object') {
                const { min, max } = (v as PriceType) || {};

                if (min) acc['priceMin'] = min;
                if (max) acc['priceMax'] = max;
              } else if (
                !FACETED_NAV_ORDER.includes(k) &&
                Array.isArray(v) &&
                v.every((item: string) => typeof item === 'string') &&
                v.length > 0
              ) {
                acc[k] = v.join(',');
              }

              return acc;
            },
            {},
          );

        setFilterValues(newFilters);
        router.push(
          {
            pathname: router.pathname,
            query: {
              // For faceted nav, we only want the base slug, not the full path
              plpSlug: [plpSlug?.[0], ...sortedPathEntries],
              ...sortedQParams,
            },
          },
          undefined,
          {
            shallow: true,
          },
        );
      } else {
        if (urlFilterMethod === 'none') {
          if (!newFilterValue || newFilterValue.length === 0) {
            newFilterValue = [value];
          } else if (newFilterValue.includes(value)) {
            // update newFilterValue to remove the value
            newFilterValue = newFilterValue.filter((val) => val !== value || val === undefined || val === null);
          } else {
            newFilterValue.push(value);
          }

          const newFilters = { ...filterValue, [filterType]: newFilterValue };

          setFilterValues(newFilters);
          handleSliderURLUpdate(value.min, value.max);
        }
      }
    } else {
      // Price Filter Behavior
      const { min, max } = value || {};

      if (min && max) {
        const newFilters = { ...filterValue, [filterType]: { min, max } };

        setFilterValues(newFilters);
        // handleSliderURLUpdate(min, max);
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
                subcategoryFilter={subcategoryFilter}
              />
            )}
          </div>
        </div>
      </PlpProductFilterStyles>
    )
  );
};

export default PlpProductFilter;
