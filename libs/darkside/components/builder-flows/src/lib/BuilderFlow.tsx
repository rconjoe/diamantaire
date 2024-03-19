import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { fetchDatoVariant, getEmailFromCookies, sendHubspotForm } from '@diamantaire/darkside/data/api';
import { useProductDato } from '@diamantaire/darkside/data/hooks';
import {
  HUBSPOT_ER_SUMMARY_LISTDATA,
  JEWELRY_THAT_CAN_TAKE_CUSTOM_DIAMONDS,
  PdpTypePlural,
} from '@diamantaire/shared/constants';
import { getIsUserInEu } from '@diamantaire/shared/geolocation';
import { getCurrentUrl } from '@diamantaire/shared/helpers';
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
  const [shopifyProductData, setShopifyProductData] = useState(null);

  const [settingSlugs, setSettingSlugs] = useState({
    collectionSlug: initialCollectionSlug,
    productSlug: initialProductSlug,
    lotIds: initialLotIds,
  });

  const router = useRouter();
  const { locale, asPath } = router || {};
  const { builderProduct, updateFlowData } = useContext(BuilderProductContext);

  const {
    productContent,
    collectionContent,
    configuration: selectedConfiguration,
    price,
    // defaultRingSize,
  } = shopifyProductData || {};
  const { productTitle, productTitleOverride } = collectionContent || {};

  const { consent } = useCookieConsentContext();
  const didAcceptPrivacy = Cookies.get('didAcceptPrivacy') === 'true';
  const isUserInEu = getIsUserInEu();
  const email = getEmailFromCookies();

  const isValidToSendHubSpotEvent =
    email && (!isUserInEu || (isUserInEu && didAcceptPrivacy && consent?.marketing && consent?.statistics));

  // console.log('shopifyProductData', shopifyProductData);

  const pdpType: PdpTypePlural = shopifyProductData?.productType?.replace('Engagement Ring', 'Engagement Rings');

  const { data }: { data: any } = useProductDato(shopifyProductData?.collectionSlug as string, router.locale, pdpType);

  const datoParentProductData: any = data?.engagementRingProduct;

  const {
    productDescription,
    bandWidth,
    bandDepth,
    settingHeight,
    paveCaratWeight,
    metalWeight,
    shownWithCtwLabel,
    trioBlocks: { id: trioBlocksId = '' } = {},
  } = datoParentProductData || {};

  const productSpecId = datoParentProductData?.specLabels?.id;
  const productIconListType = datoParentProductData?.productIconList?.productType;
  const videoBlockId = datoParentProductData?.diamondContentBlock?.id;
  const instagramReelId = datoParentProductData?.instagramReelBlock?.id;

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

  // This function keeps setting in sync
  async function getSettingProduct() {
    const qParams = new URLSearchParams({
      slug: settingSlugs?.collectionSlug,
      id: settingSlugs?.productSlug,
    }).toString();

    // Product Data
    const productResponse = await fetch(`/api/pdp/getPdpProduct?${qParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (res) => {
        const handle = res?.productContent?.shopifyProductHandle || res?.productContent?.configuredProductOptionsInOrder;
        const category = res?.productType;

        const variant: any = handle && (await fetchDatoVariant(handle, category, router.locale));

        return {
          ...res,
          variantDetails: variant?.omegaProduct,
        };
      })
      .catch((e) => {
        console.log('getPdpProduct error', e);
      });

    setShopifyProductData(productResponse);

    updateFlowData('ADD_PRODUCT', productResponse);

    return productResponse;
  }

  async function fetchProductAndDiamond() {
    if ((settingSlugs?.collectionSlug && settingSlugs?.productSlug) || (initialCollectionSlug && initialProductSlug)) {
      //  setInitProduct(true) has to be set after the variant data loads
      await getSettingProduct();
    }

    // Only run on load
    if (initialLotIds && !initDiamond) {
      setInitDiamond(true);
      await getDiamond();
    }
  }

  function configureCurrentStep() {
    // EDGE CASES
    // Overrides all scenarios to edit the diamond selected - is triggered by clicking modify diamond on review build step

    if (router.asPath.includes('edit-diamond') && builderProduct?.step === 'select-diamond') return null;

    if (router.asPath.includes('edit-diamond')) {
      return updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
    }

    // ToiMoi + Earring pairs
    if (
      router.asPath.includes('toi-moi-ring') ||
      JEWELRY_THAT_CAN_TAKE_CUSTOM_DIAMONDS.some((item) => router.asPath.includes(item))
    ) {
      if (builderProduct?.product?.collectionSlug && !builderProduct?.diamonds) {
        updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
      } else if (!settingSlugs?.lotIds) {
        updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
      } else {
        updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
      }
    }

    // STANDARD CASES
    // S2D - Select Diamond
    if (
      type === 'setting-to-diamond' &&
      settingSlugs?.productSlug &&
      settingSlugs?.collectionSlug &&
      !asPath.includes(settingSlugs?.lotIds?.map((id) => id).join()) &&
      !initialLotIds &&
      !builderProduct?.diamonds
    ) {
      updateFlowData('UPDATE_STEP', { step: 'select-diamond' });
    } else if (
      type === 'setting-to-diamond' &&
      settingSlugs?.productSlug &&
      settingSlugs?.collectionSlug &&
      initialLotIds &&
      !router.asPath.includes('edit-diamond')
    ) {
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
      return updateFlowData('UPDATE_STEP', { step: 'customize-setting' });
    } else if (
      type === 'diamond-to-setting' &&
      router.asPath.includes('/summary') &&
      !router.asPath.includes('edit-diamond')
    ) {
      updateFlowData('UPDATE_STEP', { step: 'review-build' });
    }
  }

  useEffect(() => {
    fetchProductAndDiamond();
  }, [settingSlugs]);

  useEffect(() => {
    // console.log('route change to: ', router.asPath);
    // if (isFetchingData) return null;
    configureCurrentStep();
  }, [router.asPath]);

  useEffect(() => {
    // configureCurrentStep();

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

  const allDiamonds = shopifyProductData?.allAvailableOptions?.diamondType;

  function getMatchingDiamondTypesInAllDiamonds(diamonds, allDiamonds) {
    if (!diamonds || !allDiamonds) return null;
    // Create an array of all diamond types in the diamonds array
    const diamondTypes = diamonds.map((diamond) => diamond.diamondType);

    // Filter the allDiamonds array to include only those types that are in the diamondTypes array
    const matchedTypes = allDiamonds.filter((type) => diamondTypes.every((diamondType) => type.includes(diamondType)));

    return matchedTypes?.[0];
  }

  const matchingDiamondType = getMatchingDiamondTypesInAllDiamonds(builderProduct?.diamonds, allDiamonds);

  return (
    <BuilderFlowStyles>
      {/* Setting to Diamond */}
      {builderProduct?.step === 'select-diamond' && (
        <DiamondBuildStep
          diamondTypeToShow={matchingDiamondType || selectedConfiguration?.diamondType}
          availableDiamonds={shopifyProductData?.allAvailableOptions?.diamondType}
          settingSlugs={{ collectionSlug: settingSlugs?.collectionSlug, productSlug: settingSlugs?.productSlug }}
          settingProductType={shopifyProductData?.productType}
          updateSettingSlugs={updateSettingSlugs}
        />
      )}

      {/* Diamond to Setting */}
      {builderProduct?.step === 'select-setting' && (
        <SettingSelectStep settingTypeToShow={builderProduct?.diamonds?.[0]?.diamondType} />
      )}

      {builderProduct?.step === 'customize-setting' && (
        <SettingBuildStep
          shopifyProductData={shopifyProductData}
          updateSettingSlugs={updateSettingSlugs}
          configurations={configurations}
          assetStack={assetStack}
          variantId={variantId}
          selectedConfiguration={selectedConfiguration}
          productDescription={productDescription}
          productTitle={productTitle}
          price={price}
          settingSlugs={settingSlugs}
          productSpecId={productSpecId}
          parentProductAttributes={parentProductAttributes}
          disableVariantType={['diamondType', 'ringSize', 'caratWeight']}
          productTitleOverride={productTitleOverride}
          productIconListType={productIconListType}
          additionalVariantData={shopifyProductData?.variantDetails}
          contentIds={{
            trioBlocksId,
            productSuggestionBlockId: shopifyProductData?.variantDetails?.productSuggestionQuadBlock?.id,
            videoBlockId,
            instagramReelId,
            shopifyCollectionId: shopifyProductData?.shopifyCollectionId,
          }}
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
          shopifyProductData={shopifyProductData}
        />
      )}
    </BuilderFlowStyles>
  );
};

export { BuilderFlow };
