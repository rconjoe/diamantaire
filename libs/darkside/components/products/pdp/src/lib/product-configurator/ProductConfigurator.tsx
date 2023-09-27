/* eslint-disable camelcase */
import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { useAnalytics, GTM_EVENTS } from '@diamantaire/darkside/context/analytics';
import { CartContext } from '@diamantaire/darkside/context/cart-context';
import { useHumanNameMapper } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  getFormattedPrice,
  metalTypeAsConst,
  parseValidLocale,
  getCurrency,
  DIAMOND_TYPE_HUMAN_NAMES,
  metalTypeAsConst,
  DIAMOND_TYPE_HUMAN_NAMES,
  getCurrency,
  metalTypeAsConst,
  parseValidLocale,
} from '@diamantaire/shared/constants';
import {
  extractMetalTypeFromShopifyHandle,
  extractMetalTypeFromShopifyHandle,
  makeCurrency,
} from '@diamantaire/shared/helpers';
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
  defaultRingSize?: string;
  hasMultipleDiamondOrientations?: boolean;
  variantProductTitle?: string;
  price?: number;
  isEngraveable?: boolean;
  isSoldAsDouble?: boolean;
  variantPrice?: number;
  setShouldDoublePrice?: (value: boolean) => void;
};

function ProductConfigurator({
  configurations,
  diamondId,
  selectedConfiguration,
  variantId,
  variantPrice,
  additionalVariantData,
  isBuilderFlowOpen = false,
  updateFlowData,
  updateSettingSlugs,
  flowIndex,
  disableVariantType = [],
  hasMoreThanOneVariant = true,
  extraOptions,
  defaultRingSize,
  hasMultipleDiamondOrientations,
  variantProductTitle,
  price,
  isEngraveable = false,
  isSoldAsDouble,
  setShouldDoublePrice,
}: ProductConfiguratorProps) {
  const [engravingText, setEngravingText] = useState(null);
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const sizeOptions = configurations[sizeOptionKey];
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(true);

  console.log('init id', sizeOptions.find((option) => option.value === defaultRingSize)?.id);

  const [selectedVariantId, setSelectVariantId] = useState<string>(
    sizeOptions.find((option) => option.value === defaultRingSize)?.id || variantId,
  );

  // Ring size
  const [selectedSize, setSelectedSize] = useState<string>(defaultRingSize || '5');

  // Pair or single
  const [selectedPair, setSelectedPair] = useState<'pair' | 'single'>('pair');

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

      return selectedConfiguration;
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
  }, [configurations]);

  console.log('configurations', configurations);
  console.log('isEngravable', isEngraveable);

  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrency(countryCode);

  const pairSelector: OptionItemProps[] = [
    {
      id: 'pair',
      value: 'pair - ' + makeCurrency(variantPrice * 2, locale, currencyCode),
      valueLabel: 'Pair',
      isSelected: selectedPair === 'pair',
    },
    {
      id: 'single',
      value: 'single - ' + makeCurrency(variantPrice, locale, currencyCode),
      valueLabel: 'Single',
      isSelected: selectedPair === 'single',
    },
  ];

  const handlePairChange = useCallback((option: OptionItemProps) => {
    console.log('pair option', option);
    setSelectedPair(option.value as 'pair' | 'single');
    if (option.value === 'pair') {
      setShouldDoublePrice(true);
    } else {
      setShouldDoublePrice(false);
    }
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
            hasMultipleDiamondOrientations={hasMultipleDiamondOrientations}
          />

          {sizeOptions &&
            isConfigurationComplete &&
            !disableVariantType.includes('ringSize') &&
            (additionalVariantData?.productType === 'Engagement Ring' ||
              additionalVariantData?.productType === 'Ring' ||
              additionalVariantData?.productType === 'Wedding Band') && (
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

      {isSoldAsDouble && isConfigurationComplete && (
        <OptionSelector
          optionType={'soldAsDouble'}
          label={'soldAsDouble'}
          options={pairSelector}
          selectedOptionValue={selectedPair}
          onChange={handlePairChange}
        />
      )}

      {extraOptions && extraOptions.length > 0 && <ProductExtraInfo extraOptions={extraOptions} />}

      {isEngraveable && isConfigurationComplete && !isBuilderFlowOpen && (
        <ProductEngraving engravingText={engravingText} setEngravingText={setEngravingText} />
      )}

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
          variantProductTitle={variantProductTitle}
          price={price}
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
  selectedConfiguration?: { [key: string]: string };
  variantProductTitle?: string;
  price?: number;
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
  selectedConfiguration,
  isConfigurationComplete,
  variantProductTitle,
  price,
}: CtaButtonProps) {
  const { addItem, setIsCartOpen } = useContext(CartContext);
  const ctaText = isReadyForCart ? 'Add to Cart' : 'Select your Diamond';

  const { emitDataLayer, productAdded } = useAnalytics();
  const router = useRouter();
  const { locale } = router;
  const { data: { BAND_WIDTH_HUMAN_NAMES: BAND_WIDTH_HUMAN_NAMES_MAP } = {} } = useHumanNameMapper(locale);

  const {
    metal: variantMetal,
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

  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrency(countryCode);
  const formattedPrice = getFormattedPrice(price, locale, true, true);

  function elminateEmptyValues(items) {
    return items.filter((item) => item.value !== '' && item.value !== null && item.value);
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

    const id = variantId?.split('/').pop();

    productAdded({
      id,
      name: productTitle,
      variant: variantProductTitle,
      product: variantProductTitle,
      price: formattedPrice,
      quantity: 1,
      currencyCode,
      brand: 'VRAI',
      category: productType,
      image_url: image?.src,
      diamond_type: selectedConfiguration?.diamondType,
      ...selectedConfiguration,
      ecommerce: {
        value: formattedPrice,
        currency: currencyCode,
        add: {
          products: [
            {
              id,
              name: productTitle,
              variant: variantProductTitle,
              product: variantProductTitle,
              price: formattedPrice,
              quantity: 1,
              brand: 'VRAI',
            },
          ],
        },
      },
      items: [
        {
          item_id: id,
          item_name: variantProductTitle,
          item_brand: 'VRAI',
          item_category: productType,
          price: formattedPrice,
          currency: currencyCode,
          quantity: 1,
          ...selectedConfiguration,
        },
      ],
    });

    if (productType === 'Engagement Ring') {
      const erMetal = goldPurity
        ? goldPurity + ' '
        : '' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)];
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
          value: shape,
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
      let braceletAttributes = [
        ...cartAttributesForAllItems,
        {
          key: 'diamondShape',
          value: selectedConfiguration.diamondShape || DIAMOND_TYPE_HUMAN_NAMES[selectedConfiguration.diamondType],
        },
        {
          key: 'metal',
          value: variantMetal,
        },
        {
          key: 'chainLength',
          value: chainLength?.split('-')?.[1],
        },
      ];

      braceletAttributes = elminateEmptyValues(braceletAttributes);

      addItem(variantId, [...braceletAttributes]);
    } else if (productType === 'Wedding Band') {
      const metal = goldPurity
        ? goldPurity + ' '
        : '' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)];

      let weddingBandAttributes = [
        ...cartAttributesForAllItems,
        {
          key: 'metal',
          value: metal,
        },
        {
          key: 'bandWidth',
          value: BAND_WIDTH_HUMAN_NAMES_MAP[selectedConfiguration.bandWidth]?.value,
        },
      ];

      weddingBandAttributes = elminateEmptyValues(weddingBandAttributes);

      addItem(variantId, [...weddingBandAttributes]);
    } else if (productType === 'Earrings') {
      console.log('add earring');
      // const metal = goldPurity
      //   ? goldPurity + ' '
      //   : '' + metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)];

      // let weddingBandAttributes = [
      //   ...cartAttributesForAllItems,
      //   {
      //     key: 'metal',
      //     value: metal,
      //   },
      //   {
      //     key: 'bandWidth',
      //     value: BAND_WIDTH_HUMAN_NAMES_MAP[selectedConfiguration.bandWidth]?.value,
      //   },
      // ];

      // weddingBandAttributes = elminateEmptyValues(weddingBandAttributes);

      // addItem(variantId, [...weddingBandAttributes]);
    }
    // Trigger cart to open
    setIsCartOpen(true);
  }

  return (
    <AddToCartButtonContainer>
      <DarksideButton
        onClick={() => {
          if (isConfigurationComplete) {
            addProductToCart();
          } else {
            // ER select shape from pdp setting flow
            const { diamondType } = selectedConfiguration || {};

            emitDataLayer({
              event: GTM_EVENTS.selectShape,
              eventCategory: 'engagement_ring_creation',
              eventAction: GTM_EVENTS.selectShape,
              eventLabel: diamondType,
              select_shape: diamondType,
              diamond_type: diamondType,
            });
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
