import { Heading } from '@diamantaire/darkside/components/common-ui';
import { DiamondDetail } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useDiamondPdpData, useDiamondTableData, useDiamondsData, useTranslations } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { getCurrencyFromLocale, getFormattedCarat } from '@diamantaire/shared/constants';
import { getCountry, getDiamondType } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import Script from 'next/script';

import { StyledDiamondDetailPage } from './DiamondDetailPage.style';

interface DiamondDetailPageDataTypes {
  locale: string;
  handle: string;
  countryCode: string;
  currencyCode: string;
  dehydratedState: DehydratedState;
}

const DiamondDetailPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, countryCode, handle } = props;

  const { _t } = useTranslations(locale);

  const { data: { diamond: { carat, diamondType } = {} } = {} } = useDiamondsData({
    handle,
    withAdditionalInfo: true,
  });

  const { data: { diamondTable: { title } = {} } = {} } = useDiamondTableData(locale);

  const { data: { diamondProduct: { seoFields } = {} } = {} } = useDiamondPdpData(locale);

  const { seoTitle, seoDescription } = seoFields || {};

  const diamondTitle = _t(getDiamondType(diamondType)?.slug);

  const formattedCarat = getFormattedCarat(carat, locale);

  const pageSeoTitle = `${formattedCarat} Carat ` + (diamondTitle ? seoTitle.replace(/%%(.*?)%%/g, diamondTitle) : seoTitle);

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
          <DiamondDetail countryCode={countryCode} diamondType={diamondType} locale={locale} handle={handle} />
        </div>
      </StyledDiamondDetailPage>
    </>
  );
};

DiamondDetailPage.getTemplate = getTemplate;

async function getServerSideProps(context): Promise<GetServerSidePropsResult<DiamondDetailPageDataTypes>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { query, locale } = context;

  const { diamondHandle: handle } = query;

  const countryCode = getCountry(locale);

  const currencyCode = getCurrencyFromLocale(locale);

  if (!handle) {
    return {
      notFound: true,
    };
  }

  const globalQuery = queries.template.global(locale);
  const diamondQuery = queries.diamonds.content({ handle, withAdditionalInfo: true });
  const diamondPdpQuery = queries.diamondPdp.content(locale);
  const diamondInfoQuery = queries.diamondInfo.content(locale);
  const diamondTableQuery = queries.diamondTable.content(locale);
  const productIconListQuery = queries.products.productIconList('Diamond PDP', locale);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(globalQuery);
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
      handle,
      countryCode,
      currencyCode,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export { DiamondDetailPage, getServerSideProps as getServerSidePropsDiamondDetailPage };

export default DiamondDetailPage;
