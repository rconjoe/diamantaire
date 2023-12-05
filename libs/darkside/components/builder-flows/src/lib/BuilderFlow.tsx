import { Loader } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import { PdpTypePlural, pdpTypeHandleSingleToPluralAsConst } from '@diamantaire/shared/constants';
import { isEmptyObject, removeUrlParameter, updateUrlParameter } from '@diamantaire/shared/helpers';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import DiamondBuildStep from './DiamondBuildStep';
import ReviewBuildStep from './ReviewBuildStep';
import SettingBuildStep from './SettingBuildStep';
import SettingSelectStep from './SettingSelectStep';

const BuilderFlowStyles = styled.div`
  .loader-container {
    &.full-width {
      position: fixed;
      height: 84.5vh;
      width: 100%;
      background: #fff;
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .custom-builder-message {
    background-color: #000;
    display: flex;
    padding: 1rem 0;
    text-align: center;
    justify-content: center;
    position: relative;
    .logo {
      position: absolute;
      left: 2rem;
      svg {
        fill: #fff;
        width: 6rem;
        height: auto;
      }
    }
    p {
      margin: 0;
      color: #fff;
      text-align: center;
      font-size: 1.5rem;
    }
    ul {
      position: absolute;
      top: 0.9rem;
      right: 2rem;
      margin: 0 auto;
      padding: 0;

      li {
        button {
          font-weight: 400;
          font-size: 1.4rem;
        }
      }
    }
  }

  > .loader-container {
    min-height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FooterSpacing = createGlobalStyle`
  footer {
    margin-bottom: 12rem;
  }
`;

type BuilderFlowProps = {
  collectionSlug?: string;
  productSlug?: string;
  lotId?: string;
  type: 'setting-to-diamond' | 'diamond-to-setting';
  initialStep: number;
};

const BuilderFlow = ({
  collectionSlug: initialCollectionSlug,
  productSlug: initialProductSlug,
  lotId: initialLotId,
  type,
  initialStep,
}: BuilderFlowProps) => {
  const [settingSlugs, setSettingSlugs] = useState({
    collectionSlug: initialCollectionSlug,
    productSlug: initialProductSlug,
  });

  // These act as flags to prevent the flow from running multiple times when the page loads. Pre-poulates setting + diamond data on page load, and that should only happen once.
  const [initDiamond, setInitDiamond] = useState(false);
  const [initProduct, setInitProduct] = useState(false);

  const { builderProduct, updateFlowData } = useContext(BuilderProductContext);
  const currentStep = builderProduct.step;

  const [shopifyProductData, setShopifyProductData] = useState(null);
  const router = useRouter();

  // console.log('init flow', initialLotId, initialCollectionSlug, initialProductSlug, type);

  function updateSettingSlugs(value: object) {
    setSettingSlugs({
      ...settingSlugs,
      ...value,
    });
  }

  // Jewelry | ER | Wedding Band
  const pdpType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[router.pathname.split('/')[1]];

  const { data }: { data: any } = useProductDato(settingSlugs?.collectionSlug, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct || data?.jewelryProduct;

  const { productDescription, bandWidth, bandDepth, settingHeight, paveCaratWeight, metalWeight, shownWithCtwLabel } =
    datoParentProductData || {};

  // Variant Specific Data
  const {
    productContent,
    collectionContent,
    configuration: selectedConfiguration,
    price,
    defaultRingSize,
  } = shopifyProductData || {};
  const { productTitle, productTitleOverride } = collectionContent || {};

  console.log('shopifyProductData', shopifyProductData);

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = productContent?.assetStack; // flatten array in normalization

  const variantHandle = productContent?.shopifyProductHandle;

  let { data: additionalVariantData }: any = useProductVariant(variantHandle, router.locale);

  if (!isEmptyObject(shopifyProductData) && shopifyProductData !== null && !shopifyProductData.error) {
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
    additionalVariantData.defaultRingSize = defaultRingSize;
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

  const productSpecId = datoParentProductData?.specLabels?.id;

  async function getPdpProduct() {
    const qParams = new URLSearchParams({
      slug: settingSlugs?.collectionSlug,
      id: settingSlugs?.productSlug,
    }).toString();

    const response = await fetch(`/api/pdp/getPdpProduct?${qParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((e) => {
        console.log('getPdpProduct error', e);
      });

    setShopifyProductData(response);
  }

  async function getDiamond() {
    const qParams = new URLSearchParams({
      lotId: initialLotId,
    }).toString();
    const diamondResponse = await fetch(`/api/diamonds/getDiamondByLotId?${qParams}`, {})
      .then((res) => res.json())
      .then((res) => res);

    updateFlowData('ADD_DIAMOND', diamondResponse);
  }

  async function fetchProductAndDiamond() {
    if (
      (settingSlugs?.collectionSlug && settingSlugs?.productSlug) ||
      (initialCollectionSlug && initialProductSlug && !initProduct)
    ) {
      //  setInitProduct(true) has to be set after the variant data loads
      await getPdpProduct();
    }

    // Only run on load
    if (initialLotId && !initDiamond) {
      setInitDiamond(true);
      await getDiamond();
    }
  }

  useEffect(() => {
    fetchProductAndDiamond();
  }, [settingSlugs]);

  // This pulls in a pre-existing product if it exists on the initial URL - only for setting-to-diamond
  useEffect(() => {
    if (additionalVariantData && selectedConfiguration && !initProduct) {
      setInitProduct(true);
      updateFlowData('ADD_PRODUCT', { ...additionalVariantData, ...selectedConfiguration, variantId });
    }
  }, [additionalVariantData, selectedConfiguration, shopifyProductData]);

  useEffect(() => {
    // Initializes all data based on the server-side props

    // Initial Step - looks for step param, and uses logic to guess when one isn't present
    updateFlowData('UPDATE_STEP', { step: initialStep });

    // Flow Type - Sometimes type might not be in url, this makes sure it's always there based on the collectiongSlug and productSlug that come back from getServersideProps
    updateUrlParameter('type', type);
    updateFlowData('UPDATE_FLOW_TYPE', {
      flowType: type,
    });

    if (type === 'diamond-to-setting') {
      // if there are params for later steps but not the first step, remove them
      if (!initialLotId && initialCollectionSlug && initialProductSlug) {
        removeUrlParameter('collectionSlug');
        removeUrlParameter('productSlug');
      }
    }

    // Product + variant by productSlug + collectionSlug
    fetchProductAndDiamond();
  }, []);

  // const steps = useMemo(() => {
  //   return {
  //     'setting-to-diamond': [
  //       {
  //         title: 'Customize a setting',
  //         enabled: true,
  //       },
  //       {
  //         title: 'Choose a diamond',
  //         enabled: builderProduct?.product,
  //       },
  //       {
  //         title: 'Review and Purchase',
  //         enabled: builderProduct?.diamond && builderProduct?.product,
  //       },
  //     ],
  //     'diamond-to-setting': [
  //       {
  //         title: 'Choose a diamond',
  //         enabled: true,
  //       },
  //       {
  //         title: 'Choose a setting',
  //         enabled: builderProduct?.diamond,
  //       },
  //       {
  //         title: 'Customize a setting',
  //         enabled: builderProduct?.diamond && settingSlugs?.collectionSlug,
  //       },
  //       {
  //         title: 'Review and Purchase',
  //         enabled: builderProduct?.diamond && builderProduct?.product,
  //       },
  //     ],
  //   };
  // }, [builderProduct, settingSlugs]);

  const variantId = shopifyProductData?.shopifyVariantId;

  return (
    <BuilderFlowStyles>
      <FooterSpacing />
      <AnimatePresence>
        {!shopifyProductData && !builderProduct.diamond && !builderProduct.product && (
          <div className="loader-container full-width">
            <Loader color="#000" />
          </div>
        )}
        {type === 'setting-to-diamond' ? (
          currentStep === 0 ? (
            shopifyProductData && (
              <SettingBuildStep
                flowIndex={0}
                updateFlowData={updateFlowData}
                shopifyProductData={shopifyProductData}
                updateSettingSlugs={updateSettingSlugs}
                configurations={configurations}
                assetStack={assetStack}
                variantId={variantId}
                selectedConfiguration={selectedConfiguration}
                additionalVariantData={additionalVariantData}
                productDescription={productDescription}
                productTitle={productTitle}
                price={price}
                productSpecId={productSpecId}
                parentProductAttributes={parentProductAttributes}
                disableVariantType={['caratWeight', 'ringSize']}
                productTitleOverride={productTitleOverride}
              />
            )
          ) : currentStep === 1 ? (
            <DiamondBuildStep
              flowIndex={1}
              diamondTypeToShow={builderProduct?.product?.diamondType}
              hideFilters={['diamondType']}
            />
          ) : currentStep === 2 ? (
            builderProduct.product &&
            builderProduct.diamond && (
              <ReviewBuildStep
                settingSlugs={settingSlugs}
                type={type}
                configurations={configurations}
                variantProductTitle={shopifyProductData?.productTitle}
                selectedConfiguration={selectedConfiguration}
              />
            )
          ) : null
        ) : currentStep === 0 ? (
          <DiamondBuildStep flowIndex={0} diamondTypeToShow="round-brilliant" />
        ) : currentStep === 1 ? (
          <SettingSelectStep
            flowIndex={1}
            updateSettingSlugs={updateSettingSlugs}
            settingTypeToShow={builderProduct?.diamond?.diamondType}
          />
        ) : currentStep === 2 ? (
          shopifyProductData ? (
            <SettingBuildStep
              flowIndex={2}
              updateFlowData={updateFlowData}
              shopifyProductData={shopifyProductData}
              updateSettingSlugs={updateSettingSlugs}
              configurations={configurations}
              assetStack={assetStack}
              variantId={variantId}
              selectedConfiguration={selectedConfiguration}
              additionalVariantData={additionalVariantData}
              productDescription={productDescription}
              productTitle={productTitle}
              price={price}
              productSpecId={productSpecId}
              parentProductAttributes={parentProductAttributes}
              disableVariantType={['diamondType', 'ringSize', 'caratWeight']}
              productTitleOverride={productTitleOverride}
            />
          ) : (
            <div className="loader-container">
              <Loader color="black" />
            </div>
          )
        ) : currentStep === 3 ? (
          builderProduct.product &&
          builderProduct.diamond && (
            <ReviewBuildStep
              settingSlugs={settingSlugs}
              type={type}
              configurations={configurations}
              selectedConfiguration={selectedConfiguration}
              variantProductTitle={shopifyProductData?.productTitle}
            />
          )
        ) : null}
      </AnimatePresence>

      {/* Keeping this in case they change their mind :) */}
      {/* <BuilderFlowNav currentStep={currentStep} steps={steps[type]} type={type} /> */}
    </BuilderFlowStyles>
  );
};

export { BuilderFlow };
