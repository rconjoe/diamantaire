import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { AnimatePresence } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import BuilderFlowNav from './BuilderFlowNav';
import DiamondBuildStep from './DiamondBuildStep';
import ReviewBuildStep from './ReviewBuildStep';
import SettingBuildStep from './SettingBuildStep';
import SettingSelectStep from './SettingSelectStep';

export const FreezeBody = createGlobalStyle`
  body, html {
    overflow: hidden;
  }
`;

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
};

const BuilderFlow = ({
  collectionSlug: initialCollectionSlug,
  productSlug: initialProductSlug,
  lotId: initialLotId,
  type,
}: BuilderFlowProps) => {
  const [settingSlugs, setSettingSlugs] = useState({
    collectionSlug: initialCollectionSlug,
    productSlug: initialProductSlug,
  });

  function updateSettingSlugs(value: object) {
    setSettingSlugs({
      ...settingSlugs,
      ...value,
    });
  }

  console.log('init flow', initialLotId, initialCollectionSlug, initialProductSlug, type);
  const { builderProduct, dispatch } = useContext(BuilderProductContext);

  const [currentStep, setCurrentStep] = useState(0);
  const [shopifyProductData, setShopifyProductData] = useState(null);

  function changeStep(step) {
    setCurrentStep(step);
  }

  function updateFlowData(action, value, nextStep = null) {
    dispatch({ type: action, payload: value });

    if (nextStep) {
      changeStep(nextStep);
    }
  }

  useEffect(() => {
    async function getPdpProduct() {
      const qParams = new URLSearchParams({
        slug: settingSlugs?.collectionSlug,
        id: settingSlugs?.productSlug,
      }).toString();

      const reqUrl = `/api/pdp/getPdpProduct?${qParams}`;

      console.log('reqUrl', reqUrl);

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

    async function fetchProduct() {
      if (settingSlugs?.collectionSlug && settingSlugs?.productSlug) {
        await getPdpProduct();
      }
    }

    fetchProduct();
  }, [settingSlugs]);

  return (
    <BuilderFlowStyles>
      <FreezeBody />
      <div className="custom-builder-message">
        {/* <p>You are currently customizing a {productTitle?.replace('The', '')} engagement ring</p> */}
        <ul>
          <li>
            <DarksideButton type="underline" colorTheme="white">
              Back to product
            </DarksideButton>
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {type === 'setting-to-diamond' ? (
          currentStep === 0 ? (
            shopifyProductData && (
              <SettingBuildStep
                updateFlowData={updateFlowData}
                shopifyProductData={shopifyProductData}
                settingSlugs={settingSlugs}
                updateSettingSlugs={updateSettingSlugs}
                flowIndex={0}
              />
            )
          ) : currentStep === 1 ? (
            <DiamondBuildStep
              changeStep={changeStep}
              flowIndex={1}
              updateSettingSlugs={updateSettingSlugs}
              settingSlugs={settingSlugs}
            />
          ) : currentStep === 2 ? (
            // <ReviewBuildStep changeStep={changeStep} productIconListType={productIconListType} />
            <ReviewBuildStep settingSlugs={settingSlugs} changeStep={changeStep} />
          ) : null
        ) : currentStep === 0 ? (
          <DiamondBuildStep changeStep={changeStep} flowIndex={0} />
        ) : currentStep === 1 ? (
          <SettingSelectStep
            changeStep={changeStep}
            flowIndex={1}
            settingSlugs={settingSlugs}
            setSettingSlugs={setSettingSlugs}
            updateSettingSlugs={updateSettingSlugs}
          />
        ) : currentStep === 2 ? (
          shopifyProductData && (
            <SettingBuildStep
              flowIndex={2}
              settingSlugs={settingSlugs}
              updateSettingSlugs={updateSettingSlugs}
              shopifyProductData={shopifyProductData}
              updateFlowData={updateFlowData}
            />
          )
        ) : currentStep === 3 ? (
          <ReviewBuildStep settingSlugs={settingSlugs} changeStep={changeStep} />
        ) : null}
      </AnimatePresence>

      <BuilderFlowNav
        changeStep={changeStep}
        // product={{ productType, collectionSlug, productSlug, title: productTitle, price }}
        currentStep={currentStep}
        builderFlowState={builderProduct}
        type={type}
      />
    </BuilderFlowStyles>
  );
};

export { BuilderFlow };
