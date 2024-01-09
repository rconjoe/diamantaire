/* eslint-disable camelcase */
import { useAnalytics, GTM_EVENTS } from '@diamantaire/analytics';
import { DarksideButton, RingSizeGuide, SlideOut, UIString } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { addERProductToCart, addJewelryProductToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useProductIconList, useTranslations } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_TYPE_HUMAN_NAMES, getCurrency, getFormattedPrice, parseValidLocale } from '@diamantaire/shared/constants';
import { specGenerator } from '@diamantaire/shared/helpers';
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

type ProductConfiguratorProps = {
  configurations: { [key: string]: OptionItemProps[] };
  selectedConfiguration: { [key: string]: string };
  variantId: string;
  additionalVariantData?: Record<string, string>;
  isBuilderProduct?: boolean;
  updateSettingSlugs?: () => void;
  isBuilderFlowOpen?: boolean;
  updateFlowData?: (action: string, value: object, nextStep: null | string) => void;
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
  productIconListType?: string;
  settingSlugs?: {
    collectionSlug: string;
    productSlug: string;
  };
  setProductSlug: (_value: string) => void;
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
  productIconListType,
  settingSlugs,
  setProductSlug,
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

  const { builderProduct } = useContext(BuilderProductContext);

  const router = useRouter();

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
            setProductSlug={setProductSlug}
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
                selectedConfiguration={selectedConfiguration}
                areDiamondShapesHorizontal={selectedConfiguration?.diamondOrientation === 'horizontal'}
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
      {isSoldAsDouble && (
        <PairSelector
          isSoldAsDouble={isSoldAsDouble}
          isSoldAsPairOnly={isSoldAsPairOnly}
          setSelectedPair={setSelectedPair}
          selectedPair={selectedPair}
          variantPrice={variantPrice}
          setShouldDoublePrice={setShouldDoublePrice}
          selectedConfiguration={selectedConfiguration}
        />
      )}

      {/* Left/Right Products */}
      {isSoldAsLeftRight && (
        <LeftRightSelector
          selectedConfiguration={selectedConfiguration}
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
                {
                  ...additionalVariantData,
                  ...selectedConfiguration,
                  variantId: selectedVariantId,
                  collectionSlug: builderProduct?.product?.collectionSlug,
                },
                null,
              );

              router.push(
                `/customize/diamond-to-setting/summary/${builderProduct?.diamonds?.[0]?.lotId}/${settingSlugs?.collectionSlug}/${settingSlugs?.productSlug}`,
              );
            }}
          >
            <UIString>Complete & Review Your Ring</UIString>
          </DarksideButton>
        </div>
      ) : additionalVariantData ? (
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
          productIconListType={productIconListType}
          selectedPair={selectedPair}
        />
      ) : (
        ''
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
  productIconListType?: string;
  selectedPair?: 'pair' | 'single';
};

const AddToCartButtonContainer = styled.div`
  margin: 1rem 0;

  .atc-button button {
    font-size: var(--font-size-xxsmall);
    min-height: 4.9rem;
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
  productIconListType,
  selectedPair,
}: CtaButtonProps) {
  const router = useRouter();
  const { locale } = router;
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const { refetch } = useCartData(locale);

  const ctaText = isReadyForCart ? 'Add To Bag' : 'Select Your Diamond';

  const { emitDataLayer, productAdded } = useAnalytics();
  const { _t } = useTranslations(locale);
  const { _t: earring_t } = useTranslations(locale, ['OPTION_NAMES']);

  const { chainLength, productTitle, productType, color, clarity, bandAccent, caratWeightOverride, image } =
    additionalVariantData;

  const { data: { productIconList } = {} } = useProductIconList(productIconListType, locale);

  const shipTimeParent = productIconList?.items?.find(
    (item) => item._modelApiKey === 'modular_shipping_product_icon_list_item',
  );

  const { shippingBusinessDays, shippingBusinessDaysCountryMap } = shipTimeParent || {};

  const { countryCode } = parseValidLocale(locale);
  const shippingTime =
    countryCode === 'US'
      ? shippingBusinessDays
      : shippingBusinessDaysCountryMap?.[countryCode]
      ? shippingBusinessDaysCountryMap?.[countryCode]
      : shippingBusinessDaysCountryMap?.['International'];

  // Shipping times

  const currencyCode = getCurrency(countryCode);
  const formattedPrice = getFormattedPrice(price, locale, true, true);
  const jewelryProductTypes = ['Necklace', 'Bracelet', 'Earrings', 'Wedding Band', 'Ring'];

  // The _spec attribute controls what details are shown on a per-line-item basis in cart + checkout

  async function addProductToCart() {
    const productGroupKey = uuidv4();

    // Applies to all products
    const defaultAttributes = {
      _productTitle: productTitle,
      productAsset: image?.src,
      _productAssetObject: JSON.stringify(image),
      _dateAdded: Date.now().toString(),
      // Keep product in english for now
      _productType: productType,
      _productTypeTranslated: _t(productType),
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

    const specs = specGenerator({
      configuration: { ...selectedConfiguration, caratWeightOverride, color, clarity, ringSize: selectedSize },
      productType,
      _t,
      earring_t,
    });

    const metal = _t(
      `${selectedConfiguration?.goldPurity ? `${selectedConfiguration.goldPurity} ` : ''}${selectedConfiguration?.metal}`,
    );
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
        _specs: specs,
        productIconListShippingCopy: 'Ready-to-ship. Ships by Fri, Dec 1',
        productGroupKey,
        ringSize: selectedSize,
        shippingBusinessDays: shippingTime.toString(),

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
        locale,
      }).then(() => refetch());
    } else if (jewelryProductTypes.includes(productType)) {
      // Certain products have a different set of attributes, so we add them all here, then filter out when adding to cart. See addJewelryProductToCart in CartContext.tsx

      const jewelryAttributes = {
        ...defaultAttributes,
        feedId: variantId,
        diamondShape: _t(selectedConfiguration.diamondShape) || _t(selectedConfiguration.diamondType),
        caratWeight: selectedConfiguration.caratWeight ? _t(selectedConfiguration.caratWeight) + 'ct' : '',
        metalType: metal,
        chainLength: chainLength?.split('-')?.[1],
        bandWidth: _t(selectedConfiguration?.bandWidth),
        _specs: specs,
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
        shippingBusinessDays: shippingTime.toString(),
        productIconListShippingCopy: 'Ready-to-ship. Ships by Fri, Dec 1',
      };

      let refinedVariantId = variantId;

      // Default should always be left
      if (productType === 'Earrings') {
        if (selectedEarringOrientation === 'right') {
          refinedVariantId = additionalVariantIds[0];
        }
      }

      addJewelryProductToCart({
        variantId: refinedVariantId,
        attributes: jewelryAttributes,
        hasEngraving: Boolean(engravingText),
        engravingText,
        locale,
      }).then(() => refetch());
    } else if (productType === 'Gift Card') {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { shippingText, ...otherAttributes } = defaultAttributes;
      const giftCardAttributes = {
        ...otherAttributes,
        pdpUrl: window.location.href,
        feedId: variantId,
        // Jewelry specific attributes
        metalType: '',
        shippingBusinessDays: '',
        productIconListShippingCopy: '',
        shippingText: '',
        childProduct: '',
      };

      // Assuming you have a function to handle adding a gift card to the cart
      addJewelryProductToCart({
        variantId: variantId,
        attributes: giftCardAttributes,
        locale,
      }).then(() => refetch());
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
              `/customize/setting-to-diamond/${router.query.collectionSlug}/${router.query.productSlug}/${
                isSoldAsDouble && selectedPair === 'pair' ? '?pair=true' : ''
              }`,
            );
          }
        }}
      >
        <UIString>{ctaText}</UIString>
      </DarksideButton>
    </AddToCartButtonContainer>
  );
}
