import { BLACK, WHITE } from '@diamantaire/styles/darkside-styles';
import { useCallback, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import ConfigurationSelector from './configuration-selector/ConfigurationSelector';
import { OptionItem } from './option-item/OptionItem';
import OptionSelector from './option-selector/OptionSelector';

type ProductConfiguratorProps = {
  configurations: { [key: string]: OptionItem[] };
  selectedConfiguration: { [key: string]: string };
  initialVariantId: string;
  diamondId?: string;
};

function ProductConfigurator({
  configurations,
  diamondId,
  selectedConfiguration,
  initialVariantId,
}: ProductConfiguratorProps) {
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(false);
  const [selectedVariantId, setSelectVariantId] = useState<string>(initialVariantId);
  const [selectedSize, setSelectedSize] = useState<string>(selectedConfiguration[sizeOptionKey]);
  const sizeOptions = configurations[sizeOptionKey];

  const handleConfigChange = useCallback(
    (configState) => {
      const { diamondType, caratWeight } = configState;
      const usesCustomDiamond = diamondType && caratWeight && caratWeight === 'other';

      if (usesCustomDiamond && diamondId) {
        setIsConfigurationComplete(true);
      }

      console.log(configState);
    },
    [diamondId],
  );

  const handleSizeChange = useCallback((option: OptionItem) => {
    setSelectVariantId(option.id);
    setSelectedSize(option.value);
  }, []);

  return (
    <>
      <ConfigurationSelector
        configurations={configurations}
        selectedConfiguration={selectedConfiguration}
        onChange={handleConfigChange}
      />
      {sizeOptions && isConfigurationComplete && (
        <OptionSelector
          optionType={sizeOptionKey}
          label={sizeOptionKey}
          options={sizeOptions}
          selectedOptionValue={selectedSize}
          onChange={handleSizeChange}
        />
      )}
      <CtaButton
        variantId={String(selectedVariantId)}
        isReadyForCart={isConfigurationComplete}
        onClick={setIsConfigurationComplete}
      />
    </>
  );
}

export { ProductConfigurator };

const PrimaryButton = styled.button`
  background-color: ${BLACK};
  border: 1px solid black;
  color: ${WHITE};
  cursor: pointer;
  font-weight: 900;
  line-height: 40px;
  width: 100%;
  &:hover {
    background-color: ${WHITE};
    color: ${BLACK};
  }
`;

type CtaButtonProps = {
  variantId: string;
  isReadyForCart?: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
};

const CtaButtonContainer = styled(PrimaryButton)`
  margin: 10px 0;
`;

function CtaButton({ variantId, isReadyForCart, onClick }: CtaButtonProps) {
  const ctaText = isReadyForCart ? 'Add to Cart' : 'Select your Diamond';
  const handleButtonClick = () => {
    if (!isReadyForCart) onClick(true);
  };

  return (
    <CtaButtonContainer title={variantId} onClick={handleButtonClick}>
      {ctaText}
    </CtaButtonContainer>
  );
}
