import { ParsedUrlQuery } from 'querystring';

import { PageViewTracker } from '@diamantaire/analytics';
import { Breadcrumb, Form, ProductAppointmentCTA } from '@diamantaire/darkside/components/common-ui';
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
} from '@diamantaire/darkside/components/products/pdp';
import { WishlistLikeButton } from '@diamantaire/darkside/components/wishlist';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useProduct, useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import {
  jewelryTypes,
  pdpTypeHandleSingleToPluralAsConst,
  PdpTypePlural,
  pdpTypeSingleToPluralAsConst,
  pdpTypeTitleSingleToPluralHandleAsConst,
} from '@diamantaire/shared/constants';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useContext, useEffect, useMemo, useState } from 'react';

import ProductContentBlocks from './pdp-blocks/ProductContentBlocks';
import ProductReviews from './pdp-blocks/ProductReviews';
import ProductTrioBlocks from './pdp-blocks/ProductTrioBlocks';
import { PageContainerStyles } from './PdpPage.style';

interface PdpPageParams extends ParsedUrlQuery {
  collectionSlug: string;
  productSlug: string;
}
export interface PdpPageProps {
  key: string;
  params: PdpPageParams;
  dehydratedState: DehydratedState;
}

export function PdpPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    params: { collectionSlug, productSlug },
  } = props;

  const { isMobile } = useContext(GlobalContext);

  // General Data - Serverside
  const query = useProduct({ collectionSlug, productSlug });
  const { data: shopifyProductData = {} } = query;
  const router = useRouter();

  // Jewelry | ER | Wedding Band
  const pdpType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[router.pathname.split('/')[1]];

  const { data }: { data: any } = useProductDato(collectionSlug, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct || data?.weddingBandProduct;

  const {
    productDescription,
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    extraOptions,
    diamondDescription,
    productTitle,
    trioBlocks: { id: trioBlocksId = '' } = {},
  } = datoParentProductData || {};

  // Icon List - Clientside
  const productIconListType = datoParentProductData?.productIconList?.productType;

  // Product Instagram Reel - Clientside
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;

  // Product Video Clock - Clientside
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;

  // Variant Specific Data
  const { shopifyCollectionId, productContent, configuration, price } = shopifyProductData;

  const configurations = shopifyProductData?.optionConfigs;

  const assetStack = productContent?.assetStack; // flatten array in normalization

  const variantHandle = productContent?.shopifyProductHandle;

  let { data: additionalVariantData }: any = useProductVariant(variantHandle, router.locale);

  // console.log('init additionalVariantData', additionalVariantData);

  // Fallback for Jewelry Products
  if (!additionalVariantData) {
    additionalVariantData = productContent;
  } else if (additionalVariantData?.omegaProduct) {
    // Wedding bands have a different data structure
    additionalVariantData = additionalVariantData?.omegaProduct;
  } else {
    // Add Shopify Product Data to Dato Product Data
    additionalVariantData = additionalVariantData?.omegaProduct;
    additionalVariantData.goldPurity = shopifyProductData?.configuration?.goldPurity;
    additionalVariantData.bandAccent = shopifyProductData?.configuration?.bandAccent;
    additionalVariantData.ringSize = shopifyProductData?.options?.ringSize;
  }

  // console.log('v2 additionalVariantData', additionalVariantData);

  // use parent product carat if none provided on the variant in Dato
  if (!productContent?.carat || productContent?.carat === '' || !additionalVariantData.caratWeightOverride) {
    if (additionalVariantData.caratWeightOverride) {
      additionalVariantData.carat = additionalVariantData.caratWeightOverride;
    } else {
      additionalVariantData.carat = datoParentProductData?.caratWeight;
    }
  } else {
    additionalVariantData.carat = additionalVariantData.caratWeightOverride;
  }

  additionalVariantData.productType = shopifyProductData.productType;
  additionalVariantData.productTitle = datoParentProductData?.productTitle;
  additionalVariantData.price = price;
  additionalVariantData.image = {
    src: assetStack[0].url,
    width: assetStack[0].width,
    height: assetStack[0].width,
    responsiveImage: {
      src: assetStack[0].url,
      ...assetStack[0].responsiveImage,
    },
  };

  // Can this product be added directly to cart?
  const isBuilderProduct = configuration.caratWeight === 'other' || !configuration.caratWeight;

  const parentProductAttributes = {
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    diamondDescription,
    styles: shopifyProductData?.styles,
    productType: shopifyProductData.productType,
  };
  const variantId = shopifyProductData?.shopifyVariantId;

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

  const breadcrumb = [
    // First option is just for jewelry, and it won't show title is null
    {
      title: isProductJewelry ? 'Jewelry' : null,
      path: isProductJewelry ? '/jewelry' : null,
    },

    {
      title: pdpTypeSingleToPluralAsConst[shopifyProductData?.productType] || shopifyProductData?.productType,
      path: `/${isProductJewelry ? 'jewelry/' : isWeddingBand ? 'wedding-rings/' : ''}${
        pdpTypeTitleSingleToPluralHandleAsConst[shopifyProductData?.productType] || shopifyProductData?.productType
      }`,
    },
    {
      title: productTitle,
      path: '#',
    },
  ];

  console.log('shopifyProductData', shopifyProductData);
  console.log('additionalVariantData', additionalVariantData);

  // Doubles price if product is earrings pair
  const [shouldDoublePrice, setShouldDoublePrice] = useState<boolean>(
    additionalVariantData?.productType.toLowerCase() === 'earrings' || null,
  );

  function filterDuplicates(array) {
    const uniqueMap = new Map();

    // Iterate through the array and update the map with the oldest dateAdded for each unique item
    array.forEach((item) => {
      const existingItem = uniqueMap.get(item.title);

      if (!existingItem || item.dateAdded > existingItem.dateAdded) {
        uniqueMap.set(item.title, item);
      }
    });

    // Convert the map values back to an array
    const uniqueArray = Array.from(uniqueMap.values());

    return uniqueArray;
  }

  function fetchAndTrackPreviouslyViewed() {
    const previouslyViewed = localStorage.getItem('previouslyViewed');
    const date = new Date();

    if (previouslyViewed) {
      let previouslyViewedArray = JSON.parse(previouslyViewed);

      previouslyViewedArray.push({
        title: productTitle,
        slug: variantHandle,
        dateAdded: date.getTime(),
      });

      previouslyViewedArray = filterDuplicates(previouslyViewedArray);

      localStorage.setItem('previouslyViewed', JSON.stringify(previouslyViewedArray));
    } else {
      localStorage.setItem(
        'previouslyViewed',
        JSON.stringify([
          {
            title: productTitle,
            slug: variantHandle,
            dateAdded: date.getTime(),
          },
        ]),
      );
    }
  }

  useEffect(() => {
    if (!productTitle || !variantHandle) return;

    fetchAndTrackPreviouslyViewed();
  }, [productTitle, variantHandle]);

  if (shopifyProductData) {
    const productData = { ...shopifyProductData, cms: additionalVariantData };

    return (
      <PageContainerStyles>
        <Script
          id="klara-script"
          src="https://na-library.klarnaservices.com/lib.js"
          data-client-id="4b79b0e8-c6d3-59da-a96b-2eca27025e8e"
        ></Script>
        <PageViewTracker productData={productData} />
        <Breadcrumb breadcrumb={breadcrumb} />
        <div className="product-container">
          <div className="media-container">
            <MediaGallery
              assets={assetStack}
              options={configuration}
              title={productTitle}
              productType={shopifyProductData?.productType}
              shownWithCtw={additionalVariantData?.shownWithCtw}
              diamondType={configuration.diamondType}
            />
            <MediaSlider assets={assetStack} />
            {isMobile && <WishlistLikeButton extraClass="pdp" productId={`product-${shopifyProductData.productSlug}`} />}
          </div>
          <div className="info-container">
            <div className="info__inner">
              {!isMobile && <WishlistLikeButton extraClass="pdp" productId={`product-${shopifyProductData.productSlug}`} />}
              <ProductTitle
                title={productTitle}
                diamondType={configuration.diamondType}
                productType={shopifyProductData?.productType}
              />
              <ProductPrice
                isBuilderProduct={isBuilderProduct}
                price={price}
                shouldDoublePrice={shouldDoublePrice}
                productType={shopifyProductData?.productType}
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
              />

              <ProductKlarna title={productTitle} currentPrice={shouldDoublePrice ? price : price / 2} />

              <ProductAppointmentCTA />

              <ProductGWP />

              {productIconListType && <ProductIconList productIconListType={productIconListType} locale={router?.locale} />}
              <Form
                title="Need more time to think?"
                caption="Email this customized ring to yourself or drop a hint."
                onSubmit={(e) => e.preventDefault()}
                stackedSubmit={false}
                headingType={'h2'}
              />
              <ProductDescription
                description={productDescription}
                productAttributes={parentProductAttributes}
                variantAttributes={additionalVariantData}
                productSpecId={datoParentProductData?.specLabels?.id}
                title={productTitle}
                selectedConfiguration={configuration}
              />
            </div>
          </div>
        </div>

        {trioBlocksId && <ProductTrioBlocks trioBlocksId={trioBlocksId} />}
        {additionalVariantData?.productSuggestionQuadBlock?.id && (
          <ProductSuggestionBlock id={additionalVariantData?.productSuggestionQuadBlock?.id} />
        )}
        <ProductContentBlocks videoBlockId={videoBlockId} instagramReelId={instagramReelId} />
        <ProductReviews reviewsId={shopifyCollectionId.replace('gid://shopify/Collection/', '')} />
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
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { params, locale } = context;

  const { collectionSlug, productSlug } = context.params;
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
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PdpPage.getTemplate = getStandardTemplate;

export default PdpPage;
