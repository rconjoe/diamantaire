import {
  Form,
  Heading,
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
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { ENGAGEMENT_RING_PRODUCT_TYPE } from '@diamantaire/shared/constants';
import { generatePdpAssetAltTag, isEmptyObject } from '@diamantaire/shared/helpers';
import { MediaAsset, OptionItemProps } from '@diamantaire/shared/types';
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

type SettingBuildStepProps = {
  updateSettingSlugs;
  shopifyProductData;
  parentProductAttributes: object;
  assetStack: MediaAsset[];
  selectedConfiguration: {
    [key: string]: string;
  };
  configurations: { [key: string]: OptionItemProps[] };
  variantId: string;
  additionalVariantData: Record<string, string>;
  productTitle: string;
  price: string;
  productDescription: string;
  productSpecId: string;
  disableVariantType?: string[];
  productTitleOverride?: string;
  productIconListType?: string;
  settingSlugs: {
    collectionSlug: string;
    productSlug: string;
  };
  contentIds: {
    productSuggestionBlockId: string;
    trioBlocksId: string;
    videoBlockId: string;
    instagramReelId: string;
    shopifyCollectionId: string;
  };
};

const SettingBuildStep = ({
  updateSettingSlugs,
  shopifyProductData,
  parentProductAttributes,
  assetStack,
  selectedConfiguration,
  configurations,
  variantId,
  additionalVariantData,
  productTitle,
  price,
  productDescription,
  productSpecId,
  disableVariantType,
  productTitleOverride,
  productIconListType,
  settingSlugs,
  contentIds,
}: SettingBuildStepProps) => {
  const { builderProduct } = useContext(BuilderProductContext);

  const { productSuggestionBlockId, trioBlocksId, shopifyCollectionId, instagramReelId, videoBlockId } = contentIds || {};

  const [totalPrice, setTotalPrice] = useState(null);

  const product = useMemo(() => {
    return {
      title: productTitle,
      price: price,
    };
  }, [productTitle, price]);

  const router = useRouter();

  const CFY_RETURN_THRESHOLD = 5.1;

  const { _t } = useTranslations(router.locale);
  const productMediaAltDescription = generatePdpAssetAltTag({
    productTitle,
    productConfiguration: shopifyProductData?.configuration,
    _t,
  });

  const isDiamondCFY = builderProduct?.diamonds?.filter((diamond) => diamond?.slug === 'cto-diamonds').length > 0;

  useEffect(() => {
    if (!builderProduct?.diamonds) return;
    // Calculate the total price
    let total = builderProduct?.diamonds?.reduce((sum, item) => sum + item.price, 0);

    total = total + parseFloat(product.price);

    setTotalPrice(total);
  }, [builderProduct?.diamonds]); // Recalculate if items change

  const sliderHandCaption = useMemo(() => {
    const textArray = builderProduct?.diamonds?.map((diamond) => {
      const { carat } = diamond;

      return `${carat}ct`;
    });

    return textArray?.join(' | ');
  }, [builderProduct?.diamonds]);

  // Need this here to not interefere with hooks
  if (isEmptyObject(shopifyProductData)) return null;

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
              disableVideos={true}
              productType={shopifyProductData?.productType}
              shownWithCtw={additionalVariantData?.shownWithCtw}
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
              shownWithCtw={additionalVariantData?.shownWithCtw}
              presetHandSliderValue={parseFloat(sliderHandCaption)}
              disableHandSliderControls={true}
            />
          </ShowMobileOnly>
        </div>

        <div className="info-container">
          <div className="info__inner">
            <ProductTitle
              title={product?.title}
              diamondType={selectedConfiguration?.diamondType}
              productType={shopifyProductData?.productType}
              override={productTitleOverride}
            />

            <ProductPrice isBuilderProduct={false} price={parseFloat(totalPrice)} engravingText={null} />
            <ProductConfigurator
              configurations={configurations}
              selectedConfiguration={selectedConfiguration}
              variantId={variantId}
              additionalVariantData={additionalVariantData}
              isBuilderFlowOpen={true}
              updateSettingSlugs={updateSettingSlugs}
              settingSlugs={settingSlugs}
              disableVariantType={disableVariantType}
              variantProductTitle={shopifyProductData?.productTitle}
              requiresCustomDiamond={false}
              productIconListType={productIconListType}
              setProductSlug={(val) => updateSettingSlugs({ productSlug: val })}
            />

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
              variantAttributes={additionalVariantData}
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

export default SettingBuildStep;
