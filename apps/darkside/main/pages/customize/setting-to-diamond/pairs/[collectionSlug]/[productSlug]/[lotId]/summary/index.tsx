/* eslint-disable camelcase */

import { PageViewTracker, useAnalytics } from '@diamantaire/analytics';
import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import { BuilderFlowLoader, ReviewVariantSelector } from '@diamantaire/darkside/components/builder-flows';
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
  ProductDescription,
  ProductDiamondHand,
  ProductIconList,
  ProductKlarna,
  ProductPrice,
  ProductReviews,
  ProductTitle,
} from '@diamantaire/darkside/components/products/pdp';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalUpdateContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import {
  ERProductCartItemProps,
  ProductAddonDiamond,
  addERProductToCart,
  fetchDatoVariant,
} from '@diamantaire/darkside/data/api';
import {
  useBuilderFlowSeo,
  useCartData,
  useCartInfo,
  useProductDato,
  useProductIconList,
  useStandardPage,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  DIAMOND_VIDEO_BASE_URL,
  ENGRAVING_REGEX,
  PdpTypePlural,
  getCurrency,
  getFormattedPrice,
  parseValidLocale,
  pdpTypeSingleToPluralAsConst,
} from '@diamantaire/shared/constants';
import {
  generateDiamondSpriteImage,
  generateDiamondSpriteUrl,
  getFormattedShipByDate,
  specGenerator,
} from '@diamantaire/shared/helpers';
import { OptionItemProps } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { createShopifyVariantId } from '@diamantaire/shared-product';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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
            margin: 0 -5px;
          }

          > div {
            margin-bottom: 1rem;
            @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
              padding: 0 5px;
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
              .image-diamond {
                img {
                  object-fit: contain;
                }
              }
            }
            .hand {
              display: block;
            }

            &.spritespinner {
              position: relative;
              display: block;

              .spritespinner-outer-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
              }
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

        > div {
          height: 100%;

          .image {
            height: 100% !important;
          }
        }

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
        padding: 1rem 0 2rem;
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
      padding: 0 0 2rem;
      .engraving {
        padding: 2rem 0 0;
      }

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

const SettingToDiamondSummaryPage = () => {
  const [shopifyProductData, setShopifyProductData] = useState(null);
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

  const { data: seoData } = useBuilderFlowSeo(locale);
  const { seoTitle, seoDescription } = seoData?.builderFlow?.seoFields || {};
  const { data: checkout, refetch } = useCartData(locale);
  const { builderProduct } = useContext(BuilderProductContext);
  const updateGlobalContext = useContext(GlobalUpdateContext);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [spriteSpinnerIds, setSpriteSpinnerIds] = useState([]);

  const [isEngravingInputVisible, setIsEngravingInputVisible] = useState(false);
  const [engravingInputText, setEngravingInputText] = useState('');
  const [engravingText, setEngravingText] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [handCaratValue, setHandCaratValue] = useState(null);

  const [selectedSize, setSelectedSize] = useState<{
    id: string;
    value?: string;
    valueLabel?: string;
    isSelected?: boolean;
  }>(configurations?.ringSize?.filter((item) => item.value === '5')[0] || '5');

  // As of now, only toimoi and pairs end up on this page. We will have to expand this if other products end up here
  const isToiMoi = router.query.collectionSlug.includes('toi-moi');

  const { productAdded } = useAnalytics();

  const sizeOptions = configurations?.[sizeOptionKey];

  const { collectionSlug } = router.query;

  const { product, diamonds } = builderProduct;

  const diamondPrice = Array.isArray(diamonds) && diamonds?.map((diamond) => diamond.price);
  const diamondPricesCombined = diamondPrice && diamondPrice.reduce((acc, price) => acc + price, 0);

  const { countryCode, languageCode } = parseValidLocale(locale);

  const currencyCode = getCurrency(countryCode);

  const { _t } = useTranslations(locale);
  const { _t: diamondShapesTranslations } = useTranslations(locale, ['OPTION_NAMES', 'DIAMOND_SHAPES']);

  const mutatedLotIds = Array.isArray(diamonds) ? diamonds?.map((diamond) => getNumericalLotId(diamond?.lotId)) : [];

  const isDiamondCFY = diamonds?.filter((diamond) => diamond?.slug === 'cto-diamonds').length > 0;
  const isER = shopifyProductData?.productType === 'Engagement Ring';

  const { data: blockpickerData }: any = useStandardPage(
    isER ? 'engagement_ring_summary_page' : 'jewelry_summary_page',
    router.locale,
  );

  const diamondImages = useMemo(() => {
    return isDiamondCFY
      ? diamonds?.map((diamond) => {
          const spriteImageUrl = generateDiamondSpriteImage({ diamondType: diamond?.diamondType });

          return spriteImageUrl;
        })
      : (Array.isArray(mutatedLotIds) &&
          mutatedLotIds.map((mutatedLotId) => `${DIAMOND_VIDEO_BASE_URL}/${mutatedLotId}-thumb.jpg`)) ||
          [];
  }, [isDiamondCFY, diamonds]);

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
    : pdpTypeSingleToPluralAsConst[shopifyProductData?.productType];

  const { data }: { data: any } = useProductDato(collectionSlug as string, locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct;

  const {
    // ER + WB SEO
    // seoTitle,
    // seoDescription,
    // Jewelry SEO
    // seoFields,
    productDescription,
    productTitle,
    bandWidth,
    bandDepth,
    settingHeight,
    shownWithCtwLabel,
    // extraOptions,
    diamondDescription,
    productTitleOverride,
    // trioBlocks,
    // accordionBlocks,
    // ctaCopy,
  } = datoParentProductData || {};

  const parentProductAttributes = {
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight: shopifyProductData?.collectionContent?.paveCaratWeight,
    metalWeight: shopifyProductData?.collectionContent?.metalWeight,
    caratWeight: shopifyProductData?.collectionContent?.caratWeight,
    shownWithCtwLabel,
    diamondDescription,
    styles: shopifyProductData?.styles,
    productType: shopifyProductData?.productType,
  };

  const productIconListType = datoParentProductData?.productIconList?.productType;

  const isEngravingInputEmpty = useMemo(() => {
    return isEngravingInputVisible && engravingInputText.length === 0;
  }, [engravingInputText]);

  const handleSizeChange = useCallback((option: OptionItemProps) => {
    // setSelectVariantId(option.id);
    if (option?.value) {
      router.query['ringSize'] = option.value;
      router.push(router);
    }
    setSelectedSize(option);
  }, []);

  const { goldPurity, bandAccent } = product?.configuration || {};

  const image = {
    src: shopifyProductData?.productContent?.assetStack?.[0]?.url,
    width: shopifyProductData?.productContent?.assetStack?.[0]?.width,
    height: shopifyProductData?.productContent?.assetStack?.[0]?.height,
  };

  const productType = shopifyProductData?.productType;

  function configOptionsReducer(state, action: any) {
    const { payload, type } = action;
    const { typeId, value } = payload;

    switch (type) {
      case 'option-change':
        return { ...state, [typeId]: value };
    }
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  const [configState, dispatch] = useReducer(configOptionsReducer, selectedConfiguration);

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
      alt_t: diamondShapesTranslations,
      hasChildDiamond: true,
      locale,
    });
    const formattedShippingTime = getFormattedShipByDate(shippingTime, locale);

    const settingAttributes: ERProductCartItemProps['settingAttributes'] = {
      _productType: productType,
      _productTypeTranslated: _t(productType),
      metalType: erMetal,
      productAsset: image?.src,
      _productAssetObject: JSON.stringify(image),
      _productTitle: productTitle,
      productIconListShippingCopy: `${_t(shippingText)} ${formattedShippingTime}`,
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
      totalPrice: (shopifyProductData.price + diamondPrice).toString(),
      productCategory: settingType === 'engagement-ring' ? _t('Setting') : productType ? productType : _t('Setting'),
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
    const shippingTextDiamondAttribute = isDiamondCFY ? cutForYouShippingText : _t(shippingText);

    const diamondsToAdd = diamonds.map((diamond, index) => {
      const diamondSpecs = specGenerator({
        configuration: { ...diamond, caratWeight: diamond?.carat },
        productType: 'Diamond',
        alt_t: diamondShapesTranslations,
        _t,
        locale,
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
        diamondType: diamond.diamondType,
        color: diamond.color,
        feedId: settingVariantId,
        lotId: diamond.lotId,
        isChildProduct: 'true',
        productGroupKey,
        _specs: diamondSpecs,
        _productType: 'Diamond',
        _productTypeTranslated: _t('Diamond'),
        shippingText: shippingTextDiamondAttribute,
        productIconListShippingCopy: `${shippingTextDiamondAttribute} ${formattedShippingTime}`,
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
      overrideSettingQty: !isToiMoi ? 2 : 1,
      diamonds: diamondsToAdd,
      hasEngraving: engravingText ? true : false,
      engravingText,
      locale,
    }).then(() => refetch());

    updateGlobalContext({
      isCartOpen: true,
    });

    // TODO: Add Sentry Loggin
    if (Array.isArray(diamonds) && diamonds.length > 0) {
      // Extract setting information
      const {
        productTitle: settingProductTitle,
        image: { src } = { src: '' },
        price: settingPrice,
        productContent,
      } = product || {};
      const formattedSettingPrice = getFormattedPrice(settingPrice, locale, true, true);
      const id = settingVariantId.split('/').pop();
      const totalAmount = getFormattedPrice(settingPrice + diamondPricesCombined, locale, true, true);
      // Setting product data
      const settingProduct = {
        id,
        name: settingProductTitle,
        price: formattedSettingPrice,
        category: pdpType,
        variant: variantProductTitle,
        quantity: !isToiMoi ? 2 : 1,
        brand: 'VRAI',
        image_url: src || productContent?.assetStack?.[0]?.url,
        ...selectedConfiguration,
        setting: settingProductTitle,
        gold_purity: goldPurity,
        band_accent: bandAccent,
      };

      // Diamond products data
      const diamondProducts = diamonds.map((diamond) => ({
        id: diamond?.dangerousInternalShopifyVariantId,
        name: diamond?.productTitle,
        price: getFormattedPrice(diamond?.price, locale, true, true),
        brand: 'VRAI',
        category: diamond?.productType,
        variant: diamond?.productTitle,
        quantity: 1,
        diamond_lot_Id: diamond?.lotId,
        diamond_type: diamond?.diamondType,
        carat: diamond?.carat,
        shape: diamond?.diamondType,
        clarity: diamond?.clarity,
        colour: diamond?.color,
        centerstone: `${diamond?.carat}ct, ${diamond?.color}, ${diamond?.clarity}`,
      }));

      // Combine setting and diamonds for the add event
      productAdded({
        id,
        category: pdpType,
        name: settingProductTitle,
        brand: 'VRAI',
        variant: variantProductTitle,
        product: variantProductTitle,
        image_url: src,
        ...selectedConfiguration,
        setting: settingProductTitle,
        ecommerce: {
          value: totalAmount,
          currency: currencyCode,
          add: {
            products: [settingProduct, ...diamondProducts],
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
            quantity: !isToiMoi ? 2 : 1,
            ...selectedConfiguration,
          },
          ...diamondProducts.map((diamond) => ({
            item_id: diamond.id,
            item_name: diamond.name,
            item_brand: 'VRAI',
            item_category: diamond.category,
            price: diamond.price,
            currency: currencyCode,
            quantity: 1,
          })),
        ],
      });
    }

    return;
  }

  const flowType = router?.asPath.includes('diamond-to-setting') ? 'diamond-to-setting' : 'setting-to-diamond';

  const { _t: shapes_t } = useTranslations(locale, ['DIAMOND_SHAPES']);
  const summaryItems = [
    {
      label: _t('diamondType'),
      value: diamonds?.map((diamond) => shapes_t(diamond?.diamondType)).join(' + '),
      onClick: () => {
        router.push(
          `/customize/${flowType}/pairs/${router.query.collectionSlug}/${router.query.productSlug}/${router.query.lotId}/edit-diamond`,
        );
      },
      slug: 'diamondType',
    },
    {
      label: _t(diamonds?.[0]?.diamondType),
      value:
        diamonds?.[0]?.carat.toString() +
        'ct' +
        ', ' +
        diamonds?.[0]?.color +
        ', ' +
        diamonds?.[0]?.clarity +
        ', ' +
        _t(diamonds?.[0]?.cut),
      onClick: () => {
        router.push(
          `/customize/${flowType}/pairs/${router.query.collectionSlug}/${router.query.productSlug}/${router.query.lotId}/edit-diamond`,
        );
      },
      slug: 'centerstone',
    },
    {
      label: _t(diamonds?.[1]?.diamondType),
      value:
        diamonds?.[1]?.carat.toString() +
        'ct' +
        ', ' +
        diamonds?.[1]?.color +
        ', ' +
        diamonds?.[1]?.clarity +
        ', ' +
        _t(diamonds?.[1]?.cut),
      onClick: () => {
        router.push(
          `/customize/${flowType}/pairs/${router.query.collectionSlug}/${router.query.productSlug}/${router.query.lotId}/edit-diamond`,
        );
      },
      slug: 'centerstone',
    },
  ];

  // eslint-disable-next-line unused-imports/no-unused-vars
  function handleBuilderFlowVariantChange(option: OptionItemProps, configurationType) {
    if (router.asPath.includes('setting-to-diamond')) {
      const newUrl = `/customize/setting-to-diamond/${router.asPath.includes('/pairs/') ? 'pairs/' : ''}${
        router.query.collectionSlug
      }/${option?.id}/${builderProduct?.diamonds?.map((diamond) => diamond?.lotId).join(',')}/summary`;

      return router.replace(newUrl);
    } else {
      const newUrl = `/customize/diamond-to-setting/${builderProduct?.diamonds
        ?.map((diamond) => diamond?.lotId)
        .join('/')}/${router.query.collectionSlug}/${option?.id}/summary`;

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
  const { isSoldAsDouble, price } = shopifyProductData || {};
  const basePriceInCents = Math.ceil(parseFloat(price));
  const totalPriceInCents = isSoldAsDouble
    ? basePriceInCents * 2 + Math.ceil(diamondPricesCombined)
    : basePriceInCents + Math.ceil(diamondPricesCombined);

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
    function getSpriteSpinnerIds() {
      const ids = router.query.lotId
        .toString()
        .split(',')
        .map((lotId) => {
          const id = lotId.includes('cfy-')
            ? lotId
            : lotId
                .split('')
                .filter((v) => !isNaN(Number(v)))
                .join('');

          return id;
        });

      setSpriteSpinnerIds(ids);
    }

    if (router?.query?.lotId) {
      getSpriteSpinnerIds();
    }
  }, [router?.query?.lotId]);

  async function getSettingProduct() {
    const qParams = new URLSearchParams({
      slug: router?.query?.collectionSlug?.toString(),
      id: router?.query?.productSlug?.toString(),
    }).toString();

    // Product Data
    const productResponse = await fetch(`/api/pdp/getPdpProduct?${qParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        const handle = res?.productContent?.shopifyProductHandle || res?.productContent?.configuredProductOptionsInOrder;
        const category = res?.productType;

        const variant: any = handle && (await fetchDatoVariant(handle, category, router.locale));

        setSelectedSize(res?.optionConfigs?.ringSize?.filter((item) => item.value === '5')[0] || '5');

        return {
          ...res,
          variantDetails: variant?.omegaProduct,
        };
      })
      .catch((e) => {
        console.log('getPdpProduct error', e);
      });

    setShopifyProductData(productResponse);

    return productResponse;
  }

  useEffect(() => {
    if (router?.query?.productSlug && router?.query?.collectionSlug) {
      getSettingProduct().then(() => setIsLoading(false));
    }
  }, [router?.query?.productSlug, router?.query?.collectionSlug]);

  useEffect(() => {
    if (!diamonds) return;

    if (diamonds.length === 1) {
      if (diamonds?.[0]?.carat) {
        setHandCaratValue(parseFloat(diamonds?.[0]?.carat));
      }
    } else if (diamonds.length === 2) {
      const diamondCarats = diamonds.map((diamond) => parseFloat(diamond?.carat));

      if (diamondCarats) {
        setHandCaratValue(diamondCarats);
      }
    }
  }, [diamonds]);

  if (!shopifyProductData || !shopifyProductData?.productContent?.assetStack[0] || !spriteSpinnerIds)
    return <BuilderFlowLoader />;

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
      <NextSeo title={seoTitle} description={seoDescription} nofollow={true} noindex={true} />
      <div className="review-wrapper">
        <div className="product-images">
          <div className="embla" ref={isWindowDefined && window.innerWidth < 767 ? emblaRef : null}>
            <div className="embla__container">
              <div className={clsx('image setting-image', { embla__slide: isWindowDefined && window.innerWidth < 767 })}>
                {shopifyProductData?.productContent?.assetStack[0] && (
                  <DatoImage
                    image={{
                      ...shopifyProductData?.productContent?.assetStack[0],
                      responsiveImage: {
                        ...shopifyProductData?.productContent?.assetStack?.[0]?.responsiveImage,
                        src: shopifyProductData?.productContent?.assetStack[0]?.url,
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
                    <SpriteSpinnerBlock id={id} diamondType={shopifyProductData?.configuration?.diamondType} />
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
                    initValue={handCaratValue}
                    disableControls={true}
                    prefix={diamondHandCaption}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="slider-dots">
            <ul>
              {[0, 1, 2, 3].map((_item, index) => {
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
              productId={`bundle-${router.query?.productSlug}::${diamonds?.map((diamond) => diamond.lotId).join('::')}`}
            />

            {productTitle && languageCode === 'en' ? (
              <Heading type="h1" className="secondary no-margin">
                {productTitle}
              </Heading>
            ) : productTitle ? (
              <ProductTitle
                title={productTitle}
                override={productTitleOverride}
                diamondType={shopifyProductData?.configuration?.diamondType}
                productType={shopifyProductData?.productType}
              />
            ) : (
              ''
            )}

            <div className="total-price">
              {diamondPrice && (
                <ProductPrice
                  isBuilderProduct={false}
                  price={totalPriceInCents}
                  shouldDoublePrice={false}
                  productType={shopifyProductData?.productType}
                  engravingText={engravingText}
                  quantity={isSoldAsDouble ? 2 : 1}
                  pricesArray={isSoldAsDouble ? [price, price, ...diamondPrice] : [price, ...diamondPrice]}
                />
              )}
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

            {selectedSize && productType === 'Engagement Ring' && (
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
                      const newValue = e.target.value;

                      if (newValue.length > MAX_CHAR_LIMIT) return;

                      if (ENGRAVING_REGEX.test(newValue) || newValue === '') {
                        setEngravingInputText(newValue);
                      }
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

              {shopifyProductData?.productType && productIconListType && (
                <div className="product-icon-list-container">
                  <ProductIconList
                    productIconListType={productIconListTypeOverride ? productIconListTypeOverride : productIconListType}
                    isCfy={isDiamondCFY}
                    isCaratLessThanFive={parseFloat(diamonds?.[0]?.carat) < CFY_RETURN_THRESHOLD}
                    locale={locale}
                  />
                </div>
              )}

              {productData && <NeedTimeToThinkForm productData={productData} />}

              <ProductDescription
                title={productTitle}
                description={productDescription}
                selectedConfiguration={shopifyProductData?.configuration}
                variantAttributes={additionalVariantData}
                productAttributes={parentProductAttributes}
                productSpecId={datoParentProductData?.specLabels?.id}
              />
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

SettingToDiamondSummaryPage.getTemplate = getStandardTemplate;
export default SettingToDiamondSummaryPage;

const SpriteSpinnerBlock = ({ id, diamondType }) => {
  const [videoData, setVideoData] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

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
    function getThumbnail() {
      const spriteImageUrl = generateDiamondSpriteImage({ diamondID: id, diamondType });

      setThumbnail(spriteImageUrl);
    }

    async function getVideo() {
      if (id) {
        // webp or jpg
        const videoDataTemp = await fetchVideoType(id);

        setVideoData(videoDataTemp);
      }
    }

    getVideo();
    getThumbnail();
  }, [id]);

  return (
    <>
      {thumbnail && <Image alt="" src={thumbnail} height={600} width={600}></Image>}

      {videoData && (
        <div className="spritespinner-outer-container">
          <SpriteSpinner
            disableCaption={true}
            shouldStartSpinner={true}
            spriteImage={videoData?.spriteImage}
            bunnyBaseURL={videoData?.spriteImage}
          />
        </div>
      )}
    </>
  );
};

type BuilderStepSeoProps = {
  dehydratedState: DehydratedState;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<BuilderStepSeoProps>> {
  const { locale } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries['builder-flow'].seo(locale),
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
