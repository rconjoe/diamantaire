import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { SortIcon, ChevronDownIcon } from '@diamantaire/shared/icons';
import { PlpBasicFieldSortOption } from '@diamantaire/shared/types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { components, DropdownIndicatorProps } from 'react-select';
import { SortProperties } from './PlpSortOption';

const Select = dynamic(() => import('react-select'), {
  ssr: false,
});

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

  const DropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <SortIcon className="show-on-mobile sort-icon" />
        <ChevronDownIcon className="hide-on-mobile chevron-icon" />
      </components.DropdownIndicator>
    );
  };

  return (
    <PlpSortOptionStyle>
      <span className="sort-label hide-on-mobile">{_t('Sort')}:</span>

      <Select
        options={options}
        onChange={(val) => handleSortOptionChange(val)}
        value={currentSortOption}
        isSearchable={false}
        classNamePrefix="sort-dropdown"
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: DropdownIndicator,
        }}
        styles={{
          control: (base) => ({
            ...base,
            border: 0,
            boxShadow: 'none',
          }),
          valueContainer: (base) => ({
            ...base,
            '@media (max-width: 767px)': {
              display: 'none',
            },
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
    margin-right: 0.5rem;
    position: relative;
  }

  .sort-dropdown__control {
    border: none;
    min-height: unset;
    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      min-width: 8rem;
    }
  }

  .sort-dropdown__menu {
    min-width: 15rem;
    left: auto;
    top: 2rem;
    right: 0.5rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      right: 0.5rem;
    }
  }

  .sort-dropdown__control {
    line-height: 1.2;
    min-height: none;
  }

  .sort-dropdown__value-container {
    font-size: var(--font-size-xxxsmall);
    color: var(--color-black);
    font-weight: bold;
    padding-left: 0;
    padding-right: 0;
    width: auto;
  }

  .sort-dropdown__single-value {
    color: var(--color-black);
  }

  .sort-dropdown__indicator {
    padding: 0;
  }

  .sort-dropdown__option {
    font-size: var(--font-size-xxxsmall);

    &:active {
      background-color: var(--color-grey);
      color: var(--color-white);
    }
  }

  .sort-dropdown__indicator .chevron-icon {
    fill: var(--color-black);
    transform: scale(0.7);
  }
  .sort-icon {
    width: 1.2rem;
    transform: unset;
  }
  .sort-dropdown__option--is-focused {
    background-color: var(--color-lighter-grey);
    color: var(--color-black);
  }

  .sort-dropdown__option--is-selected {
    font-weight: bold;
    background-color: transparent;
    color: var(--color-black);
  }
`;

export { PlpSortOptions };
