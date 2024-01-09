import { PdpTypePlural, pdpTypePluralAsConst } from '@diamantaire/shared/constants';
import { gql } from 'graphql-request';

import { queryDatoGQL } from '../../clients';
import { vraiApiClient } from '../../clients/vraiApiClient';
import { ResponsiveImageFragment } from '../../fragments';

// Get associated DiamondTypes from Product slug
export async function getProductDiamondTypes(productSlug) {
  const apiUrl = `/v1/products/collection/diamondtypes/${productSlug}`;

  const response = await vraiApiClient.get(apiUrl);

  return response.data;
}

// PDP Shopify Data - VRAI Server
export async function getProductPage(productSlug, variantSlug) {
  const qParams = new URLSearchParams({
    slug: productSlug,
    id: variantSlug,
  }).toString();

  const response = await fetch(
    typeof window !== 'undefined'
      ? window.location.origin + `/api/pdp/getPdpProduct?${qParams}`
      : `${
          process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : `http://localhost:4200`
        }/api/pdp/getPdpProduct?${qParams}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((e) => {
      console.log('getPdpProduct error', e);
    });

  return response;
}

// PDP - ENGAGEMENT RING DATA - DatoCMS - TODO: What should be prefetched (prob this)

const ENGAGEMENT_RING_QUERY = gql`
  query engagementRingQuery($locale: SiteLocale, $slug: String!) {
    engagementRingProduct(filter: { slug: { eq: $slug } }, locale: $locale) {
      id
      seoTitle
      seoDescription
      seoFields {
        seoTitle
        seoDescription
      }
      productDescription
      productTitle
      productTitleOverride
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

const JEWELRY_QUERY = gql`
  query jewelryProductQuery($locale: SiteLocale, $slug: String!) {
    jewelryProduct(filter: { slug: { eq: $slug } }, locale: $locale) {
      id
      seoFields {
        seoTitle
        seoDescription
      }
      productTitle
      productDescription
      productIconList {
        productType
      }
      caratWeight
      specLabels {
        id
      }
      extraOptions {
        label
        name
      }
      diamondDescription
    }
  }
`;

const WEDDING_BAND_QUERY = gql`
  query weddingBandProductQuery($locale: SiteLocale, $slug: String!) {
    weddingBandProduct(filter: { slug: { eq: $slug } }, locale: $locale) {
      id
      seoFields {
        seoTitle
        seoDescription
      }
      seoTitle
      seoDescription
      productTitle
      productDescription
      productIconList {
        productType
      }
      trioBlocks {
        id
      }
      caratWeight
      specLabels {
        id
      }
      diamondDescription
      bandWidth
      bandDepth
    }
  }
`;

// PDP - GENERAL COMPONENTS IN ORDER THEY APPEAR - DatoCMS
const PRODUCT_ICON_LIST_QUERY = gql`
  query iconListQuery($locale: SiteLocale, $productType: String!) {
    productIconList(locale: $locale, filter: { productType: { eq: $productType } }) {
      items(locale: $locale) {
        ... on ModularProductIconListItemRecord {
          _modelApiKey
          ctaRoute
          ctaCopy
          copy
          icon {
            width
            height
            url
          }
          additionalInfo {
            id
            title
            image {
              responsiveImage(imgixParams: { w: 448, q: 60, auto: format }) {
                ...responsiveImageFragment
              }
            }
            text
          }
          supportedCountries {
            code
            name
          }
        }
        ... on ModularShippingProductIconListItemRecord {
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
  ${ResponsiveImageFragment}
`;

const PRODUCT_SPEC_LABEL_QUERY = gql`
  query productSpecs($locale: SiteLocale, $id: ItemId) {
    productSpecLabelCollection(filter: { id: { eq: $id } }, locale: $locale) {
      id
      labels(locale: $locale) {
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

const DATO_PRODUCT_TRIO_BLOCK_QUERY = gql`
  query datoTrioBlockQuery($locale: SiteLocale, $id: ItemId) {
    trioBlock(filter: { id: { eq: $id } }, locale: $locale) {
      id
      blocks {
        title
        copy
        ctaCopy
        ctaRoute
        image {
          responsiveImage(imgixParams: { w: 600, q: 40, auto: format, fit: crop, crop: focalpoint }) {
            ...responsiveImageFragment
          }
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

const DATO_PRODUCT_INSTAGRAM_REEL_QUERY = gql`
  query datoInstagramReel($locale: SiteLocale, $id: ItemId) {
    instagramReelBlock(filter: { id: { eq: $id } }, locale: $locale) {
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
            responsiveImage(imgixParams: { w: 280, h: 280, q: 45, auto: format, fit: clamp, crop: focalpoint, dpr: 2 }) {
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

const DATO_PRODUCT_VIDEO_BLOCK_QUERY = gql`
  query datoVideoBlock($locale: SiteLocale, $id: ItemId) {
    diamondContentBlock(filter: { id: { eq: $id } }, locale: $locale) {
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

const DATO_JEWELRY_VARIANT_QUERY = gql`
  query datoJewelryVariantQuery($locale: SiteLocale, $slug: String!) {
    configuration(filter: { configuredProductOptionsInOrder: { eq: $slug } }, locale: $locale) {
      id
      productIconList {
        productType
      }
      cut
      carat
      color
      clarity
      closure
      chainWidth
      outerDiameter
    }
  }
`;

const DATO_VARIANT_QUERY = gql`
  query datoVariantQuery($locale: SiteLocale, $slug: String!) {
    omegaProduct(filter: { shopifyProductHandle: { eq: $slug } }, locale: $locale) {
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
      bandWidthOverride
      metalWeightOverride
      paveCaratWeightOverride
      pdpSubTitle
      productSuggestionQuadBlock {
        id
      }
      productIconList {
        productType
      }
    }
  }
`;

const DATO_PRODUCT_SUGGESTION_BLOCK_QUERY = gql`
  query datoProductSuggestionBlock($locale: SiteLocale, $id: ItemId) {
    productSuggestionQuadBlock(filter: { id: { eq: $id } }, locale: $locale) {
      id
      content {
        productsPerRow
        aboveCopy
        configurationsInOrder {
          ... on OmegaProductRecord {
            collection {
              ... on WeddingBandProductRecord {
                slug
              }
              ... on EngagementRingProductRecord {
                slug
              }
            }
            _modelApiKey
            shopifyProductHandle
          }
          ... on ConfigurationRecord {
            jewelryProduct {
              slug
            }
            _modelApiKey
            configuredProductOptionsInOrder
            variantId
          }
        }
        title1
        configuration1 {
          ... on OmegaProductRecord {
            collection {
              ... on WeddingBandProductRecord {
                slug
              }
              ... on EngagementRingProductRecord {
                slug
              }
            }
            _modelApiKey
            shopifyProductHandle
            plpImage {
              responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
              }
            }
          }
          ... on ConfigurationRecord {
            jewelryProduct {
              slug
            }
            _modelApiKey
            configuredProductOptionsInOrder
            variantId
          }
        }
        title2
        configuration2 {
          ... on OmegaProductRecord {
            collection {
              ... on WeddingBandProductRecord {
                slug
              }
              ... on EngagementRingProductRecord {
                slug
              }
            }
            _modelApiKey
            shopifyProductHandle
            plpImage {
              responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
              }
            }
          }
          ... on ConfigurationRecord {
            jewelryProduct {
              slug
            }
            _modelApiKey
            configuredProductOptionsInOrder
            variantId
          }
        }
        title3
        configuration3 {
          ... on OmegaProductRecord {
            collection {
              ... on WeddingBandProductRecord {
                slug
              }
              ... on EngagementRingProductRecord {
                slug
              }
            }
            _modelApiKey
            shopifyProductHandle
            plpImage {
              responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
              }
            }
          }
          ... on ConfigurationRecord {
            jewelryProduct {
              slug
            }
            _modelApiKey
            configuredProductOptionsInOrder
            variantId
          }
        }
        title4
        configuration4 {
          ... on OmegaProductRecord {
            collection {
              ... on WeddingBandProductRecord {
                slug
              }
              ... on EngagementRingProductRecord {
                slug
              }
            }
            _modelApiKey
            shopifyProductHandle
            plpImage {
              responsiveImage(imgixParams: { w: 344, h: 344, q: 60, auto: format, fit: crop, crop: focalpoint }) {
                ...responsiveImageFragment
              }
            }
          }
          ... on ConfigurationRecord {
            jewelryProduct {
              slug
            }
            _modelApiKey
            configuredProductOptionsInOrder
            variantId
          }
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export async function fetchDatoProductInfo(slug: string, locale: string, productType: PdpTypePlural | 'Engagement Ring') {
  let query = null;

  if (productType === pdpTypePluralAsConst['Engagement Rings'] || productType === 'Engagement Ring') {
    query = ENGAGEMENT_RING_QUERY;
  } else if (productType === pdpTypePluralAsConst['Jewelry']) {
    query = JEWELRY_QUERY;
  } else if (productType === pdpTypePluralAsConst['Wedding Bands']) {
    query = WEDDING_BAND_QUERY;
  } else if (productType === (pdpTypePluralAsConst['Accessories'] as PdpTypePlural)) {
    query = JEWELRY_QUERY;
  } else if (productType === (pdpTypePluralAsConst['Gift Cards'] as PdpTypePlural)) {
    query = JEWELRY_QUERY;
  } else if (productType === (pdpTypePluralAsConst['Ring Sizer'] as PdpTypePlural)) {
    query = JEWELRY_QUERY;
  } else {
    console.log('Unknown productType');

    return null;
  }

  try {
    const datoData = await queryDatoGQL({
      query,
      variables: { slug, locale },
    });

    return datoData;
  } catch (e) {
    console.log('Error fetching PDP content', e);
  }
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

export async function fetchDatoProductSuggestionBlock(id: string, locale: string) {
  const datoData = await queryDatoGQL({
    query: DATO_PRODUCT_SUGGESTION_BLOCK_QUERY,
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

export async function fetchDatoVariant(slug: string, productType: string, locale: string) {
  const datoData = await queryDatoGQL({
    query:
      productType === 'Engagement Ring' || productType === 'Wedding Band' ? DATO_VARIANT_QUERY : DATO_JEWELRY_VARIANT_QUERY,
    variables: { slug, locale },
  });

  return datoData;
}
