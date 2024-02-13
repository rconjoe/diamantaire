/* eslint-disable camelcase */

import { PageViewTracker, useAnalytics } from '@diamantaire/analytics';
import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import {
  DarksideButton,
  DatoImage,
  Heading,
  Loader,
  NeedTimeToThinkForm,
  ProductAppointmentCTA,
  RingSizeGuide,
  SlideOut,
  SpriteSpinner,
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
  useCartInfo,
  useProductDato,
  useProductIconList,
  useStandardPage,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  DIAMOND_VIDEO_BASE_URL,
  PdpTypePlural,
  getCurrency,
  getFormattedPrice,
  parseValidLocale,
  pdpTypeSingleToPluralAsConst,
} from '@diamantaire/shared/constants';
import { generateDiamondSpriteImage, generateDiamondSpriteUrl, specGenerator } from '@diamantaire/shared/helpers';
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

import { ReviewVariantSelector } from './ReviewVariantSelector';

const ReviewBuildStepStyles = styled(motion.div)`
  padding: 0rem 2rem 14rem;
  @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
    padding: 2rem 0 0;
    margin-left: 1.25rem;
    margin-right: 1.25rem;
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
          max-width: 100%;

          @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
            flex-wrap: wrap;
          }

          > div {
            margin-bottom: 1rem;
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

            &.spritespinner {
              display: block;
              > div {
                display: block;
                overflow: hidden;
              }
            }
          }
        }
      }

      .setting-image {
        position: relative;

        p {
          position: absolute;
          bottom: 1.5rem;
          left: 0;
          width: 100%;
          text-align: center;
          font-size: var(--font-size-xxsmall);
          justify-content: center;
        }

        .image-loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: #fff;
          z-index: 1000;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
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
          padding: 2rem 5rem;
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

const ToastError = ({ locale }) => {
  const { data: { cart: cartData } = {} } = useCartInfo(locale);

  const { pageCopy: cartCopy } = cartData || {};
  const { uniqueDiamondAlreadyInCartErrorMessage } = cartCopy?.[0] || {};

  return (
    <ToastErrorStyles>
      <p>{uniqueDiamondAlreadyInCartErrorMessage}</p>
    </ToastErrorStyles>
  );
};

const MAX_CHAR_LIMIT = 16;

const ReviewBuildStep = ({ settingSlugs, updateSettingSlugs, shopifyProductData }) => {
  const {
    configuration: selectedConfiguration,
    optionConfigs: configurations,
    shopifyVariantId: shopifySettingVariantId,
    productTitle: variantProductTitle,
    variantDetails: additionalVariantData,
  } = shopifyProductData || {};

  const sizeOptionKey = 'ringSize';
  const router = useRouter();
  const { locale } = router;
  const { data: checkout, refetch } = useCartData(locale);
  const { builderProduct } = useContext(BuilderProductContext);
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [spriteSpinnerIds, setSpriteSpinnerIds] = useState([]);

  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');
  const [engravingText, setEngravingText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const isDiamondCFY = diamonds?.filter((diamond) => diamond?.slug === 'cto-diamonds').length > 0;
  const isER = shopifyProductData?.productType === 'Engagement Ring';

  const { data: blockpickerData }: any = useStandardPage(
    isER ? 'engagement_ring_summary_page' : 'jewelry_summary_page',
    router.locale,
  );

  const diamondImages = useMemo(() => {
    return isDiamondCFY
      ? diamonds.map((diamond) => {
          const spriteImageUrl = generateDiamondSpriteImage({ diamondType: diamond?.diamondType });

          return spriteImageUrl;
        })
      : (Array.isArray(mutatedLotIds) &&
          mutatedLotIds.map((mutatedLotId) => `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`)) ||
          [];
  }, [isDiamondCFY]);

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

  const { goldPurity, bandAccent } = product.configuration || {};

  const image = {
    src: product?.productContent?.assetStack?.[0]?.url,
    width: product?.productContent?.assetStack?.[0]?.width,
    height: product?.productContent?.assetStack?.[0]?.height,
  };

  const { productTitle } = datoParentProductData || {};

  const productType = shopifyProductData?.productType;

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

  const {
    shippingBusinessDays,
    shippingBusinessDaysCountryMap,
    shippingText,
    cutForYouShippingBusinessDaysCountryMap,
    cutForYouShippingBusinessDays,
    cutForYouShippingText,
  } = shipTimeParent || {};

  const shippingTime =
    countryCode === 'US'
      ? shippingBusinessDays
      : shippingBusinessDaysCountryMap?.[countryCode]
      ? shippingBusinessDaysCountryMap?.[countryCode]
      : shippingBusinessDaysCountryMap?.['International'];

  const cfyShippingTime =
    countryCode === 'US'
      ? cutForYouShippingBusinessDays
      : cutForYouShippingBusinessDaysCountryMap?.[countryCode]
      ? cutForYouShippingBusinessDaysCountryMap?.[countryCode]
      : cutForYouShippingBusinessDaysCountryMap?.['International'];

  // Need the ring size
  async function addCustomProductToCart() {
    const productGroupKey = uuidv4();
    // 1. Get the product variant ID for the setting. Need fallback for non-ER custom products
    const settingType = selectedSize?.id ? 'engagement-ring' : 'jewelry';
    const settingVariantId = selectedSize?.id || shopifySettingVariantId;

    console.log('settingVariantId', product);

    // 2. Get the product variant ID for the diamond
    // TODO: Add support for multiple diamonds
    const diamondVariantIds = diamonds.map((diamond) => createShopifyVariantId(diamond?.dangerousInternalShopifyVariantId));

    // 2.5 Check if diamond ID is already in cart (there can only be one of each custom diamond)
    const isDiamondInCart = checkout?.lines?.some((line) => diamondVariantIds.includes(line.merchandise.id));

    if (isDiamondInCart) {
      return toast.error(<ToastError locale={locale} />, {
        autoClose: 3000,
      });
    }

    // 3. Create custom attributes for the setting

    const erMetal = (goldPurity ? goldPurity + ' ' : '') + _t(builderProduct?.product?.configuration?.metal);

    const refinedBandAccent =
      settingType === 'engagement-ring' && bandAccent ? bandAccent?.charAt(0)?.toUpperCase() + bandAccent.slice(1) : '';

    const settingSpecs = specGenerator({
      configuration: {
        ...shopifyProductData?.configuration,
        diamondType: diamonds.map((diamond) => DIAMOND_TYPE_HUMAN_NAMES[diamond?.diamondType]).join(' + '),
        ringSize: selectedSize?.value,
      },
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
      diamondShape: diamonds.map((diamond) => DIAMOND_TYPE_HUMAN_NAMES[diamond?.diamondType]).join(' + '),
      // centerStone: diamond?.carat + ', ' + diamond?.color + ', ' + diamond?.clarity,
      ringSize: selectedSize?.value,
      bandAccent: refinedBandAccent,
      totalPrice: (product.price + diamondPrice).toString(),
      productCategory: settingType === 'engagement-ring' ? 'Setting' : productType ? productType : 'Setting',
      _dateAdded: Date.now().toString(),
      shippingBusinessDays: isDiamondCFY ? cfyShippingTime?.toString() : shippingTime?.toString(),

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
        _productAssetObject: JSON.stringify({
          src: diamondImages[index],
          width: 200,
          height: 200,
        }),
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
        shippingText: isDiamondCFY ? cutForYouShippingText : _t('Made-to-order. Ships by'),
        productIconListShippingCopy: 'temp',
        pdpUrl: window.location.href,
        shippingBusinessDays: isDiamondCFY ? cfyShippingTime?.toString() : shippingTime?.toString(),
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

  const { _t: shapes_t } = useTranslations(locale, ['DIAMOND_SHAPES']);

  const summaryItems = [
    {
      label: _t('diamondType'),
      value: diamonds?.map((diamond) => shapes_t(diamond?.diamondType)).join(' + '),
      onClick: () => {
        router.push(router.asPath + (router.asPath.includes('/pair/') ? '/pair' : '') + '/edit-diamond', null, {
          shallow: true,
        });
      },
      slug: 'diamondType',
    },
    {
      label: 'Centerstone',
      value: diamonds
        .map((diamond) => diamond?.carat.toString() + 'ct' + ', ' + diamond?.color + ', ' + diamond?.clarity)
        .join(' + '),
      onClick: () => {
        router.push(router.asPath + (router.asPath.includes('/pair/') ? '/pair' : '') + '/edit-diamond', null, {});
      },
      slug: 'centerstone',
    },
  ];

  function handleBuilderFlowVariantChange(option: OptionItemProps, configurationType) {
    console.log({ configurationType, option });

    updateSettingSlugs({
      productSlug: option?.id,
    });

    if (router.query.flowType === 'setting-to-diamond') {
      const newUrl = `/customize/setting-to-diamond/summary/${
        settingSlugs.collectionSlug
      }/${option?.id}/${builderProduct?.diamonds?.map((diamond) => diamond?.lotId).join('/')}`;

      return router.replace(newUrl);
    } else {
      const newUrl = `/customize/diamond-to-setting/summary/${builderProduct?.diamonds
        ?.map((diamond) => diamond?.lotId)
        .join('/')}/${settingSlugs.collectionSlug}/${option?.id}`;

      router.replace(newUrl);
    }
  }

  const handleOptionChange = (typeId: string, option: OptionItemProps) => {
    dispatch({ type: 'option-change', payload: { typeId, value: option.value } });
  };

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [activeSlide, setActiveSlide] = useState(0);

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

  const totalPriceInCents = product?.price + diamondPrice;

  const diamondHandCaption = builderProduct?.diamonds?.map((diamond) => diamond?.carat?.toString() + 'ct').join(' | ');

  const reviewVariantOrder = ['sideStoneShape', 'sideStoneCarat', 'bandAccent', 'hiddenHalo', 'bandWidth', 'metal'];

  const productData = {
    ...shopifyProductData,
    cms: {
      ...additionalVariantData,
      image: {
        src: shopifyProductData?.productContent?.assetStack?.[0]?.url,
      },
    },
  };

  const CFY_RETURN_THRESHOLD = 5.1;

  useEffect(() => {
    const ids = builderProduct?.diamonds?.map((diamond) => {
      const diamondID = diamond?.lotId;
      const id = diamondID.includes('cfy-')
        ? diamondID
        : diamondID
            .split('')
            .filter((v) => !isNaN(Number(v)))
            .join('');

      return id;
    });

    setSpriteSpinnerIds(ids);
  }, [builderProduct?.diamonds]);

  useEffect(() => {
    const oldShapeUrl = builderProduct?.product?.productSlug;
    const newShapeUrl = settingSlugs?.productSlug;

    console.log('oldShapeUrl', oldShapeUrl, newShapeUrl);

    if (oldShapeUrl !== newShapeUrl) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [builderProduct?.product?.productSlug, settingSlugs?.productSlug]);

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
                {product?.productContent?.assetStack[0] && (
                  <DatoImage
                    image={{
                      ...product?.productContent?.assetStack[0],
                      responsiveImage: {
                        ...product?.productContent?.assetStack?.[0]?.responsiveImage,
                        src: product?.productContent?.assetStack[0]?.url,
                      },
                    }}
                  />
                )}

                {isLoading && (
                  <div className="image-loader">
                    <Loader color="#000" />
                  </div>
                )}
                {product?.productType === 'Engagement Ring' && (
                  <p>
                    <UIString>Shown with</UIString> 1.5ct
                  </p>
                )}
              </div>
              {!isDiamondCFY &&
                spriteSpinnerIds?.map((id) => (
                  <div className="spritespinner embla__slide" key={id}>
                    <SpriteSpinnerBlock id={id} />
                  </div>
                ))}

              {isDiamondCFY &&
                diamondImages?.map((image) => (
                  <div
                    key={image}
                    className={clsx('image diamond-image embla__slide', {
                      embla__slide: isWindowDefined && window.innerWidth < 767,
                    })}
                  >
                    {image && <img src={image} alt="" />}
                  </div>
                ))}

              {isER && (
                <div className={clsx('diamond-hand embla__slide')}>
                  <ProductDiamondHand
                    diamondType={selectedConfiguration?.diamondType}
                    range={[0.5, 8]}
                    initValue={parseFloat(diamonds?.[0]?.carat)}
                    disableControls={true}
                    prefix={diamondHandCaption}
                  />
                </div>
              )}
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
              productId={`bundle-${settingSlugs?.productSlug}::${diamonds?.[0]?.lotId}`}
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
                quantity={shopifyProductData?.isSoldAsDouble ? 2 : 1}
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
                          <button onClick={() => item.onClick()}>{_t('Modify')}</button>
                        </span>
                      </li>
                    );
                  })}

                  {reviewVariantOrder.map((key, index) => {
                    const selectorsToIgnore = ['ringSize', 'diamondType', 'caratWeight', 'diamondOrientation'];

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
              {isER && (
                <div className="engraving">
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
                    isCfy={isDiamondCFY}
                    isCaratLessThanFive={parseFloat(diamonds?.[0]?.carat) < CFY_RETURN_THRESHOLD}
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
          <SlideOut title={_t('Size Guide')} onClose={() => setIsSizeGuideOpen(false)} className="extra-side-padding">
            <RingSizeGuide />
          </SlideOut>
        )}
      </AnimatePresence>
      <PageViewTracker productData={productData} isSummaryPage={true} />
    </ReviewBuildStepStyles>
  );
};

// const areEqual = (prevProps, nextProps) => {
//   /*
//     return true if passing nextProps to render would return
//     the same result as passing prevProps to render,
//     otherwise return false
//   */

//   const doDiamondShapeMatch =
//     nextProps?.builderProduct?.product?.configuration?.diamondType === nextProps?.builderProduct?.diamonds?.[0]?.diamondType;

//   console.log('areEqual', { prevProps, nextProps });
//   console.log('doDiamondShapeMatch', doDiamondShapeMatch);

//   return doDiamondShapeMatch;
// };

export default ReviewBuildStep;

const SpriteSpinnerBlock = ({ id }) => {
  const [videoData, setVideoData] = useState(null);

  const fetchVideoType = useCallback(
    async (diamondID) => {
      const webpSprite = generateDiamondSpriteUrl(diamondID, 'webp');

      const webp = await fetch(webpSprite, { method: 'HEAD' });

      const jpgSprite = generateDiamondSpriteUrl(diamondID, 'jpg');
      const jpg = await fetch(jpgSprite, { method: 'HEAD' });

      if (webp.ok) {
        return {
          type: 'webp',
          spriteImage: webpSprite,
        };
      } else {
        if (jpg.ok) {
          return {
            type: 'jpg',
            spriteImage: jpgSprite,
          };
        }
      }
    },
    [id],
  );

  useEffect(() => {
    async function getVideo() {
      if (id) {
        // webp or jpg
        const videoDataTemp = await fetchVideoType(id);

        setVideoData(videoDataTemp);
      }
    }

    getVideo();
  }, [id]);

  return (
    videoData && (
      <SpriteSpinner
        disableCaption={true}
        shouldStartSpinner={true}
        spriteImage={videoData?.spriteImage}
        bunnyBaseURL={videoData?.spriteImage}
      />
    )
  );
};
