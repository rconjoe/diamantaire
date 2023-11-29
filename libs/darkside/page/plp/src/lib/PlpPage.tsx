import { PageViewTracker, useAnalytics } from '@diamantaire/analytics';
import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import {
  PlpBlockPicker,
  PlpHeroBanner,
  PlpPreviouslyViewed,
  PlpProductGrid,
  PlpSubCategories,
} from '@diamantaire/darkside/components/products/plp';
import { getVRAIServerPlpData, usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import {
  FACETED_NAV_ORDER,
  MetalType,
  DiamondTypes,
  getFormattedPrice,
  RING_STYLES_MAP,
  JEWELRY_SUB_CATEGORY_HUMAN_NAMES,
} from '@diamantaire/shared/constants';
import { FilterValueProps } from '@diamantaire/shared-product';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { jewelryFacetNavLinks } from '../facet-nav-plp-links';

type PlpPageProps = {
  key: string;
  plpSlug: string;
  category: string;
  initialFilterValues: FilterValueProps;
  dehydratedState: DehydratedState;
  urlFilterMethod: 'facet' | 'param' | 'none';
  filterOptions?: Record<string, string[]>;
};

type FilterQueryValues = {
  metal?: string[];
  diamondType?: string[];
  priceMin?: string;
  priceMax?: string;
  style?: string[];
  subStyle?: string[];
};

function PlpPage(props: InferGetServerSidePropsType<typeof jewelryGetServerSideProps>) {
  const { productListFiltered } = useAnalytics();
  const router = useRouter();
  const { ref: pageEndRef, inView } = useInView({
    rootMargin: '800px',
  });
  const { plpSlug, category, initialFilterValues, urlFilterMethod } = props;

  console.log('initialFilterValues', initialFilterValues);
  const [filterValue, setFilterValues] = useState<FilterQueryValues>(initialFilterValues);
  // metal: [],
  // diamondType: [],
  // style: [],
  // subStyle: [],
  // priceMin: '',
  // priceMax: '',

  const [activeSortOptions, setActiveSortOptions] = useState({});
  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug, category);

  const {
    breadcrumb,
    hero,
    promoCardCollection,
    creativeBlocks,
    seo,
    showHeroWithBanner,
    subcategoryFilter,
    sortOptions,
    filterOptions: filterOptionsOverride,
  } = plpData || {};
  const { seoTitle, seoDescription } = seo || {};
  const { data, fetchNextPage, isFetching, hasNextPage } = usePlpVRAIProducts(
    category,
    plpSlug,
    { ...filterValue, ...activeSortOptions },
    {},
  );
  const availableFilters = data?.pages[0]?.availableFilters;
  const creativeBlockIds = creativeBlocks && Array.from(creativeBlocks)?.map((block) => block.id);

  const handleSortChange = ({ sortBy, sortOrder }: { id: string; sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    // If null is passed, reset the sort options
    if (!sortBy) {
      return setActiveSortOptions({});
    }

    setActiveSortOptions({
      sortBy,
      sortOrder,
    });
  };

  // Handle pagination
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const onFilterChange = (filters) => {
    console.log('filter changed', filters);
    setFilterValues(filters);
    handleFilterEvent(filters);
  };

  const listPageData = { productData: data, hero, category };

  function handleFilterEvent(filters) {
    if (window.location.search !== '') {
      const { price } = filters || {};
      const formattedMinPrice = price?.min && getFormattedPrice(price.min);
      const formattedMaxPrice = price?.max && getFormattedPrice(price.max);
      const priceRange = formattedMinPrice && formattedMaxPrice ? `${formattedMinPrice} - ${formattedMaxPrice}` : price;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const hasPriceFilter = urlSearchParams.has('priceMin') || urlSearchParams.has('priceMax');

      const filterEvent = {
        // eslint-disable-next-line camelcase
        list_id: hero?.title,
        filters: {
          ...filters,
          price: hasPriceFilter ? priceRange : undefined,
        },
        // TODO: add sort_by data when ready
      };

      productListFiltered(filterEvent);
    }
  }

  const refinedBreadcrumb = breadcrumb?.map((crumb) => {
    return {
      title: crumb.name,
      path: '/' + crumb.link.slug,
    };
  });

  return (
    <div>
      <NextSeo title={seoTitle} description={seoDescription} />
      <PageViewTracker listPageData={listPageData} />
      <Breadcrumb breadcrumb={refinedBreadcrumb} />
      <PlpHeroBanner showHeroWithBanner={showHeroWithBanner} data={hero} />
      {subcategoryFilter?.length > 0 && (
        <PlpSubCategories
          subcategoryFilter={subcategoryFilter}
          setFilterValues={setFilterValues}
          filterValue={filterValue}
        />
      )}
      <PlpProductGrid
        data={data}
        plpTitle={hero?.title}
        isFetching={isFetching}
        availableFilters={availableFilters}
        promoCardCollectionId={promoCardCollection?.id}
        creativeBlockIds={creativeBlockIds}
        setFilterValues={onFilterChange}
        filterValue={filterValue}
        urlFilterMethod={urlFilterMethod}
        plpSlug={router.query.plpSlug as string}
        sortOptions={sortOptions}
        filterOptionsOverride={filterOptionsOverride}
        handleSortChange={handleSortChange}
      />
      <div ref={pageEndRef} />
      <PlpPreviouslyViewed />
      <PlpBlockPicker plpSlug={plpSlug} />
    </div>
  );
}

PlpPage.getTemplate = getStandardTemplate;

const createPlpServerSideProps = (category: string) => {
  const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PlpPageProps>> => {
    context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    const { query, locale } = context;

    let urlFilterMethod: 'facet' | 'param' | 'none' = 'param';

    const { plpSlug, ...qParams } = query;

    //Render 404 if no plpSlug
    if (!plpSlug) {
      return {
        notFound: true,
      };
    }

    const [slug, ...params] = plpSlug;

    // All ER PLPs use faceted nav
    if (category === 'engagement-rings' || (category === 'jewelry' && jewelryFacetNavLinks.includes(slug.toLowerCase()))) {
      urlFilterMethod = 'facet';
    }

    const initialFilterValues = getValidFiltersFromFacetedNav(params, qParams);

    // Render 404 if the filter options are not valid / in valid order
    if (!initialFilterValues) {
      return {
        notFound: true,
      };
    }

    const queryClient = new QueryClient();
    const contentQuery = queries.plp.serverSideDato(locale, slug, category);

    await queryClient.prefetchQuery({ ...contentQuery });
    // Todo: fix pattern of using predefined query
    await queryClient.prefetchInfiniteQuery({
      queryKey: [`plp`, category, slug, JSON.stringify(initialFilterValues || {})],
      queryFn: ({ pageParam = 1 }) => getVRAIServerPlpData(category, slug, initialFilterValues, { page: pageParam }),
    });

    await queryClient.prefetchQuery({
      ...queries.template.global(locale),
    });

    await queryClient.prefetchQuery({
      ...queries.plp.plpBlockPickerBlocks(locale, slug),
    });

    if (!queryClient.getQueryData(contentQuery.queryKey)?.['listPage']) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        key: slug,
        plpSlug: slug,
        category,
        initialFilterValues,
        urlFilterMethod,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  };

  return getServerSideProps;
};

const jewelryGetServerSideProps = createPlpServerSideProps('jewelry');

export { PlpPage, createPlpServerSideProps };

/**
 * Takes the params from the URL and the query params and returns the filter options.
 * If the params are not in the correct order, it returns undefined.
 * @param {array} params - params from the URL
 * @param {object} query - query params from the URL
 * @param {boolean} isParamBased - whether or not the params are from the URL or the faceted nav
 * @returns {object | undefined} - filter options or undefined
 */

function getValidFiltersFromFacetedNav(
  params: string[],
  query: Record<string, string | string[]>,
): Record<string, string> | undefined {
  const priceMin = query.priceMin?.toString();
  const priceMax = query.priceMax?.toString();
  const style = query.style?.toString();
  const subStyle = query.subStyle?.toString();

  const metalParamIndex = params.findIndex((param) => Object.values(MetalType).includes(param as MetalType));

  // For when metal is a param (not faceted)
  const metalFromQuery = query?.metal
    ?.toString()
    .split(',')
    .map((metalString) => Object.values(MetalType).find((metalType) => metalType === metalString))
    .filter(Boolean);

  const diamondTypeParamIndex = params.findIndex((param) => Object.values(DiamondTypes).includes(param as DiamondTypes));

  // For when diamond is a param (not faceted)
  const diamondFromQuery = query?.diamondType
    ?.toString()
    .split(',')
    .map((diamondTypeString) => Object.values(DiamondTypes).find((diamondType) => diamondType === diamondTypeString))
    .filter(Boolean);

  const styleParamIndex = params.findIndex(
    (param) => Object.keys(JEWELRY_SUB_CATEGORY_HUMAN_NAMES).includes(param) || Object.keys(RING_STYLES_MAP).includes(param),
  );

  // For when style is a param (not faceted)
  const styleFromQuery = style
    ?.toString()
    .split(',')
    .map((styleString) => Object.keys(JEWELRY_SUB_CATEGORY_HUMAN_NAMES).find((key) => key === styleString))
    .filter(Boolean);

  // These are the same?

  const subStyleParamIndex = params.findIndex(
    (param) => Object.keys(JEWELRY_SUB_CATEGORY_HUMAN_NAMES).includes(param) || Object.keys(RING_STYLES_MAP).includes(param),
  );

  // For when subStyle is a param (not faceted)
  const subStyleFromQuery = subStyle
    ?.toString()
    .split(',')
    .map((styleString) => Object.keys(JEWELRY_SUB_CATEGORY_HUMAN_NAMES).find((key) => key === styleString))
    .filter(Boolean);

  const facetOrder = [];

  // For each facet, find the index in the FACETED_NAV_ORDER array
  if (metalParamIndex !== -1) {
    facetOrder[FACETED_NAV_ORDER.indexOf('metal')] = metalParamIndex;
  }

  if (diamondTypeParamIndex !== -1) {
    facetOrder[FACETED_NAV_ORDER.indexOf('diamondType')] = diamondTypeParamIndex;
  }

  if (styleParamIndex !== -1) {
    facetOrder[FACETED_NAV_ORDER.indexOf('style')] = styleParamIndex;
  }

  if (subStyleParamIndex !== -1) {
    facetOrder[FACETED_NAV_ORDER.indexOf('subStyle')] = subStyleParamIndex;
  }

  // Check if the facets are in order by checking if the index of the current facet
  // is greater than the index of the previous facet
  const areFacetsInOrder = facetOrder.filter(Boolean).every((facetIndex, index) => {
    return index === 0 || facetIndex > facetOrder[index - 1];
  });

  // TODO: Need to return 404 if a single facet is not valid
  if (!areFacetsInOrder) {
    return undefined;
  }

  const filterOptions = {};

  if (priceMin || priceMax) {
    filterOptions['price'] = {};
    if (priceMin) {
      filterOptions['price'].min = parseFloat(priceMin);
    }

    if (priceMax) {
      filterOptions['price'].max = parseFloat(priceMax);
    }
  }

  if (styleFromQuery?.length > 0 || styleParamIndex !== -1) {
    filterOptions['style'] = styleFromQuery;
  }

  if (styleParamIndex !== -1) {
    filterOptions['style'] = [params[styleParamIndex]];
  } else if (styleFromQuery && styleParamIndex === -1) {
    filterOptions['style'] = styleFromQuery;
  }

  if (subStyleParamIndex !== -1) {
    filterOptions['subStyle'] = [params[subStyleParamIndex]];
  } else if (subStyleFromQuery && subStyleParamIndex === -1) {
    filterOptions['subStyle'] = subStyleFromQuery;
  }

  if (metalParamIndex !== -1) {
    filterOptions['metal'] = [params[metalParamIndex]];
  } else if (metalFromQuery && metalParamIndex === -1) {
    filterOptions['metal'] = metalFromQuery;
  }

  if (diamondTypeParamIndex !== -1) {
    filterOptions['diamondType'] = [params[diamondTypeParamIndex]];
  } else if (diamondFromQuery && diamondTypeParamIndex === -1) {
    filterOptions['diamondType'] = diamondFromQuery;
  }

  return filterOptions;
}
