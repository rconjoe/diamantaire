import { DarksideButton, FreezeBody, UIString } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType, useGlobalContext } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  METALS_IN_HUMAN_NAMES,
  PLP_PRICE_RANGES,
  getFormattedPrice,
  simpleFormatPrice,
} from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import PlpPriceRange from './PlpPriceRange';
import PlpFilterOption from '../PlpFilterOptionSet';

const PlpMobileFilterStyles = styled.div`
  position: fixed;
  top: ${({ headerHeight }) => headerHeight}px;
  left: 0;
  width: 100%;
  height: calc(100vh - ${({ headerHeight }) => headerHeight / 10}rem);
  background-color: var(--color-lightest-grey);
  z-index: 5000;
  padding: 2rem 1.5rem ${({ mobileActiveFiltersHeight }) => mobileActiveFiltersHeight / 5}rem;
  overflow-y: scroll;

  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    display: none;
  }

  .close-filter {
    position: fixed;
    right: 1.25rem;
    top: calc(${({ headerHeight }) => headerHeight}px + 1rem);

    button {
      background-color: transparent;
      border: none;
      padding: 0;
    }
  }

  .mobile-active-filters-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem 1.5rem 0;
    background-color: var(--color-white);

    .mobile-active-filters__inner {
      display: flex;
      flex-wrap: wrap;

      .mobile-active-filters {
        flex: 0 0 80%;

        ul {
          display: flex;
          flex-wrap: wrap;
          margin: -1rem 0 0;
          list-style: none;
          padding: 0 0 1rem;

          &:empty {
            padding: 0;
          }

          li {
            margin-right: 2rem;
            margin-bottom: 0.5rem;

            button {
              background-color: transparent;
              font-size: var(--font-size-xxsmall);
              padding: 0;
              display: block;

              &:hover,
              &:focus {
                color: var(--color-teal);
              }

              .close {
                font-size: var(--font-size-small);
                color: var(--color-grey);
                margin: 0 0.5rem 0 0;
              }
            }

            .remove-filter {
              svg {
                height: 15px;
                width: 15px;
                position: relative;
                top: 4px;
                margin-right: 0.3rem;
                stroke: var(--color-dark-grey);
              }
            }
          }
        }
      }

      .clear-filters {
        flex: 1;
        text-align: right;
        margin: -0.25rem 0 1rem 0;
        display: flex;
        align-items: flex-start;

        button {
          background-color: transparent;
          border: none;
          color: var(--color-dark-grey);
          text-decoration: underline;
          font-size: var(--font-size-xxsmall);
        }
      }

      .cta {
        flex: 0 0 100%;
        padding: 0 0 2rem 0;
      }
    }
  }
`;

const filterOrder = ['price', 'diamondType', 'metal', 'subStyles', 'styles'];

const HideHeader = createGlobalStyle`
  #primary-navigation--parent, #mobile-navigation--parent {
    display: none;
  }
`;

const PlpMobileFilter = ({ filterTypes, filterValue, handleSliderURLUpdate, close, subcategoryFilter, setFilterValues }) => {
  const router = useRouter();

  const { locale } = router;

  const [localFilterValue, setLocalFilterValue] = useState(filterValue || {});

  const localFilterValueKeys = Object.keys(localFilterValue || {});

  const localFilterValueLength = localFilterValueKeys.reduce((a, v) => {
    if (v === 'price') return a + 1;

    return Array.isArray(localFilterValue[v]) ? a + localFilterValue[v].length : a;
  }, 0);

  const mobileActiveFiltersContainer = useRef(null);

  const [mobileActiveFiltersHeight, setMobileActiveFiltersHeight] = useState(0);

  const sortedFilterTypes = Object.keys(filterTypes).sort((a, b) => {
    return filterOrder.indexOf(a) - filterOrder.indexOf(b);
  });

  const priceRange: number[] = filterTypes?.price?.map((val) => parseFloat(val)) || [0, 1000000];

  const { headerHeight } = useGlobalContext();

  const { asPath } = useRouter();

  const subStyleOverride = subcategoryFilter?.[0]?.data?.map((block) => block.slug);

  const renderCustomPriceRange = (price: { min?: number; max?: number }) => {
    return (
      <>
        {price.min && getFormattedPrice(price?.min, locale)}
        {price.min && price.max && <span className="hyphen">-</span>}
        {price && getFormattedPrice(price?.max, locale)}
      </>
    );
  };

  const handlePriceRangeReset = () => {
    const currentLocalFilterValue = { ...localFilterValue };

    delete currentLocalFilterValue.price;

    setLocalFilterValue(currentLocalFilterValue);
  };

  const handleUpdateLocalFilterValue = (filterType, value) => {
    setLocalFilterValue((prevLocalFilterValue) => {
      const updatedFilterValue = { ...prevLocalFilterValue };

      if (updatedFilterValue[filterType] === undefined && filterType !== 'price') {
        updatedFilterValue[filterType] = [value];
      } else if (filterType === 'price') {
        if (value.min === localFilterValue?.price?.min && value.max === localFilterValue?.price?.max) {
          delete updatedFilterValue.price;
        } else {
          updatedFilterValue[filterType] = value;
        }
      } else {
        const existingArray = updatedFilterValue[filterType];

        if (existingArray.includes(value)) {
          updatedFilterValue[filterType] = existingArray.filter((v) => v !== value);
        } else {
          updatedFilterValue[filterType] = [...existingArray, value];
        }
      }

      return updatedFilterValue;
    });
  };

  const handleUpdateFilterValues = () => {
    setFilterValues(localFilterValue);
  };

  const handleResetFilterValues = () => {
    setLocalFilterValue({});

    handleUpdateFilterValues();
  };

  useEffect(() => {
    setMobileActiveFiltersHeight(mobileActiveFiltersContainer.current.offsetHeight);
  }, [localFilterValue]);

  return (
    <PlpMobileFilterStyles headerHeight={headerHeight} mobileActiveFiltersHeight={mobileActiveFiltersHeight}>
      <FreezeBody />

      <HideHeader />

      <div className="stacked-filters">
        {filterTypes &&
          sortedFilterTypes?.map((filterType, index) => {
            const filter = filterTypes[filterType];

            // If subcategories on jewelry products, override the subStyle filter
            if (filterType === 'subStyles' && subStyleOverride) {
              filterTypes[filterType] = subStyleOverride;
            }

            // if jewelry, remove the style filter
            if (asPath.includes('/jewelry/') && filterType === 'styles') {
              return null;
            }

            if (filterTypes[filterType].length === 0) {
              return null;
            }

            if (filterType === 'price') {
              return (
                <PlpPriceRange
                  key={`m-filter-${index}`}
                  price={{
                    min: filter[0],
                    max: filter[1],
                  }}
                  updateFilter={handleUpdateLocalFilterValue}
                  filterValue={localFilterValue}
                  handleSliderURLUpdate={handleSliderURLUpdate}
                  filterTypes={filterTypes}
                  locale={locale}
                />
              );
            } else {
              return (
                <PlpFilterOption
                  key={`m-filter-${index}`}
                  filterType={filterType}
                  currentFilters={localFilterValue}
                  allFilterTypes={filterTypes}
                  format={'stacked'}
                  updateFilter={handleUpdateLocalFilterValue}
                />
              );
            }
          })}
      </div>

      <div className="close-filter">
        <button
          onClick={() => {
            handleUpdateFilterValues();
            close();
          }}
        >
          <XIcon />
        </button>
      </div>

      <div ref={mobileActiveFiltersContainer} className="mobile-active-filters-container">
        <div className="mobile-active-filters__inner">
          <div className="mobile-active-filters">
            <ul>
              {localFilterValueKeys.map((filterType) => {
                const isPrice = filterType === 'price';

                if (!localFilterValue[filterType] || localFilterValue[filterType]?.length === 0) {
                  return null;
                }

                if (isPrice) {
                  const price = localFilterValue[filterType];

                  const priceRangeMatchesInitialState = price?.min === priceRange[0] && price?.max === priceRange[1];

                  if (priceRangeMatchesInitialState) return null;

                  const min = (price?.min && price?.min / 100) || 'below';

                  const max = (price?.max && price?.max / 100) || 'plus';

                  const selectedPriceSlug = `${min}-${max}`;

                  const selectedPrice = PLP_PRICE_RANGES.find((v) => v.slug === selectedPriceSlug);

                  const priceArray = [
                    ...(price.min ? [simpleFormatPrice(price.min, locale).trim()] : []),
                    ...(price.max ? [simpleFormatPrice(price.max, locale).trim()] : []),
                  ];

                  return (
                    <li className="active-filter" key={`price-${selectedPriceSlug}`}>
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
                  const filterValueArray = Array.isArray(localFilterValue[filterType])
                    ? localFilterValue[filterType]
                    : [localFilterValue[filterType]];

                  return filterValueArray.map((val, index) => {
                    let title;

                    if (Object.keys(DIAMOND_TYPE_HUMAN_NAMES).includes(val)) {
                      title = <UIString types={[humanNamesMapperType.DIAMOND_SHAPES]}>{val}</UIString>;
                    } else if (METALS_IN_HUMAN_NAMES[val]) {
                      title = <UIString types={[humanNamesMapperType.METALS_IN_HUMAN_NAMES]}>{val}</UIString>;
                    } else {
                      title = <UIString>{val}</UIString>;
                    }

                    return (
                      <li className="active-filter" key={`${filterType}-${val}-${index}`}>
                        <button onClick={() => handleUpdateLocalFilterValue(filterType, val)}>
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

          {localFilterValueLength > 0 && (
            <div className="clear-filters">
              <button onClick={handleResetFilterValues}>
                <UIString>Clear all</UIString>
              </button>
            </div>
          )}

          <div className="cta">
            <DarksideButton
              onClick={() => {
                handleUpdateFilterValues();
                close();
              }}
              type="solid"
            >
              <UIString>Apply</UIString>
            </DarksideButton>
          </div>
        </div>
      </div>
    </PlpMobileFilterStyles>
  );
};

export default PlpMobileFilter;
