import { ParsedUrlQuery } from 'querystring';

import { Heading } from '@diamantaire/darkside/components/common-ui';
import { DiamondCfyAsidePromo, DiamondCfyFilters } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { getCurrencyFromLocale, parseValidLocale } from '@diamantaire/shared/constants';
import { getCFYOptionsFromUrl } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import { StyledCFYPage } from './CFYPage.style';

interface CFYPageQueryParams extends ParsedUrlQuery {
  product?: string;
  metal?: string;
  goldPurity?: string;
  bandAccent?: string;
  carat?: string;
  cto?: string;
}

interface CFYPageProps {
  locale: string;
  options?: {
    diamondType?: string;
    category?: string;
    carat?: string;
    cto?: boolean;
    flow?: string;
  };
  countryCode: string;
  currencyCode: string;
  dehydratedState: DehydratedState;
}

const CFYPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = props;

  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);
  const { title: seoTitle, description: seoDescription } = ctoDiamondTable?.seo || {};
  const { headerTitle, headerCopy } = ctoDiamondTable;

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDescription} />

      <StyledCFYPage className="container-wrapper">
        <div className="page-main">
          <div className="page-header">
            <Heading className="title">{headerTitle}</Heading>
            <p>{headerCopy}</p>
          </div>

          <DiamondCfyFilters locale={locale} />
        </div>

        <div className="page-aside">
          <DiamondCfyAsidePromo data={ctoDiamondTable?.blocks} />
        </div>
      </StyledCFYPage>
    </>
  );
};

CFYPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<CFYPageQueryParams>,
): Promise<GetServerSidePropsResult<CFYPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { query, locale } = context;
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrencyFromLocale(locale);

  const options = getCFYOptionsFromUrl(query || {});

  console.log(`** OPTIONS **`, options);

  const diamondCfyQuery = queries.diamondCfy.content(locale);
  const queryClient = new QueryClient();

  // PREFECTH DIAMOND CFY CONTENT FROM DATO
  await queryClient.prefetchQuery(diamondCfyQuery);

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
      countryCode,
      currencyCode,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { CFYPage, getServerSideProps as getServerSidePropsCFYPage };

export default CFYPage;
