import { DarksideButton, FreezeBody, UIString } from '@diamantaire/darkside/components/common-ui';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { METALS_IN_HUMAN_NAMES, formatPrice } from '@diamantaire/shared/constants';
import { XIcon } from '@diamantaire/shared/icons';
import { useRouter } from 'next/router';
import styled, { createGlobalStyle } from 'styled-components';

import PlpPriceRange from './PlpPriceRange';
import PlpFilterOption from '../PlpFilterOptionSet';

const PlpMobileFilterStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - ${({ headerHeight }) => headerHeight}px);
  background-color: #f8f8f8;
  z-index: 5000;
  /* top: ${({ headerHeight }) => headerHeight}px; */
  padding: 2rem 1.5rem;
  padding-bottom: 250px;
  overflow-y: scroll;
  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    display: none;
  }

  .close-filter {
    position: fixed;
    right: 2rem;
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
    min-height: 150px;
    padding: 0 15px;
    background-color: var(--color-white);

    .mobile-active-filters__inner {
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;

      .mobile-active-filters {
        flex: 0 0 80%;

        ul {
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          list-style: none;

          li {
            margin-right: 2rem;
            margin-bottom: 1rem;
            button {
              background-color: transparent;
              padding: 0;
              display: block;
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
        button {
          background-color: transparent;
          border: none;
          color: var(--color-dark-grey);
          text-decoration: underline;
        }
      }

      .cta {
        flex: 0 0 100%;
        padding: 2rem 0;
      }
    }
  }
`;

const filterOrder = ['price', 'diamondType', 'metal', 'subStyles', 'styles'];

const HideHeader = createGlobalStyle`
  #primary-navigation--compact {
    display: none;
  }
`;

const PlpMobileFilter = ({ filterTypes, filterValue, updateFilter, handleSliderURLUpdate, close, subcategoryFilter }) => {
  const sortedFilterTypes = Object.keys(filterTypes).sort((a, b) => {
    return filterOrder.indexOf(a) - filterOrder.indexOf(b);
  });

  const { headerHeight } = useGlobalContext();

  const { locale, asPath } = useRouter();

  const subStyleOverride = subcategoryFilter?.[0]?.data?.map((block) => block.slug);

  return (
    <PlpMobileFilterStyles headerHeight={headerHeight}>
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

            if (filterTypes[filterType].length === 0) return null;

            if (filterType === 'price') {
              return (
                <PlpPriceRange
                  key={`m-filter-${index}`}
                  price={{
                    min: filter[0],
                    max: filter[1],
                  }}
                  updateFilter={updateFilter}
                  filterValue={filterValue}
                  handleSliderURLUpdate={handleSliderURLUpdate}
                  filterTypes={filterTypes}
                />
              );
            } else {
              return (
                <PlpFilterOption
                  key={`m-filter-${index}`}
                  filterType={filterType}
                  currentFilters={filterValue}
                  allFilterTypes={filterTypes}
                  format={'stacked'}
                  updateFilter={updateFilter}
                />
              );
            }
          })}
      </div>
      <div className="close-filter">
        <button onClick={() => close()}>
          <XIcon />
        </button>
      </div>

      <div className="mobile-active-filters-container">
        <div className="mobile-active-filters__inner">
          <div className="mobile-active-filters">
            <ul>
              {filterValue &&
                Object.keys(filterValue).map((filter) => {
                  // ex: metal, diamondType
                  const filterSet = filterValue[filter];
                  const isPrice = filter === 'price';

                  if (filter === 'price' && !filterSet.min && !filterSet.max) return null;

                  if (filterSet) {
                    return filterSet.map((value) => {
                      return (
                        <li className="active-filter" key={`active-filter-${filter}`}>
                          <button
                            onClick={() =>
                              updateFilter(
                                filter,
                                isPrice
                                  ? {
                                      min: null,
                                      max: null,
                                    }
                                  : value,
                              )
                            }
                          >
                            <span className="remove-filter">
                              <XIcon />
                            </span>
                            {filter === 'price' ? (
                              <span className="active-filter__value">
                                {value.min && formatPrice(parseFloat(value.min), locale)}
                                {value.min && value.max && '-'}
                                {value.max && formatPrice(parseFloat(value.max), locale)}
                              </span>
                            ) : (
                              <span className="active-filter__value">
                                {METALS_IN_HUMAN_NAMES[value] || <UIString>{value}</UIString>}
                              </span>
                            )}
                          </button>
                        </li>
                      );
                    });
                  }
                })}
            </ul>
          </div>
          <div className="clear-filters">
            <button
              onClick={() => {
                updateFilter('all');

                return close();
              }}
            >
              <UIString>Clear all</UIString>
            </button>
          </div>
          <div className="cta">
            <DarksideButton onClick={() => close()} type="solid">
              <UIString>Apply</UIString>
            </DarksideButton>
          </div>
        </div>
      </div>
    </PlpMobileFilterStyles>
  );
};

export default PlpMobileFilter;
