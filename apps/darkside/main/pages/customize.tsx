import { BuilderFlow } from '@diamantaire/darkside/components/builder-flows';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

type BuilderPageQueryParams = {
  collectionSlug?: string | null;
  productSlug?: string | null;
  lotId?: string | null;
  type: 'setting-to-diamond' | 'diamond-to-setting';
};

export type BuilderPageProps = BuilderPageQueryParams;

const BuilderPage = ({ collectionSlug, productSlug, type, lotId }: BuilderPageProps) => {
  return <BuilderFlow type={type} collectionSlug={collectionSlug} lotId={lotId} productSlug={productSlug} />;
};

BuilderPage.getTemplate = getStandardTemplate;

export default BuilderPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<BuilderPageQueryParams>,
): Promise<GetServerSidePropsResult<BuilderPageProps>> {
  console.log('contetxxxx', context.query);

  const { query } = context;

  const { collectionSlug, productSlug, lotId } = query as BuilderPageQueryParams;
  let { type } = query as BuilderPageQueryParams;

  if (!type) {
    // 1. Identify the flow type based on URL params
    if (collectionSlug && productSlug && !lotId) {
      type = 'setting-to-diamond';
    } else if (lotId && !collectionSlug && !productSlug) {
      type = 'diamond-to-setting';
    }
  }

  // 2. Identify the step based on URL params

  return {
    props: {
      collectionSlug: collectionSlug || null,
      productSlug: productSlug || null,
      lotId: lotId || null,
      type: type || null,
    },
  };
}
