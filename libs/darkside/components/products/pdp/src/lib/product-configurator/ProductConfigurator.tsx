import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { metalTypeAsConst } from '@diamantaire/shared/constants';
import { extractMetalTypeFromShopifyHandle } from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { useRouter } from 'next/router';
import { useCallback, useState, useContext, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import ConfigurationSelector from './configuration-selector/ConfigurationSelector';
import OptionSelector from './option-selector/OptionSelector';
import ProductEngraving from '../ProductEngraving';
import ProductExtraInfo from '../ProductExtraInfo';
import ProductTypeSpecificMetrics from '../ProductTypeSpecificMetrics';

type ProductConfiguratorProps = {
  configurations: { [key: string]: OptionItemProps[] };
  selectedConfiguration: { [key: string]: string };
  variantId: string;
  diamondId?: string;
  additionalVariantData?: Record<string, string>;
  isBuilderProduct?: boolean;
  updateSettingSlugs?: () => void;
  isBuilderFlowOpen?: boolean;
  updateFlowData?: (action: string, value: object, nextStep: null | number) => void;
  flowIndex?: number;
  disableVariantType?: string[];
  hasMoreThanOneVariant?: boolean;
  extraOptions?: {
    label: string;
    name: string;
  }[];
};

function ProductConfigurator({
  configurations,
  diamondId,
  selectedConfiguration,
  variantId,
  additionalVariantData,
  isBuilderFlowOpen = false,
  updateFlowData,
  updateSettingSlugs,
  flowIndex,
  disableVariantType = [],
  hasMoreThanOneVariant = true,
  extraOptions,
}: ProductConfiguratorProps) {
  const [engravingText, setEngravingText] = useState(null);
  const { builderProduct } = useContext(BuilderProductContext);
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(true);

  const [selectedVariantId, setSelectVariantId] = useState<string>(variantId);

  // Ring size is not being returned on the config
  // const [selectedSize, setSelectedSize] = useState<string>(selectedConfiguration?.[sizeOptionKey] || null);
  const [selectedSize, setSelectedSize] = useState<string>('5' || null);

  const sizeOptions = configurations[sizeOptionKey];

  console.log('selectedConfiguration', selectedConfiguration);
  console.log('configurations', configurations);
  console.log('selectedSize', selectedSize);

  // This manages the state of the add to cart button, the variant is tracked via response from VRAI server
  const handleConfigChange = useCallback(
    (configState) => {
      console.log('selectedConfiguration', selectedConfiguration);
      const { diamondType, caratWeight } = configState;

      const usesCustomDiamond =
        diamondType && configurations.diamondType.length > 1 && caratWeight && caratWeight === 'other';

      console.log('usesCustomDiamond', usesCustomDiamond);
      if (usesCustomDiamond) {
        setIsConfigurationComplete(false);
      } else {
        setIsConfigurationComplete(true);
      }
    },
    [diamondId, selectedVariantId],
  );

  const handleSizeChange = useCallback((option: OptionItemProps) => {
    setSelectVariantId(option.id);
    setSelectedSize(option.value);
  }, []);

  useEffect(() => {
    setSelectVariantId(variantId);
  }, [variantId]);

  const hasCaratWeightSelector = useMemo(() => {
    return configurations.caratWeight?.length > 1;
  }, []);

  return (
    <>
      {!hasCaratWeightSelector && (
        <ProductTypeSpecificMetrics
          additionalVariantData={additionalVariantData}
          productType={additionalVariantData?.productType}
        />
      )}

      {hasMoreThanOneVariant && (
        <>
          <ConfigurationSelector
            configurations={configurations}
            selectedConfiguration={selectedConfiguration}
            onChange={handleConfigChange}
            isBuilderFlowOpen={isBuilderFlowOpen}
            updateSettingSlugs={updateSettingSlugs}
            disableVariantType={disableVariantType}
          />

          {sizeOptions &&
            isConfigurationComplete &&
            !disableVariantType.includes('ringSize') &&
            additionalVariantData?.productType === 'Engagement Ring' && (
              <OptionSelector
                optionType={sizeOptionKey}
                label={sizeOptionKey}
                options={sizeOptions}
                selectedOptionValue={selectedSize}
                onChange={handleSizeChange}
              />
            )}
        </>
      )}

      {extraOptions && extraOptions.length > 0 && <ProductExtraInfo extraOptions={extraOptions} />}

      <ProductEngraving engravingText={engravingText} setEngravingText={setEngravingText} />

      {isBuilderFlowOpen ? (
        <div
          style={{
            marginTop: '20px',
          }}
        >
          <DarksideButton
            onClick={() => {
              updateFlowData(
                'ADD_PRODUCT',
                { ...additionalVariantData, ...selectedConfiguration, variantId: selectedVariantId },
                flowIndex + 1,
              );
            }}
          >
            Next
          </DarksideButton>
        </div>
      ) : (
        <AddToCartButton
          variantId={String(selectedVariantId)}
          isReadyForCart={isConfigurationComplete}
          isConfigurationComplete={isConfigurationComplete}
          additionalVariantData={additionalVariantData}
          selectedConfiguration={selectedConfiguration}
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
  isConfigurationComplete?: boolean;
  enableEngraving?: boolean;
  selectedConfiguration?: { [key: string]: string };
};

const AddToCartButtonContainer = styled.div`
  margin: 10px 0;
`;

// Button states
// -- Add to Cart
// -- Select Custom Diamond
// -- Unavailable
function AddToCartButton({
  variantId,
  isReadyForCart,
  additionalVariantData,
  enableEngraving = false,
  selectedConfiguration,
  isConfigurationComplete,
}: CtaButtonProps) {
  const { addItem, setIsCartOpen } = useContext(CartContext);
  const ctaText = isReadyForCart ? 'Add to Cart' : 'Select your Diamond';

  console.log('selectedConfiguration', selectedConfiguration);

  const {
    // metal,
    chainLength,
    // ringSize,
    carat,
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
    configuredProductOptionsInOrder,
  } = additionalVariantData;

  const router = useRouter();

  console.log('router', router);

  function elminateEmptyValues(items) {
    return items.filter((item) => item.value !== '');
  }

  // dateAdded + productType + productTitle + image are critical for any cart item
  async function addProductToCart() {
    const diamondSpec = caratWeightOverride + ', ' + color + ', ' + clarity;

    const cartAttributesForAllItems = [
      {
        key: 'productTitle',
        value: productTitle,
      },
      {
        key: '_image',
        value: JSON.stringify(image),
      },
      {
        key: '_dateAdded',
        value: Date.now().toString(),
      },
      {
        key: 'productType',
        value: productType,
      },
    ];

    console.log('adding', productType);
    console.log('shopifyProductHandle', shopifyProductHandle);
    console.log('additionalVariantData', additionalVariantData);

    if (productType === 'Engagement Ring') {
      const erMetal = goldPurity + ' ' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)];
      const refinedBandAccent = bandAccent?.charAt(0)?.toUpperCase() + bandAccent.slice(1);

      const engagementRingItemAttributes = [
        ...cartAttributesForAllItems,
        {
          key: 'diamondShape',
          value: shape,
        },
        {
          key: 'centerStone',
          value: diamondSpec,
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
      const metal = goldPurity
        ? goldPurity + ' '
        : '' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(configuredProductOptionsInOrder)];
      let necklaceAttributes = [
        ...cartAttributesForAllItems,
        {
          key: 'diamondShape',
          value: selectedConfiguration.diamondType,
        },
        {
          key: 'caratWeight',
          value: carat,
        },
        {
          key: 'metal',
          value: metal,
        },
      ];

      necklaceAttributes = elminateEmptyValues(necklaceAttributes);

      addItem(variantId, [...necklaceAttributes]);
    } else if (productType === 'Bracelet') {
      const metal = goldPurity
        ? goldPurity + ' '
        : '' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(configuredProductOptionsInOrder)];
      const braceletAttributes = [
        ...cartAttributesForAllItems,
        {
          key: 'diamondShape',
          value: selectedConfiguration.diamondShape,
        },
        {
          key: 'metal',
          value: metal,
        },
        {
          key: 'chainLength',
          value: chainLength?.split('-')?.[1],
        },
      ];

      addItem(variantId, [...braceletAttributes]);
    }
    // Trigger cart to open
    setIsCartOpen(true);
  }

  console.log('proxxx', configuredProductOptionsInOrder);

  return (
    <AddToCartButtonContainer>
      <DarksideButton
        onClick={() => {
          if (isConfigurationComplete) {
            addProductToCart();
          } else {
            router.push(
              `/customize?type=setting-to-diamond&collectionSlug=${router.query.collectionSlug}&productSlug=${router.query.productSlug}`,
            );
          }
        }}
      >
        {ctaText}
      </DarksideButton>
    </AddToCartButtonContainer>
  );
}
