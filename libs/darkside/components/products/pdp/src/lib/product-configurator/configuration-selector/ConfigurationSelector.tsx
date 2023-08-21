import { filterConfigurationTypes, configTypesComparitor } from '@diamantaire/shared/helpers';
import { useEffect, useReducer, useMemo } from 'react';
import styled from 'styled-components';

import { OptionItem } from '../option-item/OptionItem';
import OptionSelector from '../option-selector/OptionSelector';
interface ConfigurationSelectorProps {
  configurations: { [key: string]: OptionItem[] };
  selectedConfiguration: { [key: string]: string };
  onChange?: (configState: { [key: string]: string }) => void;
  isBuilderFlowOpen?: boolean;
}

interface ConfigurationSelectorAction {
  type: 'option-change';
  payload: {
    typeId: string;
    value: string;
  };
}

const StyledConfigurationSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function configOptionsReducer(state, action: ConfigurationSelectorAction) {
  const { payload, type } = action;
  const { typeId, value } = payload;

  switch (type) {
    case 'option-change':
      return { ...state, [typeId]: value };
  }
}

function ConfigurationSelector({
  configurations,
  selectedConfiguration,
  onChange,
  isBuilderFlowOpen,
}: ConfigurationSelectorProps) {
  const [configState, dispatch] = useReducer(configOptionsReducer, selectedConfiguration);

  useEffect(() => {
    if (onChange) {
      onChange(configState);
    }
  }, [configState, onChange]);

  const handleOptionChange = (typeId: string, option: OptionItem) => {
    dispatch({ type: 'option-change', payload: { typeId, value: option.value } });
  };

  const validConfigs = useMemo(
    () =>
      // sanatize and prepare data
      Object.keys(configurations)
        .filter((type) => filterConfigurationTypes(type))
        .sort(configTypesComparitor),
    [configurations],
  );

  return (
    <StyledConfigurationSelector>
      {validConfigs.map((configurationType) => {
        const options = configurations[configurationType];
        const selectedOption = configState?.[configurationType];

        // if (!options || options.length <= 1) {
        //   return null;
        // }

        if (configurationType === 'caratWeight' && isBuilderFlowOpen) return null;

        return (
          <OptionSelector
            key={configurationType}
            optionType={configurationType}
            label={configurationType}
            options={options}
            selectedOptionValue={selectedOption}
            onChange={(option) => handleOptionChange(configurationType, option)}
            renderItemAsLink={true}
          />
        );
      })}
    </StyledConfigurationSelector>
  );
}

export default ConfigurationSelector;
