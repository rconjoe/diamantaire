/* eslint-disable camelcase */

import { useAnalytics } from '@diamantaire/analytics';
import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import {
  DarksideButton,
  DatoImage,
  Heading,
  NeedTimeToThinkForm,
  ProductAppointmentCTA,
  RingSizeGuide,
  SlideOut,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import {
  OptionSelector,
  ProductDiamondHand,
  ProductIconList,
  ProductKlarna,
  ProductPrice,
  ProductReviews,
} from '@diamantaire/darkside/components/products/pdp';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { ERProductCartItemProps, ProductAddonDiamond, addERProductToCart } from '@diamantaire/darkside/data/api';
import {
  useCartData,
  useProductDato,
  useProductIconList,
  useStandardPage,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  DIAMOND_VIDEO_BASE_URL,
  ENGRAVING_PRICE_CENTS,
  PdpTypePlural,
  getCurrency,
  getFormattedPrice,
  metalTypeAsConst,
  parseValidLocale,
  pdpTypeSingleToPluralAsConst,
} from '@diamantaire/shared/constants';
import {
  extractMetalTypeFromShopifyHandle,
  generateCfyDiamondSpriteThumbUrl,
  specGenerator,
} from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { createShopifyVariantId } from '@diamantaire/shared-product';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import ReviewVariantSelector from './ReviewVariantSelector';

const ReviewBuildStepStyles = styled(motion.div)`
  padding: 0rem 2rem 14rem;
  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    padding: 2rem 2rem 14rem;
  }

  .review-wrapper {
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: flex;
      flex-direction: row;
    }

    .product-images {
      flex: 2;
      margin: 0 -2rem;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        padding-right: 2rem;
        margin: 0;
      }

      .embla {
        display: flex;
        flex-wrap: wrap;

        .embla__container {
          @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
            flex-wrap: wrap;
          }

          > div {
            @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
              flex: 0 0 50%;
            }
          }

          .embla__slide {
            display: flex;

            > * {
              flex: 1;
              display: flex;

              img {
                flex: 1;
                object-fit: cover;
                max-height: 608px;
              }
            }
            .hand {
              display: block;
            }
          }
        }
      }

      .slider-dots {
        flex: 1 1 100%;
        padding: 20px 0 0;
        @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
          display: none;
        }
        ul {
          display: flex;
          margin: 0;
          padding: 0;
          list-style: none;
          justify-content: center;
          gap: 1rem;
          li {
            button {
              height: 0.5rem;
              width: 0.5rem;
              background-color: var(--color-black);
              border: none;
              border-radius: 50%;
              line-height: 1;
              padding: 0;
              opacity: 0.1;

              &.active {
                opacity: 0.75;
              }
            }
          }
        }
      }
    }
    .product-summary {
      flex: 1;

      .product-summary__inner {
        position: relative;
        padding: 2rem 0;
        max-width: 55rem;
        margin: 0 auto;

        @media (min-width: ${({ theme }) => theme.sizes.xxl}) {
          padding: 2rem 4rem;
        }

        .total-price {
          margin-bottom: 2rem;
        }
      }

      .builder-summary__content {
        border-bottom: 0.1rem solid #ccc;

        .builder-summary__content__inner {
          ul {
            padding: 0 0 2rem;
            li {
              display: flex;
              flex-wrap: wrap;
              padding: 0 0 0.75rem;

              &:last-child {
                padding: 0;
              }

              span {
                font-size: var(--font-size-xsmall);

                &.label {
                  font-weight: bold;
                  margin-right: 0.5rem;
                }

                &.value {
                  font-weight: normal;
                }

                &.toggle {
                  flex: 1;
                  text-align: right;
                  display: block;

                  button {
                    font-size: var(--font-size-xxsmall);
                    color: var(--color-teal);
                    background-color: transparent;
                    padding: 0;
                    border-bottom: 1px solid var(--color-teal);
                    font-weight: 500;
                  }
                }
              }

              .acc-container {
                flex: 0 0 100%;
              }
            }
          }
        }
      }
    }

    .ring-size-container {
      margin: 2rem 0;

      .option-list.ringSize {
        margin-bottom: 0;
      }
      .selector-label {
        margin: 0 0 1rem;
      }

      h4 {
        margin: 0;
      }
    }

    .size-guide-button {
      flex: 0 0 100%;
      margin-top: 0.5rem;
      button {
        font-size: var(--font-size-xxxsmall);
      }
    }

    .engraving-container {
      padding: 2rem 0;

      .engraving-prompt-text {
        display: flex;
        align-items: center;
        p {
          margin-left: 0.5rem;
          display: inline-block;
        }
      }

      .engraving-result-text {
        display: flex;
        justify-content: space-between;
        p {
          span {
            font-weight: bold;
            margin-right: 0.7rem;
          }
        }

        a,
        button {
          font-size: 1.4rem;
        }
      }

      .engraving-input-container {
        margin: 2rem 0;
        input {
          border: 0.1rem solid #ccc;
          height: 4rem;
          width: 100%;
          padding-left: 1rem;
        }

        p {
          font-size: 1.3rem;
          margin: 0.5rem 0 2rem;
        }
      }
    }

    .atc-button {
      button {
        font-size: var(--font-size-xxsmall);
      }
    }

    .review-atc {
      padding: 2rem 0 0;
      ul {
        li {
          margin-bottom: 1rem;
          &:last-child {
            margin-bottom: 0px;
          }
        }
      }
    }
  }
  .product-icon-list-container > ul {
    margin: 0;
    padding-top: 2rem;
  }
`;

const ToastErrorStyles = styled.div`
  p {
    font-size: 1.6rem;
  }
`;

const ToastError = () => {
  return (
    <ToastErrorStyles>
      <p>This diamond is already in your cart</p>
    </ToastErrorStyles>
  );
};

const MAX_CHAR_LIMIT = 16;

const ReviewBuildStep = ({
  settingSlugs,
  type,
  configurations,
  variantProductTitle,
  selectedConfiguration,
  updateSettingSlugs,
  additionalVariantData,
  shopifySettingVariantId,
  shopifyProductData,
}) => {
  const sizeOptionKey = 'ringSize';
  const router = useRouter();
  const { locale } = router;
  const { data: checkout, refetch } = useCartData(locale);
  const { builderProduct, updateFlowData } = useContext(BuilderProductContext);
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');
  const [engravingText, setEngravingText] = useState(null);
  const [selectedSize, setSelectedSize] = useState<{
    id: string;
    value?: string;
    valueLabel?: string;
    isSelected?: boolean;
  }>(configurations?.ringSize?.filter((item) => item.value === '5')[0] || null);

  const { productAdded } = useAnalytics();

  const sizeOptions = configurations?.[sizeOptionKey];

  const { collectionSlug } = settingSlugs;

  const { product, diamonds } = builderProduct;

  const diamondPrice = Array.isArray(diamonds) && diamonds?.map((diamond) => diamond.price).reduce((a, b) => a + b, 0);

  const { countryCode } = parseValidLocale(locale);

  const currencyCode = getCurrency(countryCode);

  const { _t } = useTranslations(locale);

  const mutatedLotIds = Array.isArray(diamonds) ? diamonds?.map((diamond) => getNumericalLotId(diamond?.lotId)) : [];

  const isDiamondCFY = diamonds.filter((diamond) => diamond?.slug === 'cto-diamonds').length > 0;

  const { data: blockpickerData }: any = useStandardPage('engagement_ring_summary_page', router.locale);

  console.log('blockpickerData', blockpickerData);

  //
  const diamondImages = isDiamondCFY
    ? diamonds.map((diamond) => {
        const spriteImageUrl = generateCfyDiamondSpriteThumbUrl(diamond?.diamondType);

        return spriteImageUrl;
      })
    : (Array.isArray(mutatedLotIds) &&
        mutatedLotIds.map((mutatedLotId) => `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`)) ||
      [];

  function confirmEngraving() {
    setEngravingText(engravingInputText);
    setIsEngravingInputVisible(false);
  }

  function removeEngraving() {
    setEngravingText(null);
    setEngravingInputText('');
    setIsEngravingInputVisible(false);
  }

  const customJewelryPdpTypes = ['Necklace', 'Earrings'];
  const pdpType: PdpTypePlural = customJewelryPdpTypes.includes(product?.productType)
    ? 'Jewelry'
    : pdpTypeSingleToPluralAsConst[product?.productType];

  const { data }: { data: any } = useProductDato(collectionSlug, locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct;
  const productIconListType = datoParentProductData?.productIconList?.productType;

  const isEngravingInputEmpty = useMemo(() => {
    return isEngravingInputVisible && engravingInputText.length === 0;
  }, [engravingInputText]);

  const handleSizeChange = useCallback((option: OptionItemProps) => {
    // setSelectVariantId(option.id);
    setSelectedSize(option);
  }, []);

  const { productType, goldPurity, bandAccent, shopifyProductHandle, image, configuredProductOptionsInOrder } =
    product || {};

  const { productTitle } = datoParentProductData || {};

  function configOptionsReducer(state, action: any) {
    const { payload, type } = action;
    const { typeId, value } = payload;

    console.log('configOptionsReducer', { state, action });

    switch (type) {
      case 'option-change':
        return { ...state, [typeId]: value };
    }
  }

  const [configState, dispatch] = useReducer(configOptionsReducer, selectedConfiguration);

  console.log('configState', configState);

  const productIconListTypeOverride =
    additionalVariantData?.productIconList?.productType ||
    additionalVariantData?.configuration?.productIconList?.productType;

  const { data: { productIconList } = {} } = useProductIconList(
    productIconListTypeOverride ? productIconListTypeOverride : productIconListType,
    router.locale,
  );

  const shipTimeParent = productIconList?.items?.find(
    (item) => item._modelApiKey === 'modular_shipping_product_icon_list_item',
  );

  const { shippingBusinessDays, shippingBusinessDaysCountryMap, shippingText } = shipTimeParent || {};

  const shippingTime =
    countryCode === 'US'
      ? shippingBusinessDays
      : shippingBusinessDaysCountryMap?.[countryCode]
      ? shippingBusinessDaysCountryMap?.[countryCode]
      : shippingBusinessDaysCountryMap?.['International'];

  // Need the ring size
  async function addCustomProductToCart() {
    const productGroupKey = uuidv4();
    // 1. Get the product variant ID for the setting. Need fallback for non-ER custom products
    const settingType = selectedSize?.id ? 'engagement-ring' : 'jewelry';
    const settingVariantId = selectedSize?.id || product?.variantId || shopifySettingVariantId;

    console.log('settingVariantId', product);

    // 2. Get the product variant ID for the diamond
    // TODO: Add support for multiple diamonds
    const diamondVariantIds = diamonds.map((diamond) => createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId));

    // 2.5 Check if diamond ID is already in cart (there can only be one of each custom diamond)
    const isDiamondInCart = checkout?.lines?.some((line) => diamondVariantIds.includes(line.merchandise.id));

    if (isDiamondInCart) {
      return toast.error(ToastError, {
        autoClose: 3000,
      });
    }

    // 3. Create custom attributes for the setting

    const erMetal =
      (goldPurity ? goldPurity + ' ' : '') +
      (settingType === 'engagement-ring'
        ? metalTypeAsConst[extractMetalTypeFromShopifyHandle(shopifyProductHandle)]
        : metalTypeAsConst[extractMetalTypeFromShopifyHandle(configuredProductOptionsInOrder)]);
    const refinedBandAccent =
      settingType === 'engagement-ring' ? bandAccent?.charAt(0)?.toUpperCase() + bandAccent.slice(1) : '';

    const settingSpecs = specGenerator({
      configuration: { ...selectedConfiguration, ringSize: selectedSize?.value },
      productType,
      _t,
      hasChildDiamond: true,
    });

    const settingAttributes: ERProductCartItemProps['settingAttributes'] = {
      _productType: productType,
      _productTypeTranslated: _t(productType),
      metalType: erMetal,
      productAsset: image?.src,
      _productAssetObject: JSON.stringify(image),
      _productTitle: productTitle,
      productIconListShippingCopy: 'temp',
      pdpUrl: window.location.href,
      shippingText: _t(shippingText),
      feedId: settingVariantId,
      // engraving
      _EngravingBack: engravingText,
      _specs: settingSpecs,
      productGroupKey,
      diamondShape: DIAMOND_TYPE_HUMAN_NAMES[diamonds?.[0]?.diamondType],
      // centerStone: diamond?.carat + ', ' + diamond?.color + ', ' + diamond?.clarity,
      ringSize: selectedSize?.value,
      bandAccent: refinedBandAccent,
      totalPrice: (product.price + diamondPrice).toString(),
      productCategory: settingType === 'engagement-ring' ? 'Setting' : productType ? productType : 'Setting',
      _dateAdded: Date.now().toString(),
      shippingBusinessDays: shippingTime?.toString(),

      // Diamond Sync
      childProduct: JSON.stringify({
        behavior: 'linked',
        additionalVariantIds: diamonds?.map((diamond) => createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId)),
      }),
    };

    // 4. Create custom attributes for the diamond
    // const isPair = router?.asPath.includes('pair');

    const diamondsToAdd = diamonds.map((diamond, index) => {
      const diamondSpecs = specGenerator({
        configuration: { ...diamond },
        productType: 'Diamond',
        _t,
      });
      const diamondAttributes: ProductAddonDiamond['attributes'] = {
        _productTitle: diamond?.productTitle,
        productAsset: diamondImages[index],
        _dateAdded: (Date.now() + 100).toString(),
        caratWeight: diamond.carat.toString(),
        clarity: diamond.clarity,
        cut: diamond.cut,
        color: diamond.color,
        feedId: settingVariantId,
        lotId: diamond.lotId,
        isChildProduct: 'true',
        productGroupKey,
        _specs: diamondSpecs,
        _productType: 'Diamond',
        _productTypeTranslated: _t('Diamond'),
        shippingText: _t('Made-to-order. Ships by'),
        productIconListShippingCopy: 'temp',
        pdpUrl: window.location.href,
        shippingBusinessDays: shippingTime?.toString(),
      };

      return {
        variantId: createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId),
        attributes: diamondAttributes,
        quantity: 1,
      };
    });

    await addERProductToCart({
      settingVariantId,
      settingAttributes,
      diamonds: diamondsToAdd,
      hasEngraving: engravingText ? true : false,
      engravingText,
      locale,
    }).then(() => refetch());

    updateGlobalContext({
      isCartOpen: true,
    });

    // TODO: Add Sentry Loggin

    const { productTitle: settingProductTitle, image: { src } = { src: '' }, price: settingPrice } = product || {};
    const formattedSettingPrice = getFormattedPrice(settingPrice, locale, true, true);
    const formattedDiamondPrice = getFormattedPrice(diamondPrice, locale, true, true);
    const id = settingVariantId.split('/').pop();
    const totalAmount = getFormattedPrice(settingPrice + diamondPrice, locale, true, true);

    Array.isArray(diamonds) &&
      diamonds?.map((diamond) => {
        productAdded({
          id,
          // sku: 'F15',
          category: pdpType,
          name: settingProductTitle,
          brand: 'VRAI',
          variant: variantProductTitle,
          product: variantProductTitle,
          // url: 'https://www.website.com/product/path',
          image_url: src,
          ...selectedConfiguration,
          // complete_your_ring
          setting: settingProductTitle,
          diamond_lot_Id: diamond?.lotId,
          diamond_type: diamond?.diamondType,
          carat: diamond?.carat,
          gold_purity: goldPurity,
          band_accent: bandAccent,
          shape: diamond?.diamondType,
          clarity: diamond?.clarity,
          colour: diamond?.color,
          centerstone: `${diamond?.carat}ct, ${diamond?.color}, ${diamond?.clarity}`,
          ecommerce: {
            value: totalAmount,
            currency: currencyCode,
            add: {
              products: [
                {
                  id,
                  name: settingProductTitle,
                  price: formattedSettingPrice,
                  category: pdpType,
                  variant: variantProductTitle,
                  quantity: 1,
                  brand: 'VRAI',
                },
                {
                  id: diamond?.dangerousInternalShopifyVariantId,
                  name: diamond?.productTitle,
                  price: formattedDiamondPrice,
                  brand: 'VRAI',
                  category: diamond?.productType,
                  variant: diamond?.productTitle,
                  quantity: 1,
                },
              ],
            },
          },
          items: [
            {
              item_id: id,
              item_name: variantProductTitle,
              item_brand: 'VRAI',
              item_category: pdpType,
              price: formattedSettingPrice,
              currency: currencyCode,
              quantity: 1,
              ...selectedConfiguration,
            },
            {
              item_id: diamond?.dangerousInternalShopifyVariantId,
              item_name: diamond?.productTitle,
              item_brand: 'VRAI',
              item_category: diamond?.productType,
              price: formattedDiamondPrice,
              currency: currencyCode,
              quantity: 1,
            },
          ],
        });
      });

    return;
  }

  const summaryItems = [
    {
      label: _t('diamondType'),
      value: diamonds.map((diamond) => _t(diamond?.diamondType)).join(' + '),
      onClick: () => {
        updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
        router.push(router.asPath + '/edit-diamond');
      },
      slug: 'diamondType',
    },
    {
      label: 'Centerstone',
      value: diamonds
        .map((diamond) => diamond?.carat.toString() + 'ct' + ', ' + diamond?.color + ', ' + diamond?.clarity)
        .join(' + '),
      onClick: () => updateFlowData('UPDATE_STEP', { step: 'select-diamond' }),
      slug: 'centerstone',
    },
  ];

  function handleBuilderFlowVariantChange(option: OptionItemProps, configurationType) {
    console.log({ configurationType, option });

    updateSettingSlugs({
      productSlug: option?.id,
    });

    if (type === 'setting-to-diamond') {
      const newUrl = `/customize/setting-to-diamond/summary/${
        settingSlugs.collectionSlug
      }/${option?.id}/${builderProduct?.diamonds?.map((diamond) => diamond?.lotId).join('/')}`;

      return router.push(newUrl);
    } else {
      const newUrl = `/customize/diamond-to-setting/summary/${builderProduct?.diamonds
        ?.map((diamond) => diamond?.lotId)
        .join('/')}/${settingSlugs.collectionSlug}/${option?.id}`;

      router.push(newUrl);
    }
  }

  const handleOptionChange = (typeId: string, option: OptionItemProps) => {
    dispatch({ type: 'option-change', payload: { typeId, value: option.value } });
  };

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!router.query.productSlug && !product.productSlug && router.query.productSlug !== product.productSlug)
      console.log('isssue is this', {
        routerSlug: router.query.productSlug,
        productSlug: product.productSlug,
      });

    console.log('adding it up', additionalVariantData);

    updateFlowData('ADD_PRODUCT', {
      ...additionalVariantData,
      ...selectedConfiguration,
      variantId: router.query.productSlug,
    });
  }, [additionalVariantData]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateActiveSlide = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
    };

    // Initialize the active slide
    updateActiveSlide();

    // Add event listeners to track the active slide
    emblaApi.on('select', updateActiveSlide);

    // Clean up the event listeners when the component unmounts
    return () => {
      emblaApi.off('select', updateActiveSlide);
    };
  }, [emblaApi]);

  const isWindowDefined = typeof window !== 'undefined';

  const totalPriceInCents = product?.price + diamondPrice + (engravingText ? ENGRAVING_PRICE_CENTS : 0);

  const diamondHandCaption = builderProduct.diamonds?.map((diamond) => diamond?.carat?.toString() + 'ct').join(' | ');

  console.log('builderProduct', builderProduct);

  const reviewVariantOrder = ['sideStoneShape', 'sideStoneCarat', 'bandAccent', 'hiddenHalo', 'bandWidth', 'metal'];

  const productData = { ...shopifyProductData, cms: additionalVariantData };

  return (
    <ReviewBuildStepStyles
      key="diamond-step-container"
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1 },
        collapsed: { opacity: 0 },
      }}
      transition={{
        duration: 0.75,
      }}
    >
      <Script
        id="klara-script"
        src="https://js.klarna.com/web-sdk/v1/klarna.js"
        data-client-id="4b79b0e8-c6d3-59da-a96b-2eca27025e8e"
      ></Script>
      <div className="review-wrapper">
        <div className="product-images">
          <div className="embla" ref={isWindowDefined && window.innerWidth < 767 ? emblaRef : null}>
            <div className="embla__container">
              <div className={clsx('image setting-image', { embla__slide: isWindowDefined && window.innerWidth < 767 })}>
                {product?.image && <DatoImage image={product?.image} />}
              </div>
              {diamondImages?.map((image) => (
                <div
                  key={image}
                  className={clsx('image diamond-image embla__slide', {
                    embla__slide: isWindowDefined && window.innerWidth < 767,
                  })}
                >
                  {image && <img src={image} alt="" />}
                </div>
              ))}
              <div className={clsx('diamond-hand embla__slide')}>
                <ProductDiamondHand
                  diamondType={selectedConfiguration?.diamondType}
                  range={[0.5, 8]}
                  initValue={parseFloat(diamonds?.[0]?.carat)}
                  disableControls={true}
                  prefix={diamondHandCaption}
                />
              </div>
            </div>
          </div>
          <div className="slider-dots">
            <ul>
              {[0, 1, 2].map((_item, index) => {
                return (
                  <li key={`review-build-dot-${index}`}>
                    <button
                      className={activeSlide === index ? 'active' : ''}
                      onClick={() => emblaApi?.scrollTo(index)}
                    ></button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="product-summary">
          <div className="product-summary__inner">
            <WishlistLikeButton
              extraClass="bundle"
              productId={`bundle-${settingSlugs?.productSlug}::${diamonds[0]?.lotId}`}
            />

            <Heading type="h1" className="secondary no-margin">
              {productTitle}
            </Heading>

            <div className="total-price">
              <ProductPrice
                isBuilderProduct={false}
                price={totalPriceInCents}
                shouldDoublePrice={false}
                productType={product?.productType}
                engravingText={engravingText}
              />
            </div>

            <div className="builder-summary__content">
              <div className="builder-summary__content__inner">
                <ul className="list-unstyled">
                  {summaryItems?.map((item, index) => {
                    return (
                      <li key={`summary-1-${index}`}>
                        <span className="label">{_t(item.label)}:</span>
                        <span className="value">{_t(item.value)}</span>
                        <span className="toggle">
                          <button onClick={() => item.onClick()}>Modify</button>
                        </span>
                      </li>
                    );
                  })}

                  {reviewVariantOrder.map((key, index) => {
                    const selectorsToIgnore = ['ringSize', 'diamondType', 'caratWeight', 'diamondOrientation'];

                    console.log('configurations?.[key]', configurations?.[key]);

                    if (selectorsToIgnore.includes(key) || !configurations?.[key] || configurations?.[key]?.length === 0)
                      return null;

                    return (
                      <ReviewVariantSelector
                        key={`summary-${index}`}
                        selector={key}
                        selectedConfiguration={selectedConfiguration}
                        configurations={configurations}
                        handleOptionChange={handleOptionChange}
                        handleBuilderFlowVariantChange={handleBuilderFlowVariantChange}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>

            {selectedSize && (
              <div className="ring-size-container">
                <OptionSelector
                  optionType={sizeOptionKey}
                  label={sizeOptionKey}
                  options={sizeOptions}
                  selectedOptionValue={selectedSize.value}
                  onChange={handleSizeChange}
                  selectedConfiguration={selectedConfiguration}
                  areDiamondShapesHorizontal={selectedConfiguration?.diamondOrientation === 'horizontal'}
                />
                <div className="size-guide-button">
                  <DarksideButton type="underline" colorTheme="teal" onClick={() => setIsSizeGuideOpen(true)}>
                    <UIString>Size Guide</UIString>
                  </DarksideButton>
                </div>
              </div>
            )}

            <div className="engraving-container">
              {!engravingText ? (
                <div className="engraving-prompt-text">
                  <DarksideButton
                    onClick={() => setIsEngravingInputVisible(!isEngravingInputVisible)}
                    type="underline"
                    colorTheme="teal"
                  >
                    <UIString>Add engraving</UIString>
                  </DarksideButton>
                  <p>
                    (<UIString>optional</UIString>)
                  </p>
                </div>
              ) : (
                <div className="engraving-result-text">
                  <p className="result-text">
                    <span>
                      <UIString>Your Engraving</UIString>:
                    </span>
                    {engravingText}
                  </p>
                  <DarksideButton
                    onClick={() => setIsEngravingInputVisible(!isEngravingInputVisible)}
                    type="underline"
                    colorTheme="teal"
                  >
                    <UIString>Modify</UIString>
                  </DarksideButton>
                </div>
              )}

              {isEngravingInputVisible && (
                <div className="engraving-input-container">
                  <input
                    type="text"
                    value={engravingInputText}
                    onChange={(e) => {
                      if (e.target.value.length > MAX_CHAR_LIMIT) return;
                      setEngravingInputText(e.target.value);
                    }}
                  />
                  <p className="limit-text">
                    <UIString>Character Limit</UIString> ({engravingInputText.length}/{MAX_CHAR_LIMIT})
                  </p>
                  <DarksideButton
                    onClick={isEngravingInputEmpty ? () => removeEngraving() : () => confirmEngraving()}
                    type="outline"
                  >
                    <UIString>
                      {isEngravingInputEmpty && engravingText && isEngravingInputVisible
                        ? 'Delete engraving'
                        : !engravingText
                        ? 'Add engraving'
                        : 'Update engraving'}
                    </UIString>
                  </DarksideButton>
                </div>
              )}

              <div className="review-atc">
                <ul className="list-unstyled">
                  <li>
                    <DarksideButton className="atc-button" onClick={() => addCustomProductToCart()}>
                      <UIString>Add To Bag</UIString>
                    </DarksideButton>
                  </li>
                  <li>
                    <ProductKlarna title={productTitle} currentPrice={totalPriceInCents} />
                    <ProductAppointmentCTA productType={productType} />
                  </li>
                </ul>
              </div>

              {product.productType && productIconListType && (
                <div className="product-icon-list-container">
                  <ProductIconList
                    productIconListType={productIconListTypeOverride ? productIconListTypeOverride : productIconListType}
                    locale={locale}
                  />
                </div>
              )}

              {additionalVariantData && <NeedTimeToThinkForm productData={productData} />}
            </div>
          </div>
        </div>
      </div>

      {blockpickerData &&
        blockpickerData?.standardPage?.content1?.map((contentBlockData) => {
          const { _modelApiKey } = contentBlockData;

          return (
            <BlockPicker
              key={`review-${_modelApiKey}`}
              _modelApiKey={_modelApiKey}
              modularBlockData={contentBlockData}
              countryCode={countryCode}
              currencyCode={currencyCode}
              shouldLazyLoad={true}
            />
          );
        })}

      {shopifyProductData?.shopifyCollectionId && (
        <ProductReviews reviewsId={shopifyProductData?.shopifyCollectionId?.replace('gid://shopify/Collection/', '')} />
      )}

      <AnimatePresence>
        {isSizeGuideOpen && (
          <SlideOut
            title={_t('Size Guide')}
            width="30%"
            onClose={() => setIsSizeGuideOpen(false)}
            className="extra-side-padding"
          >
            <RingSizeGuide />
          </SlideOut>
        )}
      </AnimatePresence>
    </ReviewBuildStepStyles>
  );
};

export default ReviewBuildStep;
