import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import { PlpBlockPicker, PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { PageViewTracker, useAnalytics } from '@diamantaire/darkside/context/analytics';
import { getVRAIServerPlpData, usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { FACETED_NAV_ORDER, MetalType, DiamondTypes, getFormattedPrice } from '@diamantaire/shared/constants';
import { FilterValueProps } from '@diamantaire/shared-product';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type PlpPageProps = {
  key: string;
  plpSlug: string;
  category: string;
  initialFilterValues: FilterValueProps;
  dehydratedState: DehydratedState;
};

type FilterQueryValues = {
  metal?: string;
  diamondType?: string;
  priceMin?: string;
  priceMax?: string;
  style?: string;
  subStyle?: string;
};

function PlpPage(props: InferGetServerSidePropsType<typeof jewelryGetServerSideProps>) {
  const { productListFiltered } = useAnalytics();
  const router = useRouter();
  const { ref: pageEndRef, inView } = useInView({
    rootMargin: '800px',
  });
  const { plpSlug, category, initialFilterValues } = props;
  const [filterValue, setFilterValues] = useState<FilterQueryValues>(initialFilterValues);
  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug, category);
  const { breadcrumb, hero, promoCardCollection, creativeBlocks, seo } = plpData || {};
  const { seoTitle, seoDescription } = seo || {};
  const { data, fetchNextPage, isFetching, hasNextPage } = usePlpVRAIProducts(category, plpSlug, filterValue, {});
  const availableFilters = data?.pages[0]?.availableFilters;
  const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  // Handle pagination
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const onFilterChange = (filters) => {
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

  return (
    <div>
      <NextSeo title={seoTitle} description={seoDescription} />
      <PageViewTracker listPageData={listPageData} />
      <Breadcrumb breadcrumb={breadcrumb} />
      <PlpHeroBanner data={hero} />
      <PlpProductGrid
        data={data}
        plpTitle={hero?.title}
        isFetching={isFetching}
        availableFilters={availableFilters}
        promoCardCollectionId={promoCardCollection?.id}
        creativeBlockIds={creativeBlockIds}
        setFilterValues={onFilterChange}
        filterValue={filterValue}
      />
      <div ref={pageEndRef} />
      <PlpBlockPicker plpSlug={plpSlug} />
    </div>
  );
}

PlpPage.getTemplate = getStandardTemplate;

const createPlpServerSideProps = (category: string) => {
  const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<PlpPageProps>> => {
    context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
    const { query, locale } = context;

    // const isParamBased = true; // Temp: Need to determine which pages use faceted nav
    const { plpSlug, ...qParams } = query;

    //Render 404 if no plpSlug
    if (!plpSlug) {
      return {
        notFound: true,
      };
    }

    const [slug, ...params] = plpSlug;

    const initialFilterValues = getValidFiltersFromFacetedNav(params, qParams);

    // Render 404 if the filter options are not valid / in valid order
    if (!initialFilterValues) {
      return {
        notFound: true,
      };
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({ ...queries.plp.serverSideDato(locale, slug, category) });
    // Todo: fix pattern of using predefined query
    await queryClient.prefetchInfiniteQuery({
      queryKey: [`plp`, category, slug, ...Object.values(initialFilterValues || {})],
      queryFn: ({ pageParam = 1 }) => getVRAIServerPlpData(category, slug, initialFilterValues, { page: pageParam }),
    });

    await queryClient.prefetchQuery({
      ...queries.template.global(locale),
    });

    return {
      props: {
        key: slug,
        plpSlug: slug,
        category,
        initialFilterValues,
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
  const diamondTypeParamIndex = params.findIndex((param) => Object.values(DiamondTypes).includes(param as DiamondTypes));

  const facetOrder = [];

  // For each facet, find the index in the FACETED_NAV_ORDER array
  if (metalParamIndex !== -1) {
    facetOrder[FACETED_NAV_ORDER.indexOf('metal')] = metalParamIndex;
  }
  if (diamondTypeParamIndex !== -1) {
    facetOrder[FACETED_NAV_ORDER.indexOf('diamondType')] = diamondTypeParamIndex;
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

  if (style) {
    filterOptions['style'] = style;
  }

  if (subStyle) {
    filterOptions['subStyle'] = subStyle;
  }

  if (metalParamIndex !== -1) {
    filterOptions['metal'] = params[metalParamIndex];
  }

  if (diamondTypeParamIndex !== -1) {
    filterOptions['diamondType'] = params[diamondTypeParamIndex];
  }

  console.log('filterOptions', filterOptions);

  return filterOptions;
}
