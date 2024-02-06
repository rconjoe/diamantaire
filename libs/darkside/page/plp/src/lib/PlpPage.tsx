import { PageViewTracker, useAnalytics } from '@diamantaire/analytics';
import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import {
  PlpBlockPicker,
  PlpHeroBanner,
  PlpPreviouslyViewed,
  PlpProductGrid,
  PlpSubCategories,
} from '@diamantaire/darkside/components/products/plp';
import { getAllPlpSlugs, usePlpVRAIProducts, getVRAIServerPlpData } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import {
  FACETED_NAV_ORDER,
  MetalType,
  DiamondTypes,
  RING_STYLES_MAP,
  SUBSTYLE_SLUGS,
  STYLE_SLUGS,
} from '@diamantaire/shared/constants';
import { isEmptyObject, getSwrRevalidateConfig } from '@diamantaire/shared/helpers';
import { FilterValueProps } from '@diamantaire/shared-product';
import { pageMargin } from '@diamantaire/styles/darkside-styles';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

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

const PlpStyles = styled.div``;

function PlpPage(props: InferGetStaticPropsType<typeof jewelryGetStaticProps>) {
  const { productListFiltered } = useAnalytics();

  const [prevQuery, setPrevQuery] = useState(null);

  const router = useRouter();

  const { locale, query } = router || {};

  const { ref: pageEndRef, inView } = useInView({ rootMargin: '1600px' });

  const { plpSlug, category, initialFilterValues, urlFilterMethod } = props;

  const [filterValue, setFilterValues] = useState<FilterQueryValues>(initialFilterValues);

  const [activeSortOptions, setActiveSortOptions] = useState({});

  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(locale, plpSlug, category);

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
    locale,
  );

  const availableFilters = data?.pages[0]?.availableFilters || {};

  if (category && category === 'engagement-rings') {
    delete availableFilters.price;
    delete availableFilters.subStyles;
  }

  if (plpSlug) {
    if (plpSlug.includes('-setting')) {
      delete availableFilters.styles;
    }

    if (plpSlug.includes('-cut')) {
      delete availableFilters.diamondType;
    }
  }

  const creativeBlockIds = creativeBlocks && Array.from(creativeBlocks)?.map((block) => block.id);

  const listPageData = { productData: data, hero, category };

  const onSortChange = ({ sortBy, sortOrder }: { id: string; sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    // If null is passed, reset the sort options
    if (!sortBy) {
      return setActiveSortOptions({});
    }

    setActiveSortOptions({
      sortBy,
      sortOrder,
    });
  };

  const onFilterChange = (filters) => {
    setFilterValues(filters);

    handleFilterEvent(filters);
  };

  const handleFilterEvent = (filters) => {
    if (window.location.search !== '') {
      const { price } = filters || {};

      const { isPlpPriceRange } = price || {};

      const priceRange = price?.min && price?.max ? `${price?.min} - ${price?.max}` : price;

      const urlSearchParams = new URLSearchParams(window.location.search);

      const hasPriceFilter = urlSearchParams.has('priceMin') || urlSearchParams.has('priceMax');

      const filterEvent = {
        // eslint-disable-next-line camelcase
        list_id: hero?.title,
        filters: {
          ...filters,
          price: hasPriceFilter ? { ...priceRange, isPlpPriceRange } : undefined,
        },
        // TODO: add sort_by data when ready
      };

      productListFiltered(filterEvent);
    }
  };

  const refinedBreadcrumb = breadcrumb?.map((crumb) => {
    return {
      title: crumb.name,
      path: crumb?.link?.slug ? '/' + crumb.link.slug : '',
    };
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (!deepEqual(prevQuery, query)) {
      if (urlFilterMethod === 'param') {
        setFilterValues(getFiltersFromQueryParams(query));
      }
    }

    return () => {
      setPrevQuery(query);
    };
  }, [query]);

  return (
    <PlpStyles>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={
          (process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http:localhost:4200') +
          `/${router.locale}` +
          router.asPath
        }
      />

      <PageViewTracker listPageData={listPageData} />

      <Breadcrumb breadcrumb={refinedBreadcrumb} spacingType="containedWidth" />

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
        onSortChange={onSortChange}
        subcategoryFilter={subcategoryFilter}
      />

      <div ref={pageEndRef} />
      <div className="container-wrapper">
        <PlpPreviouslyViewed />

        {category && plpSlug && <PlpBlockPicker category={category} plpSlug={plpSlug} />}
      </div>
    </PlpStyles>
  );
}

PlpPage.getTemplate = getStandardTemplate;

const createGetStaticPaths = (category: string) => {
  const getStaticPaths = async function getStaticPaths() {
    const excludedSlugs = [];

    const pageSlugs = await getAllPlpSlugs();

    // Define the locales you want to include
    const includedLocales = ['en-US'];

    // Filter the locales and generate paths
    const paths = pageSlugs
      .filter((p) => p.category && p.slug && p.category === category && !excludedSlugs.includes(p.slug))
      .flatMap(({ slug }) => {
        // Skip if slug is not defined or empty
        if (!slug || slug === '') return [];

        return includedLocales.map((locale) => ({
          locale,
          params: { plpSlug: [slug] },
        }));
      });

    return {
      paths,
      fallback: true,
    };
  };

  return getStaticPaths;
};

const createStaticProps = (category: string) => {
  const getStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<PlpPageProps>> => {
    const { params, locale } = context;

    let urlFilterMethod: 'facet' | 'param' | 'none' = 'param';

    const { plpSlug, ...qParams } = params;

    // Render 404 if no plpSlug
    if (!plpSlug) {
      return {
        notFound: true,
      };
    }

    const [slug, ...plpParams] = plpSlug;

    // All ER PLPs use faceted nav
    if (category === 'engagement-rings') {
      urlFilterMethod = 'facet';
    }

    let initialFilterValues = getFiltersFromFacetedNav(plpParams, qParams);

    // Render 404 if the filter options are not valid / in valid order
    if (!initialFilterValues || !slug) {
      return {
        notFound: true,
      };
    }

    const queryClient = new QueryClient();

    const contentQuery = queries.plp.serverSideDato(locale, slug, category);

    await queryClient.prefetchQuery({ ...contentQuery });

    const presetFilters = queryClient.getQueryData<{
      listPage: {
        filterOptions: Record<string, string[]>[];
      };
    }>(contentQuery.queryKey).listPage?.filterOptions;

    // This is the only edge case right now.  Ex: /engagement-rings/settings
    if (presetFilters?.length > 0 && isEmptyObject(initialFilterValues)) {
      initialFilterValues = {
        metal: ['yellow-gold'],
        diamondType: ['round-brilliant'],
      };
    }

    // Todo: fix pattern of using predefined query
    await queryClient.prefetchInfiniteQuery({
      queryKey: [`plp`, category, slug, JSON.stringify(initialFilterValues || {}), locale],
      queryFn: ({ pageParam = 1 }) => getVRAIServerPlpData(category, slug, initialFilterValues, { page: pageParam }, locale),
    });

    await queryClient.prefetchQuery({
      ...queries.template.global(locale),
    });

    await queryClient.prefetchQuery({
      ...queries.plp.plpBlockPickerBlocks(locale, slug, category),
    });

    // Render 404 if no content is returned
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

      revalidate: getSwrRevalidateConfig() || 60 * 60,
    };
  };

  return getStaticProps;
};

// JEWELRY
const jewelryGetStaticProps = createStaticProps('jewelry');
const jewelryGetStaticPaths = createGetStaticPaths('jewelry');

// ER
const engagementRingsGetStaticProps = createStaticProps('engagement-rings');
const engagementRingsGetStaticPaths = createGetStaticPaths('engagement-rings');

// WB
const weddingRingsGetStaticProps = createStaticProps('wedding-rings');
const weddingRingsGetStaticPaths = createGetStaticPaths('wedding-rings');

export {
  PlpPage,
  engagementRingsGetStaticProps,
  engagementRingsGetStaticPaths,
  jewelryGetStaticProps,
  jewelryGetStaticPaths,
  weddingRingsGetStaticProps,
  weddingRingsGetStaticPaths,
};

/**
 * Takes the params from the URL and the query params and returns the filter options.
 * If the params are not in the correct order, it returns undefined.
 * @param {array} params - params from the URL
 * @param {object} query - query params from the URL
 * @param {boolean} isParamBased - whether or not the params are from the URL or the faceted nav
 * @returns {object | undefined} - filter options or undefined
 */

function getFiltersFromFacetedNav(
  params: string[],
  query: Record<string, string | string[]>,
): Record<string, string[]> | undefined {
  const priceMin = query.priceMin?.toString();
  const priceMax = query.priceMax?.toString();
  const isPlpPriceRange = query.isPlpPriceRange;
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

  const styleParamIndex = params.findIndex((param) => STYLE_SLUGS.includes(param));

  // For when style is a param (not faceted)
  const styleFromQuery = style
    ?.toString()
    .split(',')
    .map((styleString) => STYLE_SLUGS.find((key) => key === styleString))
    .filter(Boolean);

  const subStyleParamIndex = params.findIndex(
    (param) => SUBSTYLE_SLUGS.includes(param) || Object.keys(RING_STYLES_MAP).includes(param),
  );

  // For when subStyle is a param (not faceted)
  const subStyleFromQuery = subStyle
    ?.toString()
    .split(',')
    .map((styleString) => SUBSTYLE_SLUGS.find((key) => key === styleString))
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

    filterOptions['price'].isPlpPriceRange = isPlpPriceRange;
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

function getFiltersFromQueryParams(query) {
  const initialQueryValues = {};

  if (query) {
    Object.keys(query).forEach((key) => {
      if (!['priceMin', 'priceMax', 'isPlpPriceRange'].includes(key) && key !== 'plpSlug') {
        initialQueryValues[key] = query[key]?.toString().split(',');
      }
    });

    if (query.priceMin || query.priceMax) {
      initialQueryValues['price'] = {
        min: query.priceMin,
        max: query.priceMax,
        isPlpPriceRange: query.isPlpPriceRange ? JSON.parse(query.isPlpPriceRange) : false,
      };
    }
  }

  return initialQueryValues;
}

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
