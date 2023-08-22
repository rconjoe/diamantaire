import { BuilderFlow } from '@diamantaire/darkside/components/builder-flows';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { PdpTypePlural, pdpTypeHandleSingleToPluralAsConst } from '@diamantaire/shared/constants';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

type BuilderPageParams = {
  collectionSlug?: string;
  productSlug?: string;
  lotId?: string;
};

export interface BuilderPageProps {
  params: BuilderPageParams;
  dehydratedState: DehydratedState;
}

const BuilderPage = ({ collectionSlug, productSlug, type }) => {
  return <BuilderFlow type={type} collectionSlug={collectionSlug} productSlug={productSlug} />;
};

BuilderPage.getTemplate = getStandardTemplate;

export default BuilderPage;

export async function getServerSideProps(
  context: GetServerSidePropsContext<BuilderPageParams>,
): Promise<GetServerSidePropsResult<BuilderPageProps>> {
  console.log('context', context);

  const { params, locale } = context;

  const { collectionSlug, productSlug } = context.params;
  const queryClient = new QueryClient();
  const dataQuery = queries.products.variant(collectionSlug, productSlug);

  const productType: PdpTypePlural = pdpTypeHandleSingleToPluralAsConst[context.req.url.split('/')[1]] || null;

  console.log('xxx', productType);

  await queryClient.prefetchQuery(dataQuery);
  await queryClient.prefetchQuery({ ...queries.products.serverSideDatoProductInfo(collectionSlug, locale, productType) });

  if (!queryClient.getQueryData(dataQuery.queryKey)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      params,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
