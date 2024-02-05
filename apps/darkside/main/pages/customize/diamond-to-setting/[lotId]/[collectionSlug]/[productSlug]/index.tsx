import { BuilderFlowLoader } from '@diamantaire/darkside/components/builder-flows';
import {
  Form,
  Heading,
  HideTopBar,
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
import { useProductDato, useTranslations } from '@diamantaire/darkside/data/hooks';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { ENGAGEMENT_RING_PRODUCT_TYPE, PdpTypePlural } from '@diamantaire/shared/constants';
import { generatePdpAssetAltTag, isEmptyObject } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

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
    collectionContent,
    configuration: selectedConfiguration,
    price,
    // defaultRingSize,
  } = shopifyProductData || {};

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = productContent?.assetStack; // flatten array in normalization
  const variantId = shopifyProductData?.shopifyVariantId;

  console.log('assetStack', assetStack);

  const pdpType: PdpTypePlural = shopifyProductData?.productType?.replace('Engagement Ring', 'Engagement Rings');

  const { data }: { data: any } = useProductDato(shopifyProductData?.collectionSlug as string, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct;

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
  const productIconListType = datoParentProductData?.productIconList?.productType;
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;
  const productSuggestionBlockId = shopifyProductData?.variantDetails?.productSuggestionQuadBlock?.id;
  const shopifyCollectionId = shopifyProductData?.shopifyCollectionId;

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

  console.log('router?.query', router?.query);

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

    console.log('productResponse', productResponse);

    setShopifyProductData(productResponse);

    // updateFlowData('ADD_PRODUCT', productResponse);

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

  useEffect(() => {
    if (!builderProduct?.diamonds) return;
    // Calculate the total price
    let total = builderProduct?.diamonds?.reduce((sum, item) => sum + item.price, 0);

    console.log('total', total);

    total = total + parseFloat(product.price);

    setTotalPrice(total);
  }, [builderProduct?.diamonds, price]); // Recalculate if items change

  useEffect(() => {
    if (router?.query?.productSlug && router?.query?.collectionSlug) {
      getSettingProduct();
    }
  }, [router?.query?.productSlug, router?.query?.collectionSlug]);

  // Need this here to not interefere with hooks
  if (isEmptyObject(shopifyProductData)) return null;

  if (!shopifyProductData) return <BuilderFlowLoader />;

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
      <HideTopBar />
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
            <ProductTitle
              title={productTitle}
              diamondType={selectedConfiguration?.diamondType}
              productType={shopifyProductData?.productType}
              override={productTitleOverride}
            />

            <ProductPrice isBuilderProduct={false} price={parseFloat(totalPrice)} engravingText={null} />
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
                productIconListType={productIconListType}
                locale={router?.locale}
                isCfy={isDiamondCFY}
                isCaratLessThanFive={parseFloat(builderProduct?.diamonds?.[0]?.carat) < CFY_RETURN_THRESHOLD}
              />
            )}

            <Form
              title={_t('Need more time to think?')}
              caption={_t('Email this customized ring to yourself or drop a hint.')}
              onSubmit={(e) => e.preventDefault()}
              stackedSubmit={false}
              headingType={'h2'}
            />

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
