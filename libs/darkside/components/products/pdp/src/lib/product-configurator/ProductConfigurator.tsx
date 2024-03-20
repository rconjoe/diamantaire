/* eslint-disable camelcase */
import { useAnalytics, GTM_EVENTS } from '@diamantaire/analytics';
import { DarksideButton, Loader, RingSizeGuide, SlideOut, UIString } from '@diamantaire/darkside/components/common-ui';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { addERProductToCart, addJewelryProductToCart, addMiscProductToCart } from '@diamantaire/darkside/data/api';
import { useCartData, useProductIconList, useTranslations, useVariantInventory } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_TYPE_HUMAN_NAMES, getCurrency, getFormattedPrice, parseValidLocale } from '@diamantaire/shared/constants';
import { getFormattedShipByDate, getShippingTimeStamp, specGenerator } from '@diamantaire/shared/helpers';
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
import { ProductKlarna } from '../ProductKlarna';
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
  setProductSlug: (_value: string) => void;
  trackInventory?: boolean;
  parentProductAttributes?: Record<string, string>;
  isProductFeedUrl?: boolean;
  ctaCopy?: {
    purchaseWithThisDiamondCopy?: string;
    settingFlowCtaCopy?: string;
    modifyYourDiamondCopy?: string;
    buyButtonCopy?: string;
  };
  selectedDiamond?: Array<{
    diamondType?: string;
    carat?: string;
    color?: string;
    clarity?: string;
    price?: number;
  }>;
  productTitle?: string;
};

function ProductConfigurator({
  configurations,
  selectedConfiguration,
  variantId,
  variantPrice,
  additionalVariantData,
  isBuilderFlowOpen = false,
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
  setProductSlug,
  parentProductAttributes,
  isProductFeedUrl,
  ctaCopy,
  selectedDiamond,
  productTitle,
  trackInventory,
}: ProductConfiguratorProps) {
  const sizeOptionKey = 'ringSize'; // will only work for ER and Rings, needs to reference product type
  const sizeOptions = configurations?.[sizeOptionKey];
  const [isConfigurationComplete, setIsConfigurationComplete] = useState<boolean>(true);
  const { locale, query } = useRouter();
  const productType = additionalVariantData?.productType;
  const preselectedRingSize = query?.ringSize;
  const preselectedSizeVariant = configurations?.ringSize?.find((item) => item.value === preselectedRingSize);

  const defaultVariantId = sizeOptions?.find((option) => option.value === preselectedRingSize)?.id || variantId;

  const { _t } = useTranslations(locale);
  const [selectedVariantId, setSelectVariantId] = useState<string>(defaultVariantId);

  const { isFetching, isInStock } = useVariantInventory(selectedVariantId, trackInventory);

  // Ring size
  const [selectedSize, setSelectedSize] = useState<string>(preselectedSizeVariant?.value || defaultRingSize || '5');

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

  const updateVraiProductSKUData = (shopifyVariantId: string) => {
      const variant = (variants || []).find((_variant) => _variant.shopifyVariantId === shopifyVariantId);
      
      if (variant) {
        window['vraiProduct'].currentSKU = variant['sku'];
      }
  }

  const handleSizeChange = useCallback((option: OptionItemProps) => {
    if (option?.value) {
      router.push(
        {
          pathname: window?.location?.pathname,
          query: {
            ringSize: option.value,
          },
        },
        undefined,
        {
          shallow: true,
        },
      );
    }
    updateVraiProductSKUData(option.id);
    setSelectVariantId(option.id);
    setSelectedSize(option.value);
  }, []);

  useEffect(() => {
    const updateVariantId = () => {
      let newVariantId = variantId; // default to the initial variant ID

      if ((productType === 'Wedding Band' || productType === 'Ring') && selectedSize) {
        // Find the variant ID that matches the selected size
        const matchingVariant = configurations?.ringSize?.find((variant) => variant.value === selectedSize)?.id;

        if (matchingVariant) {
          newVariantId = matchingVariant;
        }
      }

      setSelectVariantId(newVariantId);
    };

    updateVariantId();
  }, [selectedSize, variantId, configurations, productType]);

  const hasCaratWeightSelector = useMemo(() => {
    return configurations?.caratWeight?.length > 1;
  }, [configurations]);

  const additionalVariantIds = useMemo(() => {
    return variants?.filter((variant) => variant.shopifyVariantId !== variantId).map((variant) => variant.shopifyVariantId);
  }, [selectedEarringOrientation, variants]);

  const { builderProduct } = useContext(BuilderProductContext);

  const router = useRouter();
  const { purchaseWithThisDiamondCopy, settingFlowCtaCopy } = ctaCopy || {};

  const CompleteYourRingButton = ({ ctaText }) => {
    return (
      <div
        style={{
          marginTop: '2rem',
        }}
      >
        <DarksideButton
          onClick={() =>
            router.push(
              `/customize/diamond-to-setting/${builderProduct?.diamonds.map((diamond) => diamond?.lotId).join('/')}/${router
                .query?.collectionSlug}/${router.query?.productSlug}/summary`,
            )
          }
        >
          {ctaText ? ctaText : <UIString>Complete & Review Your Ring</UIString>}
        </DarksideButton>
      </div>
    );
  };

  const ProductFeedCompleteYourRingButton = ({ ctaText, diamondsOverride }) => {
    if (!diamondsOverride || diamondsOverride.length === 0) return null;

    return (
      <div
        style={{
          margin: '1rem 0 1rem',
          minHeight: '4.9rem',
        }}
      >
        <DarksideButton
          textSize="medium"
          onClick={() => {
            router.push(
              `/customize/setting-to-diamond/${router.query.collectionSlug}/${router.query.productSlug}/${diamondsOverride
                .map((diamond) => diamond?.lotId)
                .join('/')}/summary`,
            );
          }}
        >
          {ctaText ? ctaText : <UIString>Complete & Review Your Ring</UIString>}
        </DarksideButton>
      </div>
    );
  };

  return (
    <>
      {!hasCaratWeightSelector && (
        <ProductTypeSpecificMetrics
          additionalVariantData={additionalVariantData}
          parentProductAttributes={parentProductAttributes}
          shouldDoublePrice={shouldDoublePrice}
        />
      )}
      {(hasMoreThanOneVariant || sizeOptions?.length > 1) && (
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
            selectedDiamond={selectedDiamond}
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
          productType={additionalVariantData?.productType}
          engravingText={engravingText}
          setEngravingText={setEngravingText}
          hasSingleInitialEngraving={hasSingleInitialEngraving}
        />
      )}

      {isProductFeedUrl ? (
        <>
          <ProductFeedCompleteYourRingButton ctaText={purchaseWithThisDiamondCopy} diamondsOverride={selectedDiamond} />
          <ProductKlarna title={productTitle} currentPrice={shouldDoublePrice ? price * 2 : price} />
        </>
      ) : null}

      {isBuilderFlowOpen ? (
        <CompleteYourRingButton ctaText={settingFlowCtaCopy} />
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
          ctaCopy={ctaCopy}
          isProductFeedUrl={isProductFeedUrl}
          isInStock={isInStock}
          isFetching={isFetching}
          trackInventory={trackInventory}
        />
      ) : (
        <div
          style={{
            margin: '1rem 0',
            backgroundColor: '#000',
            minHeight: '4.9rem',
          }}
        >
          <DarksideButton type="solid">
            <Loader color="#fff" />
          </DarksideButton>
        </div>
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
  isProductFeedUrl?: boolean;
  ctaCopy?: {
    purchaseWithThisDiamondCopy?: string;
    settingFlowCtaCopy?: string;
    modifyYourDiamondCopy?: string;
  };
  isInStock?: boolean;
  isFetching?: boolean;
  trackInventory?: boolean;
};

const AddToCartButtonContainer = styled.div`
  margin: 1rem 0;

  .atc-button button {
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
  isProductFeedUrl,
  ctaCopy,
  isInStock,
  isFetching,
  trackInventory,
}: CtaButtonProps) {
  const router = useRouter();
  const { locale } = router;
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const { refetch } = useCartData(locale);
  const { modifyYourDiamondCopy } = ctaCopy || {};
  const ctaText = isReadyForCart ? 'Add To Bag' : isProductFeedUrl ? modifyYourDiamondCopy : 'Select Your Diamond';

  const { emitDataLayer, productAdded } = useAnalytics();
  const { _t } = useTranslations(locale);
  const { _t: diamondShapesTranslations } = useTranslations(locale, ['OPTION_NAMES', 'DIAMOND_SHAPES']);

  const { chainLength, productTitle, productType, color, clarity, bandAccent, caratWeightOverride, image } =
    additionalVariantData;

  const { data: { productIconList } = {} } = useProductIconList(productIconListType, locale);

  const shipTimeParent = productIconList?.items?.find(
    (item) => item._modelApiKey === 'modular_shipping_product_icon_list_item',
  );

  const { shippingBusinessDays, shippingBusinessDaysCountryMap, shippingText } = shipTimeParent || {};

  const { countryCode } = parseValidLocale(locale);
  const shippingTime =
    countryCode === 'US'
      ? shippingBusinessDays
      : shippingBusinessDaysCountryMap?.[countryCode]
      ? shippingBusinessDaysCountryMap?.[countryCode]
      : shippingBusinessDaysCountryMap?.['International'];

  const shippingTimeStamp = getShippingTimeStamp(shippingTime);
  // Shipping times

  const currencyCode = getCurrency(countryCode);
  const formattedPrice = getFormattedPrice(price, locale, true, true);
  const jewelryProductTypes = ['Necklace', 'Bracelet', 'Earrings', 'Wedding Band', 'Ring'];

  // The _spec attribute controls what details are shown on a per-line-item basis in cart + checkout
  async function addProductToCart() {
    const productGroupKey = uuidv4();

    // Toggle loader in cart
    updateGlobalContext({
      isCartLoading: true,
    });

    // Applies to all products
    const defaultAttributes = {
      _productTitle: productTitle,
      productAsset: image?.src,
      _productAssetObject: JSON.stringify(image),
      _dateAdded: Date.now().toString(),
      // Keep product in english for now
      _productType: productType,
      _productTypeTranslated: _t(productType),
      shippingText: _t(shippingText),
      shippingTimeStamp,
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
      contentIds: [id],
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
      alt_t: diamondShapesTranslations,
      locale,
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
        feedId: id,
        _specs: specs,
        // This gets overwritten by updateShippingTimes in cart-actions
        productIconListShippingCopy: `${defaultAttributes?.shippingText} ${getFormattedShipByDate(shippingTime, locale)}`,
        productGroupKey,
        ringSize: selectedSize,
        shippingBusinessDays: shippingTime ? shippingTime.toString() : '',

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
      })
        .then(() => refetch())
        .then(() => {
          updateGlobalContext({
            isCartLoading: false,
          });
        });
    } else if (jewelryProductTypes.includes(productType)) {
      // Certain products have a different set of attributes, so we add them all here, then filter out when adding to cart. See addJewelryProductToCart in CartContext.tsx

      const jewelryAttributes = {
        ...defaultAttributes,
        feedId: id,
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
        shippingBusinessDays: shippingTime ? shippingTime.toString() : '',
        productIconListShippingCopy: `${defaultAttributes?.shippingText} ${getFormattedShipByDate(shippingTime, locale)}`,
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
      })
        .then(() => refetch())
        .then(() => {
          updateGlobalContext({
            isCartLoading: false,
          });
        });
    } else if (productType === 'Gift Card') {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { shippingText, ...otherAttributes } = defaultAttributes;
      const giftCardAttributes = {
        ...otherAttributes,
        pdpUrl: window.location.href,
        feedId: id,
        // Jewelry specific attributes
        metalType: '',
        shippingBusinessDays: '',
        productIconListShippingCopy: '',
        shippingText: '',
        childProduct: '',
      };

      addMiscProductToCart({
        variantId: variantId,
        attributes: giftCardAttributes,
        locale,
      })
        .then(() => refetch())
        .then(() => {
          updateGlobalContext({
            isCartLoading: false,
          });
        });
    } else if (productType === 'Ring Sizer') {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { shippingText, ...otherAttributes } = defaultAttributes;
      const ringSizerAttributes = {
        ...otherAttributes,
        pdpUrl: window.location.href,
        feedId: id,
        // Ring Sizer specific attributes
        productIconListShippingCopy: '',
        shippingBusinessDays: shippingTime ? shippingTime.toString() : '',
        shippingText: _t('Ships by'),
      };

      addMiscProductToCart({
        variantId: id,
        attributes: ringSizerAttributes,
        locale,
      })
        .then(() => refetch())
        .then(() => {
          updateGlobalContext({
            isCartLoading: false,
          });
        });
    }

    updateGlobalContext({
      isCartOpen: true,
    });
  }

  if (isFetching && trackInventory) {
    return (
      <AddToCartButtonContainer>
        <DarksideButton type="solid">
          <Loader color="#fff" />
        </DarksideButton>
      </AddToCartButtonContainer>
    );
  }

  if (!isInStock && !isFetching) {
    return (
      <AddToCartButtonContainer>
        <DarksideButton
          className="atc-button"
          type="outline"
          textSize="medium"
          fontWeight={'medium'}
          colorTheme="oos"
          disabled={true}
        >
          <UIString>Out of stock</UIString>
        </DarksideButton>
      </AddToCartButtonContainer>
    );
  }

  return (
    <AddToCartButtonContainer>
      <DarksideButton
        className="atc-button"
        type={isProductFeedUrl ? 'outline' : 'solid'}
        textSize="small"
        fontWeight={isProductFeedUrl ? 'normal' : 'medium'}
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

            const isToiMoi = router.asPath.includes('toi-moi');
            const isPair = isSoldAsDouble && selectedPair === 'pair';
            const nextUrl = `${locale === 'en-US' ? '' : `/${locale}/`}/customize/setting-to-diamond/${
              isPair || isToiMoi ? 'pairs/' : ''
            }${router.query.collectionSlug}/${router.query.productSlug}/`;

            if (isPair) {
              window.location.href = nextUrl;
            }

            router.push(nextUrl);
          }
        }}
      >
        {isProductFeedUrl ? ctaText : <UIString>{ctaText}</UIString>}
      </DarksideButton>
    </AddToCartButtonContainer>
  );
}
