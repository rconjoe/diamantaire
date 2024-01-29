import { convertPriceToUSD, getCurrencyFromLocale, getVat } from '@diamantaire/shared/constants';
import { getCountry } from '@diamantaire/shared/helpers';
import { useInfiniteQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { queryDatoGQL } from '../../clients';
import { ButtonFragment, ResponsiveImageFragment } from '../../fragments';

export * from './getAllPlpSlugs';

type SortedRequestOptions = {
  sortBy?: string;
  sortOrder?: string;
};

type PaginatedRequestOptions = {
  limit?: number;
  page: number;
};

// Fetches VRAI server-side data for PLP
const BASE_URL = `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}`;

export async function getVRAIServerPlpData(
  category: string,
  slug: string,
  filterOptions = {},
  { page = 1, limit = 12 }: PaginatedRequestOptions,
  locale,
) {
  if (!slug && !category) return {};

  // Convert price Obj to price Params
  const optionsQuery = Object.entries(filterOptions).reduce((acc, [key, value]: [string, any]) => {
    if (key === 'price') {
      const { min, max, isPlpPriceRange } = value;

      const convertToUSD = locale !== 'en-US' && isPlpPriceRange;

      const currency = getCurrencyFromLocale(locale);

      const countryCode = getCountry(locale);

      const amountMinusVat = (amountInCents) => {
        const vat = getVat(countryCode);

        const res = amountInCents / (1 + vat) / 100;

        return Math.round(res) * 100;
      };

      if (min) {
        acc['priceMin'] = convertToUSD ? amountMinusVat(convertPriceToUSD(min, currency)) + 1 : min;
      }

      if (max) {
        acc['priceMax'] = convertToUSD ? amountMinusVat(convertPriceToUSD(max, currency)) - 1 : max;
      }
    } else if (key === 'metal') {
      acc[key] = value?.join(',').toString() || value;
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

  const qParams = new URLSearchParams({
    category,
    slug,
    ...optionsQuery,
    page: page?.toString() || '1',
    limit: limit?.toString(),
    locale,
  });

  const isServer = typeof window === 'undefined';

  let reqUrl = `${process.env.VRAI_SERVER_BASE_URL}/v1/products/plp?${qParams?.toString()}`;

  if (!isServer) {
    reqUrl = `${window.location.origin}/api/plp/getPlpProducts?${qParams?.toString()}`;
  }

  try {
    const response = await fetch(reqUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(isServer && { 'x-api-key': process.env.VRAI_SERVER_API_KEY }),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => res);

    return response;
  } catch (err) {
    console.log('Cannot fetch plp products', err);

    return null;
  }
}

type DiamondPlpRequestOptions = SortedRequestOptions & PaginatedRequestOptions;

export async function getVRAIServerDiamondPlpData(
  slug: string,
  { page = 1, limit = 12, sortBy, sortOrder }: DiamondPlpRequestOptions,
) {
  const baseUrl = typeof window === 'undefined' ? BASE_URL : window.location.origin;
  const pageParams = new URLSearchParams({ page: page?.toString(), limit: limit.toString(), sortBy, sortOrder });
  const qParams = new URLSearchParams({ slug });
  const reqUrl = `${baseUrl}/api/plp/getDiamondPlpProducts?${qParams?.toString()}&${pageParams?.toString()}`;

  const response = await fetch(reqUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => res);

  return response;
}

export function usePlpVRAIProducts(category, slug, filterOptions, pageOptions, locale) {
  const { data, fetchNextPage, isFetching, hasNextPage, error } = useInfiniteQuery(
    [`plp`, category, slug, JSON.stringify(filterOptions || {}), locale],
    ({ pageParam = 1 }) => getVRAIServerPlpData(category, slug, filterOptions, { ...pageOptions, page: pageParam }, locale),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage?.paginator?.nextPage) {
          // Return next page number
          return lastPage.paginator.nextPage;
        } else {
          // Return false means no next page
          return false;
        }
      },
    },
  );

  return { data, fetchNextPage, isFetching, hasNextPage, error };
}

export function useDiamondPlpProducts(slug, pageParamInit = 1, options) {
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    [`plp-${slug}`, ...Object.values(options || {})],
    ({ pageParam = pageParamInit }) =>
      getVRAIServerDiamondPlpData(slug, { ...options, page: pageParam === null ? 1 : pageParam }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage?.paginator?.nextPage) {
          // Return next page number
          return lastPage.paginator.nextPage;
        } else {
          // Return false means no next page
          return false;
        }
      },
    },
  );

  return { data, fetchNextPage, isFetching, hasNextPage };
}

export const LIST_PAGE_DATO_SERVER_QUERY = gql`
  query listPageQuery($locale: SiteLocale, $slug: String!, $category: String!) {
    listPage(locale: $locale, filter: { slugNew: { eq: $slug }, category: { eq: $category } }) {
      id
      seo {
        id
        seoTitle
        seoDescription
        _seoMetaTags {
          attributes
          content
        }
      }
      breadcrumb {
        id
        name
        link {
          ... on ListPageRecord {
            slug
            
          }
          ... on StandardPageRecord {
            slug
          }
        }
      }
      showHeroWithBanner
      subcategoryFilter {
        id
        data {
          title
          image {
            responsiveImage(imgixParams: { w: 200, h: 200, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          slug
          link
        }
      }
      hero {
        ... on ListpageHeroBannerRecord {
          title
          copy
          textColor {
            hex
          }
          desktopImage {
            url
            alt
            mimeType
            responsiveImage(imgixParams: { w: 1440, h: 338, q: 60, auto: format, fit: crop, crop: focalpoint, dpr: 2 }) {
              ...responsiveImageFragment
            }
          }
          mobileImage {
            url
            alt
            mimeType
            responsiveImage(imgixParams: { w: 375, h: 180, q: 55, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          darksideButtons {
            ${ButtonFragment}
          }
        }
      }
      sortOptions {
        field
        label
        id
        isDescendingOrder
      }
      filterOptions {
        filterLabel
        filterValue
      }
      creativeBlocks {
        id
      }
      promoCardCollection {
        id
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export async function fetchPlpShopTheLook(productIds: string[], locale: string) {
  const baseUrl = typeof window === 'undefined' ? BASE_URL : window.location.origin;

  const ids = productIds.join(',');

  const qParams = new URLSearchParams({ ids, locale });

  const endpoint = `${baseUrl}/api/plp/getPlpProductsByIds?${qParams?.toString()}}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => res);

    return response;
  } catch (error) {
    console.log('Error retrieving shop the look data', error);

    return {};
  }
}

// Gets the server-side Dato data for the PLP page
export async function fetchPlpDatoServerData(locale: string, slug: string, category: string) {
  if (!category && !slug) return {};

  try {
    const response = await queryDatoGQL({ query: LIST_PAGE_DATO_SERVER_QUERY, variables: { locale, category, slug } });

    return response;
  } catch (error) {
    console.log('Error retrieving list page ssr data', error);

    return {};
  }
}

const LIST_PAGE_PROMO_CARD_COLLECTION_QUERY = gql`
  query listPagePromoCardCollectionQuery($locale: SiteLocale, $id: ItemId!) {
    plpPromoCardCollection(locale: $locale, filter: { id: { eq: $id } }) {
      id
      ... on PlpPromoCardCollectionRecord {
        data {
          title
          link
          route
          textColor {
            hex
          }
          image {
            responsiveImage(imgixParams: { q: 90, w: 344, h: 410, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          imageMobile {
            responsiveImage(imgixParams: { w: 344, h: 500, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
            }
          }
          plpPosition
          plpPositionMobile
          enableGwp
        }
      }
    }
  }
  ${ResponsiveImageFragment}
`;

export async function fetchPlpDatoPromoCardCollection(locale: string, id: string) {
  if (!id) return {};

  const datoData = await queryDatoGQL({
    query: LIST_PAGE_PROMO_CARD_COLLECTION_QUERY,
    variables: { locale, id },
  });

  return datoData;
}

const getPlpCreativeBlockQuery = (useLargeCreativeImageInDesktop, useLargeCreativeImageInMobile) => {
  const desktopImageHeight = useLargeCreativeImageInDesktop ? 804 : 705;
  const mobileImageHeight = useLargeCreativeImageInMobile ? 500 : 350;

  return gql`
  query listPageCreativeBlocksQuery($locale: SiteLocale, $ids: [ItemId!]) {
    allCreativeBlocks(locale: $locale, filter: {id: {in: $ids}} orderBy: id_ASC) {
      id
      enableGwp
      desktopImage {
        responsiveImage(imgixParams: {w: 636, h: ${desktopImageHeight}, q: 60, auto: format, fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
      }
      mobileImage {
        responsiveImage(imgixParams: {w: 375, h: ${mobileImageHeight}, q: 55, auto: format, fit: crop, crop: focalpoint }) {
          ...responsiveImageFragment
        }
      }
      desktopCopy
      mobileCopy
      title
      ctaCopy
      ctaRoute
      darksideButtons {
        ${ButtonFragment}
      }
      additionalClass
      configurationsInOrder {
        ... on OmegaProductRecord {
          shopifyProductHandle
        }
        ... on ConfigurationRecord {
          variantId
        }
      }
    }
  }
  ${ResponsiveImageFragment}
  `;
};

type FetchCreativeBlocksProps = {
  allCreativeBlocks: object[];
};

export async function fetchPlpDatoCreativeBlocks(
  locale: string,
  ids: string[],
  useLargeCreativeImageInDesktop: boolean,
  useLargeCreativeImageInMobile: boolean,
) {
  if (!ids) return {};

  const datoData = (await queryDatoGQL({
    query: getPlpCreativeBlockQuery(useLargeCreativeImageInDesktop, useLargeCreativeImageInMobile),
    variables: { locale, ids },
  })) as FetchCreativeBlocksProps;

  // Fallback if the ids are not found, otherwise it returns every creative block
  if (datoData?.allCreativeBlocks?.length > 2) {
    return null;
  }

  return datoData;
}

export const DIAMOND_PLP_DATA_CONFIG_QUERY = `
query diamondPlpQuery($slug: String!, $category: String!) {
  listPage(filter: {slugNew: {eq: $slug}, category: {eq: $category}}) {
    diamondPlpDataConfig {
      colors
      diamondTypes
      sortBy
      sortOrder
    }
  }
}
`;
