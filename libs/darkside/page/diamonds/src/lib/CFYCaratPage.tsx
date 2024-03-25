import { ParsedUrlQuery } from 'querystring';

import { DarksideButton, Heading, HideTopBar, UniLink } from '@diamantaire/darkside/components/common-ui';
import {
  DiamondCfyAsidePromo,
  DiamondCfyBreadCrumb,
  DiamondCfyFilterCarat,
} from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useDiamondCfyData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { DIAMOND_CFY_CARAT_DEFAULT } from '@diamantaire/shared/constants';
import { getCFYOptionsFromUrl, getCFYShallowRoute, getDiamondType, replacePlaceholders } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import { StyledCFYPage } from './CFYPage.style';

interface CFYCaratPageQueryParams extends ParsedUrlQuery {
  carat?: string;
  diamondType?: string;
  product?: string;
}

interface CFYCaratPageProps {
  locale: string;
  dehydratedState: DehydratedState;
  options?: CFYCaratPageQueryParams;
}

const CFYCaratPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const { locale, options } = props;

  const { headerHeight } = useContext(GlobalContext);

  const { product: selectedProduct, diamondType, carat } = options;

  const [selectedCarat, setSelectedCarat] = useState(parseFloat(carat) || DIAMOND_CFY_CARAT_DEFAULT);

  const selectedDiamondType = getDiamondType(diamondType);

  const { data: { ctoDiamondTable } = {} } = useDiamondCfyData(locale);

  const {
    headerTitle,
    headerCopy,
    caratSliderTooltip,
    diamondSelectorNote,
    checkAvailability: checkAvailabilityLabel,
  } = ctoDiamondTable;

  let { title: seoTitle = '', description: seoDesc = '' } = ctoDiamondTable?.seo || {};

  seoTitle = replacePlaceholders(seoTitle, ['%%product_name%%'], [getDiamondType(diamondType)?.title || '']) as string;

  seoDesc = replacePlaceholders(seoDesc, ['%%product_name%%'], [getDiamondType(diamondType)?.title || '']) as string;

  const handleSelectCarat = useCallback((value) => {
    setSelectedCarat(value);
  }, []);

  const [productRoute, setProductRoute] = useState('');

  const { builderProduct } = useContext(BuilderProductContext);

  const collectionSlug = builderProduct?.product?.collectionSlug || router?.query?.collectionSlug;

  const productSlug = builderProduct?.product?.productSlug || router?.query?.productSlug;

  const shape = selectedDiamondType?.slug || null;

  useEffect(() => {
    setProductRoute(
      `/diamonds/results/${shape}?carat=${selectedCarat}${
        collectionSlug && productSlug ? `&collectionSlug=${collectionSlug}&productSlug=${productSlug}` : ''
      }`,
    );

    router.replace(
      getCFYShallowRoute(
        {
          diamondType: shape,
          carat: selectedCarat,
          ...(productSlug ? { productSlug } : {}),
          ...(collectionSlug ? { collectionSlug } : {}),
        },
        'diamondCfy',
        router,
      ),
      undefined,
      {
        shallow: true,
      },
    );
  }, [selectedCarat]);

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

          <DiamondCfyBreadCrumb
            locale={locale}
            productSlug={productSlug}
            collectionSlug={collectionSlug}
            selectedProduct={selectedProduct}
            selectedDiamondType={selectedDiamondType}
          />

          <DiamondCfyFilterCarat
            locale={locale}
            title={diamondSelectorNote}
            selectedCarat={selectedCarat}
            handleSelectCarat={handleSelectCarat}
            caratSliderTooltip={caratSliderTooltip}
            selectedDiamondType={selectedDiamondType}
          />

          <UniLink route={productRoute}>
            <DarksideButton className="button-check-availability">{checkAvailabilityLabel}</DarksideButton>
          </UniLink>
        </div>

        <div className="page-aside">
          <DiamondCfyAsidePromo data={ctoDiamondTable?.blocks} />
        </div>
      </StyledCFYPage>
    </>
  );
};

CFYCaratPage.getTemplate = getTemplate;

async function getServerSideProps(
  context: GetServerSidePropsContext<CFYCaratPageQueryParams>,
): Promise<GetServerSidePropsResult<CFYCaratPageProps>> {
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

export { CFYCaratPage, getServerSideProps as getServerSidePropsCFYCaratPage };

export default CFYCaratPage;
