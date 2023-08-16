import { Breadcrumb } from '@diamantaire/darkside/components/common-ui';
import { PlpBlockPicker, PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { getVRAIServerDiamondPlpData, useDiamondPlpProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { /*DehydratedState, QueryClient,*/ DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
  // GetServerSidePropsContext,
  // GetServerSidePropsResult,
} from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default PlpPage;

type DiamondPlpPageProps = {
  plpSlug: string;
  productData: {
    variantsInOrder: string[];
    products: any[];
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
  };
  dehydratedState: DehydratedState;
};

function PlpPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { ref: pageEndRef, inView } = useInView({
    rootMargin: '800px',
  });
  const { plpSlug, productData } = props;
  // const paginationPages = productData?.paginator?.totalPages || 1;
  const { products: initialProducts } = productData;

  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug);

  const { breadcrumb, hero, promoCardCollection, creativeBlocks, seo } = plpData || {};

  const { seoTitle, seoDescription } = seo || {};

  const { data, fetchNextPage, isFetching, hasNextPage } = useDiamondPlpProducts(plpSlug, initialProducts);

  const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  // Handle pagination
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div>
      <NextSeo title={seoTitle} description={seoDescription} />
      <Breadcrumb breadcrumb={breadcrumb} />
      <PlpHeroBanner data={hero} />
      <PlpProductGrid
        data={data}
        isFetching={isFetching}
        promoCardCollectionId={promoCardCollection?.id}
        creativeBlockIds={creativeBlockIds}
        initialProducts={initialProducts}
      />
      <div ref={pageEndRef} />
      <PlpBlockPicker plpSlug={plpSlug} />
    </div>
  );
}

const getServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<DiamondPlpPageProps>> => {
  const { query, locale } = context;
  const { plpSlug } = query;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ ...queries.plp.serverSideDato(locale, plpSlug) });
  const productData = await getVRAIServerDiamondPlpData(plpSlug.toString(), { page: 1 });

  if (productData.error) {
    return {
      notFound: true,
    };
  }

  await queryClient.prefetchQuery({
    ...queries.header.content(locale),
  });

  await queryClient.prefetchQuery({
    ...queries.footer.content(locale),
  });

  return {
    props: {
      plpSlug: plpSlug.toString(),
      productData,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export { getServerSideProps };
