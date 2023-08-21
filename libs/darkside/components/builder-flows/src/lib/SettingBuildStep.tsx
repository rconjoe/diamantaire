import { ShowDesktopAndUpOnly, ShowMobileOnly } from '@diamantaire/darkside/components/common-ui';
import {
  MediaGallery,
  MediaSlider,
  ProductConfigurator,
  ProductDescription,
  ProductPrice,
  ProductTitle,
} from '@diamantaire/darkside/components/products/pdp';
import { media } from '@diamantaire/styles/darkside-styles';
import { motion } from 'framer-motion';
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

const SettingBuildStep = ({
  assetStack,
  configuration,
  additionalVariantData,
  productAttributes,
  productDescription,
  productSpecId,
  configurations,
  isBuilderProduct,
  selectedConfiguration,
  initialVariantId,
  product,
  updateFlowData,
}) => {
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
            <MediaGallery assets={assetStack} options={configuration} title={'WEEE'} />
          </ShowDesktopAndUpOnly>
          <ShowMobileOnly>
            <MediaSlider assets={assetStack} />
          </ShowMobileOnly>
        </div>

        <div className="info-container">
          <ProductTitle title={product.title} />
          <ProductPrice price={product.price} />
          <ProductConfigurator
            configurations={configurations}
            selectedConfiguration={selectedConfiguration}
            initialVariantId={initialVariantId}
            additionalVariantData={additionalVariantData}
            isBuilderProduct={isBuilderProduct}
            product={{ ...product }}
            isBuilderFlowOpen={true}
            updateFlowData={updateFlowData}
          />
          <ProductDescription
            description={productDescription}
            productAttributes={{ ...productAttributes }}
            variantAttributes={additionalVariantData}
            productSpecId={productSpecId}
          />
        </div>
      </div>
    </SettingBuildStepStyles>
  );
};

export default SettingBuildStep;
