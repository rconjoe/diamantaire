import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import { PlpBlockPicker, PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { PageViewTracker, useAnalytics } from '@diamantaire/darkside/context/analytics';
import { getVRAIServerPlpData, usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import {
  DIAMOND_TYPE_HUMAN_NAMES,
  FACETED_NAV_ORDER,
  METALS_IN_HUMAN_NAMES,
  getFormattedPrice,
} from '@diamantaire/shared/constants';
import { ListPageItemWithConfigurationVariants, FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
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
  productData?: {
    variantsInOrder: string[];
    products: ListPageItemWithConfigurationVariants[];
    paginator: {
      totalPages: number;
      totalDocs: number;
      limit: number;
      page: number;
      pagingCounter: number;
      hasPrevPage: boolean;
      hasNextPage: boolean;
      prevPage: number | null;
      nextPage: number | null;
    };
    availableFilters: {
      [key in FilterTypeProps]: string[];
    };
  };
  filterOptions: FilterValueProps;
  dehydratedState: DehydratedState;
};

function PlpPage(props: InferGetServerSidePropsType<typeof jewelryGetServerSideProps>) {
  const { productListFiltered } = useAnalytics();
  const router = useRouter();
  const { ref: pageEndRef, inView } = useInView({
    rootMargin: '800px',
  });
  const { plpSlug, category, filterOptions } = props;
  const [filterValue, setFilterValues] = useState<FilterValueProps>(filterOptions);
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
    const { query, locale } = context;

    const isParamBased = true; // Temp: Need to determine which pages use faceted nav
    const { plpSlug, ...qParams } = query;

    if (!plpSlug) {
      return {
        notFound: true,
      };
    }

    const [slug, ...params] = plpSlug;

    const filterOptions = getValidFiltersFromFacetedNav(params, qParams, isParamBased);

    if (!filterOptions) {
      return {
        notFound: true,
      };
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({ ...queries.plp.serverSideDato(locale, slug, category) });
    await queryClient.prefetchInfiniteQuery({
      queryKey: [`plp`, category, slug, ...Object.values(filterOptions || {})],
      queryFn: ({ pageParam = 1 }) => getVRAIServerPlpData(category, slug, filterOptions, { page: pageParam }),
    });

    await queryClient.prefetchQuery({
      ...queries.header.content(locale),
    });

    return {
      props: {
        key: slug,
        plpSlug: slug,
        category,
        filterOptions,
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
  isParamBased = true,
): Record<string, string> | undefined {
  const priceMin = query?.priceMin?.toString();
  const priceMax = query?.priceMax?.toString();

  const metal = params.find((param) => METALS_IN_HUMAN_NAMES[param]) || null;

  const diamondType = params.find((param) => DIAMOND_TYPE_HUMAN_NAMES[param]) || null;

  const matchesFacetNavOrder = FACETED_NAV_ORDER.every((facet, index) => {
    if (facet === 'metal') {
      if (!metal) return true;

      if (isParamBased) {
        return true;
      } else {
        // Only need to check param order on faceted nav
        return metal === params[index];
      }
    } else if (facet === 'diamondType') {
      if (!diamondType) return true;

      if (isParamBased) {
        return true;
      } else {
        return diamondType === params[index];
      }
    }

    return false;
  });

  if (!matchesFacetNavOrder) {
    return undefined;
  }

  const filterOptions = {};

  if (priceMin) {
    filterOptions['priceMin'] = parseFloat(priceMin);
  }

  if (priceMax) {
    filterOptions['priceMax'] = parseFloat(priceMax);
  }

  if (metal) {
    filterOptions['metal'] = metal;
  }

  if (diamondType) {
    filterOptions['diamondType'] = diamondType;
  }

  return filterOptions;
}
