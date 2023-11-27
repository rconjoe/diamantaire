import { useSingleHumanNameMapper, useTranslations } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import PlpFilterOption from './PlpFilterOptionSet';

const PlpSpecificFilterOptionsStyles = styled.div`
  flex: 1;

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
    display: flex;
  }
`;

const PlpSpecificFilterOptions = ({
  filterOptionsOverride,
  filterTypes,
  updateFilter,
  // filterOptionSetOpen,
  // toggleFilterOptionSet,
  // handleSliderURLUpdate,
  // setFilterValues,
  filterValue,
}) => {
  console.log('filterOptionsOverride', filterOptionsOverride);

  const { locale } = useRouter();
  const { _t } = useTranslations(locale);

  const { data: { METALS_IN_HUMAN_NAMES } = {} } = useSingleHumanNameMapper(locale, 'METALS_IN_HUMAN_NAMES');

  console.log('METALS_IN_HUMAN_NAMES', METALS_IN_HUMAN_NAMES);

  const filterTextOrder = filterOptionsOverride.map((filterOption) => {
    const { filterValue: value } = filterOption;

    return value;
  });

  console.log('filterTextOrder', filterTextOrder);
  console.log('filterOptionsOverride', filterOptionsOverride);

  const filterTextArray =
    filterValue &&
    Object.keys(filterValue)
      .filter((val) => filterValue[val] !== null)
      .sort((a, b) => filterTextOrder.indexOf(a) - filterTextOrder.indexOf(b));

  return (
    <PlpSpecificFilterOptionsStyles>
      <div className="selection-container">
        <p>Shown with:</p>
        <ul>
          {filterTextArray?.map((filterOption, index) => {
            const value = filterValue[filterOption];

            return (
              <React.Fragment key={`sfo-${value}`}>
                <li>{METALS_IN_HUMAN_NAMES?.[value]?.value || _t(value)}</li>
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
              filterValueValue={filterValueValue}
              updateFilter={updateFilter}
              currentFilters={filterValue}
              // handleSliderURLUpdate={handleSliderURLUpdate}
            />
          );
        })}
      </div>
    </PlpSpecificFilterOptionsStyles>
  );
};

export default PlpSpecificFilterOptions;
