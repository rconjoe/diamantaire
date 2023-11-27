import { useGlobalContext } from '@diamantaire/darkside/data/hooks';
import styled from 'styled-components';

import PlpFilterOption from './PlpFilterOptionSet';

const PlpMobileFilterStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - ${({ headerHeight }) => headerHeight}px);
  background-color: red;
  z-index: 5000;
  top: ${({ headerHeight }) => headerHeight}px;
`;

const PlpMobileFilter = ({ filterTypes, filterValue }) => {
  console.log('filterTypes', filterTypes);

  const { headerHeight } = useGlobalContext();

  return (
    <PlpMobileFilterStyles headerHeight={headerHeight}>
      {filterTypes &&
        Object.keys(filterTypes).map((filterType, index) => {
          const filter = filterTypes[filterType];

          return (
            <PlpFilterOption
              key={`m-filter-${index}`}
              filterType={filterType}
              currentFilters={filterValue}
              allFilterTypes={filterTypes}
              format={'stacked'}
            />
          );
        })}
    </PlpMobileFilterStyles>
  );
};

export default PlpMobileFilter;
