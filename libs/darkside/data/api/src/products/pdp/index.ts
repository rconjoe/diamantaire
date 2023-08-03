import { PdpTypePlural, pdpTypePluralAsConst } from '@diamantaire/shared/constants';

import { queryDatoGQL } from '../../clients';
import { vraiApiClient } from '../../clients/vraiApiClient';
import ResponsiveImageFragment from '../../standard-page/component-queries/fragments/ResponsiveImageFragment';

// PDP Shopify Data - VRAI Server
export async function getProductPage(productSlug, variantSlug) {
  const searchParams = new URLSearchParams({ slug: productSlug, id: variantSlug });
  const apiUrl = `/v1/products?${searchParams.toString()}`;

  const response = await vraiApiClient.get(apiUrl);

  return response.data;
}

// PDP - ENGAGEMENT RING DATA - DatoCMS - TODO: What should be prefetched (prob this)

const ENGAGEMENT_RING_QUERY = `
  query engagementRingQuery($locale: SiteLocale, $slug: String!) {
      engagementRingProduct(filter: {slug: {eq: $slug}}, locale: $locale) {
        id
        productDescription
        bandDepth(locale: $locale)
        bandWidth(locale: $locale)
        paveCaratWeight(locale: $locale)
        settingHeight(locale: $locale)
        metalWeight(locale: $locale)
        shownWithCtwLabel(locale: $locale)
        trioBlocks {
          id
        }
        productIconList {
          productType
        }
        specLabels {
          id
        }
        instagramReelBlock {
          id
        }
        diamondContentBlock {
          id
        }
      }
    }
`;

const JEWELRY_QUERY = `
query jewelryProductQuery($locale: SiteLocale, $slug: String!) {
  jewelryProduct(filter: {slug: {eq: $slug}}, locale: $locale) {
    id
    productDescription
    productIconList {
      productType
    }
    specLabels {
      id
    }
  }
}
`;

// PDP - GENERAL COMPONENTS IN ORDER THEY APPEAR - DatoCMS
const PRODUCT_ICON_LIST_QUERY = `
  query iconListQuery($locale: SiteLocale, $productType: String!) {
    productIconList(locale: $locale, filter: {productType: {eq: $productType}}) {
      items (locale: $locale) {
          ...on ModularProductIconListItemRecord {
            _modelApiKey
            ctaRoute
            ctaCopy
            copy
            icon {
              width
              height
              url
            }
          }
          ...on ModularShippingProductIconListItemRecord  {
            _modelApiKey
            shippingBusinessDays
            shippingBusinessDaysCountryMap
            shippingText
            icon {
              width
              height
              url
            }
          }
        }
      }
    }
`;

const PRODUCT_SPEC_LABEL_QUERY = `
query productSpecs($locale: SiteLocale, $id: ItemId) {
  productSpecLabelCollection(filter: {id: {eq: $id}}, locale: $locale) {
    id
    labels(locale: en_US) {
      ... on BandDepthLabelRecord {
        copy
        specName
      }
      ... on BandHeightLabelRecord {
        copy
        specName
      }
      ... on BandWidthLabelRecord {
        copy
        specName
      }
      ... on CaratLabelRecord {
        copy
        specName
      }
      ... on CertificateLabelRecord {
        copy
        specName
      }
      ... on ChainLengthLabelRecord {
        copy
        specName
      }
      ... on ChainWidthLabelRecord {
        copy
        specName
      }
      ... on CharmLabelRecord {
        copy
        specName
      }
      ... on ClarityLabelRecord {
        copy
        specName
      }
      ... on ClosureLabelRecord {
        copy
        specName
      }
      ... on ColorLabelRecord {
        copy
        specName
      }
      ... on CordWidthLabelRecord {
        copy
        specName
      }
      ... on CutLabelRecord {
        copy
        specName
      }
      ... on CutletLabelRecord {
        copy
        specName
      }
      ... on DepthLabelRecord {
        copy
        specName
      }
      ... on DescriptionLabelRecord {
        copy
        specName
      }
      ... on DiamondClarityLabelRecord {
        copy
        specName
      }
      ... on DiamondColorLabelRecord {
        copy
        specName
      }
      ... on DiamondCountLabelRecord {
        copy
        specName
      }
      ... on DiamondSizeLabelRecord {
        copy
        specName
      }
      ... on FluorescenceLabelRecord {
        copy
        specName
      }
      ... on GirdleLabelRecord {
        copy
        specName
      }
      ... on JacketLengthLabelRecord {
        copy
        specName
      }
      ... on MeasurementsLabelRecord {
        copy
        specName
      }
      ... on MetalLabelRecord {
        copy
        specName
      }
      ... on MetalWeightLabelRecord {
        copy
        specName
      }
      ... on OriginLabelRecord {
        copy
        specName
      }
      ... on OuterDiameterLabelRecord {
        copy
        specName
      }
      ... on PaveCaratWeightLabelRecord {
        copy
        specName
      }
      ... on PolishLabelRecord {
        copy
        specName
      }
      ... on PostsLabelRecord {
        copy
        specName
      }
      ... on RingFaceLabelRecord {
        copy
        specName
      }
      ... on RingSizeLabelRecord {
        copy
        specName
      }
      ... on SettingHeightLabelRecord {
        copy
        specName
      }
      ... on SettingLabelRecord {
        copy
        specName
      }
      ... on ShapeLabelRecord {
        copy
        specName
      }
      ... on ShippingAndReturnsLabelRecord {
        copy
        specName
      }
      ... on ShownWithCenterStoneLabelRecord {
        copy
        specName
      }
      ... on SpecificationsLabelRecord {
        copy
        specName
      }
      ... on SymmetryLabelRecord {
        copy
        specName
      }
      ... on TableLabelRecord {
        copy
        specName
      }
    }
  }
}
`;

const DATO_PRODUCT_TRIO_BLOCK_QUERY = `
  query datoTrioBlockQuery($locale: SiteLocale, $id: ItemId) {
    trioBlock(filter: {id: {eq: $id}}, locale: $locale) {
      id
      blocks {
        title
        copy
        ctaCopy
        ctaRoute
        image {
          responsiveImage(imgixParams: {w: 600, q: 40, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        }
      }
    }
    }
    ${ResponsiveImageFragment}
`;

const DATO_PRODUCT_INSTAGRAM_REEL_QUERY = `
  query datoInstagramReel($locale: SiteLocale, $id: ItemId) {
    instagramReelBlock(filter: {id: {eq: $id}}, locale: $locale) {
      id
      _modelApiKey
      content { 
      title
      subtitle
      headingType
      headingAdditionalClass
      blocks {
        id
        image {
          url
          alt
          responsiveImage (imgixParams: {w: 240, h:240, q: 45, auto: format, fit: clamp, crop: focalpoint },sizes: "240px"){
            ...responsiveImageFragment
          }
        }
        postLink
        productLink
        shouldLinkToVraiInstagram
      }
      }
    }
    }
    ${ResponsiveImageFragment}
`;

const DATO_PRODUCT_VIDEO_BLOCK_QUERY = `
  query datoVideoBlock($locale: SiteLocale, $id: ItemId) {
    diamondContentBlock(filter: {id: {eq: $id}}, locale: $locale) {
      id
      _modelApiKey
      videoBlock {
        ... on VideoBlockRecord {
          copy
          title
          videoSources {
            url
            alt
          }
          thumbnail {
            url
            alt
            width
            height
          }
        }
      }
    }
    }
`;

const DATO_VARIANT_QUERY = `
  query datoVariantQuery($locale: SiteLocale, $slug: String!) {
    omegaProduct(filter: {shopifyProductHandle: {eq: $slug}}, locale: $locale) {
      id
      shownWithCtw
      shopifyProductHandle
      origin
      shape
      color
      cut
      clarity
      dimensions
      caratWeightOverride
    }
    }
`;

export async function fetchDatoProductInfo(slug: string, locale: string, productType: PdpTypePlural) {
  const datoData = await queryDatoGQL({
    query:
      productType === pdpTypePluralAsConst['Engagement Rings']
        ? ENGAGEMENT_RING_QUERY
        : productType === pdpTypePluralAsConst['Jewelry']
        ? JEWELRY_QUERY
        : null,
    variables: { slug, locale },
  });

  return datoData;
}

export async function fetchDatoProductSpec(id: string, locale: string) {
  const datoData = await queryDatoGQL({
    query: PRODUCT_SPEC_LABEL_QUERY,
    variables: { id, locale },
  });

  return datoData;
}

export async function fetchDatoProductIconList(productType: string, locale: string) {
  const datoData = await queryDatoGQL({
    query: PRODUCT_ICON_LIST_QUERY,
    variables: { productType, locale },
  });

  return datoData;
}

export async function fetchDatoProductTrioBlock(id: string, locale: string) {
  const datoData = await queryDatoGQL({
    query: DATO_PRODUCT_TRIO_BLOCK_QUERY,
    variables: { id, locale },
  });

  return datoData;
}

export async function fetchDatoProductInstagramReel(id: string, locale: string) {
  const datoData = await queryDatoGQL({
    query: DATO_PRODUCT_INSTAGRAM_REEL_QUERY,
    variables: { id, locale },
  });

  return datoData;
}

export async function fetchDatoProductVideoBlock(id: string, locale: string) {
  const datoData = await queryDatoGQL({
    query: DATO_PRODUCT_VIDEO_BLOCK_QUERY,
    variables: { id, locale },
  });

  return datoData;
}

export async function fetchDatoVariant(slug: string, locale: string) {
  const datoData = await queryDatoGQL({
    query: DATO_VARIANT_QUERY,
    variables: { slug, locale },
  });

  return datoData;
}
