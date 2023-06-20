import { ParsedUrlQuery } from 'querystring';

import { Form, ShowDesktopAndUpOnly, ShowMobileOnly } from '@diamantaire/darkside/components/common-ui';
import { MediaGallery, MediaSlider, ProductConfigurator } from '@diamantaire/darkside/components/products/pdp';
import { useProduct, useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { pdpTypeHandleAsConst, PdpTypePlural } from '@diamantaire/shared/constants';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';

import ProductContentBlocks from './pdp-blocks/ProductContentBlocks';
import ProductDescription from './pdp-blocks/ProductDescription';
import ProductIconList from './pdp-blocks/ProductIconList';
import ProductPrice from './pdp-blocks/ProductPrice';
import ProductReviews from './pdp-blocks/ProductReviews';
import { ProductTitle } from './pdp-blocks/ProductTitle';
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
  const router = useRouter();

  // Jewelry | ER | Wedding Band
  const pdpType: PdpTypePlural = pdpTypeHandleAsConst[router.pathname.split('/')[1]];

  const { data }: { data: any } = useProductDato(productSlug, 'en_US', pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct;

  const {
    productDescription,
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    trioBlocks: { id: trioBlocksId = '' } = {},
  } = datoParentProductData || {};

  // Icon List - Clientside
  const productIconListType = datoParentProductData?.productIconList?.productType;

  // Product Instagram Reel - Clientside
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;

  // Product Video Clock - Clientside
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;

  // Variant Specfic Data
  const { id, parentProductId, variantContent, collectionContent, options, price } = shopifyProductData;
  const { productTitle } = collectionContent || {}; // flatten array in normalization

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = variantContent.assetStack; // flatten array in normalization

  const variantHandle = variantContent.shopifyProductHandle;

  let { data: additionalVariantData }: any = useProductVariant(variantHandle, 'en_US');

  // Fallback for Jewelry Products
  if (!additionalVariantData) {
    additionalVariantData = variantContent;
  } else {
    // Add Shopify Product Data to Dato Product Data
    additionalVariantData = additionalVariantData?.omegaProduct;
    additionalVariantData.goldPurity = shopifyProductData?.options?.goldPurity;
    additionalVariantData.bandAccent = shopifyProductData?.options?.bandAccent;
    additionalVariantData.ringSize = shopifyProductData?.options?.ringSize;
  }

  additionalVariantData.productType = shopifyProductData.productType;
  additionalVariantData.productTitle = productTitle;
  additionalVariantData.image = {
    src: assetStack[0].url,
    width: assetStack[0].width,
    height: assetStack[0].width,
  };

  if (shopifyProductData) {
    return (
      <PageContainerStyles>
        <div className="product-container">
          <div className="media-container">
            <ShowDesktopAndUpOnly>
              <MediaGallery assets={assetStack} options={options} title={productTitle} />
            </ShowDesktopAndUpOnly>
            <ShowMobileOnly>
              <MediaSlider assets={assetStack} />
            </ShowMobileOnly>
          </div>
          <div className="info-container">
            <ProductTitle title={productTitle} />
            <ProductPrice price={price} />
            <ProductConfigurator
              configurations={configurations}
              selectedConfiguration={options}
              initialVariantId={id}
              additionalVariantData={additionalVariantData}
            />

            {productIconListType && <ProductIconList productIconListType={productIconListType} locale={'en_US'} />}

            <Form
              title="Need more time to think?"
              caption="Email this customized ring to yourself or drop a hint."
              onSubmit={(e) => e.preventDefault()}
            />

            <ProductDescription
              description={productDescription}
              productAttributes={{ bandWidth, bandDepth, settingHeight, paveCaratWeight, metalWeight, shownWithCtwLabel }}
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
      No data found for product page: {productSlug} {variantSlug}{' '}
    </h1>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<PdpPageParams>,
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200'); // define TTL globally

  const { params } = context;

  const { productSlug, variantSlug } = context.params;
  const queryClient = new QueryClient();
  const dataQuery = queries.products.variant(productSlug, variantSlug);

  const productType: PdpTypePlural = pdpTypeHandleAsConst[context.req.url.split('/')[1]] || null;

  await queryClient.prefetchQuery(dataQuery);
  await queryClient.prefetchQuery({ ...queries.products.serverSideDatoProductInfo(productSlug, 'en_US', productType) });

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
