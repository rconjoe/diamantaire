import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { getEmailFromCookies, sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useProductDato, useProductVariant } from '@diamantaire/darkside/data/hooks';
import {
  HUBSPOT_ER_SUMMARY_LISTDATA,
  JEWELRY_THAT_CAN_TAKE_CUSTOM_DIAMONDS,
  PdpTypePlural,
} from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { getCurrentUrl, isEmptyObject } from '@diamantaire/shared/helpers';
import { useCookieConsentContext } from '@use-cookie-consent/react';
import Cookies from 'js-cookie';
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
  lotIds: initialLotIds,
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
  const { locale, asPath } = router || {};
  const { builderProduct, updateFlowData } = useContext(BuilderProductContext);

  const {
    productContent,
    collectionContent,
    configuration: selectedConfiguration,
    price,
    defaultRingSize,
  } = shopifyProductData || {};
  const { productTitle, productTitleOverride } = collectionContent || {};

  const { consent } = useCookieConsentContext();
  const didAcceptPrivacy = Cookies.get('didAcceptPrivacy') === 'true';
  const isUserInEu = getIsUserInEu();
  const email = getEmailFromCookies();

  const isValidToSendHubSpotEvent =
    email && (!isUserInEu || (isUserInEu && didAcceptPrivacy && consent?.marketing && consent?.statistics));

  console.log('shopifyProductData', shopifyProductData);

  const pdpType: PdpTypePlural = shopifyProductData?.productType?.replace('Engagement Ring', 'Engagement Rings');

  const { data }: { data: any } = useProductDato(shopifyProductData?.collectionSlug as string, router.locale, pdpType);

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

  const variantHandle = productContent?.shopifyProductHandle || productContent?.configuredProductOptionsInOrder;

  let { data: additionalVariantData }: any = useProductVariant(
    variantHandle,
    shopifyProductData?.productType,
    router.locale,
  );

  console.log('additionalVariantData', additionalVariantData, productContent);

  if (!isEmptyObject(shopifyProductData) && shopifyProductData !== null && !shopifyProductData.error) {
    // Fallback for Jewelry Products
    if (!additionalVariantData || additionalVariantData?.configuration) {
      additionalVariantData = productContent;
    } else {
      // Add Shopify Product Data to Dato Product Data
      additionalVariantData = additionalVariantData?.omegaProduct;
      additionalVariantData['goldPurity'] = shopifyProductData?.options?.goldPurity;
      additionalVariantData['bandAccent'] = shopifyProductData?.options?.bandAccent;
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
      lotIds: initialLotIds,
    }).toString();
    const diamondResponse = await fetch(`/api/diamonds/getDiamondByLotId?${qParams}`, {})
      .then((res) => res.json())
      .then((res) => res);

    updateFlowData('ADD_DIAMOND', diamondResponse);
  }

  async function getSettingProduct() {
    console.log('settingSlugs', settingSlugs);
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

    updateFlowData('ADD_PRODUCT', response);

    return response;
  }

  async function fetchProductAndDiamond() {
    if ((settingSlugs?.collectionSlug && settingSlugs?.productSlug) || (initialCollectionSlug && initialProductSlug)) {
      //  setInitProduct(true) has to be set after the variant data loads
      await getSettingProduct();
    }

    // Only run on load
    if (initialLotIds && !initDiamond) {
      console.log("is this running when it shouldn't");
      setInitDiamond(true);
      await getDiamond();
    }
  }

  function configureCurrentStep() {
    // EDGE CASES
    // Overrides all scenarios to edit the diamond selected - is triggered by clicking modify diamond on review build step
    if (router.asPath.includes('edit-diamond')) {
      return updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
    }

    console.log('configure step running', builderProduct);

    if (
      router.asPath.includes('toi-moi-ring') ||
      JEWELRY_THAT_CAN_TAKE_CUSTOM_DIAMONDS.some((item) => router.asPath.includes(item))
    ) {
      if (builderProduct?.product?.collectionSlug && !builderProduct?.diamonds) {
        updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
      } else {
        updateFlowData('UPDATE_STEP', { step: 'review-build' });
      }
    }

    // STANDARD CASES
    // S2D - Select Diamond
    if (
      type === 'setting-to-diamond' &&
      settingSlugs?.productSlug &&
      settingSlugs?.collectionSlug &&
      !initialLotIds &&
      !builderProduct?.diamonds
    ) {
      updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
    } else if (type === 'setting-to-diamond' && settingSlugs?.productSlug && settingSlugs?.collectionSlug && initialLotIds) {
      updateFlowData('UPDATE_STEP', { step: 'review-build' });
    } else if (
      type === 'diamond-to-setting' &&
      initialLotIds &&
      !router.asPath.includes(settingSlugs?.productSlug) &&
      !router.asPath.includes(settingSlugs?.collectionSlug) &&
      !router.asPath.includes('/summary')
    ) {
      // D2S - Select Setting
      updateFlowData('UPDATE_STEP', { step: 'select-setting' });
    } else if (
      type === 'diamond-to-setting' &&
      initialLotIds &&
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
  // useEffect(() => {
  //   console.log('effect running');
  //   if (additionalVariantData && selectedConfiguration && builderProduct?.diamonds) {
  //     setInitProduct(true);
  //     console.log('values here', selectedConfiguration, builderProduct?.diamonds);
  //     if (selectedConfiguration?.diamondType === builderProduct?.diamonds?.[0]?.diamondType) {
  //       updateFlowData('ADD_PRODUCT', {
  //         ...additionalVariantData,
  //         ...selectedConfiguration,
  //         variantId,

  //         allDiamondTypes: shopifyProductData?.optionConfigs['diamondType'],
  //         collectionSlug: initialCollectionSlug,
  //         productSlug: initialProductSlug,
  //       });
  //     } else {
  //       const newProductSlug =
  //         shopifyProductData?.optionConfigs?.diamondType.find(
  //           (item) => item.value === builderProduct?.diamonds?.[0]?.diamondType,
  //         )?.id || shopifyProductData?.productSlug;

  //       updateSettingSlugs({
  //         productSlug: newProductSlug,
  //       });
  //     }
  //   }
  // }, [
  //   builderProduct.diamonds,
  //   settingSlugs?.collectionSlug,
  //   // selectedConfiguration,
  //   // additionalVariantData,
  //   // shopifyProductData,
  //   // shopifyProductData?.optionConfigs?.['diamondType'],
  // ]);

  useEffect(() => {
    configureCurrentStep();

    const isSummaryPage = router.asPath.includes('/summary');

    if (isSummaryPage && assetStack && isValidToSendHubSpotEvent) {
      const erImages = assetStack?.reduce((acc, asset) => {
        const imageType = ['angle', 'detail', 'profile', 'upright', 'front', 'side'].find((type) =>
          asset.url.includes(type),
        );

        if (imageType) {
          acc[`er${imageType.charAt(0).toUpperCase() + imageType.slice(1)}Image`] = asset.url;
        }

        return acc;
      }, {});

      const currentUrl = getCurrentUrl({ locale, asPath });

      sendHubspotForm({
        listData: HUBSPOT_ER_SUMMARY_LISTDATA,
        email,
        isConsent: isValidToSendHubSpotEvent,
        erName: productTitle,
        erUrl: currentUrl,
        ...erImages,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, assetStack, isValidToSendHubSpotEvent]);

  return (
    <BuilderFlowStyles>
      {/* Setting to Diamond */}
      {builderProduct?.step === 'select-diamond' && (
        <DiamondBuildStep
          diamondTypeToShow={builderProduct?.diamonds?.[0]?.diamondType || selectedConfiguration?.diamondType}
          availableDiamonds={shopifyProductData?.allAvailableOptions?.diamondType}
          settingSlugs={{ collectionSlug: settingSlugs?.collectionSlug, productSlug: settingSlugs?.productSlug }}
        />
      )}

      {/* Diamond to Setting */}
      {builderProduct?.step === 'select-setting' && (
        <SettingSelectStep
          updateSettingSlugs={updateSettingSlugs}
          settingTypeToShow={builderProduct?.diamonds?.[0]?.diamondType}
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
      {builderProduct?.step === 'review-build' && builderProduct.product && builderProduct.diamonds && (
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
          shopifySettingVariantId={variantId}
        />
      )}
    </BuilderFlowStyles>
  );
};

export { BuilderFlow };
