import { UIString } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType, useSingleHumanNameMapper } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import PlpFilterOption from '../PlpFilterOptionSet';

const PlpSpecificFilterOptionsStyles = styled.div`
  flex: 1;
  max-width: 100%;

  .selection-container {
    display: flex;
    align-items: center;

    p {
      font-size: var(--font-size-xxxsmall);
      font-weight: 500;
      margin-right: 0.5rem;
    }

    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        font-size: var(--font-size-xxxsmall);
        margin-right: 0.5rem;
      }
    }
  }

  .flex-row {
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: flex;
      align-items: center;
    }
  }

  .filter-option-set {
    h3 {
      display: none;
    }

    &.metal,
    &.diamondType {
      padding-top: 0px;
    }
  }

  .metal-text,
  .diamond-text {
    @media (max-width: ${({ theme }) => theme.sizes.desktop}) {
      display: none;
    }
  }
`;

const PlpSpecificFilterOptions = ({ filterOptionsOverride, filterTypes, updateFilter, filterValue }) => {
  const { locale } = useRouter();

  const { data: { METALS_IN_HUMAN_NAMES } = {} } = useSingleHumanNameMapper(locale, 'METALS_IN_HUMAN_NAMES');

  const filterTextOrder = filterOptionsOverride.map((filterOption) => {
    const { filterValue: value } = filterOption;

    return value;
  });

  const filterTextArray =
    filterValue &&
    Object.keys(filterValue)
      .filter((val) => filterValue[val] !== null)
      .sort((a, b) => filterTextOrder.indexOf(a) - filterTextOrder.indexOf(b));

  return (
    <PlpSpecificFilterOptionsStyles>
      <div className="selection-container">
        <p>
          <UIString>Shown with</UIString>:
        </p>
        <ul>
          {filterTextArray?.map((filterOption, index) => {
            const value = filterValue[filterOption];

            let title;

            if (filterOption === 'metal') {
              title = <UIString>{METALS_IN_HUMAN_NAMES?.[value]?.value}</UIString>;
            } else if (filterOption === 'diamondType') {
              title = <UIString types={[humanNamesMapperType.DIAMOND_SHAPES]}>{value[0]}</UIString>;
            } else {
              title = <UIString>{value}</UIString>;
            }

            return (
              <React.Fragment key={`sfo-${value}`}>
                <li>{title}</li>
                {index < Object.keys(filterValue).filter((val) => filterValue[val] !== null).length - 1 ? <li>|</li> : ''}
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      <div className="flex-row">
        {filterOptionsOverride.map((filterOption) => {
          const { filterValue: filterValueValue } = filterOption;

          return (
            <PlpFilterOption
              key={`filter-${filterValueValue}`}
              filterType={filterValueValue}
              allFilterTypes={filterTypes}
              updateFilter={updateFilter}
              currentFilters={filterValue}
            />
          );
        })}
      </div>
    </PlpSpecificFilterOptionsStyles>
  );
};

export default PlpSpecificFilterOptions;
