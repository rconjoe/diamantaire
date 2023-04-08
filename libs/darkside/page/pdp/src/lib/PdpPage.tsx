import { ParsedUrlQuery } from 'querystring';

import { Form } from '@diamantaire/darkside/components/common-ui';
import { MediaGallery, ProductConfigurator, SpriteSpinnerInit } from '@diamantaire/darkside/components/products/pdp';
import {
  useProduct,
  useProductDato,
  useProductIconList,
  useProductTrioBlock,
  useProductVariant,
} from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React, { PropsWithChildren } from 'react';

import ProductBlocks from './pdp-blocks/ProductBlocks';
import ProductDescription from './pdp-blocks/ProductDescription';
import ProductIconList from './pdp-blocks/ProductIconList';
import ProductReviews from './pdp-blocks/ProductReviews';
import ProductTrioBlocks from './pdp-blocks/ProductTrioBlocks';
import { PageContainerStyles } from './PdpPage.style';

interface PdpPageParams extends ParsedUrlQuery {
  productSlug: string;
  variantSlug: string;
}
export interface PdpPageProps {
  params: PdpPageParams;
  dehydratedState: DehydratedState;
}

export function PdpPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {
    params: { productSlug, variantSlug },
  } = props;

  // General Data - Serverside
  const query = useProduct({ productSlug, variantSlug });
  const { data: shopifyProductData = {} } = query;
  const { data: { engagementRingProduct: datoParentProductData } = {} } = useProductDato(productSlug, 'en_US');
  const {
    productDescription,
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    trioBlocks: { id: trioBlocksId = '' } = {},
  } = datoParentProductData || {};

  // Icon List - Clientside
  const productIconListType = datoParentProductData?.productIconList?.productType;
  const { data: { productIconList } = {} } = useProductIconList(productIconListType, 'en_US');

  // Product Spec - Clientside
  // const productSpecId = datoParentProductData?.specLabels?.id;
  // const { data: productSpecData } = useProductSpec(productSpecId, 'en_US');

  // Product TrioBlocks - Clientside
  const { data: { trioBlock: trioBlocks } = {} } = useProductTrioBlock(trioBlocksId, 'en_US');

  // Product Instagram Reel - Clientside
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;

  // Product Video Clock - Clientside
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;

  // Variant Specfic Data
  const { id, variantContent, collectionContent, options } = shopifyProductData;
  const { productTitle, collectionId } = collectionContent[0]; // flatten array in normalization

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = variantContent?.[0]?.assetStack; // flatten array in normalization

  const variantHandle = variantContent?.[0]?.shopifyProductHandle;

  const { data: { omegaProduct: variantData } = {} } = useProductVariant(variantHandle, 'en_US');

  const { clarity, color, dimensions, origin, shape, shownWithCtw, caratWeightOverride } = variantData || {};

  console.log('shopifyProductData', shopifyProductData);
  console.log('datoData', datoParentProductData);
  console.log('variantHandle', variantHandle);
  // console.log('productSpecData', productSpecData);
  // console.log('productIconListType', productIconListType);
  // console.log('productIconList', productIconList);

  if (shopifyProductData) {
    return (
      <PageContainerStyles>
        <SpriteSpinnerInit />
        <div className="product-container">
          <div className="media-container">
            <MediaGallery assets={assetStack} options={options} />
          </div>
          <div className="info-container">
            <ProductTitle>{productTitle}</ProductTitle>
            <Price>1,900</Price>
            <ProductConfigurator configurations={configurations} selectedConfiguration={options} initialVariantId={id} />

            <ProductIconList items={productIconList?.items} />

            <Form
              title="Need more time to think?"
              caption="Email this customized ring to yourself or drop a hint."
              onSubmit={(e) => e.preventDefault()}
            />

            <ProductDescription
              description={productDescription}
              productAttributes={{ bandWidth, bandDepth, settingHeight, paveCaratWeight, shownWithCtw, metalWeight }}
              variantAttributes={{ clarity, color, dimensions, origin, shape, caratWeightOverride }}
            />
          </div>
        </div>

        <ProductTrioBlocks blocks={trioBlocks?.blocks} />
        <ProductBlocks videoBlockId={videoBlockId} instagramReelId={instagramReelId} />
        <ProductReviews reviewsId={collectionId} />
      </PageContainerStyles>
    );
  }

  return (
    <h1>
      No data found for product page: {productSlug} {variantSlug}{' '}
    </h1>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<PdpPageParams>,
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200'); // define TTL globally

  console.log('context', context);
  const { params } = context;
  const { productSlug, variantSlug } = context.params;
  const queryClient = new QueryClient();
  const dataQuery = queries.products.variant(productSlug, variantSlug);

  await queryClient.prefetchQuery(dataQuery);
  await queryClient.prefetchQuery({ ...queries.products.dato(productSlug, 'en_US') });

  if (!queryClient.getQueryData(dataQuery.queryKey)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PdpPage.getTemplate = getStandardTemplate;

export default PdpPage;

function ProductTitle({ children }: PropsWithChildren) {
  // use product title composition logic;
  return <h1>{children}</h1>;
}

function Price({ children }: PropsWithChildren) {
  return <h2 className="price">Starting at ${children}</h2>;
}
