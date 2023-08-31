import { ParsedUrlQuery } from 'querystring';

import { Heading } from '@diamantaire/darkside/components/common-ui';
import {
  DiamondCfyAsidePromo,
  DiamondCfyFilterCarat,
  DiamondCfyFilterShape,
} from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { useDiamondCfyData, useProductDiamondTypes } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { DIAMOND_CFY_CARAT_DEFAULT } from '@diamantaire/shared/constants';
import { getCFYOptionsFromUrl, getDiamondType, replacePlaceholders } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useCallback, useState } from 'react';

import { StyledCFYPage } from './CFYPage.style';

interface CFYPageQueryParams extends ParsedUrlQuery {
  carat?: string;
  diamondType?: string;
  product?: string;
}

interface CFYPageProps {
  dehydratedState: DehydratedState;
  locale: string;
  options?: CFYPageQueryParams;
}

const CFYPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale, options } = props;
  const { diamondType, carat, product: selectedProduct } = options;
  const [selectedCarat, setSelectedCarat] = useState(carat || DIAMOND_CFY_CARAT_DEFAULT);
  const [selectedDiamondType, setSelectedDiamondType] = useState(getDiamondType(diamondType));
  const { data: { ctoDiamondTable, allDiamondShapeDescriptions } = {} } = useDiamondCfyData(locale);
  const { data: { availableDiamondTypes } = {} } = useProductDiamondTypes(selectedProduct);
  const { headerTitle, headerCopy } = ctoDiamondTable;
  let { title: seoTitle = '', description: seoDesc = '' } = ctoDiamondTable?.seo || {};

  seoTitle = replacePlaceholders(seoTitle, ['%%product_name%%'], [getDiamondType(diamondType)?.title || '']);
  seoDesc = replacePlaceholders(seoDesc, ['%%product_name%%'], [getDiamondType(diamondType)?.title || '']);

  const handleSelectShape = (value) => {
    setSelectedDiamondType(value);
  };

  const handleSelectCarat = useCallback((value) => {
    console.log('CARAT UPDATE DETECTED', value);

    setSelectedCarat(value);
  }, []);

  return (
    <>
      <StandardPageSeo title={seoTitle} description={seoDesc} />

      <StyledCFYPage className="container-wrapper">
        <div className="page-main">
          <div className="page-header">
            <Heading className="title">{headerTitle}</Heading>
            <p>{headerCopy}</p>
          </div>

          {(!selectedDiamondType && (
            <DiamondCfyFilterShape
              locale={locale}
              selectedCarat={selectedCarat}
              handleSelectShape={handleSelectShape}
              selectedDiamondType={selectedDiamondType}
              availableDiamondTypes={availableDiamondTypes}
              diamondShapeDescriptions={allDiamondShapeDescriptions}
            />
          )) || (
            <DiamondCfyFilterCarat
              locale={locale}
              selectedCarat={selectedCarat}
              selectedDiamondType={selectedDiamondType}
              handleSelectCarat={handleSelectCarat}
            />
          )}
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

  const options = getCFYOptionsFromUrl(query || {});
  const { product } = options || {};

  const diamondCfyQuery = queries.diamondCfy.content(locale);
  const availableDiamondTypesQuery = product ? queries.products.productDiamondTypes(product) : null;

  const queryClient = new QueryClient();

  // PREFECTH DIAMOND CFY CONTENT FROM DATO
  await queryClient.prefetchQuery(diamondCfyQuery);
  if (product) await queryClient.prefetchQuery(availableDiamondTypesQuery);

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

export { CFYPage, getServerSideProps as getServerSidePropsCFYPage };

export default CFYPage;
