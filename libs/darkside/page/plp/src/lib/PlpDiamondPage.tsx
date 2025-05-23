import { Breadcrumb, DarksideButton, UIString } from '@diamantaire/darkside/components/common-ui';
import { PlpBlockPicker, PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { getVRAIServerDiamondPlpData, useDiamondPlpProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside, useTranslations } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { replacePlaceholders } from '@diamantaire/shared/helpers';
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
    height: 4rem;
  }
  .view-more {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    justify-items: center;

    & > div {
      max-width: 30rem;
    }
  }

  .pag-count-text {
    text-align: center;
    font-size: var(--font-size-xxsmall);
  }
`;

function PlpDiamondPage(props: InferGetServerSidePropsType<typeof getDiamondPlpServerSideProps>) {
  const router = useRouter();
  const [activeSortOptions, setActiveSortOptions] = useState({});
  const { _t } = useTranslations(router.locale);

  const { plpSlug, category } = props;
  // const { products: initialProducts } = productData;

  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug, category);

  const { breadcrumb, hero, promoCardCollection, creativeBlocks, seo, sortOptions, showHeroWithBanner } = plpData || {};

  const { seoTitle, seoDescription } = seo || {};

  const { data, fetchNextPage, isFetching, hasNextPage } = useDiamondPlpProducts(plpSlug, 1, { ...activeSortOptions });

  const creativeBlockIds = creativeBlocks && Array.from(creativeBlocks)?.map((block) => block.id);

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

  let showingText = replacePlaceholders(
    _t('Showing %%current_number%% of %%total_number%%'),
    ['%%current_number%%'],
    [
      data?.pages?.length * 12 < data?.pages?.[0].paginator?.totalDocs
        ? (data?.pages?.length * 12).toString()
        : data?.pages?.[0].paginator?.totalDocs?.toString(),
    ],
  ).toString();

  console.log('showingText 1', showingText);

  showingText = replacePlaceholders(
    showingText.toString(),
    ['%%total_number%%'],
    [data?.pages?.[0].paginator?.totalDocs?.toString()],
  ).toString();

  return (
    <StyledPlpDiamondPage>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={
          (process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http:localhost:4200') +
          `/${router.locale}` +
          router.asPath
        }
      />

      <Breadcrumb breadcrumb={refinedBreadcrumb} />

      <PlpHeroBanner showHeroWithBanner={showHeroWithBanner} data={hero} />

      <PlpProductGrid
        data={data}
        isFetching={isFetching}
        promoCardCollectionId={promoCardCollection?.id}
        creativeBlockIds={creativeBlockIds}
        urlFilterMethod="param"
        plpSlug={plpSlug}
        sortOptions={sortOptions}
        onSortChange={handleSortChange}
      />

      <p className="pag-count-text">{showingText}</p>

      {hasNextPage && (
        <div className="view-more">
          <DarksideButton type="outline" onClick={() => fetchNextPage()}>
            <UIString>View More</UIString>
          </DarksideButton>
        </div>
      )}
      <PlpBlockPicker category={category} plpSlug={plpSlug} />
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
