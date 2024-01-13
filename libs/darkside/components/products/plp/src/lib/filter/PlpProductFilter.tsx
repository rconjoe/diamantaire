import { FACETED_NAV_ORDER } from '@diamantaire/shared/constants';
import { removeUrlParameter, updateUrlParameter } from '@diamantaire/shared/helpers';
import { FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useState } from 'react';

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

  const calculatePriceRange = useCallback(() => {
    return filterTypes?.price?.map((val) => parseFloat(val)) || [0, 1000000];
  }, [filterTypes]);

  const priceRange: number[] = calculatePriceRange();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [filterOptionSetOpen, setFilterOptionSetOpen] = useState<FilterTypeProps | null>(null);

  const handleSliderURLUpdate = useCallback(
    (min, max) => {
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
    },
    [priceRange],
  );

  const toggleFilterOptionSet = (filterSlug: FilterTypeProps) => {
    if (filterOptionSetOpen === filterSlug) {
      setFilterOptionSetOpen(null);
    } else {
      setFilterOptionSetOpen(filterSlug);
    }
  };

  const updateFilter = (filterType: string, value) => {
    // if (filterType === 'all') {
    //   setFilterValues({});

    //   if (urlFilterMethod === 'param') {
    //     return router.push({
    //       pathname: router.query.plpSlug.toString(),
    //       query: {},
    //     });
    //   } else {
    //     // for facet nav, give us the path without the filters
    //     return router.push({
    //       pathname: router.query.plpSlug[0],
    //     });
    //   }
    // }

    let newFilterValue = filterValue[filterType];

    // ALL FILTERS EXCEPT PRICE
    if (filterType !== 'price') {
      if (urlFilterMethod === 'param') {
        if (!newFilterValue || newFilterValue.length === 0) {
          newFilterValue = [value];
        } else if (newFilterValue.includes(value)) {
          newFilterValue = newFilterValue.filter((val) => val !== value || val === undefined || val === null);
        } else {
          newFilterValue.push(value);
        }

        setFilterValues({ ...filterValue, [filterType]: newFilterValue });
      } else if (urlFilterMethod === 'facet') {
        if (newFilterValue && newFilterValue.includes(value)) {
          newFilterValue = newFilterValue.filter((val) => val !== value || val === undefined || val === null);
        } else {
          newFilterValue = [value];
        }

        setFilterValues({ ...filterValue, [filterType]: newFilterValue });
      } else {
        if (urlFilterMethod === 'none') {
          if (!newFilterValue || newFilterValue.length === 0) {
            newFilterValue = [value];
          } else if (newFilterValue.includes(value)) {
            newFilterValue = newFilterValue.filter((val) => val !== value || val === undefined || val === null);
          } else {
            newFilterValue.push(value);
          }

          setFilterValues({ ...filterValue, [filterType]: newFilterValue });
        }
      }
    }

    // PRICE FILTER
    else {
      const { min, max } = value || {};

      if (min || max) {
        setFilterValues({ ...filterValue, [filterType]: { min, max } });
      }
    }
  };

  const updateURL = useCallback(() => {
    const sortedQParams = Object.entries(filterValue)
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

    if (urlFilterMethod === 'param') {
      router.push(
        {
          pathname: router.pathname,
          query: { plpSlug: plpSlug[0], ...sortedQParams },
        },
        undefined,
        { shallow: true },
      );
    }

    if (urlFilterMethod === 'facet') {
      const sortedPathEntries = FACETED_NAV_ORDER.map((key) => [key, filterValue[key]])
        .filter(([key, v]) => v !== null && key in filterValue)
        .map(([, v]) => v)
        .flat();

      router.push(
        {
          pathname: router.pathname,
          query: {
            plpSlug: [plpSlug?.[0], ...sortedPathEntries],
            ...sortedQParams,
          },
        },
        undefined,
        {
          shallow: true,
        },
      );
    }

    if (urlFilterMethod === 'none') {
      if (filterValue?.price) {
        handleSliderURLUpdate(filterValue?.price?.min, filterValue?.price?.max);
      }
    }
  }, [router, plpSlug, filterValue, urlFilterMethod, handleSliderURLUpdate]);

  useEffect(() => {
    updateURL();
  }, [filterValue]);

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
                handleSliderURLUpdate={handleSliderURLUpdate}
                close={() => setIsMobileFilterOpen(false)}
                subcategoryFilter={subcategoryFilter}
                setFilterValues={setFilterValues}
              />
            )}
          </div>
        </div>
      </PlpProductFilterStyles>
    )
  );
};

export default PlpProductFilter;
