import { BuilderFlow } from '@diamantaire/darkside/components/builder-flows';
import { useBuilderFlowSeo } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

type BuilderPageQueryParams = {
  collectionSlug?: string | null;
  productSlug?: string | null;
  lotId?: string | null;
  type?: 'setting-to-diamond' | 'diamond-to-setting';
  step?: string | null;
};

export type BuilderPageProps = {
  collectionSlug: string | null;
  productSlug: string | null;
  lotIds: string[] | null;
  type: 'setting-to-diamond' | 'diamond-to-setting';
  dehydratedState: DehydratedState;
};

const BuilderPage = ({ collectionSlug, productSlug, type, lotIds }: BuilderPageProps) => {
  const { locale } = useRouter();
  const { data: seoData } = useBuilderFlowSeo(locale);
  const { seoTitle, seoDescription, addNoindexNofollow } = seoData?.builderFlow?.seoFields || {};

  return (
    <>
      <NextSeo title={seoTitle} description={seoDescription} nofollow={addNoindexNofollow} noindex={addNoindexNofollow} />
      <BuilderFlow collectionSlug={collectionSlug} type={type} lotIds={lotIds} productSlug={productSlug} />
    </>
  );
};

BuilderPage.getTemplate = getStandardTemplate;

export default BuilderPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<BuilderPageQueryParams>,
): Promise<GetServerSidePropsResult<BuilderPageProps>> {
  const { query, resolvedUrl, locale } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries['builder-flow'].seo(locale),
  });

  // 1. Identify flow type based flowType
  const flowType = query.flowType as 'setting-to-diamond' | 'diamond-to-setting';
  const flowParams = query.flowParams;
  let urlIndex = 0;

  if (resolvedUrl.includes('/summary/')) {
    urlIndex += 1;
  }

  if (resolvedUrl.includes('/pair/')) {
    urlIndex += 1;
  }

  if (flowType === 'setting-to-diamond') {
    const collectionSlug = flowParams[0 + urlIndex];
    const productSlug = flowParams[1 + urlIndex];
    const diamondLotId = flowParams[2 + urlIndex];
    // Toimoi/
    const secondDiamondLotId = flowParams?.[3 + urlIndex];

    const lotIds = diamondLotId ? [diamondLotId] : null;

    if (secondDiamondLotId) {
      lotIds.push(secondDiamondLotId);
    }

    return {
      props: {
        collectionSlug: collectionSlug || null,
        productSlug: productSlug || null,
        lotIds: lotIds || null,
        type: flowType || null,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } else {
    const diamondLotId = flowParams[0 + urlIndex];
    const collectionSlug = flowParams[1 + urlIndex];
    const productSlug = flowParams[2 + urlIndex];

    return {
      props: {
        collectionSlug: collectionSlug || null,
        productSlug: productSlug || null,
        lotIds: [diamondLotId] || null,
        type: flowType || null,
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  }
}
