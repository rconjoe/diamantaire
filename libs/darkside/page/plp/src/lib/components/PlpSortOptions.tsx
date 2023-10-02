import { useState } from 'react';
import styled from 'styled-components';

import { PlpSortOption, SortProperties, PlpBasicFieldSortOption } from './PlpSortOption';

type PlpSortOptionsProps = {
  sortOptions: PlpBasicFieldSortOption[];
  onSortOptionChange: ({ id, sortBy, sortOrder }: SortProperties) => void;
};

function PlpSortOptions({ sortOptions, onSortOptionChange }: PlpSortOptionsProps) {
  const [selectedOptionsId, setSelectedOptionsId] = useState<string>(sortOptions?.[0]?.id);

  const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectedSortOption = sortOptions.find((sortOption) => sortOption.id === value);

    setSelectedOptionsId(value);
    onSortOptionChange({
      sortBy: selectedSortOption.field,
      sortOrder: selectedSortOption.isDescendingOrder ? 'desc' : 'asc',
      id: value,
    });
  };

  return (
    <PlpSortOptionStyle>
      <select value={selectedOptionsId} className="sort-options" onChange={handleSortOptionChange}>
        {sortOptions.map((sortOption) => {
          const { id: optionId, label, field, isDescendingOrder } = sortOption;

          return (
            <PlpSortOption
              key={sortOption.id}
              id={optionId}
              field={field}
              label={label}
              isDescendingOrder={isDescendingOrder}
              isSelected={selectedOptionsId === sortOption.id}
            />
          );
        })}
      </select>
    </PlpSortOptionStyle>
  );
}

const PlpSortOptionStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 60px;
  margin-top: 20px;
`;

export { PlpSortOptions };
