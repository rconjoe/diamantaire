import { BuilderFlow, validateStep } from '@diamantaire/darkside/components/builder-flows';
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
      <BuilderFlow
        type={type}
        collectionSlug={collectionSlug}
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
      // if all params are on, default to setting-to-diamond
      type = 'setting-to-diamond';
    }
  }

  // 2. Identify the step based on URL params
  let initialStep = parseFloat(step);

  initialStep = validateStep(initialStep, type, collectionSlug, productSlug, lotId);

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
