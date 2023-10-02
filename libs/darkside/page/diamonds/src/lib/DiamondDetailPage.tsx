import { Heading } from '@diamantaire/darkside/components/common-ui';
import { DiamondDetail } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { OptionsDataTypes, useDiamondPdpData, useDiamondTableData, useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { getCurrencyFromLocale } from '@diamantaire/shared/constants';
import { getCountry, getDiamondOptionsFromUrl, getDiamondType } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
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

  const { lotId } = options || {};

  const { data: { diamond: { carat, diamondType } = {} } = {} } = useDiamondsData({ lotId });

  const diamondTitle = getDiamondType(diamondType)?.title;

  const { data: { diamondTable: { title } = {} } = {} } = useDiamondTableData(locale);

  const { data: { diamondProduct: { seoFields } = {} } = {} } = useDiamondPdpData(locale);

  const { seoTitle, seoDescription } = seoFields || {};

  const pageSeoTitle = `${carat} Carat ` + (diamondTitle ? seoTitle.replace(/%%(.*?)%%/g, diamondTitle) : seoTitle);

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

  console.log(`DiamondDetailPage :: getServerSideProps...`);

  const { query, locale } = context;

  const { diamondHandle: handle } = query;

  const countryCode = getCountry(locale);

  const currencyCode = getCurrencyFromLocale(locale);

  const options = getDiamondOptionsFromUrl([handle], 'diamondPDP');

  if (!options?.lotId) {
    return {
      notFound: true,
    };
  }

  const globalQuery = queries.template.global(locale);
  const diamondQuery = queries.diamonds.content({ lotId: options?.lotId });
  const diamondPdpQuery = queries.diamondPdp.content(locale);
  const diamondInfoQuery = queries.diamondInfo.content(locale);
  const diamondTableQuery = queries.diamondTable.content(locale);
  const productIconListQuery = queries.products.productIconList('Diamond PDP', locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(globalQuery);
  await queryClient.prefetchQuery(diamondQuery);
  await queryClient.prefetchQuery(diamondQuery);
  await queryClient.prefetchQuery(diamondPdpQuery);
  await queryClient.prefetchQuery(diamondInfoQuery);
  await queryClient.prefetchQuery(diamondTableQuery);
  await queryClient.prefetchQuery(productIconListQuery);

  if (
    !queryClient.getQueryData(diamondQuery.queryKey) ||
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
