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

const OptionsList = ({ selectedOptions, onOptionsChange, availableOptions }) => {
  return (
    <StyledOptionList className="options-selector">
      <h3>Options:</h3>
      <div className="options-list">
        {availableOptions.sort(sortOptionTypes).map((option) => {
          return (
            <div className="option-item" key={option._id}>
              <h3>{option.type}</h3>
              <div className="option-values">
                {option.values.sort().map((value) => {
                  const isOptionSelected = selectedOptions[option.type] === value;

                  return (
                    <button
                      className={clsx('option-value', { selected: isOptionSelected })}
                      key={value}
                      onClick={() => onOptionsChange(option.type, value)}
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
