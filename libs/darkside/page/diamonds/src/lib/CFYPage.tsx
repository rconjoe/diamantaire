import { ParsedUrlQuery } from 'querystring';

import { Heading } from '@diamantaire/darkside/components/common-ui';
import { DiamondPromo } from '@diamantaire/darkside/components/diamonds';
// import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
// import { useDiamondTableData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
// import { DIAMOND_CFY_FACETED_NAV } from '@diamantaire/shared/constants';
import { getCurrencyFromLocale, parseValidLocale } from '@diamantaire/shared/constants';
import { getCFYOptionsFromUrl } from '@diamantaire/shared/helpers';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';

import { StyledCFYPage } from './CFYPage.style';

interface CFYPageQueryParams extends ParsedUrlQuery {
  category?: string;
  carat?: string;
}

interface CFYPageProps {
  locale: string;
  options?: {
    diamondType?: string;
    category?: string;
    carat?: string;
  };
  countryCode: string;
  currencyCode: string;
  dehydratedState: DehydratedState;
}

const CFYPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const router = useRouter();
  const { locale } = props;
  // const [options, setOptions] = useState(props.options);
  // const [loading, setLoading] = useState(true);

  // const DiamondTableContent = useDiamondTableData(locale);
  // const title = DiamondTableContent.data.diamondTable.title;
  // const seo = DiamondTableContent.data.diamondTable.seo;
  // const { seoTitle, seoDescription } = seo || {};
  // const pageTitleDiamondMatch = seoTitle.match(/%%(.*?)%%/g);

  return (
    <>
      {/* <StandardPageSeo title={pageSeoTitle} description={seoDescription} /> */}
      <StyledCFYPage className="container-wrapper">
        <div className="page-title">
          <Heading className="title"></Heading>
        </div>

        <div className="page-main">
          <p>CFY Page</p>
        </div>

        <DiamondPromo locale={locale} />
      </StyledCFYPage>
    </>
  );
};

CFYPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<CFYPageQueryParams>,
): Promise<GetServerSidePropsResult<CFYPageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { locale } = context;
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrencyFromLocale(locale);

  const { query } = context;
  const options = getCFYOptionsFromUrl(query || {});
  const diamondTableQuery = queries.diamondTable.content(locale);
  const queryClient = new QueryClient();

  // PREFECTH DIAMOND TABLE CONTENT FROM DATO
  await queryClient.prefetchQuery(diamondTableQuery);

  // IF NO RESULT RETURN 404
  if (!queryClient.getQueryData(diamondTableQuery.queryKey)) {
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
