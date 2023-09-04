import { ParsedUrlQuery } from 'querystring';

import { Heading } from '@diamantaire/darkside/components/common-ui';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useDiamondCfyData, useDiamondCtoData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { getCFYResultOptionsFromUrl, getDiamondType, replacePlaceholders } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import { StyledCFYPage } from './CFYPage.style';

interface CFYResultPageQueryParams extends ParsedUrlQuery {
  carat?: string;
  diamondType?: string;
  product?: string;
}

interface CFYResultPageProps {
  dehydratedState: DehydratedState;
  locale: string;
  options?: CFYResultPageQueryParams;
}

const CFYResultPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, options = {} } = props;
  const { diamondType } = options;
  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);

  const { headerTitle, headerCopy } = ctoDiamondTable;
  const payload = useDiamondCtoData(options);

  console.log(`CFYResultPage *************`, payload);

  let { title: seoTitle = '', description: seoDesc = '' } = ctoDiamondTable?.seo || {};

  seoTitle = replacePlaceholders(seoTitle, ['%%product_name%%'], [getDiamondType(diamondType)?.title || '']);
  seoDesc = replacePlaceholders(seoDesc, ['%%product_name%%'], [getDiamondType(diamondType)?.title || '']);

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDesc} />

      <StyledCFYPage className="container-wrapper">
        <div className="page-main">
          <div className="page-header">
            <Heading className="title">{headerTitle}</Heading>
            <p>{headerCopy}</p>
          </div>
        </div>
      </StyledCFYPage>
    </>
  );
};

CFYResultPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<CFYResultPageQueryParams>,
): Promise<GetServerSidePropsResult<CFYResultPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { query, locale } = context;

  const options = getCFYResultOptionsFromUrl(query || {});

  const diamondCfyQuery = queries.diamondCfy.content(locale);

  const diamondCtoResultQuery = queries.diamondCto.content({ ...options });

  const queryClient = new QueryClient();

  // PREFECTH DIAMOND CFY CONTENT FROM DATO

  await queryClient.prefetchQuery(diamondCfyQuery);

  await queryClient.prefetchQuery(diamondCtoResultQuery);

  // IF NO RESULT RETURN 404

  if (!queryClient.getQueryData(diamondCfyQuery.queryKey)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      locale,
      options,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { CFYResultPage, getServerSideProps as getServerSidePropsCFYResultPage };

export default CFYResultPage;
