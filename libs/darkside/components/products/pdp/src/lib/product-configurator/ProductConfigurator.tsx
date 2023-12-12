/* eslint-disable camelcase */
import { useAnalytics, GTM_EVENTS } from '@diamantaire/analytics';
import { DarksideButton, SlideOut, UIString } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { addERProductToCart, addJewelryProductToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useTranslations } from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  getCurrency,
  getFormattedPrice,
  metalTypeAsConst,
  parseValidLocale,
} from '@diamantaire/shared/constants';
import { OptionItemProps } from '@diamantaire/shared/types';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import ConfigurationSelector from './configuration-selector/ConfigurationSelector';
import LeftRightSelector from './option-selector/LeftRightSelector';
import OptionSelector from './option-selector/OptionSelector';
import PairSelector from './option-selector/PairSelector';
import ProductEngraving from '../ProductEngraving';
import ProductExtraInfo from '../ProductExtraInfo';
import ProductTypeSpecificMetrics from '../ProductTypeSpecificMetrics';
import RingSizeGuide from '../RingSizeGuide';

type ProductConfiguratorProps = {
  configurations: { [key: string]: OptionItemProps[] };
  selectedConfiguration: { [key: string]: string };
  variantId: string;
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
  shouldDoublePrice?: boolean;
  setShouldDoublePrice?: (value: boolean) => void;
  hasSingleInitialEngraving?: boolean;
  isSoldAsPairOnly?: boolean;
  isSoldAsLeftRight?: boolean;
  variants?: {
    shopifyVariantId: string;
    variantTitle: string;
  }[];
  requiresCustomDiamond: boolean;
  engravingText?: string;
  setEngravingText?: (value: string) => void;
};

function ProductConfigurator({
  configurations,
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
  shouldDoublePrice,
  hasSingleInitialEngraving = false,
  isSoldAsPairOnly = false,
  isSoldAsLeftRight = false,
  variants,
  requiresCustomDiamond,
  engravingText,
  setEngravingText,
}: ProductConfiguratorProps) {
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const sizeOptions = configurations[sizeOptionKey];
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(true);
  const { locale } = useRouter();

  const { _t } = useTranslations(locale);

  const [selectedVariantId, setSelectVariantId] = useState<string>(
    sizeOptions.find((option) => option.value === defaultRingSize)?.id || variantId,
  );

  // Ring size
  const [selectedSize, setSelectedSize] = useState<string>(defaultRingSize || '5');

  // Pair or single - always start on pair
  const [selectedPair, setSelectedPair] = useState<'pair' | 'single'>('pair');

  // Left or right - always start on pair
  const [selectedEarringOrientation, setSelectedEarringOrientation] = useState<'left' | 'right' | 'pair'>('pair');

  // Wedding Band Size Guide
  const [isWeddingBandSizeGuideOpen, setIsWeddingBandSizeGuideOpen] = useState<boolean>(false);

  // This manages the state of the add to cart button, the variant is tracked via response from VRAI server
  const handleConfigChange = useCallback(() => {
    if (requiresCustomDiamond) {
      setIsConfigurationComplete(false);
    } else {
      setIsConfigurationComplete(true);
    }

    return selectedConfiguration;
  }, [requiresCustomDiamond, selectedVariantId]);

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

  const additionalVariantIds = useMemo(() => {
    return variants?.filter((variant) => variant.shopifyVariantId !== variantId).map((variant) => variant.shopifyVariantId);
  }, [selectedEarringOrientation, variants]);

  return (
    <>
      {!hasCaratWeightSelector && (
        <ProductTypeSpecificMetrics
          additionalVariantData={additionalVariantData}
          productType={additionalVariantData?.productType}
          shouldDoublePrice={shouldDoublePrice}
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
            productType={additionalVariantData?.productType}
            diamondSpecs={{
              color: additionalVariantData?.color,
              clarity: additionalVariantData?.clarity,
            }}
          />

          {/* Ring Size */}
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
                isWeddingBandProduct={additionalVariantData?.productType === 'Wedding Band'}
                setIsWeddingBandSizeGuideOpen={setIsWeddingBandSizeGuideOpen}
                productType={additionalVariantData?.productType}
              />
            )}
        </>
      )}

      <AnimatePresence>
        {isWeddingBandSizeGuideOpen && (
          <SlideOut
            title={_t('Size Guide')}
            width="30%"
            onClose={() => setIsWeddingBandSizeGuideOpen(false)}
            className="extra-side-padding"
          >
            <RingSizeGuide />
          </SlideOut>
        )}
      </AnimatePresence>

      {/* Pair Products */}
      {isSoldAsDouble && isConfigurationComplete && (
        <PairSelector
          isSoldAsDouble={isSoldAsDouble}
          isSoldAsPairOnly={isSoldAsPairOnly}
          setSelectedPair={setSelectedPair}
          selectedPair={selectedPair}
          variantPrice={variantPrice}
          setShouldDoublePrice={setShouldDoublePrice}
        />
      )}

      {/* Left/Right Products */}
      {isSoldAsLeftRight && (
        <LeftRightSelector
          selectedEarringOrientation={selectedEarringOrientation}
          setSelectedEarringOrientation={setSelectedEarringOrientation}
          setShouldDoublePrice={setShouldDoublePrice}
        />
      )}

      {extraOptions && extraOptions.length > 0 && <ProductExtraInfo extraOptions={extraOptions} />}
      {(isEngraveable || hasSingleInitialEngraving) && isConfigurationComplete && !isBuilderFlowOpen && (
        <ProductEngraving
          engravingText={engravingText}
          setEngravingText={setEngravingText}
          hasSingleInitialEngraving={hasSingleInitialEngraving}
        />
      )}
      {isBuilderFlowOpen ? (
        <div
          style={{
            marginTop: '2rem',
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
          shouldDoublePrice={shouldDoublePrice}
          selectedSize={selectedSize}
          selectedEarringOrientation={selectedEarringOrientation}
          isSoldAsLeftRight={isSoldAsLeftRight}
          isSoldAsDouble={isSoldAsDouble}
          additionalVariantIds={additionalVariantIds}
          engravingText={engravingText}
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
  shouldDoublePrice?: boolean;
  isSoldAsLeftRight?: boolean;
  selectedSize?: string;
  selectedEarringOrientation?: string;
  isSoldAsDouble?: boolean;
  additionalVariantIds?: string[];
  engravingText?: string;
};

const AddToCartButtonContainer = styled.div`
  margin: 1rem 0;

  .atc-button button {
    font-size: var(--font-size-xxsmall);
    min-height: 4.7rem;
  }
`;

function AddToCartButton({
  variantId,
  isReadyForCart,
  additionalVariantData,
  selectedConfiguration,
  isConfigurationComplete,
  variantProductTitle,
  price,
  shouldDoublePrice,
  selectedSize,
  selectedEarringOrientation,
  isSoldAsLeftRight,
  additionalVariantIds,
  isSoldAsDouble,
  engravingText,
}: CtaButtonProps) {
  const router = useRouter();
  const { locale } = router;
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const { refetch } = useCartData(locale);

  const ctaText = isReadyForCart ? 'Add To Bag' : 'Select Your Diamond';

  const { emitDataLayer, productAdded } = useAnalytics();
  const { _t } = useTranslations(locale);

  const { chainLength, productTitle, productType, color, clarity, bandAccent, caratWeightOverride, image } =
    additionalVariantData;

  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrency(countryCode);
  const formattedPrice = getFormattedPrice(price, locale, true, true);
  const jewelryProductTypes = ['Necklace', 'Bracelet', 'Earrings', 'Wedding Band'];

  async function addProductToCart() {
    const productGroupKey = uuidv4();

    // Applies to all products
    const defaultAttributes = {
      _productTitle: productTitle,
      productAsset: JSON.stringify(image),
      _dateAdded: Date.now().toString(),
      _productType: productType,
      shippingText: _t('Made-to-order. Ships by'),
      productGroupKey,
    };

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

    // Common attributes

    const metal =
      (selectedConfiguration.goldPurity ? selectedConfiguration.goldPurity + ' ' : '') +
      metalTypeAsConst[selectedConfiguration?.metal];
    const pickBandAccent = bandAccent || selectedConfiguration?.bandAccent;
    const refinedBandAccent = pickBandAccent
      ? pickBandAccent?.charAt(0)?.toUpperCase() + (pickBandAccent ? pickBandAccent.slice(1) : '')
      : null;

    if (productType === 'Engagement Ring') {
      const diamondSpec = caratWeightOverride + ', ' + color + ', ' + clarity;
      const erItemAttributes = {
        ...defaultAttributes,
        // Fulfillment info
        metalType: metal,
        pdpUrl: window.location.href,
        feedId: variantId,
        _specs: `Shape: ${
          DIAMOND_TYPE_HUMAN_NAMES[selectedConfiguration?.diamondType]
        };Metal: ${metal};Band: ${refinedBandAccent};Ring size: ${selectedConfiguration?.ringSize}`,
        productIconListShippingCopy: 'temp',
        productGroupKey,
        ringSize: selectedSize,

        // Cart specific info
        diamondShape: DIAMOND_TYPE_HUMAN_NAMES[selectedConfiguration?.diamondType],
        centerStone: diamondSpec,
        bandAccent: refinedBandAccent,
        childProduct: null,
      };

      addERProductToCart({
        settingVariantId: variantId,
        settingAttributes: erItemAttributes,
        hasEngraving: Boolean(engravingText),
        engravingText,
      }).then(() => refetch());
    } else if (jewelryProductTypes.includes(productType)) {
      // Certain products have a different set of attributes, so we add them all here, then filter out when adding to cart. See addJewelryProductToCart in CartContext.tsx

      const jewelryAttributes = {
        ...defaultAttributes,
        feedId: variantId,
        diamondShape: selectedConfiguration.diamondShape || DIAMOND_TYPE_HUMAN_NAMES[selectedConfiguration.diamondType],
        caratWeight: selectedConfiguration.caratWeight ? _t(selectedConfiguration.caratWeight) + 'ct' : '',
        metalType: metal,
        chainLength: chainLength?.split('-')?.[1],
        bandWidth: _t(selectedConfiguration?.bandWidth),
        // selectedSize comes from the ringSize selector
        ringSize: selectedSize,
        leftOrRight: isSoldAsLeftRight ? selectedEarringOrientation : null,
        bandAccent: refinedBandAccent,
        // The price should be doubled, and one of the toggles should be set to trigger a child product
        childProduct:
          (shouldDoublePrice && isSoldAsDouble) || (shouldDoublePrice && isSoldAsLeftRight)
            ? JSON.stringify({
                behavior: isSoldAsDouble && !isSoldAsLeftRight ? 'duplicate' : 'linked',
                additionalVariantIds,
              })
            : null,
        totalPriceOverride: shouldDoublePrice ? price.toString() : null,
        pdpUrl: window.location.href,
        shippingBusinessDays: 'temp',
        productIconListShippingCopy: 'temp',
      };

      let refinedVariantId = variantId;

      // Default should always be left
      if (productType === 'Earrings') {
        if (selectedEarringOrientation === 'right') {
          refinedVariantId = additionalVariantIds[0];
        }
      }

      addJewelryProductToCart({ variantId: refinedVariantId, attributes: jewelryAttributes }).then(() => refetch());
    }

    updateGlobalContext({
      isCartOpen: true,
    });
  }

  return (
    <AddToCartButtonContainer>
      <DarksideButton
        className="atc-button"
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
        <UIString>{ctaText}</UIString>
      </DarksideButton>
    </AddToCartButtonContainer>
  );
}
