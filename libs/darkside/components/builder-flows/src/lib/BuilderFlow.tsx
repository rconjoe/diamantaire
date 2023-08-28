import { DarksideButton, FreezeBody } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_TYPE_HUMAN_NAMES, PdpTypePlural, pdpTypeHandleSingleToPluralAsConst } from '@diamantaire/shared/constants';
import { isEmptyObject, removeUrlParameter, updateUrlParameter } from '@diamantaire/shared/helpers';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import BuilderFlowNav from './BuilderFlowNav';
import DiamondBuildStep from './DiamondBuildStep';
import ReviewBuildStep from './ReviewBuildStep';
import SettingBuildStep from './SettingBuildStep';
import SettingSelectStep from './SettingSelectStep';

const BuilderFlowStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5000;
  background-color: #fff;
  padding: 0 0 100px;

  .custom-builder-message {
    background-color: #000;
    display: flex;
    padding: 10px 0;
    text-align: center;
    justify-content: center;
    position: relative;
    p {
      margin: 0;
      color: #fff;
      text-align: center;
      font-size: 1.5rem;
    }
    ul {
      position: absolute;
      top: 9px;
      right: 20px;
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

  // Variant Specfic Data
  const {
    id: initialVariantId,
    productContent,
    collectionContent,
    configuration: selectedConfiguration,
    price,
  } = shopifyProductData || {};
  const { productTitle } = collectionContent || {};

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = productContent?.assetStack; // flatten array in normalization

  const variantHandle = productContent?.shopifyProductHandle;

  let { data: additionalVariantData }: any = useProductVariant(variantHandle, router.locale);

  console.log('shopifyProductData', shopifyProductData);

  if (!isEmptyObject(shopifyProductData) && shopifyProductData !== null) {
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
      .then((res) => res);

    setShopifyProductData(response);
  }

  async function getDiamond() {
    const qParams = new URLSearchParams({
      lotId: initialLotId,
    }).toString();
    const diamondResponse = await fetch(`/api/diamonds/getDiamondByLotId?${qParams}`, {})
      .then((res) => res.json())
      .then((res) => res);

    console.log('diamondResponse', diamondResponse);

    updateFlowData('ADD_DIAMOND', diamondResponse);
    updateFlowData('UPDATE_DIAMOND_TYPE', diamondResponse.diamondType);
  }

  async function fetchProductAndDiamond() {
    if (
      (settingSlugs?.collectionSlug && settingSlugs?.productSlug) ||
      (initialCollectionSlug && initialProductSlug && !initProduct)
    ) {
      setInitProduct(true);
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

  // This pulls in a pre-existing product if it exists on the initial URL
  useEffect(() => {
    if (additionalVariantData && selectedConfiguration) {
      updateFlowData('ADD_PRODUCT', { ...additionalVariantData, ...selectedConfiguration });
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

  const builderMessage = useMemo(() => {
    if (type === 'setting-to-diamond' && productTitle) {
      return productTitle + ' engagement ring';
    } else if (type === 'diamond-to-setting' && builderProduct?.diamond?.diamondType) {
      return ' a ' + DIAMOND_TYPE_HUMAN_NAMES[builderProduct?.diamond?.diamondType] + ' diamond';
    } else {
      return null;
    }
  }, [productTitle, builderProduct]);

  const builderInitProductUrl = useMemo(() => {
    if (type === 'setting-to-diamond') {
      return '/engagement-ring/' + initialCollectionSlug + '/' + initialProductSlug;
    } else if (type === 'diamond-to-setting' && builderProduct?.diamond?.diamondType) {
      return '/diamond';
    } else {
      return null;
    }
  }, [initialCollectionSlug, initialProductSlug]);

  return (
    <BuilderFlowStyles>
      <FreezeBody />
      {builderMessage && (
        <div className="custom-builder-message">
          <p>You are currently customizing {builderMessage}</p>
          <ul>
            <li>
              <DarksideButton href={builderInitProductUrl} type="underline" colorTheme="white">
                Back to product
              </DarksideButton>
            </li>
          </ul>
        </div>
      )}
      <AnimatePresence>
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
                initialVariantId={initialVariantId}
                selectedConfiguration={selectedConfiguration}
                additionalVariantData={additionalVariantData}
                productDescription={productDescription}
                productTitle={productTitle}
                price={price}
                productSpecId={productSpecId}
                parentProductAttributes={parentProductAttributes}
              />
            )
          ) : currentStep === 1 ? (
            <DiamondBuildStep flowIndex={1} diamondTypeToShow={builderProduct?.product?.diamondType} />
          ) : currentStep === 2 ? (
            builderProduct.product && builderProduct.diamond && <ReviewBuildStep settingSlugs={settingSlugs} />
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
          shopifyProductData && (
            <SettingBuildStep
              flowIndex={2}
              updateFlowData={updateFlowData}
              shopifyProductData={shopifyProductData}
              updateSettingSlugs={updateSettingSlugs}
              configurations={configurations}
              assetStack={assetStack}
              initialVariantId={initialVariantId}
              selectedConfiguration={selectedConfiguration}
              additionalVariantData={additionalVariantData}
              productDescription={productDescription}
              productTitle={productTitle}
              price={price}
              productSpecId={productSpecId}
              parentProductAttributes={parentProductAttributes}
            />
          )
        ) : currentStep === 3 ? (
          builderProduct.product && builderProduct.diamond && <ReviewBuildStep settingSlugs={settingSlugs} />
        ) : null}
      </AnimatePresence>

      <BuilderFlowNav currentStep={currentStep} settingSlugs={settingSlugs} type={type} />
    </BuilderFlowStyles>
  );
};

export { BuilderFlow };
