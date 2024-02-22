import { ParsedUrlQuery } from 'querystring';

import { PageViewTracker } from '@diamantaire/analytics';
import { BlockPicker } from '@diamantaire/darkside/components/blockpicker-blocks';
import {
  Breadcrumb,
  DropHintModal,
  NeedTimeToThinkForm,
  ProductAppointmentCTA,
} from '@diamantaire/darkside/components/common-ui';
import {
  MediaGallery,
  MediaSlider,
  ProductConfigurator,
  ProductDescription,
  ProductIconList,
  ProductKlarna,
  ProductPrice,
  ProductTitle,
  ProductSuggestionBlock,
  ProductGWP,
  ProductSeo,
  ProductReviews,
  ProductBlockPicker,
  ProductContentBlocks,
  ProductTrioBlocks,
} from '@diamantaire/darkside/components/products/pdp';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import {
  useProduct,
  useProductDato,
  useProductVariant,
  useTranslations,
  useDiamondLowestPriceByDiamondType,
} from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import {
  ENGAGEMENT_RING_PRODUCT_TYPE,
  getCurrency,
  jewelryTypes,
  pdpTypeHandleSingleToPluralAsConst,
  PdpTypePlural,
  pdpTypeSingleToPluralAsConst,
  pdpTypeTitleSingleToPluralHandleAsConst,
} from '@diamantaire/shared/constants';
import {
  fetchAndTrackPreviouslyViewed,
  getCountry,
  getSWRPageCacheHeader,
  generatePdpAssetAltTag,
} from '@diamantaire/shared/helpers';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useContext, useEffect, useMemo, useState } from 'react';

import { PageContainerStyles } from './PdpPage.style';

export interface PdpPageParams extends ParsedUrlQuery {
  collectionSlug: string;
  productSlug: string;
}

export interface PdpPageProps {
  key: string;
  params: PdpPageParams;
  selectedDiamond?: Array<{
    diamondType?: string;
    carat?: string;
    color?: string;
    clarity?: string;
    price?: number;
    availableForSale?: boolean;
  }>;
  dehydratedState: DehydratedState;
}

export function PdpPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    params: { collectionSlug, productSlug: initialProductSlug },
    selectedDiamond: initialSelectedDiamond,
  } = props;

  const [productSlug, setProductSlug] = useState(initialProductSlug);
  const [selectedDiamond, setSelectedDiamond] = useState(initialSelectedDiamond);

  const { isMobile } = useContext(GlobalContext);

  // General Data - Serverside
  const query = useProduct({ collectionSlug, productSlug });

  const { data: shopifyProductData = {} } = query;

  const router = useRouter();

  useEffect(() => {
    const hasProductParams = router.pathname.includes('productParams');
    const isAnyDiamondUnavailable =
      selectedDiamond?.length > 0 && selectedDiamond?.some((diamond) => !diamond.availableForSale);

    if (!hasProductParams || isAnyDiamondUnavailable) {
      setSelectedDiamond(null);
    }
  }, [router.pathname, selectedDiamond]);

  const { locale } = router || {};
  const countryCode = getCountry(locale);
  const currencyCode = getCurrency(countryCode);
  const { _t } = useTranslations(locale);

  // Jewelry | ER | Wedding Band
  const pdpType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[router.pathname.split('/')[1]];

  const { data }: { data: any } = useProductDato(collectionSlug, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct || data?.weddingBandProduct;

  const isEngagementRingProduct = !!data?.engagementRingProduct;

  const dropHintEnabled = !isEngagementRingProduct;

  const {
    // ER + WB SEO
    seoTitle,
    seoDescription,
    // Jewelry SEO
    seoFields,
    productDescription,
    bandWidth,
    bandDepth,
    settingHeight,
    shownWithCtwLabel,
    extraOptions,
    diamondDescription,
    productTitle,
    productTitleOverride,
    trioBlocks,
    accordionBlocks,
    ctaCopy,
  } = datoParentProductData || {};

  // Icon List - Clientside
  const productIconListType = datoParentProductData?.productIconList?.productType;

  // Product Instagram Reel - Clientside
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;

  // Product Video Clock - Clientside
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;

  // Product Block Picker - Clientside pulls if __typename exists
  const hasBelowBannerBlocks = datoParentProductData?.belowBannerBlocks?.length > 0;

  // Trio Blocks - Clientside
  let trioBlocksId = trioBlocks?.id;

  let accordionBlocksOverride = accordionBlocks;
  // Variant Specific Data
  const { shopifyCollectionId, productContent, configuration, price } = shopifyProductData;

  const configurations = shopifyProductData?.optionConfigs;

  const shopifyHandle = productContent?.shopifyProductHandle || productContent?.configuredProductOptionsInOrder;

  let { data: additionalVariantData }: any = useProductVariant(
    shopifyHandle,
    shopifyProductData?.productType,
    router.locale,
  );
  let assetStack = productContent?.assetStack; // flatten array in normalization

  const variantId = shopifyProductData?.shopifyVariantId;

  const productIconListTypeOverride =
    additionalVariantData?.omegaProduct?.productIconList?.productType ||
    additionalVariantData?.configuration?.productIconList?.productType;

  if (additionalVariantData) {
    // ER/WB
    if (additionalVariantData?.omegaProduct) {
      additionalVariantData = additionalVariantData?.omegaProduct;
    } else if (additionalVariantData?.configuration) {
      // Jewelry
      additionalVariantData = { ...productContent, ...additionalVariantData?.configuration };
      if (additionalVariantData?.assetStack) {
        assetStack = additionalVariantData?.assetStack;
      }
    } else {
      // Add Shopify Product Data to Dato Product Data
      additionalVariantData = productContent;
      additionalVariantData['goldPurity'] = shopifyProductData?.configuration?.goldPurity;
      additionalVariantData.bandAccent = shopifyProductData?.configuration?.bandAccent;
      additionalVariantData.ringSize = shopifyProductData?.options?.ringSize;
    }

    if (additionalVariantData?.trioBlocks) {
      trioBlocksId = additionalVariantData?.trioBlocks?.id;
    }
    if (additionalVariantData?.accordionBlocks?.length > 0) {
      accordionBlocksOverride = additionalVariantData?.accordionBlocks;
    }

    additionalVariantData.productType = shopifyProductData.productType;
    additionalVariantData.productTitle = datoParentProductData?.productTitle;

    additionalVariantData.price = price;

    if (assetStack[0]) {
      additionalVariantData.image = {
        src: assetStack[0].url,
        width: assetStack[0].width,
        height: assetStack[0].width,
        responsiveImage: {
          src: assetStack[0].url,
          ...assetStack[0].responsiveImage,
        },
      };
    }
  }
  const diamondFeedPrice = Array.isArray(selectedDiamond)
    ? selectedDiamond.reduce((total, diamond) => total + (diamond?.price || 0), 0)
    : 0;

  const totalPrice = diamondFeedPrice ? diamondFeedPrice + price : price;
  const isProductFeedUrl = diamondFeedPrice !== 0 && Boolean(diamondFeedPrice);

  // Can this item go Out Of Stock?
  const trackInventory = Boolean(shopifyProductData?.trackInventory);
  // Can this product be added directly to cart?
  // console.log('shopifyProductData', shopifyProductData);
  const isBuilderProduct = isProductFeedUrl ? false : shopifyProductData?.requiresCustomDiamond;

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
    productType: shopifyProductData.productType,
  };

  const hasMoreThanOneVariant = useMemo(() => {
    let hasMoreThanOne = false;

    shopifyProductData?.allAvailableOptions &&
      Object.keys(shopifyProductData?.allAvailableOptions).map((key) => {
        if (shopifyProductData?.allAvailableOptions[key].length > 1) {
          hasMoreThanOne = true;
        }
      });

    return hasMoreThanOne;
  }, []);

  const isProductJewelry = jewelryTypes.includes(shopifyProductData?.productType);
  const isWeddingBand = shopifyProductData?.productType === 'Wedding Band';
  const diamondTypeFromConfiguration = configuration?.diamondType;
  const caratWeightFromConfiguration = configuration?.caratWeight;
  const { data: lowestPricedDiamond } = useDiamondLowestPriceByDiamondType(
    { diamondType: diamondTypeFromConfiguration },
    {
      enabled: !!diamondTypeFromConfiguration && isProductJewelry && caratWeightFromConfiguration === 'other',
    },
  );

  const breadcrumbTitle = pdpTypeSingleToPluralAsConst[shopifyProductData?.productType] || shopifyProductData?.productType;
  const breadcrumb = [
    // First option is just for jewelry, and it won't show title is null
    {
      title: isProductJewelry ? _t('Jewelry') : null,
      path: isProductJewelry ? '/jewelry' : null,
    },
    {
      title: _t(breadcrumbTitle),
      path: `/${isProductJewelry ? 'jewelry/' : isWeddingBand ? 'wedding-rings/' : ''}${
        pdpTypeTitleSingleToPluralHandleAsConst[shopifyProductData?.productType] === 'engagement-rings'
          ? 'engagement-rings/settings'
          : pdpTypeTitleSingleToPluralHandleAsConst[shopifyProductData?.productType] || shopifyProductData?.productType
      }`,
    },
    {
      title: productTitle,
      path: '#',
    },
  ];

  // Doubles price if product is earrings pair
  const [shouldDoublePrice, setShouldDoublePrice] = useState<boolean>(
    shopifyProductData?.productType.toLowerCase() === 'earrings' || null,
  );

  // Engraving
  const [engravingText, setEngravingText] = useState(null);

  // Tracks previously viewed products in local storage
  useEffect(() => {
    if (!productTitle || !shopifyProductData?.contentId) return;

    fetchAndTrackPreviouslyViewed(productTitle, shopifyProductData?.contentId);
  }, [productTitle, shopifyProductData?.contentId]);

  // DropHint
  const [openDropHintModal, setOpenDropHintModal] = useState(false);

  const [dropHintData, setDropHintData] = useState(null);

  const handleOpenDropHintModal = (data: { link: string; image: string }) => {
    setOpenDropHintModal(true);

    setDropHintData(data);
  };

  const handleModalClose = () => {
    setOpenDropHintModal(false);
    setDropHintData(null);
  };

  if (shopifyProductData) {
    const productData = { ...shopifyProductData, cms: additionalVariantData };

    const productMediaAltDescription = generatePdpAssetAltTag({
      productTitle,
      productConfiguration: shopifyProductData?.configuration,
      _t,
    });

    return (
      <PageContainerStyles>
        <ProductSeo
          seoFields={seoFields}
          legacySeoFields={{
            seoTitle,
            seoDescription,
          }}
          productType={shopifyProductData?.productType}
          diamondType={configuration?.diamondType}
          productTitle={productTitle}
          metal={configuration?.metal}
          canonicalVars={shopifyProductData?.canonicalVariant}
        />

        <Script
          id="klara-script"
          src="https://js.klarna.com/web-sdk/v1/klarna.js"
          data-client-id="4b79b0e8-c6d3-59da-a96b-2eca27025e8e"
        ></Script>

        <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />

        <Script
          src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js"
          strategy={'beforeInteractive'}
        />

        <PageViewTracker productData={productData} />

        <Breadcrumb breadcrumb={breadcrumb} />

        <div className="product-container">
          <div className="media-container">
            <MediaGallery
              assets={assetStack}
              options={configuration}
              title={productMediaAltDescription || productTitle}
              productType={shopifyProductData?.productType}
              shouldDisplayDiamondHand={shopifyProductData?.productType === ENGAGEMENT_RING_PRODUCT_TYPE}
              shownWithCtw={additionalVariantData?.shownWithCtw}
              diamondType={configuration?.diamondType}
            />
            <MediaSlider
              title={productMediaAltDescription || productTitle}
              assets={assetStack}
              options={configuration}
              diamondType={configuration?.diamondType}
              shouldDisplayDiamondHand={shopifyProductData?.productType === ENGAGEMENT_RING_PRODUCT_TYPE}
              productType={shopifyProductData?.productType}
              shownWithCtw={additionalVariantData?.shownWithCtw}
            />
            {isMobile && <WishlistLikeButton extraClass="pdp" productId={`product-${shopifyProductData.productSlug}`} />}
          </div>

          <div className="info-container">
            <div className="info__inner">
              {!isMobile && <WishlistLikeButton extraClass="pdp" productId={`product-${shopifyProductData.productSlug}`} />}
              <ProductTitle
                title={productTitle}
                override={productTitleOverride}
                diamondType={configuration?.diamondType}
                productType={shopifyProductData?.productType}
              />
              <ProductPrice
                isBuilderProduct={isBuilderProduct}
                price={totalPrice}
                quantity={shouldDoublePrice ? 2 : 1}
                shouldDoublePrice={shouldDoublePrice}
                productType={shopifyProductData?.productType}
                engravingText={engravingText}
                lowestPricedDiamond={lowestPricedDiamond}
                pricesArray={(shouldDoublePrice && Array.from(Array(2)).map(() => totalPrice)) || null}
              />

              <ProductConfigurator
                configurations={configurations}
                selectedConfiguration={configuration}
                variantId={variantId}
                variantPrice={price}
                additionalVariantData={additionalVariantData}
                isBuilderProduct={isBuilderProduct}
                hasMoreThanOneVariant={hasMoreThanOneVariant}
                extraOptions={extraOptions}
                defaultRingSize={shopifyProductData?.defaultRingSize}
                hasMultipleDiamondOrientations={shopifyProductData?.allAvailableOptions?.diamondOrientation?.length > 1}
                variantProductTitle={shopifyProductData?.productTitle}
                price={price}
                isEngraveable={shopifyProductData?.isEngraveable}
                hasSingleInitialEngraving={shopifyProductData?.hasSingleInitialEngraving}
                setShouldDoublePrice={setShouldDoublePrice}
                shouldDoublePrice={shouldDoublePrice}
                // isSoldAsDouble is only true for earrings that come as a pair
                isSoldAsDouble={shopifyProductData?.isSoldAsDouble}
                isSoldAsPairOnly={shopifyProductData?.isSoldAsPairOnly}
                isSoldAsLeftRight={shopifyProductData?.isSoldAsLeftRight}
                variants={shopifyProductData?.variants}
                requiresCustomDiamond={shopifyProductData?.requiresCustomDiamond}
                engravingText={engravingText}
                setEngravingText={setEngravingText}
                productIconListType={productIconListTypeOverride ? productIconListTypeOverride : productIconListType}
                setProductSlug={setProductSlug}
                parentProductAttributes={parentProductAttributes}
                isProductFeedUrl={isProductFeedUrl}
                ctaCopy={ctaCopy}
                selectedDiamond={selectedDiamond}
                productTitle={productTitle}
                trackInventory={trackInventory}
              />
              {!isProductFeedUrl && !shopifyProductData?.requiresCustomDiamond ? (
                <ProductKlarna title={productTitle} currentPrice={shouldDoublePrice ? price * 2 : price} />
              ) : null}
              <ProductAppointmentCTA
                productType={shopifyProductData?.productType}
                type={isProductFeedUrl ? 'underline' : 'outline'}
              />

              <ProductGWP />

              {productIconListType && (
                <ProductIconList
                  productIconListType={productIconListTypeOverride ? productIconListTypeOverride : productIconListType}
                  handleOpenDropHintModal={handleOpenDropHintModal}
                  locale={router?.locale}
                  withDropHint={dropHintEnabled}
                  productType={shopifyProductData?.productType}
                  collectionSlug={collectionSlug}
                  productSlug={productSlug}
                  productImageUrl={productContent?.image?.responsiveImage?.src || productContent?.assetStack?.[0]?.url}
                />
              )}

              {additionalVariantData && <NeedTimeToThinkForm productData={productData} />}

              <ProductDescription
                title={productTitle}
                description={productDescription}
                selectedConfiguration={configuration}
                variantAttributes={additionalVariantData}
                productAttributes={parentProductAttributes}
                productSpecId={datoParentProductData?.specLabels?.id}
              />
            </div>
          </div>
        </div>

        <div className="below-banner-container-wrapper">
          {trioBlocksId && <ProductTrioBlocks trioBlocksId={trioBlocksId} />}

          {additionalVariantData?.productSuggestionQuadBlock?.id && (
            <ProductSuggestionBlock id={additionalVariantData?.productSuggestionQuadBlock?.id} />
          )}

          {shopifyProductData?.productType === 'Engagement Ring' && (
            <ProductContentBlocks videoBlockId={videoBlockId} instagramReelId={instagramReelId} />
          )}

          {shopifyCollectionId && (
            <ProductReviews reviewsId={shopifyCollectionId.replace('gid://shopify/Collection/', '')} />
          )}

          {openDropHintModal && (
            <DropHintModal
              title={_t('Drop a hint')}
              subtitle={_t('Enter the email address where you would like this to be sent.')}
              locale={locale}
              onClose={handleModalClose}
              productLink={dropHintData?.link}
              productImage={dropHintData?.image}
            />
          )}

          {hasBelowBannerBlocks && <ProductBlockPicker slug={collectionSlug} pdpType={pdpType} />}

          {accordionBlocksOverride?.length > 0 &&
            accordionBlocksOverride.map((block, index) => {
              const { _modelApiKey } = block;

              return (
                <BlockPicker
                  _modelApiKey={_modelApiKey}
                  modularBlockData={{ ...block }}
                  shouldLazyLoad={true}
                  key={index}
                  countryCode={countryCode}
                  currencyCode={currencyCode}
                />
              );
            })}
        </div>
      </PageContainerStyles>
    );
  }

  return (
    <h1>
      No data found for product page: {collectionSlug} {productSlug}{' '}
    </h1>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<PdpPageParams>,
  contextOverride?: Partial<GetServerSidePropsContext>,
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  const cacheSettings = getSWRPageCacheHeader();

  context.res.setHeader('Vercel-CDN-Cache-Control', cacheSettings);
  context.res.setHeader('CDN-Cache-Control', cacheSettings);
  context.res.setHeader('Cache-Control', cacheSettings);

  const mergedContext = {
    ...context,
    params: {
      ...context.params,
      ...(contextOverride?.params || {}),
    },
  };

  const { params, locale } = mergedContext;

  const { collectionSlug, productSlug, productParams } = mergedContext.params;

  const lotIds = productParams || null;

  const selectedDiamond = lotIds ? await getDiamond(lotIds) : null;
  const queryClient = new QueryClient();
  const dataQuery = queries.products.variant(collectionSlug, productSlug);

  const productType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[context.req.url.split('/')[1]] || null;

  await queryClient.prefetchQuery({ ...queries.template.global(locale) });
  await queryClient.prefetchQuery(dataQuery);
  await queryClient.prefetchQuery({ ...queries.products.serverSideDatoProductInfo(collectionSlug, locale, productType) });

  if (!queryClient.getQueryData(dataQuery.queryKey)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      key: productSlug,
      params,
      selectedDiamond,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PdpPage.getTemplate = getStandardTemplate;

export default PdpPage;

async function getDiamond(lotIds) {
  const qParams = new URLSearchParams({ lotIds }).toString();

  const BASE_URL = `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}`;
  const baseUrl = typeof window === 'undefined' ? BASE_URL : window.location.origin;

  const reqUrl = `${baseUrl}/api/diamonds/getDiamondByLotId?${qParams}`;

  const diamondResponse = await fetch(reqUrl)
    .then((res) => res.json())
    .then((data) => data);

  return diamondResponse;
}
