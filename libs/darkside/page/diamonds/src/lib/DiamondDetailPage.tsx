import { Heading } from '@diamantaire/darkside/components/common-ui';
import { DiamondDetail } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { OptionsDataTypes, useDiamondPdpData, useDiamondTableData, useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { getDiamondsOptionsFromUrl } from '@diamantaire/shared/helpers';
import { QueryClient, dehydrate, DehydratedState } from '@tanstack/react-query';
import { InferGetServerSidePropsType, GetServerSidePropsResult } from 'next';
import Script from 'next/script';

import { StyledDiamondDetailPage } from './DiamondDetailPage.style';

interface DiamondDetailPageDataTypes {
  locale: string;
  options: OptionsDataTypes;
  countryCode: string;
  currencyCode: string;
  dehydratedState: DehydratedState;
}

const DiamondDetailPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, currencyCode, countryCode, options } = props;

  const { lotId, diamondType } = options || {};

  const { data: { diamond: { type } = {} } = {} } = useDiamondsData({ lotId });

  const { data: { diamondTable: { title } = {} } = {} } = useDiamondTableData(locale);

  const { data: { diamondProduct: { seoFields } = {} } = {} } = useDiamondPdpData(locale);

  const { seoTitle, seoDescription } = seoFields || {};

  const pageSeoTitle = type ? seoTitle.replace(/%%(.*?)%%/g, type) : seoTitle;

  return (
    <>
      <StandardPageSeo title={pageSeoTitle} description={seoDescription} />

      <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy={'beforeInteractive'} />

      <Script src="https://cdn.jsdelivr.net/npm/spritespin@4.1.0/release/spritespin.min.js" strategy={'beforeInteractive'} />

      <StyledDiamondDetailPage className="container-wrapper">
        <div className="page-title">
          <Heading className="title">{title}</Heading>
        </div>

        <div className="page-main">
          <DiamondDetail
            countryCode={countryCode}
            currencyCode={currencyCode}
            diamondType={diamondType}
            locale={locale}
            lotId={lotId}
          />
        </div>
      </StyledDiamondDetailPage>
    </>
  );
};

DiamondDetailPage.getTemplate = getTemplate;

async function getServerSideProps(context): Promise<GetServerSidePropsResult<DiamondDetailPageDataTypes>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const locale = 'en_US';
  const countryCode = 'US';
  const currencyCode = 'USD';
  const { query } = context;
  const { diamondSlug: slug } = query;
  const options = getDiamondsOptionsFromUrl([slug], 'diamondPDP');

  if (!options?.lotId || !options?.diamondType) {
    return {
      notFound: true,
    };
  }

  const diamondQuery = queries.diamonds.content({ lotId: options?.lotId });
  const diamondsQuery = queries.diamonds.content({ diamondType: options?.diamondType });
  const diamondPdpQuery = queries.diamondPdp.content(locale);
  const diamondInfoQuery = queries.diamondInfo.content(locale);
  const diamondTableQuery = queries.diamondTable.content(locale);
  const productIconListQuery = queries.products.productIconList('DiamondPDP', locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(diamondQuery);
  await queryClient.prefetchQuery(diamondsQuery);
  await queryClient.prefetchQuery(diamondPdpQuery);
  await queryClient.prefetchQuery(diamondInfoQuery);
  await queryClient.prefetchQuery(diamondTableQuery);
  await queryClient.prefetchQuery(productIconListQuery);

  if (
    !queryClient.getQueryData(diamondQuery.queryKey) ||
    !queryClient.getQueryData(diamondsQuery.queryKey) ||
    !queryClient.getQueryData(diamondPdpQuery.queryKey) ||
    !queryClient.getQueryData(diamondInfoQuery.queryKey) ||
    !queryClient.getQueryData(diamondTableQuery.queryKey) ||
    !queryClient.getQueryData(productIconListQuery.queryKey)
  ) {
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

export { DiamondDetailPage, getServerSideProps as getServerSidePropsDiamondDetailPage };

export default DiamondDetailPage;
