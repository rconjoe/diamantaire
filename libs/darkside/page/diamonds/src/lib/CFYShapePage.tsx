import { ParsedUrlQuery } from 'querystring';

import { Heading, HideTopBar } from '@diamantaire/darkside/components/common-ui';
import { DiamondCfyAsidePromo, DiamondCfyFilterShape } from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useDiamondCfyData, useProductDiamondTypes } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { getCFYOptionsFromUrl } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { StyledCFYPage } from './CFYPage.style';

interface CFYShapePageQueryParams extends ParsedUrlQuery {
  product?: string;
}

interface CFYShapePageProps {
  dehydratedState: DehydratedState;
  locale: string;
  options?: CFYShapePageQueryParams;
}

const CFYShapePage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { locale, options } = props;

  const { headerHeight } = useContext(GlobalContext);

  const { product: selectedProduct, carat } = options;

  const { builderProduct } = useContext(BuilderProductContext);

  const collectionSlug = builderProduct?.product?.collectionSlug || router?.query?.collectionSlug;

  const productSlug = builderProduct?.product?.productSlug || router?.query?.productSlug;

  const { data: { ctoDiamondTable, allDiamondShapeDescriptions } = {} } = useDiamondCfyData(locale);

  const { data: { availableDiamondTypes } = {} } = useProductDiamondTypes(selectedProduct);

  const { headerCopy, headerTitle } = ctoDiamondTable;

  const { title: seoTitle = '', description: seoDesc = '' } = ctoDiamondTable?.seo || {};

  return (
    <>
      <HideTopBar />

      <StandardPageSeo title={seoTitle} description={seoDesc} />

      <StyledCFYPage className="container-wrapper" headerHeight={headerHeight}>
        <div className="page-main">
          <div className="page-header">
            <Heading className="title">{headerTitle}</Heading>
            <p>{headerCopy}</p>
          </div>

          <DiamondCfyFilterShape
            locale={locale}
            selectedCarat={carat}
            selectedProduct={selectedProduct}
            productSlug={productSlug}
            collectionSlug={collectionSlug}
            availableDiamondTypes={availableDiamondTypes}
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

CFYShapePage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<CFYShapePageQueryParams>,
): Promise<GetServerSidePropsResult<CFYShapePageProps>> {
  context.res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');

  const { query, locale } = context;

  const options = getCFYOptionsFromUrl(query || {});

  const { product } = options || {};

  const globalQuery = queries.template.global(locale);

  const diamondCfyQuery = queries.diamondCfy.content(locale);

  const availableDiamondTypesQuery = product ? queries.products.productDiamondTypes(product) : null;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(globalQuery);

  await queryClient.prefetchQuery(diamondCfyQuery);

  if (product) await queryClient.prefetchQuery(availableDiamondTypesQuery);

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

export { CFYShapePage, getServerSideProps as getServerSidePropsCFYShapePage };

export default CFYShapePage;
