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
  padding: 20px 0 200px;
  .product-container {
    ${media.medium`display: flex;flex-direction: row;`}
    .media-container {
      flex: 1;
      ${media.medium`padding: 0 20px;`}
    }
    .info-container {
      flex: 0 0 550px;
      padding: 0 40px 0 20px;
      overflow: hidden;
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
            <MediaGallery assets={assetStack} options={selectedConfiguration} disableVideos={true} />
          </ShowDesktopAndUpOnly>
          <ShowMobileOnly>
            <MediaSlider assets={assetStack} />
          </ShowMobileOnly>
        </div>

        <div className="info-container">
          <ProductTitle title={product.title} />
          <ProductPrice isBuilderProduct={true} hasMoreThanOneVariant={true} price={product.price} />
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
          />
          <ProductDescription
            description={productDescription}
            productAttributes={parentProductAttributes}
            variantAttributes={additionalVariantData}
            productSpecId={productSpecId}
            title={productTitle}
          />
        </div>
      </div>
    </SettingBuildStepStyles>
  );
};

export default SettingBuildStep;
