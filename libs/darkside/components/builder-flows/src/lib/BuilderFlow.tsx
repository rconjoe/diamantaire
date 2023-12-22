import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import { PdpTypePlural } from '@diamantaire/shared/constants';
import { isEmptyObject } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import DiamondBuildStep from './DiamondBuildStep';
import ReviewBuildStep from './ReviewBuildStep';
import SettingBuildStep from './SettingBuildStep';
import SettingSelectStep from './SettingSelectStep';

const BuilderFlowStyles = styled.div``;

const BuilderFlow = ({
  collectionSlug: initialCollectionSlug,
  productSlug: initialProductSlug,
  lotId: initialLotId,
  type,
}) => {
  // These act as flags to prevent the flow from running multiple times when the page loads. Pre-poulates setting + diamond data on page load, and that should only happen once.
  const [initDiamond, setInitDiamond] = useState(false);
  const [initProduct, setInitProduct] = useState(false);
  const [shopifyProductData, setShopifyProductData] = useState(null);

  const [settingSlugs, setSettingSlugs] = useState({
    collectionSlug: initialCollectionSlug,
    productSlug: initialProductSlug,
  });

  const router = useRouter();

  const { builderProduct, updateFlowData } = useContext(BuilderProductContext);

  const {
    productContent,
    collectionContent,
    configuration: selectedConfiguration,
    price,
    defaultRingSize,
  } = shopifyProductData || {};
  const { productTitle, productTitleOverride } = collectionContent || {};

  console.log('shopifyProductData', shopifyProductData);

  const pdpType: PdpTypePlural = shopifyProductData?.productType?.replace('Engagement Ring', 'Engagement Rings');

  const { data }: { data: any } = useProductDato(shopifyProductData?.collectionSlug as string, router.locale, pdpType);

  console.log('variant query', shopifyProductData?.collectionSlug as string, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct;

  const { productDescription, bandWidth, bandDepth, settingHeight, paveCaratWeight, metalWeight, shownWithCtwLabel } =
    datoParentProductData || {};

  const productSpecId = datoParentProductData?.specLabels?.id;
  const productIconListType = datoParentProductData?.productIconList?.productType;

  const parentProductAttributes = {
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    styles: shopifyProductData?.styles,
    productType: shopifyProductData?.productType,
  };

  const configurations = shopifyProductData?.optionConfigs;
  const assetStack = productContent?.assetStack; // flatten array in normalization
  const variantId = shopifyProductData?.shopifyVariantId;

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

  function updateSettingSlugs(value: object) {
    setSettingSlugs({
      ...settingSlugs,
      ...value,
    });
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

  async function getSettingProduct() {
    console.log('getSettingProduct', settingSlugs);
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

    return response;
  }

  async function fetchProductAndDiamond() {
    if (
      (settingSlugs?.collectionSlug && settingSlugs?.productSlug) ||
      (initialCollectionSlug && initialProductSlug && !initProduct)
    ) {
      //  setInitProduct(true) has to be set after the variant data loads
      await getSettingProduct();
    }

    // Only run on load
    if (initialLotId && !initDiamond) {
      console.log("is this running when it shouldn't");
      setInitDiamond(true);
      await getDiamond();
    }
  }

  function configureCurrentStep() {
    // Overrides both - is triggered by clicking modify
    if (router.asPath.includes('edit-diamond')) {
      return updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
    }

    // S2D - Select Diamond
    if (
      type === 'setting-to-diamond' &&
      settingSlugs?.productSlug &&
      settingSlugs?.collectionSlug &&
      !initialLotId &&
      !builderProduct?.diamond
    ) {
      updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
    } else if (type === 'setting-to-diamond' && settingSlugs?.productSlug && settingSlugs?.collectionSlug && initialLotId) {
      updateFlowData('UPDATE_STEP', { step: 'review-build' });

      // D2S - Select Setting
    } else if (
      type === 'diamond-to-setting' &&
      initialLotId &&
      !settingSlugs?.collectionSlug &&
      !settingSlugs?.productSlug
    ) {
      updateFlowData('UPDATE_STEP', { step: 'select-setting' });
    } else if (
      type === 'diamond-to-setting' &&
      initialLotId &&
      !router.asPath.includes(settingSlugs?.productSlug) &&
      !router.asPath.includes(settingSlugs?.collectionSlug) &&
      !router.asPath.includes('/summary')
    ) {
      updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
    } else if (
      type === 'diamond-to-setting' &&
      initialLotId &&
      router.asPath.includes(settingSlugs?.productSlug) &&
      router.asPath.includes(settingSlugs?.collectionSlug) &&
      !router.asPath.includes('/summary')
    ) {
      updateFlowData('UPDATE_STEP', { step: 'customize-setting' });
    } else if (type === 'diamond-to-setting' && router.asPath.includes('/summary')) {
      updateFlowData('UPDATE_STEP', { step: 'review-build' });
    }
  }

  useEffect(() => {
    fetchProductAndDiamond();
    configureCurrentStep();
  }, [settingSlugs]);

  // This pulls in a pre-existing product if it exists on the initial URL - only for setting-to-diamond
  useEffect(() => {
    if (additionalVariantData && selectedConfiguration && builderProduct?.diamond) {
      setInitProduct(true);
      console.log('values here', selectedConfiguration, builderProduct?.diamond);
      if (selectedConfiguration?.diamondType === builderProduct?.diamond?.diamondType) {
        updateFlowData('ADD_PRODUCT', {
          ...additionalVariantData,
          ...selectedConfiguration,
          variantId,

          allDiamondTypes: shopifyProductData?.optionConfigs['diamondType'],
          collectionSlug: initialCollectionSlug,
          productSlug: initialProductSlug,
        });
      } else {
        const newProductSlug = shopifyProductData?.optionConfigs?.diamondType.find(
          (item) => item.value === builderProduct?.diamond?.diamondType,
        )?.id;

        updateSettingSlugs({
          productSlug: newProductSlug,
        });

        if (router.query.flowType === 'setting-to-diamond') {
          router.push(`/customize/setting-to-diamond/summary/${initialCollectionSlug}/${newProductSlug}/${initialLotId}`);
        } else {
          router.push(`/customize/diamond-to-setting/summary/${initialLotId}/${initialCollectionSlug}/${newProductSlug}`);
        }
      }
    }
  }, [
    additionalVariantData,
    selectedConfiguration,
    shopifyProductData,
    builderProduct.diamond,
    settingSlugs?.collectionSlug,
    shopifyProductData?.optionConfigs['diamondType'],
  ]);

  useEffect(() => {
    console.log('path changed', router.asPath);

    configureCurrentStep();
  }, [router.asPath]);

  return (
    <BuilderFlowStyles>
      {/* Setting to Diamond */}
      {builderProduct?.step === 'select-diamond' && (
        <DiamondBuildStep
          diamondTypeToShow={builderProduct?.diamond?.diamondType || selectedConfiguration?.diamondType}
          availableDiamonds={shopifyProductData?.allAvailableOptions?.diamondType}
          settingSlugs={{ collectionSlug: settingSlugs?.collectionSlug, productSlug: settingSlugs?.productSlug }}
        />
      )}

      {/* Diamond to Setting */}
      {builderProduct?.step === 'select-setting' && (
        <SettingSelectStep
          updateSettingSlugs={updateSettingSlugs}
          settingTypeToShow={builderProduct?.diamond?.diamondType}
        />
      )}

      {builderProduct?.step === 'customize-setting' && shopifyProductData && (
        <SettingBuildStep
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
          settingSlugs={settingSlugs}
          productSpecId={productSpecId}
          parentProductAttributes={parentProductAttributes}
          disableVariantType={['diamondType', 'ringSize', 'caratWeight']}
          productTitleOverride={productTitleOverride}
          productIconListType={productIconListType}
        />
      )}

      {/* Both flows */}
      {builderProduct?.step === 'review-build' && builderProduct.product && builderProduct.diamond && (
        <ReviewBuildStep
          settingSlugs={{
            collectionSlug: settingSlugs?.collectionSlug,
            productSlug: settingSlugs?.productSlug,
          }}
          updateSettingSlugs={updateSettingSlugs}
          type={type}
          configurations={configurations}
          selectedConfiguration={selectedConfiguration}
          variantProductTitle={shopifyProductData?.productTitle}
          additionalVariantData={additionalVariantData}
        />
      )}
    </BuilderFlowStyles>
  );
};

export { BuilderFlow };
