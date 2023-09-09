import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { metalTypeAsConst } from '@diamantaire/shared/constants';
import { extractMetalTypeFromShopifyHandle } from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { useRouter } from 'next/router';
import { useCallback, useState, useContext } from 'react';
import styled from 'styled-components';

import ConfigurationSelector from './configuration-selector/ConfigurationSelector';
import OptionSelector from './option-selector/OptionSelector';

type ProductConfiguratorProps = {
  configurations: { [key: string]: OptionItemProps[] };
  selectedConfiguration: { [key: string]: string };
  initialVariantId: string;
  diamondId?: string;
  additionalVariantData?: Record<string, string>;
  isBuilderProduct?: boolean;
  updateSettingSlugs?: () => void;
  isBuilderFlowOpen?: boolean;
  updateFlowData?: (action: string, value: object, nextStep: null | number) => void;
  flowIndex?: number;
  disableVariantType?: string[];
  isBuilderFlow: boolean;
  hasMoreThanOneVariant?: boolean;
};

function ProductConfigurator({
  configurations,
  diamondId,
  selectedConfiguration,
  initialVariantId,
  additionalVariantData,
  isBuilderFlowOpen = false,
  updateFlowData,
  updateSettingSlugs,
  flowIndex,
  disableVariantType,
  isBuilderFlow = false,
  hasMoreThanOneVariant = true,
}: ProductConfiguratorProps) {
  const { builderProduct } = useContext(BuilderProductContext);
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(
    builderProduct.builderState === 'Complete',
  );

  const [selectedVariantId, setSelectVariantId] = useState<string>(initialVariantId);
  const [selectedSize, setSelectedSize] = useState<string>(selectedConfiguration?.[sizeOptionKey] || null);
  const sizeOptions = configurations[sizeOptionKey];

  console.log('configurations', configurations);

  // TODO: this is a hack to get the configurator to work with the current data structure
  const handleConfigChange = useCallback(
    (configState) => {
      console.log('selectedConfiguration', selectedConfiguration);
      const { diamondType, caratWeight } = configState;

      console.log('configState', configState);

      const usesCustomDiamond = diamondType && caratWeight && caratWeight === 'other';

      if (usesCustomDiamond) {
        setIsConfigurationComplete(false);
      }

      if (!isBuilderFlow) {
        setIsConfigurationComplete(true);
      }
    },
    [diamondId, selectedVariantId],
  );

  const handleSizeChange = useCallback((option: OptionItemProps) => {
    setSelectVariantId(option.id);
    setSelectedSize(option.value);
  }, []);

  return (
    <>
      <ConfigurationSelector
        configurations={configurations}
        selectedConfiguration={selectedConfiguration}
        onChange={handleConfigChange}
        isBuilderFlowOpen={isBuilderFlowOpen}
        updateSettingSlugs={updateSettingSlugs}
        disableVariantType={disableVariantType}
      />

      {sizeOptions && isConfigurationComplete && !disableVariantType.includes('ringSize') && (
        <OptionSelector
          optionType={sizeOptionKey}
          label={sizeOptionKey}
          options={sizeOptions}
          selectedOptionValue={selectedSize}
          onChange={handleSizeChange}
        />
      )}

      {isBuilderFlowOpen ? (
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <DarksideButton
            onClick={() => {
              updateFlowData('ADD_PRODUCT', { ...additionalVariantData, ...selectedConfiguration }, flowIndex + 1);
            }}
          >
            Next
          </DarksideButton>
        </div>
      ) : (
        <AddToCartButton
          variantId={String(selectedVariantId)}
          isReadyForCart={isConfigurationComplete}
          additionalVariantData={additionalVariantData}
          useCustomDiamondPrompt={!diamondId}
        />
      )}
    </>
  );
}

export { ProductConfigurator };

type CtaButtonProps = {
  variantId: string;
  isReadyForCart?: boolean;
  additionalVariantData?: any;
  useCustomDiamondPrompt?: boolean;
  enableEngraving?: boolean;
};

const AddToCartButtonContainer = styled.div`
  margin: 10px 0;
`;

function AddToCartButton({ variantId, isReadyForCart, additionalVariantData, enableEngraving = false }: CtaButtonProps) {
  const { addItem, setIsCartOpen } = useContext(CartContext);
  const ctaText = isReadyForCart ? 'Add to Cart' : 'Select your Diamond';

  const router = useRouter();

  console.log('router', router);

  const {
    // metal,
    // carat,
    // chainLength,
    // ringSize,
    shape,
    productTitle,
    productType,
    color,
    clarity,
    goldPurity,
    bandAccent,
    caratWeightOverride,
    shopifyProductHandle,
    image,
    // configuredProductOptionsInOrder,
  } = additionalVariantData;

  async function addProductToCart() {
    const diamondSpec = caratWeightOverride + ', ' + color + ', ' + clarity;

    console.log('adding', productType);
    console.log('shopifyProductHandle', shopifyProductHandle);
    console.log('additionalVariantData', additionalVariantData);

    if (productType === 'Engagement Ring') {
      const erMetal = goldPurity + ' ' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)];
      const refinedBandAccent = bandAccent?.charAt(0)?.toUpperCase() + bandAccent.slice(1);

      const engagementRingItemAttributes = [
        {
          key: 'productTitle',
          value: productTitle,
        },
        {
          key: '_image',
          value: JSON.stringify(image),
        },
        {
          key: 'diamondShape',
          value: shape,
        },
        {
          key: 'centerStone',
          value: diamondSpec,
        },
        {
          key: 'productType',
          value: productType,
        },
        {
          key: 'metal',
          value: erMetal,
        },
        {
          key: 'bandAccent',
          value: refinedBandAccent,
        },
      ];

      addItem(variantId, [...engagementRingItemAttributes]);
    } else if (productType === 'Necklace') {
      console.log('necklace atc');
    }

    // Trigger cart to open
    setIsCartOpen(true);
  }

  return (
    <AddToCartButtonContainer>
      <DarksideButton onClick={addProductToCart}>{ctaText}</DarksideButton>
    </AddToCartButtonContainer>
  );
}
