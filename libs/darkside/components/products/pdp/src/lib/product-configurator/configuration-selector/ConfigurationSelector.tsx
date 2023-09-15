import { filterConfigurationTypes, configTypesComparitor } from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { useEffect, useReducer, useMemo } from 'react';
import styled from 'styled-components';

import OptionSelector from '../option-selector/OptionSelector';
interface ConfigurationSelectorProps {
  configurations: { [key: string]: OptionItemProps[] };
  selectedConfiguration: { [key: string]: string };
  onChange?: (configState: { [key: string]: string }) => void;
  isBuilderFlowOpen?: boolean;
  updateSettingSlugs?: (item: object) => void;
  disableVariantType?: string[];
}

interface ConfigurationSelectorAction {
  type: 'option-change';
  payload: {
    typeId: string;
    value: string;
  };
  disableVariantType?: string[];
}

const StyledConfigurationSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

function configOptionsReducer(state, action: ConfigurationSelectorAction) {
  const { payload, type } = action;
  const { typeId, value } = payload;

  console.log('configOptionsReducer', { state, action });

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
  updateSettingSlugs,
  disableVariantType,
}: ConfigurationSelectorProps) {
  const [configState, dispatch] = useReducer(configOptionsReducer, selectedConfiguration);

  useEffect(() => {
    console.log('configState', configState);
    if (onChange) {
      onChange(configState);
    }
  }, [configState, onChange]);

  const handleOptionChange = (typeId: string, option: OptionItemProps) => {
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

  function handleBuilderFlowVariantChange(option: OptionItemProps, configurationType) {
    console.log({ configurationType, option });

    const url = new URL(window.location.href);

    url.searchParams.set('productSlug', option?.id);

    window.history.pushState(null, '', url);

    updateSettingSlugs({
      productSlug: option?.id,
    });
  }

  return (
    <StyledConfigurationSelector>
      {validConfigs.map((configurationType) => {
        const options = configurations[configurationType];
        // Need help here - Can't rely on configState here because it's not updated yet
        // const selectedOption = configState?.[configurationType];
        const selectedOption = selectedConfiguration?.[configurationType];

        if (disableVariantType?.includes(configurationType)) return null;

        if (!options || options.length <= 1) {
          return null;
        }

        return (
          <OptionSelector
            key={configurationType}
            optionType={configurationType}
            label={configurationType}
            options={options}
            selectedOptionValue={selectedOption}
            onChange={
              isBuilderFlowOpen
                ? (option) => {
                    handleOptionChange(configurationType, option);
                    handleBuilderFlowVariantChange(option, configurationType);
                  }
                : (option) => handleOptionChange(configurationType, option)
            }
            renderItemAsLink={isBuilderFlowOpen ? false : true}
          />
        );
      })}
    </StyledConfigurationSelector>
  );
}

export default ConfigurationSelector;
