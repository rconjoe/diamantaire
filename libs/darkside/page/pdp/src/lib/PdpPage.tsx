import { ParsedUrlQuery } from 'querystring';

import { Form, ShowDesktopAndUpOnly, ShowMobileOnly } from '@diamantaire/darkside/components/common-ui';
import {
  MediaGallery,
  MediaSlider,
  ProductConfigurator,
  ProductDescription,
  ProductPrice,
  ProductTitle,
  ProductIconList,
} from '@diamantaire/darkside/components/products/pdp';
import { PageViewTracker } from '@diamantaire/darkside/context/analytics';
import { useProduct, useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { pdpTypeHandleSingleToPluralAsConst, PdpTypePlural } from '@diamantaire/shared/constants';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

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

  // General Data - Serverside
  const query = useProduct({ collectionSlug, productSlug });
  const { data: shopifyProductData = {} } = query;
  const router = useRouter();

  // Jewelry | ER | Wedding Band
  const pdpType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[router.pathname.split('/')[1]];

  const { data }: { data: any } = useProductDato(collectionSlug, 'en_US', pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct;

  console.log('datoParentProductData', datoParentProductData);

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
    trioBlocks: { id: trioBlocksId = '' } = {},
  } = datoParentProductData || {};

  // Icon List - Clientside
  const productIconListType = datoParentProductData?.productIconList?.productType;

  // Product Instagram Reel - Clientside
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;

  // Product Video Clock - Clientside
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;

  // Variant Specific Data
  const { parentProductId, productContent, collectionContent, configuration, price } = shopifyProductData;
  const { productTitle } = collectionContent || {}; // flatten array in normalization

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = productContent.assetStack; // flatten array in normalization

  const variantHandle = productContent.shopifyProductHandle;

  let { data: additionalVariantData }: any = useProductVariant(variantHandle, 'en_US');

  console.log('additionalVariantData', additionalVariantData);
  console.log('productContent.carat', productContent.carat);

  // Fallback for Jewelry Products
  if (!additionalVariantData) {
    additionalVariantData = productContent;
  } else {
    // Add Shopify Product Data to Dato Product Data
    additionalVariantData = additionalVariantData?.omegaProduct;
    additionalVariantData.goldPurity = shopifyProductData?.configuration?.goldPurity;
    additionalVariantData.bandAccent = shopifyProductData?.configuration?.bandAccent;
    additionalVariantData.ringSize = shopifyProductData?.options?.ringSize;
  }

  // use parent product carat if none provided on the variant in Dato
  if (!productContent.carat || productContent.carat === '' || !additionalVariantData.caratWeightOverride) {
    if (additionalVariantData.caratWeightOverride) {
      additionalVariantData.carat = additionalVariantData.caratWeightOverride;
    } else {
      additionalVariantData.carat = datoParentProductData?.caratWeight;
    }
  } else {
    additionalVariantData.carat = additionalVariantData.caratWeightOverride;
  }

  additionalVariantData.productType = shopifyProductData.productType;
  additionalVariantData.productTitle = productTitle;
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
  const isBuilderProduct = configuration.caratWeight === 'other';

  const parentProductAttributes = {
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    diamondDescription,
  };
  const variantId = shopifyProductData?.variants[0]?.shopifyVariantId;

  console.log('shopifyProductData', shopifyProductData);

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

  if (shopifyProductData) {
    const productData = { ...shopifyProductData, cms: additionalVariantData };

    return (
      <PageContainerStyles>
        <PageViewTracker productData={productData} />
        <div className="product-container">
          <div className="media-container">
            <ShowDesktopAndUpOnly>
              <MediaGallery assets={assetStack} options={configuration} title={productTitle} />
            </ShowDesktopAndUpOnly>
            <ShowMobileOnly>
              <MediaSlider assets={assetStack} />
            </ShowMobileOnly>
          </div>
          <div className="info-container">
            <ProductTitle title={productTitle} />
            <ProductPrice price={price} hasMoreThanOneVariant={hasMoreThanOneVariant} />

            <ProductConfigurator
              configurations={configurations}
              selectedConfiguration={configuration}
              variantId={variantId}
              additionalVariantData={additionalVariantData}
              isBuilderProduct={isBuilderProduct}
              isBuilderFlow={false}
              hasMoreThanOneVariant={hasMoreThanOneVariant}
              extraOptions={extraOptions}
            />

            {productIconListType && <ProductIconList productIconListType={productIconListType} locale={'en_US'} />}

            <Form
              title="Need more time to think?"
              caption="Email this customized ring to yourself or drop a hint."
              onSubmit={(e) => e.preventDefault()}
            />

            <ProductDescription
              description={productDescription}
              productAttributes={parentProductAttributes}
              variantAttributes={additionalVariantData}
              productSpecId={datoParentProductData?.specLabels?.id}
            />
          </div>
        </div>

        {trioBlocksId && <ProductTrioBlocks trioBlocksId={trioBlocksId} />}
        <ProductContentBlocks videoBlockId={videoBlockId} instagramReelId={instagramReelId} />
        <ProductReviews reviewsId={parentProductId} />
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
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200'); // define TTL globally

  const { params, locale } = context;

  const { collectionSlug, productSlug } = context.params;
  const queryClient = new QueryClient();
  const dataQuery = queries.products.variant(collectionSlug, productSlug);

  const productType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[context.req.url.split('/')[1]] || null;

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
