/* eslint-disable camelcase */

import { PageViewTracker, useAnalytics } from '@diamantaire/analytics';
import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import {
  BuilderFlowLoader,
  ReviewVariantSelector,
  addCustomProductToCart,
} from '@diamantaire/darkside/components/builder-flows';
import {
  DarksideButton,
  DatoImage,
  Heading,
  NeedTimeToThinkForm,
  ProductAppointmentCTA,
  RingSizeGuide,
  SlideOut,
  StickyElementWrapper,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import { Diamond360, DiamondOOS } from '@diamantaire/darkside/components/diamonds';
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
import { fetchDatoVariant } from '@diamantaire/darkside/data/api';
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
  DIAMOND_VIDEO_BASE_URL,
  ENGAGEMENT_RING_PRODUCT_TYPE,
  ENGRAVING_REGEX,
  PdpTypePlural,
  WEDDING_BAND_PRODUCT_TYPE,
  getCurrency,
  parseValidLocale,
  pdpTypeSingleToPluralAsConst,
} from '@diamantaire/shared/constants';
import { generateDiamondSpriteImage } from '@diamantaire/shared/helpers';
import { useRudderStackAnalytics } from '@diamantaire/shared/rudderstack';
import { OptionItemProps } from '@diamantaire/shared/types';
import { getNumericalLotId } from '@diamantaire/shared-diamond';
import { DEFAULT_BUILDER_ENGRAVING_FONT, getRenderedInputEngravingFontStyles, mobileOnly } from '@diamantaire/styles/darkside-styles';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import styled from 'styled-components';

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
            .hand-image-container {
              max-width: 84%;
              margin: auto;
            }

            &.spritespinner {
              position: relative;

              .spritespinner-outer-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 100;
              }
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
        .heading-container {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
      }

      .builder-summary__content {
        border-bottom: 0.1rem solid #ccc;

        .builder-summary__content__inner {
          &.content_inner_oos {
            ${mobileOnly('padding: 0 1rem;')}
          }
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
        &.-engagement-ring {
          input {
            ${getRenderedInputEngravingFontStyles(DEFAULT_BUILDER_ENGRAVING_FONT)};
          }
        }
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

    .oss_button {
      background-color: #D9D9D9 !important;
      border: 1px solid black;
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
          .sticky {
            padding: 1.8rem;
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
    variantDetails: additionalVariantData,
  } = shopifyProductData || {};

  const sizeOptionKey = 'ringSize';
  const router = useRouter();
  const preselectedRingSize = router.query?.ringSize;
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
  const [handCaratValue, setHandCaratValue] = useState(null);

  const preselectedSizeVariant = configurations?.ringSize?.find((item) => item.value === preselectedRingSize);

  const [selectedSize, setSelectedSize] = useState<{
    id: string;
    value?: string;
  }>(preselectedSizeVariant || configurations?.ringSize?.filter((item) => item.value === '5')[0]);

  const { productAdded } = useAnalytics();

  const sizeOptions = configurations?.[sizeOptionKey];

  const { collectionSlug } = router.query;

  const { product, diamonds } = builderProduct;

  const diamondPrice = Array.isArray(diamonds) && diamonds?.map((diamond) => Math.ceil(diamond.price));

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
    setSelectedSize(option);
  }, []);

  const productType = shopifyProductData?.productType;

  function configOptionsReducer(state, action: any) {
    const { payload, type } = action;
    const { typeId, value } = payload;

    switch (type) {
      case 'option-change':
        return { ...state, [typeId]: value };
    }
  }

  const [, dispatch] = useReducer(configOptionsReducer, selectedConfiguration);

  const productIconListTypeOverride =
    additionalVariantData?.productIconList?.productType ||
    additionalVariantData?.configuration?.productIconList?.productType;

  const { data: { productIconList } = {} } = useProductIconList(
    productIconListTypeOverride ? productIconListTypeOverride : productIconListType,
    router.locale,
  );

  const flowType = router?.asPath.includes('diamond-to-setting') ? 'diamond-to-setting' : 'setting-to-diamond';
  const { _t: shapes_t } = useTranslations(locale, ['DIAMOND_SHAPES']);
  const summaryItems = [
    {
      label: _t('diamondType'),
      value: diamonds?.map((diamond) => shapes_t(diamond?.diamondType)).join(' + '),
      onClick: () => {
        router.push(
          `/customize/${flowType}/${router.query.collectionSlug}/${router.query.productSlug}/${router.query.lotId}/edit-diamond`,
        );
      },
      slug: 'diamondType',
    },
    {
      label: _t('centerstone'),
      value: diamonds
        ?.map(
          (diamond) =>
            diamond?.carat.toString() + 'ct' + ', ' + diamond?.color + ', ' + diamond?.clarity + ', ' + _t(diamond?.cut),
        )
        .join(' + '),
      onClick: () => {
        router.push(
          `/customize/${flowType}/${router.query.collectionSlug}/${router.query.productSlug}/${router.query.lotId}/edit-diamond`,
        );
      },
      slug: 'centerstone',
    },
  ];

  function handleBuilderFlowVariantChange(option: OptionItemProps, configurationType) {
    console.log({ configurationType, option });

    if (router.asPath.includes('setting-to-diamond')) {
      const newUrl = `/customize/setting-to-diamond/${router.query.collectionSlug}/${option?.id}/${builderProduct?.diamonds
        ?.map((diamond) => diamond?.lotId)
        .join('/')}/summary${window?.location?.search}`;

      return router.replace(newUrl);
    } else {
      const newUrl = `/customize/diamond-to-setting/${builderProduct?.diamonds
        ?.map((diamond) => diamond?.lotId)
        .join('/')}/${router.query.collectionSlug}/${option?.id}/summary${window?.location?.search}`;

      return router.replace(newUrl);
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

  const totalPriceInCents = parseFloat(shopifyProductData?.price) + parseFloat(diamondPrice.toString());

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

        const querySizeVariant = res?.optionConfigs?.ringSize?.find((item) => item.value === preselectedRingSize);

        setSelectedSize(querySizeVariant || res?.optionConfigs?.ringSize?.filter((item) => item.value === '5')[0] || '5');

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
      getSettingProduct();
    }
  }, [router?.query?.productSlug, router?.query?.collectionSlug]);

  useEffect(() => {
    if (!diamonds) return;

    if (diamonds?.[0]?.carat) {
      setHandCaratValue(parseFloat(diamonds?.[0]?.carat));
    }
  }, [diamonds]);

  const analytics = useRudderStackAnalytics();

  useEffect(() => {
    if (analytics) {
      analytics?.page();
    }
  }, [analytics?.ready]);
  
  const isDiamondOOS = () => !diamonds?.length || diamonds.some( diamond => !diamond['availableForSale']);
  const viewDiamondsOOS = () => router.push(
    `/customize/${flowType}/${router.query.collectionSlug}/${router.query.productSlug}`,
  );
  const browseOtherDiamonds = () => router.push(`/customize/${flowType}/${router.query.collectionSlug}/${router.query.productSlug}`)

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
      <NextSeo title={seoTitle} description={seoDescription} nofollow={true} noindex={true} />
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

                {product?.productType === 'Engagement Ring' && (
                  <p>
                    <UIString>Shown with</UIString> 1.5ct
                  </p>
                )}
              </div>
              {!isDiamondCFY &&
                spriteSpinnerIds?.map((id) => (
                  <div className="spritespinner embla__slide" key={id}>
                    <Diamond360 lotId={id} diamondType={shopifyProductData?.configuration?.diamondType} />
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
                    diamondType={shopifyProductData?.configuration?.diamondType}
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
            <div className="heading-container">
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

              <WishlistLikeButton
                extraClass="with-title"
                productId={`bundle-${router?.query?.productSlug}::${diamonds?.[0]?.lotId}`}
              />
            </div>
            <div className="total-price">
              {diamondPrice && (
                <ProductPrice
                  isBuilderProduct={false}
                  price={totalPriceInCents}
                  shouldDoublePrice={false}
                  productType={shopifyProductData?.productType}
                  engravingText={engravingText}
                  quantity={shopifyProductData?.isSoldAsDouble ? 2 : 1}
                  pricesArray={[shopifyProductData?.price, ...diamondPrice]}
                />
              )}
            </div>
            {isDiamondOOS() && (
              <DiamondOOS items={summaryItems} viewDiamonds={viewDiamondsOOS}/>
            )}
            <div className="builder-summary__content">
              <div className={clsx("builder-summary__content__inner", {
                'content_inner_oos': isDiamondOOS()
              })}>
                <ul className="list-unstyled">
                  {!isDiamondOOS() && summaryItems?.map((item, index) => {
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
                <div
                  className={clsx('engraving-input-container', {
                    '-engagement-ring':
                      productType === ENGAGEMENT_RING_PRODUCT_TYPE || productType === WEDDING_BAND_PRODUCT_TYPE,
                  })}
                >
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
                    <StickyElementWrapper>
                      {!isDiamondOOS() ? (
                        <DarksideButton
                          className="atc-button"
                          onClick={() =>
                            addCustomProductToCart({
                              selectedSize,
                              builderProduct,
                              router,
                              engravingText,
                              updateGlobalContext,
                              refetch,
                              productIconList,
                              checkout,
                              ToastError,
                              _t,
                              datoParentProductData,
                              diamondImages,
                              productAdded,
                              diamondShapesTranslations,
                              analytics,
                            })
                          }
                        >
                          <UIString>Add To Bag</UIString>
                        </DarksideButton>

                        ) : (
                          <DarksideButton 
                            colorTheme="grey"
                            textSize='medium'
                            className="oss_button" 
                            onClick={() => browseOtherDiamonds()}
                          >
                            <UIString>Sold: Browse other diamonds</UIString>
                          </DarksideButton>
                      )}
                    </StickyElementWrapper>
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
