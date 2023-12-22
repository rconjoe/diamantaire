import {
  PdpPage,
  PdpPageProps,
  PdpPageParams,
  getServerSideProps as getPdpServerSideProps,
} from '@diamantaire/darkside/page/pdp';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

async function extendedGetServerSideProps(
  context: GetServerSidePropsContext<PdpPageParams>,
): Promise<GetServerSidePropsResult<PdpPageProps>> {
  const contextOverride = {
    params: {
      collectionSlug: 'ring-sizer',
      productSlug: 'ring-sizer-32905666134109',
    },
  };

  return getPdpServerSideProps(context, contextOverride);
}

PdpPage.getTemplate = getStandardTemplate;

export default PdpPage;
export { extendedGetServerSideProps as getServerSideProps };
