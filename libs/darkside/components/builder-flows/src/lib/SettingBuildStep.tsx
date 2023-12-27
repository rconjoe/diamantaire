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
  ProductDescription,
  ProductGWP,
  ProductIconList,
  ProductPrice,
  ProductTitle,
} from '@diamantaire/darkside/components/products/pdp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useTranslations } from '@diamantaire/darkside/data/hooks';
import { ENGAGEMENT_RING_PRODUCT_TYPE } from '@diamantaire/shared/constants';
import { isEmptyObject } from '@diamantaire/shared/helpers';
import { MediaAsset, OptionItemProps } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useMemo } from 'react';
import styled from 'styled-components';

const SettingBuildStepStyles = styled(motion.div)`
  height: 100vh;
  overflow-y: scroll;
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
      padding: 0 4rem 0 2rem;
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
  updateFlowData;
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
};

const SettingBuildStep = ({
  updateSettingSlugs,
  shopifyProductData,
  updateFlowData,
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
}: SettingBuildStepProps) => {
  const product = useMemo(() => {
    return {
      title: productTitle,
      price: price,
    };
  }, [productTitle, price]);

  const router = useRouter();

  const { _t } = useTranslations(router.locale);
  const { builderProduct } = useContext(BuilderProductContext);

  // Need this here to not interefere with hooks
  if (isEmptyObject(shopifyProductData)) return null;

  console.log('selectedConfiguration', builderProduct.diamond);

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
        <Heading type="h1" className="primary h2">
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
              presetHandSliderValue={parseFloat(builderProduct.diamond?.carat)}
            />
          </ShowDesktopAndUpOnly>
          <ShowMobileOnly>
            <MediaSlider
              assets={assetStack}
              options={selectedConfiguration}
              diamondType={selectedConfiguration?.diamondType}
              shouldDisplayDiamondHand={shopifyProductData?.productType === ENGAGEMENT_RING_PRODUCT_TYPE}
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

            <ProductPrice isBuilderProduct={true} price={parseFloat(product.price)} engravingText={null} />
            <ProductConfigurator
              configurations={configurations}
              selectedConfiguration={selectedConfiguration}
              variantId={variantId}
              additionalVariantData={additionalVariantData}
              isBuilderFlowOpen={true}
              updateSettingSlugs={updateSettingSlugs}
              settingSlugs={settingSlugs}
              updateFlowData={updateFlowData}
              disableVariantType={disableVariantType}
              variantProductTitle={shopifyProductData?.productTitle}
              requiresCustomDiamond={false}
              productIconListType={productIconListType}
            />

            {/* <ProductKlarna title={productTitle} currentPrice={price} /> */}

            <ProductAppointmentCTA productType={shopifyProductData?.productType} />

            <ProductGWP />

            {productIconListType && <ProductIconList productIconListType={productIconListType} locale={router?.locale} />}
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
    </SettingBuildStepStyles>
  );
};

export default SettingBuildStep;
