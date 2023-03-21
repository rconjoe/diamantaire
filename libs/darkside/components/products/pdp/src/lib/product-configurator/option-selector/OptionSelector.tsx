import styled from 'styled-components';

import { OptionItemContainer, OptionItem } from '../option-item/OptionItem';

interface OptionSelectorProps {
  optionType: string;
  label: string;
  options: OptionItem[];
  selectedOptionValue: string;
  onChange?: (option: OptionItem) => void;
  renderItemAsLink?: boolean;
}

const StyledOptionSelector = styled.div`
  .selector-label {
    display: flex;
    flex-direction: row;
    gap: 5px;
  }
  .option-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

function OptionSelector({
  optionType,
  label,
  options,
  selectedOptionValue,
  onChange,
  renderItemAsLink = false,
}: OptionSelectorProps) {
  if (!options) {
    return null;
  }

  const handleOptionClick = (option) => {
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <StyledOptionSelector>
      {label && (
        <div className="selector-label">
          <strong className="label">{label}:</strong>
          {selectedOptionValue}
        </div>
      )}
      <div className="option-list">
        {options.map((option) => {
          const isSelected = selectedOptionValue === option.value;

          return (
            <OptionItemContainer
              key={option.id}
              optionType={optionType}
              option={option}
              isSelected={isSelected}
              onClick={() => handleOptionClick(option)}
              isLink={renderItemAsLink}
            />
          );
        })}
      </div>
    </StyledOptionSelector>
  );
}

export default OptionSelector;
