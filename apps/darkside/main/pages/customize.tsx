import { BuilderFlow, validateStep } from '@diamantaire/darkside/components/builder-flows';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

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
    <BuilderFlow
      type={type}
      collectionSlug={collectionSlug}
      lotId={lotId}
      productSlug={productSlug}
      initialStep={initialStep}
    />
  );
};

BuilderPage.getTemplate = getStandardTemplate;

export default BuilderPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<BuilderPageQueryParams>,
): Promise<GetServerSidePropsResult<BuilderPageProps>> {
  console.log('contetxxxx', context.query);

  const { query } = context;

  const { collectionSlug, productSlug, lotId, step } = query as BuilderPageQueryParams;
  let { type } = query as BuilderPageQueryParams;

  // 1. Identify the flow type based on URL params
  if (!type) {
    if (collectionSlug && productSlug && !lotId) {
      type = 'setting-to-diamond';
    } else if (lotId && !collectionSlug && !productSlug) {
      type = 'diamond-to-setting';
    } else {
      // what happens if all params are on? how can it guess?
      type = 'diamond-to-setting';
    }
  }

  // 2. Identify the step based on URL params
  let initialStep = parseFloat(step);

  initialStep = validateStep(initialStep, type, collectionSlug, productSlug, lotId);

  console.log('initialStep v333', initialStep);

  return {
    props: {
      collectionSlug: collectionSlug || null,
      productSlug: productSlug || null,
      lotId: lotId || null,
      type: type || null,
      initialStep: initialStep || initialStep === 0 ? initialStep : null,
    },
  };
}
