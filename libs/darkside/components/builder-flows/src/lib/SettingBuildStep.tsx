import { ShowDesktopAndUpOnly, ShowMobileOnly } from '@diamantaire/darkside/components/common-ui';
import {
  MediaGallery,
  MediaSlider,
  ProductConfigurator,
  ProductDescription,
  ProductPrice,
  ProductTitle,
} from '@diamantaire/darkside/components/products/pdp';
import { isEmptyObject } from '@diamantaire/shared/helpers';
import { MediaAsset, OptionItemProps } from '@diamantaire/shared/types';
import { media } from '@diamantaire/styles/darkside-styles';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import styled from 'styled-components';

const SettingBuildStepStyles = styled(motion.div)`
  height: 100vh;
  overflow-y: scroll;
  padding: 2rem 0 20rem;
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
  flowIndex: number;
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
  productTitleOverride;
};

const SettingBuildStep = ({
  updateSettingSlugs,
  shopifyProductData,
  updateFlowData,
  flowIndex,
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
}: SettingBuildStepProps) => {
  const product = useMemo(() => {
    return {
      title: productTitle,
      price: price,
    };
  }, [productTitle, price]);

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
      <div className="product-container">
        <div className="media-container">
          <ShowDesktopAndUpOnly>
            <MediaGallery
              assets={assetStack}
              options={selectedConfiguration}
              disableVideos={true}
              productType={shopifyProductData?.productType}
              shownWithCtw={additionalVariantData?.shownWithCtw}
            />
          </ShowDesktopAndUpOnly>
          <ShowMobileOnly>
            <MediaSlider assets={assetStack} />
          </ShowMobileOnly>
        </div>

        <div className="info-container">
          <div className="info__inner">
            <ProductTitle
              title={product.title}
              diamondType={selectedConfiguration?.diamondType}
              productType={shopifyProductData?.productType}
              override={productTitleOverride}
            />
            <ProductPrice isBuilderProduct={true} price={parseFloat(product.price)} engravingText={false} />
            <ProductConfigurator
              configurations={configurations}
              selectedConfiguration={selectedConfiguration}
              variantId={variantId}
              additionalVariantData={additionalVariantData}
              isBuilderFlowOpen={true}
              updateSettingSlugs={updateSettingSlugs}
              updateFlowData={updateFlowData}
              flowIndex={flowIndex}
              disableVariantType={disableVariantType}
              variantProductTitle={shopifyProductData?.productTitle}
              requiresCustomDiamond={false}
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
