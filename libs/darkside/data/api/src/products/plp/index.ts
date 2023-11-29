import { useInfiniteQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { queryDatoGQL, queryClientApi } from '../../clients';
import { ButtonFragment, ResponsiveImageFragment } from '../../fragments';

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
) {
  // Convert price Obj to price Params
  const optionsQuery = Object.entries(filterOptions).reduce((acc, [key, value]: [string, any]) => {
    if (key === 'price') {
      const { min, max } = value;

      if (min) acc['priceMin'] = min;
      if (max) acc['priceMax'] = max;
    } else if (key === 'metal') {
      acc[key] = value?.join(',').toString() || value;
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

  console.log('optionsQuery', optionsQuery);
  const baseUrl = typeof window === 'undefined' ? BASE_URL : window.location.origin;
  const qParams = new URLSearchParams({
    category,
    slug,
    ...optionsQuery,
    page: page?.toString() || '1',
    limit: limit?.toString(),
  });

  const reqUrl = `${baseUrl}/api/plp/getPlpProducts?${qParams?.toString()}`;

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

type DiamondPlpRequestOptions = SortedRequestOptions & PaginatedRequestOptions;

export async function getVRAIServerDiamondPlpData(
  slug: string,
  { page = 1, limit = 12, sortBy, sortOrder }: DiamondPlpRequestOptions,
) {
  console.log('getVRAIServerDiamondPlpData', sortBy, sortOrder);
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

export function usePlpVRAIProducts(category, slug, filterOptions, pageOptions) {
  const { data, fetchNextPage, isFetching, hasNextPage, error } = useInfiniteQuery(
    [`plp`, category, slug, JSON.stringify(filterOptions || {})],
    ({ pageParam = 1 }) => getVRAIServerPlpData(category, slug, filterOptions, { ...pageOptions, page: pageParam }),
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
        }
      }
      hero {
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

// Gets the server-side Dato data for the PLP page
export async function fetchPlpDatoServerData(locale: string, slug: string, category: string) {
  const qParams = new URLSearchParams({ slug, category, locale });
  const reqUrl = `/page/plpssr?${qParams.toString()}`;

  try {
    const response = await queryClientApi().request({ url: reqUrl });

    return response.data;
  } catch (e) {
    console.log(e);

    return null;
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

const LIST_PAGE_CREATIVE_BLOCK_QUERY = gql`
query listPageCreativeBlocksQuery($locale: SiteLocale, $ids: [ItemId!]) {
  allCreativeBlocks(locale: $locale, filter: {id: {in: $ids}} orderBy: id_ASC) {
    id
    enableGwp
    desktopImage {
      responsiveImage(imgixParams: {w: 666, q: 60, auto: format, fit: crop, crop: focalpoint }) {
        ...responsiveImageFragment
      }
    }
    mobileImage {
      responsiveImage(imgixParams: {w: 375, q: 55, auto: format, fit: crop, crop: focalpoint }) {
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
  }
}
${ResponsiveImageFragment}
`;

type FetchCreativeBlocksProps = {
  allCreativeBlocks: object[];
};

export async function fetchPlpDatoCreativeBlocks(locale: string, ids: string[]) {
  if (!ids) return {};
  const datoData = (await queryDatoGQL({
    query: LIST_PAGE_CREATIVE_BLOCK_QUERY,
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
