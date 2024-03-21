import { PageViewTracker } from '@diamantaire/analytics';
import { BuilderFlowLoader } from '@diamantaire/darkside/components/builder-flows';
import {
  Heading,
  NeedTimeToThinkForm,
  ProductAppointmentCTA,
  ShowDesktopAndUpOnly,
  ShowMobileOnly,
  UIString,
} from '@diamantaire/darkside/components/common-ui';
import {
  MediaGallery,
  MediaSlider,
  ProductConfigurator,
  ProductContentBlocks,
  ProductDescription,
  ProductGWP,
  ProductIconList,
  ProductPrice,
  ProductReviews,
  ProductSuggestionBlock,
  ProductTitle,
  ProductTrioBlocks,
} from '@diamantaire/darkside/components/products/pdp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { fetchDatoVariant } from '@diamantaire/darkside/data/api';
import {
  useBuilderFlowSeo,
  useProductDato,
  useProductSkusVariants,
  useTranslations,
} from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { ENGAGEMENT_RING_PRODUCT_TYPE, PdpTypePlural, parseValidLocale } from '@diamantaire/shared/constants';
import { generatePdpAssetAltTag, isEmptyObject } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

const LOAD_TANGIBLE_SCRIPT_LOCATION = ['en-US', 'en-GB'];
const LOAD_TANGIBLE_SCRIPT_PRODUCT_TYPE = ['Wedding Band', 'Engagement Ring'];
const TANGIBLE_SCRIPT_URL = process.env['NEXT_PUBLIC_VERCEL_ENV'] === 'production' ? 'revision_1' : 'revision_2';

const SettingBuildStepStyles = styled(motion.div)`
  padding: 2rem 0 20rem;

  .nav-title {
    padding-bottom: 4rem;
  }

  .product-container {
    margin-bottom: 6rem;
    ${media.medium`display: flex;flex-direction: row;`}
    .media-container {
      flex: 1;
      ${media.medium`padding: 0 2rem;`}
    }
    .info-container {
      flex: 0 0 55rem;
      padding: 0 2.4rem 0;
      overflow: hidden;

      .info__inner {
        max-width: 450px;
        margin: 0 auto;
      }
    }
  }
`;

const SettingBuildStep = () => {
  const [shopifyProductData, setShopifyProductData] = useState(null);
  const { builderProduct, updateFlowData } = useContext(BuilderProductContext);

  const [totalPrice, setTotalPrice] = useState(null);

  const { locale } = useRouter();
  const { data: seoData } = useBuilderFlowSeo(locale);
  const { seoTitle, seoDescription } = seoData?.builderFlow?.seoFields || {};
  const { languageCode } = parseValidLocale(locale);

  const router = useRouter();

  const CFY_RETURN_THRESHOLD = 5.1;

  const { _t } = useTranslations(router.locale);

  const isDiamondCFY =
    builderProduct?.diamonds && builderProduct?.diamonds?.filter((diamond) => diamond?.slug === 'cto-diamonds').length > 0;

  const sliderHandCaption = useMemo(() => {
    const textArray = builderProduct?.diamonds?.map((diamond) => {
      const { carat } = diamond;

      return `${carat}ct`;
    });

    return textArray?.join(' | ');
  }, [builderProduct?.diamonds]);

  // ======= MIGRATED =========

  const {
    productContent,
    configuration: selectedConfiguration,
    price,
    // defaultRingSize,
  } = shopifyProductData || {};

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = productContent?.assetStack; // flatten array in normalization
  const variantId = shopifyProductData?.shopifyVariantId;

  const pdpType: PdpTypePlural = shopifyProductData?.productType?.replace('Engagement Ring', 'Engagement Rings');

  const { data }: { data: any } = useProductDato(shopifyProductData?.collectionSlug as string, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct;

  const { data: variantsSkusProduct } = useProductSkusVariants(shopifyProductData?.collectionSlug);

  const {
    productDescription,
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    productTitle,
    productTitleOverride,
    trioBlocks: { id: trioBlocksId = '' } = {},
  } = datoParentProductData || {};

  const productSpecId = datoParentProductData?.specLabels?.id;
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;
  const productSuggestionBlockId = shopifyProductData?.variantDetails?.productSuggestionQuadBlock?.id;
  const shopifyCollectionId = shopifyProductData?.shopifyCollectionId;
  const productIconListType = datoParentProductData?.productIconList?.productType;

  const productIconListTypeOverride =
    shopifyProductData?.variantDetails?.productIconList?.productType ||
    shopifyProductData?.variantDetails?.configuration?.productIconList?.productType;

  const parentProductAttributes = {
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    styles: shopifyProductData?.styles,
    productType: shopifyProductData?.productType,
  };

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

        return {
          ...res,
          variantDetails: variant?.omegaProduct,
        };
      })
      .catch((e) => {
        console.log('getPdpProduct error', e);
      });

    setShopifyProductData(productResponse);

    // updateFlowData('ADD_PRODUCT', productResponse);
    initializeVraiProductData(productResponse.sku);

    return productResponse;
  }

  const product = useMemo(() => {
    return {
      title: productTitle,
      price: price,
    };
  }, [productTitle, price]);

  const productMediaAltDescription = generatePdpAssetAltTag({
    productTitle,
    productConfiguration: shopifyProductData?.configuration,
    _t,
  });

  const initializeVraiProductData = (currentSKU) => {
    window['vraiProduct'] = {
      currentSKU: currentSKU,
    };
  };

  useEffect(() => {
    if (!builderProduct?.diamonds) return;
    // Calculate the total price
    let total = builderProduct?.diamonds?.reduce((sum, item) => sum + item.price, 0);

    total = total + parseFloat(product.price);

    setTotalPrice(total);
  }, [builderProduct?.diamonds, price]); // Recalculate if items change

  useEffect(() => {
    if (router?.query?.productSlug && router?.query?.collectionSlug) {
      getSettingProduct();
    }
  }, [router?.query?.productSlug, router?.query?.collectionSlug]);

  useEffect(() => {
    window['vraiProduct'] = {
      currentSKU: window['vraiProduct']?.currentSKU,
      variants: variantsSkusProduct,
    };
  }, [variantsSkusProduct]);

  // Need this here to not interefere with hooks
  if (isEmptyObject(shopifyProductData)) return null;

  if (!shopifyProductData) return <BuilderFlowLoader />;

  const productData = {
    ...shopifyProductData,
    cms: {
      ...shopifyProductData?.variantDetails,
      image: {
        src: assetStack[0].url,
        width: assetStack[0].width,
        height: assetStack[0].width,
        responsiveImage: {
          src: assetStack[0].url,
          ...assetStack[0].responsiveImage,
        },
      },
    },
  };

  const loadTangibleScript = () => {
    return (
      LOAD_TANGIBLE_SCRIPT_LOCATION.includes(router.locale) &&
      LOAD_TANGIBLE_SCRIPT_PRODUCT_TYPE.includes(shopifyProductData?.productType)
    );
  };

  return (
    <SettingBuildStepStyles
      key="setting-step-container"
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
      {loadTangibleScript() && (
        <Script
          async
          src={`https://cdn.tangiblee.com/integration/5.0/managed/www.vrai.com/${TANGIBLE_SCRIPT_URL}/variation_original/tangiblee-bundle.min.js`}
          strategy="afterInteractive"
        />
      )}
      <NextSeo title={seoTitle} description={seoDescription} nofollow={true} noindex={true} />
      <PageViewTracker productData={productData} />
      <div className="nav-title container-wrapper">
        <Heading type="h1" className="primary h2 text-center">
          <UIString>Complete your ring</UIString>
        </Heading>
      </div>
      <div className="product-container">
        <div className="media-container">
          <ShowDesktopAndUpOnly>
            <MediaGallery
              assets={assetStack}
              options={selectedConfiguration}
              productType={shopifyProductData?.productType}
              shownWithCtw={shopifyProductData?.variantDetails?.shownWithCtw}
              diamondType={selectedConfiguration?.diamondType}
              disableHandSliderControls={true}
              presetHandSliderValue={parseFloat(sliderHandCaption)}
              title={productMediaAltDescription || productTitle || ''}
              shouldDisplayDiamondHand={shopifyProductData?.productType === ENGAGEMENT_RING_PRODUCT_TYPE}
            />
          </ShowDesktopAndUpOnly>
          <ShowMobileOnly>
            <MediaSlider
              title={productMediaAltDescription || productTitle}
              assets={assetStack}
              options={selectedConfiguration}
              diamondType={selectedConfiguration?.diamondType}
              shouldDisplayDiamondHand={shopifyProductData?.productType === ENGAGEMENT_RING_PRODUCT_TYPE}
              productType={shopifyProductData?.productType}
              shownWithCtw={shopifyProductData?.variantDetails?.shownWithCtw}
              presetHandSliderValue={parseFloat(sliderHandCaption)}
              disableHandSliderControls={true}
            />
          </ShowMobileOnly>
        </div>

        <div className="info-container">
          <div className="info__inner">
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

            <ProductPrice
              isBuilderProduct={false}
              price={parseFloat(totalPrice)}
              engravingText={null}
              quantity={shopifyProductData?.isSoldAsDouble ? 2 : 1}
            />
            {shopifyProductData?.variantDetails && (
              <ProductConfigurator
                configurations={configurations}
                selectedConfiguration={selectedConfiguration}
                variantId={variantId}
                additionalVariantData={shopifyProductData?.variantDetails}
                isBuilderFlowOpen={true}
                updateSettingSlugs={() => console.log('updateSettingSlugs')}
                disableVariantType={['diamondType', 'ringSize', 'caratWeight']}
                variantProductTitle={shopifyProductData?.productTitle}
                requiresCustomDiamond={false}
                productIconListType={productIconListType}
                setProductSlug={(val) => updateFlowData('UPDATE_TEMP_SETTINGS', { productSlug: val })}
              />
            )}

            {/* <ProductKlarna title={productTitle} currentPrice={price} /> */}

            <ProductAppointmentCTA productType={shopifyProductData?.productType} />

            <ProductGWP />

            {productIconListType && (
              <ProductIconList
                productIconListType={productIconListTypeOverride ? productIconListTypeOverride : productIconListType}
                locale={router?.locale}
                isCfy={isDiamondCFY}
                isCaratLessThanFive={parseFloat(builderProduct?.diamonds?.[0]?.carat) < CFY_RETURN_THRESHOLD}
                productType={shopifyProductData?.productType}
              />
            )}

            {productData && <NeedTimeToThinkForm productData={productData} />}

            <ProductDescription
              description={productDescription}
              productAttributes={parentProductAttributes}
              variantAttributes={shopifyProductData?.variantDetails}
              productSpecId={productSpecId}
              title={productTitle}
              selectedConfiguration={selectedConfiguration}
            />
          </div>
        </div>
      </div>

      {trioBlocksId && <ProductTrioBlocks trioBlocksId={trioBlocksId} />}

      {productSuggestionBlockId && <ProductSuggestionBlock id={productSuggestionBlockId} />}

      {shopifyProductData?.productType === 'Engagement Ring' && (
        <ProductContentBlocks videoBlockId={videoBlockId} instagramReelId={instagramReelId} />
      )}

      {shopifyCollectionId && <ProductReviews reviewsId={shopifyCollectionId.replace('gid://shopify/Collection/', '')} />}
    </SettingBuildStepStyles>
  );
};

SettingBuildStep.getTemplate = getStandardTemplate;
export default SettingBuildStep;

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
