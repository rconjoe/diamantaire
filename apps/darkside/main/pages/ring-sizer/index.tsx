import { ParsedUrlQuery } from 'querystring';

import { queries } from '@diamantaire/darkside/data/queries';
import { PdpPage } from '@diamantaire/darkside/page/pdp';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { PdpTypePlural } from '@diamantaire/shared/constants';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export default PdpPage;

interface PdpPageParams extends ParsedUrlQuery {
  collectionSlug: string;
  productSlug: string;
}
export interface PdpPageProps {
  key: string;
  params: {
    collectionSlug: string;
    productSlug: string;
  };
  dehydratedState: DehydratedState;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext<PdpPageParams>,
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale } = context;

  const queryClient = new QueryClient();
  const dataQuery = queries.products.variant('ring-sizer', 'ring-sizer-32905666134109');

  const productType: PdpTypePlural = PdpTypePlural['RingSizer'];

  await queryClient.prefetchQuery({ ...queries.template.global(locale) });
  await queryClient.prefetchQuery(dataQuery);
  await queryClient.prefetchQuery({ ...queries.products.serverSideDatoProductInfo('ring-sizer', locale, productType) });

  if (!queryClient.getQueryData(dataQuery.queryKey)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      key: 'ring-sizer-32905666134109',
      params: {
        collectionSlug: 'ring-sizer',
        productSlug: 'ring-sizer-32905666134109',
      },
      dehydratedState: dehydrate(queryClient),
    },
  };
}

PdpPage.getTemplate = getStandardTemplate;
