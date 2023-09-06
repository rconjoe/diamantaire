import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import { PlpBlockPicker, PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { getVRAIServerPlpData, usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { DIAMOND_TYPE_HUMAN_NAMES, FACETED_NAV_ORDER, METALS_IN_HUMAN_NAMES } from '@diamantaire/shared/constants';
import { ListPageItemWithConfigurationVariants, FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type PlpPageProps = {
  plpSlug: string;
  category: string;
  productData: {
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
  objectParams: string;
  dehydratedState: DehydratedState;
};

function objectToURLSearchParams(obj: object) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}

function parseStringToObjectWithNestedValues(initialString: string) {
  return JSON.parse(initialString, (_key, value) => {
    // Check if the value is a string and can be parsed again
    if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);

        return parsedValue;
      } catch (error) {
        // If it's not a valid JSON string, return the original value
        return value;
      }
    }

    return value;
  });
}

function PlpPage(props: InferGetServerSidePropsType<typeof jewelryGetServerSideProps>) {
  const router = useRouter();
  const { ref: pageEndRef, inView } = useInView({
    rootMargin: '800px',
  });
  const { plpSlug, category, productData, objectParams } = props;
  const paginationPages = productData?.paginator?.totalPages || 1;

  const initialFilterValuesWithSlug = parseStringToObjectWithNestedValues(objectParams);
  const initialFilterValues = parseStringToObjectWithNestedValues(objectParams);

  const { products: initialProducts, availableFilters } = productData;

  initialFilterValuesWithSlug['priceMin'] = parseFloat(initialFilterValuesWithSlug.price.min);
  initialFilterValuesWithSlug['priceMax'] = parseFloat(initialFilterValuesWithSlug.price.max);

  delete initialFilterValuesWithSlug.price;
  delete initialFilterValues.slug;
  delete initialFilterValues.category;

  const [qParams, setQParams] = useState(objectToURLSearchParams(initialFilterValuesWithSlug));

  const [filterValue, setFilterValues] = useState<FilterValueProps>({
    ...initialFilterValues,
  });

  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug, category);

  const { breadcrumb, hero, promoCardCollection, creativeBlocks, seo } = plpData || {};

  const { seoTitle, seoDescription } = seo || {};

  const { data, fetchNextPage, isFetching, hasNextPage } = usePlpVRAIProducts(qParams, initialProducts);

  const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  // Handle pagination
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Handle filter changes
  useEffect(() => {
    // const price = filterValue?.price;
    const newFilterObject = {
      slug: plpSlug,
      category,
    };

    if (filterValue?.metal) {
      newFilterObject['metal'] = filterValue.metal;
    }

    if (filterValue?.diamondType) {
      newFilterObject['diamondType'] = filterValue.diamondType;
    }

    if (filterValue?.price?.min) {
      newFilterObject['priceMin'] = filterValue?.price?.min;
    } else {
      newFilterObject['priceMin'] = availableFilters.price[0];
    }

    if (filterValue?.price?.max) {
      newFilterObject['priceMax'] = filterValue?.price?.max;
    } else {
      newFilterObject['priceMax'] = availableFilters.price[1];
    }

    const newParams = objectToURLSearchParams({
      ...newFilterObject,
    });

    setQParams(newParams);
  }, [availableFilters.price, category, filterValue, paginationPages, plpSlug]);

  return (
    <div>
      <NextSeo title={seoTitle} description={seoDescription} />
      <Breadcrumb breadcrumb={breadcrumb} />
      <PlpHeroBanner data={hero} />
      <PlpProductGrid
        data={data}
        isFetching={isFetching}
        availableFilters={availableFilters}
        promoCardCollectionId={promoCardCollection?.id}
        creativeBlockIds={creativeBlockIds}
        initialProducts={initialProducts}
        initialFilterValues={initialFilterValues}
        setFilterValues={setFilterValues}
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
    const isFacetedNav = Array.isArray(query.plpSlug);
    const slug = isFacetedNav ? query.plpSlug[0].toString() : query.plpSlug.toString();
    const priceMin = query?.priceMin as string;
    const priceMax = query?.priceMax as string;

    const params = Array.isArray(query.plpSlug) && query.plpSlug.slice(1);

    const metal = params.find((param) => METALS_IN_HUMAN_NAMES[param]);
    const diamondType = params.find((param) => DIAMOND_TYPE_HUMAN_NAMES[param]);

    const matchesFacetNavOrder = FACETED_NAV_ORDER.every((facet, index) => {
      if (facet === 'metal') {
        if (!metal) return true;

        return metal === params[index];
      } else if (facet === 'diamondType') {
        if (!diamondType) return true;

        return diamondType === params[index];
      }

      return false;
    });

    if (!matchesFacetNavOrder) {
      return {
        notFound: true,
      };
    }

    const qParamsObject = {
      slug,
      category,
    };

    if (priceMin) {
      qParamsObject['priceMin'] = parseFloat(priceMin);
    }

    if (priceMax) {
      qParamsObject['priceMax'] = parseFloat(priceMax);
    }

    if (metal) {
      qParamsObject['metal'] = metal;
    }

    if (diamondType) {
      qParamsObject['diamondType'] = diamondType;
    }

    const qParams = new URLSearchParams(
      Object.entries({ ...qParamsObject }).reduce((prevValue, [key, value]) => {
        if (value) {
          if (typeof value === 'object') {
            // If the value is an object, stringify it to maintain the nested structure
            prevValue[key] = JSON.stringify(value);
          } else {
            prevValue[key] = Array.isArray(value) ? value[0] : value;
          }
        }

        return prevValue;
      }, {}),
    );

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({ ...queries.plp.serverSideDato(locale, slug, category) });
    const productData = await getVRAIServerPlpData(qParams, 1);

    if (productData.error) {
      return {
        notFound: true,
      };
    }

    const objectParams: { [key: string]: string | object } = Object.fromEntries(qParams);

    objectParams['price'] = {
      min: priceMin || productData?.availableFilters?.price[0],
      max: priceMax || productData?.availableFilters?.price[1],
    };

    delete objectParams.priceMin;
    delete objectParams.priceMax;

    const objectParamsStringified = JSON.stringify(objectParams);

    await queryClient.prefetchQuery({
      ...queries.header.content(locale),
    });

    await queryClient.prefetchQuery({
      ...queries.footer.content(locale),
    });

    return {
      props: {
        plpSlug: slug,
        category,
        productData,
        objectParams: objectParamsStringified,
        dehydratedState: dehydrate(queryClient),
      },
    };
  };

  return getServerSideProps;
};

const jewelryGetServerSideProps = createPlpServerSideProps('jewelry');

export { PlpPage, createPlpServerSideProps };
