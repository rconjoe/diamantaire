import { BuilderFlow } from '@diamantaire/darkside/components/builder-flows';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Script from 'next/script';

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
  lotId: string | null;
  type: 'setting-to-diamond' | 'diamond-to-setting';
};

const BuilderPage = ({ collectionSlug, productSlug, type, lotId }: BuilderPageProps) => {
  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />
      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />
      <BuilderFlow collectionSlug={collectionSlug} type={type} lotId={lotId} productSlug={productSlug} />
    </>
  );
};

BuilderPage.getTemplate = getStandardTemplate;

export default BuilderPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<BuilderPageQueryParams>,
): Promise<GetServerSidePropsResult<BuilderPageProps>> {
  const { query, resolvedUrl } = context;

  // 1. Identify flow type based flowType
  const flowType = query.flowType as 'setting-to-diamond' | 'diamond-to-setting';
  const flowParams = query.flowParams;
  let urlIndex = 0;

  if (resolvedUrl.includes('/summary/')) {
    urlIndex = 1;
  }

  if (flowType === 'setting-to-diamond') {
    const collectionSlug = flowParams[0 + urlIndex];
    const productSlug = flowParams[1 + urlIndex];
    const diamondLotId = flowParams[2 + urlIndex];

    return {
      props: {
        collectionSlug: collectionSlug || null,
        productSlug: productSlug || null,
        lotId: diamondLotId || null,
        type: flowType || null,
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
        lotId: diamondLotId || null,
        type: flowType || null,
      },
    };
  }
}
