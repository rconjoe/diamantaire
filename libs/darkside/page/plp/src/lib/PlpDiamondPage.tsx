import { Breadcrumb, DarksideButton } from '@diamantaire/darkside/components/common-ui';
import { PlpBlockPicker, PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { getVRAIServerDiamondPlpData, useDiamondPlpProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { ListPageDiamondItem } from '@diamantaire/shared-diamond';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

import { PlpSortOptions } from './components/PlpSortOptions';

type DiamondPlpPageProps = {
  plpSlug: string;
  category: string;
  productData?: {
    variantsInOrder: string[];
    products: ListPageDiamondItem[];
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

function PlpDiamondPage(props: InferGetServerSidePropsType<typeof getDiamondPlpServerSideProps>) {
  const router = useRouter();
  const [activeSortOptions, setActiveSortOptions] = useState({});

  const { plpSlug, category } = props;
  // const { products: initialProducts } = productData;

  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug, category);

  const { breadcrumb, hero, promoCardCollection, creativeBlocks, seo, sortOptions } = plpData || {};

  const { seoTitle, seoDescription } = seo || {};

  const { data, fetchNextPage, isFetching, hasNextPage } = useDiamondPlpProducts(plpSlug, 1, activeSortOptions);

  const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  const handleSortChange = ({ sortBy, sortOrder }: { id: string; sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    setActiveSortOptions({
      sortBy,
      sortOrder,
    });
  };

  return (
    <div>
      <NextSeo title={seoTitle} description={seoDescription} />
      <Breadcrumb breadcrumb={breadcrumb} />
      <PlpHeroBanner data={hero} />
      {sortOptions && <PlpSortOptions sortOptions={sortOptions} onSortOptionChange={handleSortChange} />}
      <PlpProductGrid
        data={data}
        isFetching={isFetching}
        promoCardCollectionId={promoCardCollection?.id}
        creativeBlockIds={creativeBlockIds}
      />
      {hasNextPage && (
        <DarksideButton type="outline" onClick={() => fetchNextPage()}>
          View More
        </DarksideButton>
      )}
      <PlpBlockPicker plpSlug={plpSlug} />
    </div>
  );
}

const getDiamondPlpServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<DiamondPlpPageProps>> => {
  const { query, locale } = context;
  const { plpSlug } = query;
  const category = 'loose-diamonds';

  const queryClient = new QueryClient();
  const contentQuery = queries.plp.serverSideDato(locale, plpSlug, category);

  await queryClient.prefetchQuery({ ...contentQuery });
  await queryClient.prefetchInfiniteQuery({
    queryKey: [`plp-${plpSlug}`],
    queryFn: () => getVRAIServerDiamondPlpData(plpSlug.toString(), { page: 1 }),
  });

  await queryClient.prefetchQuery({
    ...queries.header.content(locale),
  });

  return {
    props: {
      plpSlug: plpSlug.toString(),
      category,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

PlpDiamondPage.getTemplate = getStandardTemplate;

export { PlpDiamondPage, getDiamondPlpServerSideProps };
