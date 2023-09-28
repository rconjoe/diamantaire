import clsx from 'clsx';
import styled from 'styled-components';

import 'react-json-pretty/themes/monikai.css';
import { sortOptionTypes } from '../utils';

const StyledOptionList = styled.div`
  .options-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 10px;
    max-height: 300px;
    overflow-y: scroll;
    border: 1px solid #888;
    border-radius: 10px;
    padding: 5px;
  }

  .option-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .option-values {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 3px;
    max-width: 300px;
  }

  .option-value {
    border-radius: 10px;
    padding: 5px;
  }
`;

interface OptionsListProps {
  selectedOptions: Record<string, string>;
  onOptionsChange: (type: string, value: string) => void;
  availableOptions: Record<string, string[]>;
}

const OptionsList = ({ selectedOptions, onOptionsChange, availableOptions }: OptionsListProps) => {
  console.log(selectedOptions, availableOptions);

  return (
    <StyledOptionList className="options-selector">
      <h3>Options:</h3>
      <div className="options-list">
        {Object.entries(availableOptions)
          .sort(sortOptionTypes)
          .map(([type, values]: [string, string[]]) => {
            return (
              <div className="option-item" key={type}>
                <h3>{type}</h3>
                <div className="option-values">
                  {values.sort().map((value) => {
                    const isOptionSelected = selectedOptions[type] === value;

                    return (
                      <button
                        className={clsx('option-value', { selected: isOptionSelected })}
                        key={value}
                        onClick={() => onOptionsChange(type, value)}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </StyledOptionList>
  );
};

export { OptionsList };
