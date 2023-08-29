import { ParsedUrlQuery } from 'querystring';

import { Heading } from '@diamantaire/darkside/components/common-ui';
import { DiamondCfyAsidePromo, DiamondCfyFilters } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { getCurrencyFromLocale, parseValidLocale } from '@diamantaire/shared/constants';
import {
  getCFYAvailableDiamondTypes,
  getCFYOptionsFromUrl,
  getDiamondType,
  replacePlaceholders,
} from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';

import { StyledCFYPage } from './CFYPage.style';

interface CFYPageQueryParams extends ParsedUrlQuery {
  product?: string;
  metal?: string;
  diamondType?: string;
  goldPurity?: string;
  bandAccent?: string;
  sideStoneCarat?: string;
  ringSize?: string;
  bandWidth?: string;
  diamondOrientation?: string;
  carat?: string;
  flow?: string;
  edit?: string;
  sideStoneShape?: string;
  bandStoneShape?: string;
  bandStoneStyle?: string;
  haloSize?: string;
  prongStyle?: string;
  cto?: string;
}

interface CFYPageProps {
  countryCode: string;
  currencyCode: string;
  dehydratedState: DehydratedState;
  locale: string;
  options?: CFYPageQueryParams;
}

const CFYPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, options } = props;
  const { diamondType: selectedDiamondType, carat: selectedCarat } = options;
  const { data: { ctoDiamondTable, allDiamondShapeDescriptions } = {} } = useDiamondCfyData(locale);
  const { headerTitle, headerCopy } = ctoDiamondTable;
  let { title: seoTitle = '', description: seoDesc = '' } = ctoDiamondTable?.seo || {};

  seoTitle = replacePlaceholders(seoTitle, ['%%product_name%%'], [getDiamondType(selectedDiamondType)?.title || '']);
  seoDesc = replacePlaceholders(seoDesc, ['%%product_name%%'], [getDiamondType(selectedDiamondType)?.title || '']);

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDesc} />

      <StyledCFYPage className="container-wrapper">
        <div className="page-main">
          <div className="page-header">
            <Heading className="title">{headerTitle}</Heading>
            <p>{headerCopy}</p>
          </div>

          <DiamondCfyFilters
            locale={locale}
            selectedCarat={selectedCarat}
            selectedDiamondType={selectedDiamondType}
            diamondShapeDescriptions={allDiamondShapeDescriptions}
          />
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
  const isServer = typeof window === 'undefined';
  const { query, locale } = context;
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrencyFromLocale(locale);

  const options = getCFYOptionsFromUrl(query || {});
  const availableDiamondTypes = getCFYAvailableDiamondTypes(options, isServer);

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
