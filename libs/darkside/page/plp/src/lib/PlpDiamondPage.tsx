import { Breadcrumb, DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
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
import styled from 'styled-components';

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

const StyledPlpDiamondPage = styled.div`
  .filter-bar {
    height: 40px;
  }
  .view-more {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    justify-items: center;

    & > div {
      max-width: 300px;
    }
  }
`;

function PlpDiamondPage(props: InferGetServerSidePropsType<typeof getDiamondPlpServerSideProps>) {
  const router = useRouter();
  const [activeSortOptions, setActiveSortOptions] = useState({});

  const { plpSlug, category } = props;
  // const { products: initialProducts } = productData;

  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug, category);

  const { breadcrumb, hero, promoCardCollection, creativeBlocks, seo, sortOptions, showHeroWithBanner } = plpData || {};

  const { seoTitle, seoDescription } = seo || {};

  const { data, fetchNextPage, isFetching, hasNextPage } = useDiamondPlpProducts(plpSlug, 1, activeSortOptions);

  const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  const handleSortChange = ({ sortBy, sortOrder }: { id: string; sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    setActiveSortOptions({
      sortBy,
      sortOrder,
    });
  };

  const refinedBreadcrumb = breadcrumb?.map((crumb) => {
    return {
      title: crumb?.name,
      path: crumb?.link?.slug,
    };
  });

  return (
    <StyledPlpDiamondPage>
      <NextSeo title={seoTitle} description={seoDescription} />
      <Breadcrumb breadcrumb={refinedBreadcrumb} />
      <PlpHeroBanner showHeroWithBanner={showHeroWithBanner} data={hero} />
      {/* <div className="filter-bar">
        {sortOptions && <PlpSortOptions sortOptions={sortOptions} onSortOptionChange={handleSortChange} />}
      </div> */}
      <PlpProductGrid
        data={data}
        isFetching={isFetching}
        promoCardCollectionId={promoCardCollection?.id}
        creativeBlockIds={creativeBlockIds}
        urlFilterMethod="param"
        plpSlug={plpSlug}
        sortOptions={sortOptions}
        handleSortChange={handleSortChange}
      />
      {hasNextPage && (
        <div className="view-more">
          <DarksideButton type="outline" onClick={() => fetchNextPage()}>
            <UIString>View More</UIString>
          </DarksideButton>
        </div>
      )}
      <PlpBlockPicker plpSlug={plpSlug} />
    </StyledPlpDiamondPage>
  );
}

const getDiamondPlpServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<DiamondPlpPageProps>> => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
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
    ...queries.template.global(locale),
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
