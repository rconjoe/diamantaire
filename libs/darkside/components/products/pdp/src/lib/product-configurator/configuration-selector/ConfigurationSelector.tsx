import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { configTypesComparitor, filterConfigurationTypes } from '@diamantaire/shared/helpers';
import { RotateIcon } from '@diamantaire/shared/icons';
import { OptionItemProps } from '@diamantaire/shared/types';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useReducer } from 'react';
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
  setProductSlug?: (_value: string) => void;
  diamondSpecs?: {
    color: string;
    clarity: string;
  };
  selectedDiamond?: Array<{
    diamondType?: string;
    carat?: string;
    color?: string;
    clarity?: string;
    price?: number;
  }>;
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
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;

  > * {
    flex: 1 1 100%;
  }

  .rotate-toggle {
    position: absolute;
    right: 0;
    background-color: transparent;
    padding: 0;
    svg {
      transform: scaleX(-1) rotate(100deg);
      position: relative;
      top: 4px;
      margin-right: 3px;
    }

    span {
      font-size: var(--font-size-xxsmall);
    }
  }

  @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
    flex-direction: column;

    > * {
      flex: 1 1 100%;
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
  setProductSlug,
  selectedDiamond,
}: ConfigurationSelectorProps) {
  const [configState, dispatch] = useReducer(configOptionsReducer, selectedConfiguration);
  const { builderProduct } = useContext(BuilderProductContext);
  const router = useRouter();

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

    updateSettingSlugs({
      productSlug: option?.id,
    });

    router.replace(
      `/customize/diamond-to-setting/${builderProduct?.diamonds?.[0]?.lotId}/${router?.query?.collectionSlug}/${option?.id}`,
      null,
      {
        shallow: true,
      },
    );
  }

  function toggleOrientation() {
    let newOrientation;

    // Don't change it if there's only one option
    if (configurations?.['diamondOrientation']?.length > 1) {
      if (selectedConfiguration?.diamondOrientation === 'horizontal') {
        newOrientation = configurations['diamondOrientation'].find((option) => option.value !== 'horizontal');
      } else {
        newOrientation = configurations['diamondOrientation'].find((option) => option.value !== 'vertical');
      }

      setProductSlug(newOrientation?.id);
    }
  }

  return (
    <StyledConfigurationSelector>
      {hasMultipleDiamondOrientations && (
        <button className="rotate-toggle" onClick={() => toggleOrientation()}>
          {' '}
          <RotateIcon />
          <span>90°</span>
        </button>
      )}
      {validConfigs.map((configurationType) => {
        const options = configurations[configurationType];

        const selectedOption = selectedConfiguration?.[configurationType];

        if (disableVariantType?.includes(configurationType)) return null;

        // These are three-stone configurations that only have one option
        const allowedSingleOptionTypes = ['sideStoneCarat', 'sideStoneShape', 'hiddenHalo', 'bandWidth'];

        if (!options || (options.length <= 1 && !allowedSingleOptionTypes.includes(configurationType))) {
          return null;
        }

        return (
          <OptionSelector
            key={configurationType}
            optionType={configurationType}
            productType={productType}
            label={configurationType}
            options={options}
            selectedConfiguration={selectedConfiguration}
            selectedOptionValue={selectedOption}
            selectedOptionIndex={options.findIndex((option) => option.value === selectedOption)}
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
            setProductSlug={setProductSlug}
            areDiamondShapesHorizontal={selectedConfiguration?.diamondOrientation === 'horizontal'}
            selectedDiamond={selectedDiamond}
          />
        );
      })}
    </StyledConfigurationSelector>
  );
}

export default ConfigurationSelector;
