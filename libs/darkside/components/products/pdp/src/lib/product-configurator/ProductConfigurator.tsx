import { CartContext } from '@diamantaire/darkside/components/cart';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { metalTypeAsConst } from '@diamantaire/shared/constants';
import { extractMetalTypeFromShopifyHandle } from '@diamantaire/shared/helpers';
import { BLACK, WHITE } from '@diamantaire/styles/darkside-styles';
import { useCallback, useState, Dispatch, SetStateAction, useContext } from 'react';
import styled from 'styled-components';

import ConfigurationSelector from './configuration-selector/ConfigurationSelector';
import { OptionItem } from './option-item/OptionItem';
import OptionSelector from './option-selector/OptionSelector';

type ProductConfiguratorProps = {
  configurations: { [key: string]: OptionItem[] };
  selectedConfiguration: { [key: string]: string };
  initialVariantId: string;
  diamondId?: string;
  additionalVariantData?: Record<string, string>;
  isBuilderProduct?: boolean;
  product: {
    productType: string;
    productSlug: string;
    collectionSlug: string;
    configuration: Record<string, string>;
  };
};

function ProductConfigurator({
  configurations,
  diamondId,
  selectedConfiguration,
  initialVariantId,
  additionalVariantData,
  product,
  isBuilderProduct,
}: ProductConfiguratorProps) {
  const { builderProduct, dispatch } = useContext(BuilderProductContext);
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(
    !isBuilderProduct || builderProduct.builderState === 'Complete',
  );
  const [selectedVariantId, setSelectVariantId] = useState<string>(initialVariantId);
  const [selectedSize, setSelectedSize] = useState<string>(selectedConfiguration[sizeOptionKey]);
  const sizeOptions = configurations[sizeOptionKey];

  debugger;

  const handleCtaButtonClick = () => {
    if (isConfigurationComplete) {
      console.log('ADD TO CART');
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
      console.log('ADDED PRODUCT, NEED TO ADD DIAMOND');
    }
  };

  // TODO: this is a hack to get the configurator to work with the current data structure
  const handleConfigChange = useCallback(
    (configState) => {
      const { diamondType, caratWeight } = configState;
      const usesCustomDiamond = diamondType && caratWeight && caratWeight === 'other';

      if (usesCustomDiamond && diamondId) {
        setIsConfigurationComplete(true);
      }
    },
    [diamondId, selectedVariantId],
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
        onClick={handleCtaButtonClick}
        additionalVariantData={additionalVariantData}
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
  additionalVariantData?: any;
};

const CtaButtonContainer = styled(PrimaryButton)`
  margin: 10px 0;
`;

function CtaButton({ variantId, isReadyForCart, additionalVariantData }: CtaButtonProps) {
  const { addJewelryProductToCart, addERProductToCartByVariantId } = useContext(CartContext);
  const ctaText = isReadyForCart ? 'Add to Cart' : 'Select your Diamond';

  // const handleButtonClick = () => {
  //   if (!isReadyForCart) onClick(true);
  // };

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
  }

  return (
    <CtaButtonContainer title={variantId} onClick={addProductToCart}>
      {ctaText}
    </CtaButtonContainer>
  );
}
