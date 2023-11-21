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
  hasMultipleDiamondOrientations?: boolean;
  productType?: string;

  diamondSpecs?: {
    color: string;
    clarity: string;
  };
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
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;

  > * {
    flex: 1 1 100%;

    &.metal {
      flex: 0 0 60%;
    }

    &.bandAccent {
      flex: 1;
      margin-left: 20px;
    }
  }

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    flex-direction: column;

    > * {
      flex: 1 1 100%;
      &.metal,
      &.bandAccent {
        flex: 1 1 100%;
      }

      &.bandAccent {
        margin-left: 0px;
      }
    }
  }
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
  hasMultipleDiamondOrientations,
  productType,
  diamondSpecs,
}: ConfigurationSelectorProps) {
  const [configState, dispatch] = useReducer(configOptionsReducer, selectedConfiguration);

  useEffect(() => {
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
      {hasMultipleDiamondOrientations && <button>Rotate</button>}
      {validConfigs.map((configurationType) => {
        const options = configurations[configurationType];

        const selectedOption = selectedConfiguration?.[configurationType];

        if (disableVariantType?.includes(configurationType)) return null;

        if (!options || options.length <= 1) {
          return null;
        }

        return (
          <OptionSelector
            key={configurationType}
            optionType={configurationType}
            productType={productType}
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
            diamondSpecs={diamondSpecs}
          />
        );
      })}
    </StyledConfigurationSelector>
  );
}

export default ConfigurationSelector;
