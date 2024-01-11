import { DarksideButton, FreezeBody, UIString } from '@diamantaire/darkside/components/common-ui';
import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  JEWELRY_SUB_CATEGORY_HUMAN_NAMES,
  METALS_IN_HUMAN_NAMES,
  METAL_HUMAN_NAMES,
  PLP_PRICE_RANGES,
  RING_STYLES_MAP,
} from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { XIcon } from '@diamantaire/shared/icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import PlpPriceRange from './PlpPriceRange';
import PlpFilterOption from '../PlpFilterOptionSet';

const PlpMobileFilterStyles = styled.div`
  position: fixed;
  top: ${({ headerHeight }) => headerHeight}px;
  left: 0;
  width: 100%;
  height: calc(100vh - ${({ headerHeight }) => headerHeight}px);
  background-color: var(--color-lightest-grey);
  z-index: 5000;

  padding: 2rem 1.5rem 15rem;
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
  #primary-navigation--parent {
    display: none;
  }
`;

const PlpMobileFilter = ({ filterTypes, filterValue, handleSliderURLUpdate, close, subcategoryFilter, setFilterValues }) => {
  const [localFilterValue, setLocalFilterValue] = useState(filterValue || {});

  const sortedFilterTypes = Object.keys(filterTypes).sort((a, b) => {
    return filterOrder.indexOf(a) - filterOrder.indexOf(b);
  });

  const priceRange: number[] = filterTypes?.price.map((val) => parseFloat(val)) || [0, 1000000];

  const { headerHeight } = useGlobalContext();

  const { asPath } = useRouter();

  const subStyleOverride = subcategoryFilter?.[0]?.data?.map((block) => block.slug);

  const renderCustomPriceRange = (price: { min?: number; max?: number }) => {
    return (
      <>
        {price.min && makeCurrency(price?.min)}
        {price.min && price.max && <span className="hyphen">-</span>}
        {price && makeCurrency(price?.max)}
      </>
    );
  };

  const handlePriceRangeReset = () => {
    const currentLocalFilterValue = { ...localFilterValue };

    delete currentLocalFilterValue.price;

    setLocalFilterValue({ ...currentLocalFilterValue });
  };

  const handleUpdateLocalFilterValue = (filterType, value) => {
    setLocalFilterValue((prevLocalFilterValue) => {
      const updatedFilterValue = { ...prevLocalFilterValue };

      if (updatedFilterValue[filterType] === undefined && filterType !== 'price') {
        updatedFilterValue[filterType] = [value];
      } else if (filterType === 'price') {
        updatedFilterValue[filterType] = value;
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
  };

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
        <button onClick={() => close()}>
          <XIcon />
        </button>
      </div>

      <div className="mobile-active-filters-container">
        <div className="mobile-active-filters__inner">
          <div className="mobile-active-filters">
            <ul>
              {Object.keys(localFilterValue).map((filterType) => {
                const isMetal = filterType === 'metal';

                const isDiamondType = filterType === 'diamondType';

                const isPrice = filterType === 'price';

                const isStyle = filterType === 'style';

                const isSubStyle = filterType === 'subStyle';

                const text = isMetal
                  ? METAL_HUMAN_NAMES[localFilterValue[filterType]]
                  : isDiamondType
                  ? DIAMOND_TYPE_HUMAN_NAMES[localFilterValue[filterType]]
                  : isStyle
                  ? RING_STYLES_MAP[localFilterValue[filterType]]
                  : isSubStyle
                  ? JEWELRY_SUB_CATEGORY_HUMAN_NAMES[localFilterValue[filterType]]
                  : filterType;

                if (!localFilterValue[filterType] || localFilterValue[filterType]?.length === 0) {
                  return null;
                }

                if (isPrice) {
                  const price = localFilterValue[filterType];

                  const priceRangeMatchesInitialState = price?.min === priceRange[0] && price?.max === priceRange[1];

                  if (priceRangeMatchesInitialState) return null;

                  const selectedPriceSlug = `${price?.min ? price.min : 'below'}-${price?.max ? price.max : 'plus'}`;

                  const priceLabel = PLP_PRICE_RANGES.find((v) => v.slug === selectedPriceSlug)?.title;

                  return (
                    <li className="active-filter" key={`${localFilterValue}-${text}`}>
                      <button className="price-filter-tab" onClick={() => handlePriceRangeReset()}>
                        <span className="close">x</span>
                        {priceLabel ? priceLabel : renderCustomPriceRange(price)}
                      </button>
                    </li>
                  );
                } else {
                  const filterValueArray = Array.isArray(localFilterValue[filterType])
                    ? localFilterValue[filterType]
                    : [localFilterValue[filterType]];

                  return filterValueArray.map((val, index) => (
                    <li className="active-filter" key={`${localFilterValue}-${text}-${index}`}>
                      <button onClick={() => handleUpdateLocalFilterValue(filterType, val)}>
                        <span className="close">x</span>
                        {val && (METALS_IN_HUMAN_NAMES[val] || <UIString>{val}</UIString> || val)}
                      </button>
                    </li>
                  ));
                }
              })}
            </ul>
          </div>

          <div className="clear-filters">
            <button onClick={handleResetFilterValues}>
              <UIString>Clear all</UIString>
            </button>
          </div>

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
