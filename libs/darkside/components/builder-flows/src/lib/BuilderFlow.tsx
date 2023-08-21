import { DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import BuilderFlowNav from './BuilderFlowNav';
import DiamondBuildStep from './DiamondBuildStep';
import ReviewBuildStep from './ReviewBuildStep';
import SettingBuildStep from './SettingBuildStep';

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

const BuilderFlow = ({
  configuration,
  assetStack,
  additionalVariantData,
  productAttributes,
  productDescription,
  productSpecId,
  configurations,
  initialVariantId,
  selectedConfiguration,
  product,
}) => {
  console.log('configuration', configuration);

  const { builderProduct, dispatch } = useContext(BuilderProductContext);

  // console.log('builderProduct', builderProduct);

  const [currentStep, setCurrentStep] = useState(0);

  function changeStep(step) {
    setCurrentStep(step);
  }

  function updateFlowData(action, value, nextStep = null) {
    console.log('updating state');
    dispatch({ type: action, payload: value });

    if (nextStep) {
      changeStep(nextStep);
    }
  }

  return (
    <BuilderFlowStyles>
      <FreezeBody />
      <div className="custom-builder-message">
        <p>You are currently customizing a {product?.title.replace('The', '')} engagement ring</p>
        <ul>
          <li>
            <DarksideButton type="underline" colorTheme="white">
              Back to product
            </DarksideButton>
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {currentStep === 0 ? (
          <SettingBuildStep
            configuration={configuration}
            assetStack={assetStack}
            additionalVariantData={additionalVariantData}
            productDescription={productDescription}
            isBuilderProduct={true}
            productAttributes={productAttributes}
            productSpecId={productSpecId}
            configurations={configurations}
            initialVariantId={initialVariantId}
            selectedConfiguration={selectedConfiguration}
            product={product}
            updateFlowData={updateFlowData}
          />
        ) : currentStep === 1 ? (
          <DiamondBuildStep changeStep={changeStep} />
        ) : currentStep === 2 ? (
          <ReviewBuildStep changeStep={changeStep} />
        ) : null}
      </AnimatePresence>

      <BuilderFlowNav
        changeStep={changeStep}
        product={product}
        currentStep={currentStep}
        builderFlowState={builderProduct}
      />
    </BuilderFlowStyles>
  );
};

export { BuilderFlow };
