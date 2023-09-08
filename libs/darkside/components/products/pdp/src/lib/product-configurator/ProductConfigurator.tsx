import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { metalTypeAsConst } from '@diamantaire/shared/constants';
import { extractMetalTypeFromShopifyHandle } from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { BLACK, WHITE } from '@diamantaire/styles/darkside-styles';
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
}: ProductConfiguratorProps) {
  const { builderProduct } = useContext(BuilderProductContext);
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(
    builderProduct.builderState === 'Complete',
  );

  const [selectedVariantId, setSelectVariantId] = useState<string>(initialVariantId);
  const [selectedSize, setSelectedSize] = useState<string>(selectedConfiguration?.[sizeOptionKey] || null);
  const sizeOptions = configurations[sizeOptionKey];

  // debugger;

  // TODO: this is a hack to get the configurator to work with the current data structure
  const handleConfigChange = useCallback(
    (configState) => {
      const { diamondType, caratWeight } = configState;

      console.log('configState', configState);

      const usesCustomDiamond = diamondType && caratWeight && caratWeight === 'other';

      if (usesCustomDiamond) {
        setIsConfigurationComplete(false);
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
        <CtaButton
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
  additionalVariantData?: any;
  useCustomDiamondPrompt?: boolean;
};

const CtaButtonContainer = styled(PrimaryButton)`
  margin: 10px 0;
`;

function CtaButton({ variantId, isReadyForCart, additionalVariantData, useCustomDiamondPrompt }: CtaButtonProps) {
  const { addJewelryProductToCart, addERProductToCartByVariantId } = useContext(CartContext);
  const ctaText = useCustomDiamondPrompt ? 'Select your Diamond' : isReadyForCart ? 'Add to Cart' : 'Unavailable';

  // const handleButtonClick = () => {
  //   if (!isReadyForCart) onClick(true);
  // };

  const router = useRouter();

  console.log('router', router);

  const {
    metal,
    shape,
    carat,
    chainLength,
    productTitle,
    productType,
    color,
    clarity,
    goldPurity,
    bandAccent,
    ringSize,
    caratWeightOverride,
    shopifyProductHandle,
    image,
  } = additionalVariantData;

  async function addProductToCart() {
    if (isReadyForCart) {
      // Jewelry
      if (productType !== 'Engagement Ring') {
        await addJewelryProductToCart(variantId, productTitle, productType, shape, metal, chainLength, carat, image);
      } else {
        // ER - To be refactored
        const diamondSpec = caratWeightOverride + ', ' + color + ', ' + clarity;
        const erMetal = goldPurity + ' ' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)];
        const refinedBandAccent = bandAccent.charAt(0).toUpperCase() + bandAccent.slice(1);

        await addERProductToCartByVariantId(
          variantId,
          productTitle,
          shape,
          refinedBandAccent,
          erMetal,
          ringSize,
          diamondSpec,
          image,
        );
      }
    } else {
      router.push(`/customize?collectionSlug=${router.query.collectionSlug}&productSlug=${router.query.productSlug}`);
    }
  }

  return (
    <CtaButtonContainer title={variantId} onClick={addProductToCart}>
      {ctaText}
    </CtaButtonContainer>
  );
}
