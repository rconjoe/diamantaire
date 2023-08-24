import { ShowDesktopAndUpOnly, ShowMobileOnly } from '@diamantaire/darkside/components/common-ui';
import {
  MediaGallery,
  MediaSlider,
  ProductConfigurator,
  ProductDescription,
  ProductPrice,
  ProductTitle,
} from '@diamantaire/darkside/components/products/pdp';
import { useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import { PdpTypePlural, pdpTypeHandleSingleToPluralAsConst } from '@diamantaire/shared/constants';
import { isEmptyObject } from '@diamantaire/shared/helpers';
import { media } from '@diamantaire/styles/darkside-styles';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
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

const SettingBuildStep = ({ updateSettingSlugs, settingSlugs, shopifyProductData, updateFlowData, flowIndex }) => {
  console.log('inheritted', { settingSlugs });

  console.log('shopifyProductData', shopifyProductData);

  const { collectionSlug, productSlug } = settingSlugs;

  const router = useRouter();

  // Jewelry | ER | Wedding Band
  const pdpType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[router.pathname.split('/')[1]];

  const { data }: { data: any } = useProductDato(collectionSlug, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct;

  const { productDescription, bandWidth, bandDepth, settingHeight, paveCaratWeight, metalWeight, shownWithCtwLabel } =
    datoParentProductData || {};

  // Variant Specfic Data
  const {
    id: initialVariantId,
    parentProductId,
    productContent,
    collectionContent,
    configuration: selectedConfiguration,
    price,
    productType,
  } = shopifyProductData || {};
  const { productTitle } = collectionContent || {};

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = productContent?.assetStack; // flatten array in normalization

  const variantHandle = productContent?.shopifyProductHandle;

  let { data: additionalVariantData }: any = useProductVariant(variantHandle, router.locale);

  if (!isEmptyObject(shopifyProductData)) {
    // Fallback for Jewelry Products
    if (!additionalVariantData) {
      additionalVariantData = productContent;
    } else {
      // Add Shopify Product Data to Dato Product Data
      additionalVariantData = additionalVariantData?.omegaProduct;
      additionalVariantData.goldPurity = shopifyProductData?.options?.goldPurity;
      additionalVariantData.bandAccent = shopifyProductData?.options?.bandAccent;
      additionalVariantData.ringSize = shopifyProductData?.options?.ringSize;
    }

    additionalVariantData.productType = shopifyProductData.productType;
    additionalVariantData.productTitle = productTitle;
    additionalVariantData.price = price;
    additionalVariantData.image = {
      src: assetStack[0].url,
      width: assetStack[0].width,
      height: assetStack[0].width,
      responsiveImage: {
        src: assetStack?.[0]?.url,
        ...assetStack[0].responsiveImage,
      },
    };
  }

  const parentProductAttributes = { bandWidth, bandDepth, settingHeight, paveCaratWeight, metalWeight, shownWithCtwLabel };

  const product = useMemo(() => {
    return {
      productType,
      collectionSlug,
      productSlug,
      title: productTitle,
      price,
    };
  }, [productType, collectionSlug, productSlug, productTitle, price]);

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
            <MediaGallery assets={assetStack} options={selectedConfiguration} title={'WEEE'} disableVideos={true} />
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
            product={{ ...product }}
            // This controls what url updates do to the flow data
            isBuilderFlowOpen={true}
            updateSettingSlugs={updateSettingSlugs}
            updateFlowData={updateFlowData}
            flowIndex={flowIndex}
          />
          <ProductDescription
            description={productDescription}
            productAttributes={{ ...parentProductAttributes }}
            variantAttributes={additionalVariantData}
            productSpecId={datoParentProductData?.specLabels?.id}
          />
        </div>
      </div>
    </SettingBuildStepStyles>
  );
};

export default SettingBuildStep;
