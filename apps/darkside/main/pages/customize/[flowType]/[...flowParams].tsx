import { BuilderFlowV2 } from '@diamantaire/darkside/components/builder-flows';
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
  initialStep: number | null;
};

const BuilderPage = ({ collectionSlug, productSlug, type, lotId, initialStep }: BuilderPageProps) => {
  return (
    <>
      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />
      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />
      <BuilderFlowV2
        collectionSlug={collectionSlug}
        type={type}
        lotId={lotId}
        productSlug={productSlug}
        initialStep={initialStep}
      />
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
  const flowType = query.flowType;
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

  console.log('query', query);

  //   const { collectionSlug, productSlug, lotId, step } = query as BuilderPageQueryParams;
  //   let { type } = query as BuilderPageQueryParams;

  //   // 1. Identify the flow type based on URL params
  //   if (!type) {
  //     if (collectionSlug && productSlug && !lotId) {
  //       type = 'setting-to-diamond';
  //     } else if (lotId && !collectionSlug && !productSlug) {
  //       type = 'diamond-to-setting';
  //     } else {
  //       // if all params are on, default to setting-to-diamond
  //       type = 'setting-to-diamond';
  //     }
  //   }

  //   // 2. Identify the step based on URL params
  //   let initialStep = parseFloat(step);

  //   initialStep = validateStep(initialStep, type, collectionSlug, productSlug, lotId);
}
