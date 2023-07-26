import { useInfiniteQuery } from '@tanstack/react-query';

import { queryDatoGQL } from '../../clients';
import ResponsiveImageFragment from '../../standard-page/component-queries/fragments/ResponsiveImageFragment';

// Fetches VRAI server-side data for PLP

export async function getVRAIServerPlpData(qParams: URLSearchParams, page = 1) {
  const response = await fetch(
    `${
      process.env['NODE_ENV'] === 'production'
        ? 'https://' + process.env['NEXT_PUBLIC_VERCEL_URL'] + '/api/plp/getPlpProducts'
        : 'http://localhost:4200/api/plp/getPlpProducts'
    }`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: {
          qParams: qParams.toString(),
          page,
        },
      }),
    },
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => res);

  return response;
}

export function usePlpVRAIProducts(qParams, initialData, pageParamInit = 0) {
  const { data, fetchNextPage, isFetching } = useInfiniteQuery(
    [`plp-${qParams.toString()}`],
    ({ pageParam = pageParamInit }) => getVRAIServerPlpData(qParams, pageParam),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage?.paginator?.currentPage + 1 <= lastPage?.paginator?.pageCount) {
          // Return next page number
          return lastPage.paginator.currentPage + 1;
        } else {
          // Return false means no next page
          return false;
        }
      },
      initialData,
    },
  );

  // console.log('returned data', data);
  // console.log('returned error', error);

  return { data, fetchNextPage, isFetching };
}

const LIST_PAGE_DATO_SERVER_QUERY = `
query listPageQuery($locale: SiteLocale, $slug: String!) {
    listPage(locale: $locale, filter: {slug: {eq: $slug}}) {
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
