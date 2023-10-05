import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { PlpBasicFieldSortOption } from '@diamantaire/shared/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';

import { SortProperties } from './PlpSortOption';

const Select = dynamic(() => import('react-select'));

type PlpSortOptionsProps = {
  sortOptions: PlpBasicFieldSortOption[];
  onSortOptionChange: ({ id, sortBy, sortOrder }: SortProperties) => void;
};

function PlpSortOptions({ sortOptions, onSortOptionChange }: PlpSortOptionsProps) {
  const { locale } = useRouter();
  const { _t } = useTranslations(locale);
  const handleSortOptionChange = (val) => {
    const { value } = val;
    const selectedSortOption = sortOptions.find((sortOption) => sortOption.id === value);

    setCurrentSortOption(val);

    onSortOptionChange({
      sortBy: selectedSortOption?.field,
      sortOrder: selectedSortOption?.isDescendingOrder ? 'desc' : 'asc',
      id: value,
    });
  };

  const options = [
    // Always the default sort option
    {
      label: _t('Featured'),
      value: null,
      field: null,
      isDescendingOrder: false,
    },
  ];

  sortOptions.map((sortOption) => {
    const newOption = {
      label: _t(sortOption.label),
      value: sortOption.id,
      field: sortOption.field,
      isDescendingOrder: sortOption.isDescendingOrder,
    };

    return options.push(newOption);
  });

  const [currentSortOption, setCurrentSortOption] = useState(options?.[0]);

  if (!sortOptions?.length) return null;

  return (
    <PlpSortOptionStyle>
      <span className="sort-label">Sort:</span>
      <Select
        options={options}
        onChange={(val) => handleSortOptionChange(val)}
        value={currentSortOption}
        isSearchable={false}
        classNamePrefix="sort-dropdown"
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (base) => ({
            ...base,
            border: 0,
            boxShadow: 'none',
          }),
        }}
      />
    </PlpSortOptionStyle>
  );
}

const PlpSortOptionStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .sort-label {
    font-size: var(--font-size-xxxsmall);
    margin-right: 5px;
    position: relative;
  }

  .sort-dropdown__control {
    border: none;
  }
  .sort-dropdown__menu {
    min-width: 155px;
    left: -3rem;
  }
  .sort-dropdown__value-container {
    font-size: var(--font-size-xxxsmall);
    color: var(--color-black);
    font-weight: bold;
    padding-left: 0;
    padding-right: 0;
  }

  .sort-dropdown__single-value {
    color: var(--color-black);
  }

  .sort-dropdown__indicator {
    padding: 0;
  }

  .sort-dropdown__option {
    font-size: var(--font-size-xxxsmall);
  }

  .sort-dropdown__indicator svg {
    fill: var(--color-black);
    transform: scale(0.7);
  }

  .sort-dropdown__option--is-focused {
    background-color: var(--color-black);
    color: var(--color-white);
  }

  .sort-dropdown__option--is-selected {
    font-weight: bold;
    background-color: transparent;
    color: #000;
  }
`;

export { PlpSortOptions };
