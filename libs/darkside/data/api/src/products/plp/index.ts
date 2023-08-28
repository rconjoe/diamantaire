import { useInfiniteQuery } from '@tanstack/react-query';

import { queryDatoGQL } from '../../clients';
import { ButtonFragment, ResponsiveImageFragment } from '../../fragments';

// Fetches VRAI server-side data for PLP
const BASE_URL = `${process.env['NEXT_PUBLIC_PROTOCOL']}${process.env['NEXT_PUBLIC_VERCEL_URL']}`;
const API_URL = `${BASE_URL}/api/plp`;

export async function getVRAIServerPlpData(qParams: URLSearchParams, page = 1, limit = 12) {
  const pageParams = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  const reqUrl = `${API_URL}/getPlpProducts?${qParams.toString()}&${pageParams.toString()}`;

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

export async function getVRAIServerDiamondPlpData(
  slug: string,
  { page = 1, limit = 12 }: { page?: number; limit?: number },
) {
  const pageParams = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  const qParams = new URLSearchParams({ slug });
  const reqUrl = `${API_URL}/getDiamondPlpProducts?${qParams.toString()}&${pageParams.toString()}`;

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

export function usePlpVRAIProducts(qParams, initialData, pageParamInit = 1) {
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    [`plp-${qParams.toString()}`],
    ({ pageParam = pageParamInit }) => getVRAIServerPlpData(qParams, pageParam),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        console.log('lastPage', lastPage);
        if (lastPage && lastPage.paginator.nextPage) {
          // Return next page number
          return lastPage.paginator.nextPage;
        } else {
          // Return false means no next page
          return false;
        }
      },
      initialData,
    },
  );

  return { data, fetchNextPage, isFetching, hasNextPage };
}

export function useDiamondPlpProducts(slug, initialData, pageParamInit = 1) {
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    [`plp-${slug}`],
    ({ pageParam = pageParamInit }) => getVRAIServerDiamondPlpData(slug, { page: pageParam }),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.paginator.nextPage) {
          // Return next page number
          return lastPage.paginator.nextPage;
        } else {
          // Return false means no next page
          return false;
        }
      },
      initialData,
    },
  );

  return { data, fetchNextPage, isFetching, hasNextPage };
}

const LIST_PAGE_DATO_SERVER_QUERY = `
query listPageQuery($locale: SiteLocale, $slug: String!) {
    listPage(locale: $locale, filter: {slugNew: {eq: $slug}}) {
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
          ...on ListPageRecord {
            slug
          }
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
          responsiveImage(imgixParams: {w: 1440, h: 338, q: 60, auto: format, fit: crop, crop: focalpoint }) {
              ...responsiveImageFragment
          }
        }
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
export async function fetchPlpDatoServerData(locale: string, slug: string | string[]) {
  const datoData = await queryDatoGQL({
    query: LIST_PAGE_DATO_SERVER_QUERY,
    variables: { locale, slug },
  });

  return datoData;
}

const LIST_PAGE_PROMO_CARD_COLLECTION_QUERY = `
query listPagePromoCardCollectionQuery($locale: SiteLocale, $id: ItemId!) {
  plpPromoCardCollection(locale: $locale, filter: {id: {eq: $id}}) {
    id
    ... on PlpPromoCardCollectionRecord {
      data {
        title
        link
        textColor {
          hex
        }
        image {
          responsiveImage (imgixParams: {q: 90, w: 344, h: 410, auto: format, fit: crop, crop: focalpoint}) {
            ...responsiveImageFragment
          }
        }
        imageMobile {
          responsiveImage (imgixParams: {w: 344, h: 500, auto: format, fit: crop, crop: focalpoint}) {
            ...responsiveImageFragment
          }
        }
        plpPosition
        plpPositionMobile
      }
    }
    }
}
${ResponsiveImageFragment}
`;

export async function fetchPlpDatoPromoCardCollection(locale: string, id: string) {
  if (!id) return null;
  const datoData = await queryDatoGQL({
    query: LIST_PAGE_PROMO_CARD_COLLECTION_QUERY,
    variables: { locale, id },
  });

  return datoData;
}

const LIST_PAGE_CREATIVE_BLOCK_QUERY = `
query listPageCreativeBlocksQuery($locale: SiteLocale, $ids: [ItemId!]) {
  allCreativeBlocks(locale: $locale, filter: {id: {in: $ids}} orderBy: id_ASC) {
    id
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
    }
  }
}
`;
