import { ParsedUrlQuery } from 'querystring';

import { DarksideButton, Heading, HideTopBar, UniLink } from '@diamantaire/darkside/components/common-ui';
import {
  DiamondCfyAsidePromo,
  DiamondCfyBreadCrumb,
  DiamondCfyFilterCarat,
  DiamondCfyFilterShape,
} from '@diamantaire/darkside/components/diamonds';
import { StandardPageSeo } from '@diamantaire/darkside/components/seo';
import { GlobalContext } from '@diamantaire/darkside/context/global-context';
import { useDiamondCfyData, useProductDiamondTypes } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate } from '@diamantaire/darkside/template/standard';
import { DIAMOND_CFY_CARAT_DEFAULT } from '@diamantaire/shared/constants';
import { getCFYOptionsFromUrl, getCFYShallowRoute, getDiamondType, replacePlaceholders } from '@diamantaire/shared/helpers';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

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
  const router = useRouter();

  const { locale, options } = props;

  const { headerHeight } = useContext(GlobalContext);

  const { diamondType, carat, product: selectedProduct } = options;

  const [checkAvailability, setCheckAvailability] = useState(false);

  const [selectedCarat, setSelectedCarat] = useState(parseFloat(carat) || DIAMOND_CFY_CARAT_DEFAULT);

  const [selectedDiamondType, setSelectedDiamondType] = useState(getDiamondType(diamondType));

  const { data: { ctoDiamondTable, allDiamondShapeDescriptions } = {} } = useDiamondCfyData(locale);

  const { data: { availableDiamondTypes } = {} } = useProductDiamondTypes(selectedProduct);

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

  const handleSelectShape = (value) => {
    setSelectedDiamondType(value);
  };

  const handleSelectCarat = useCallback((value) => {
    setSelectedCarat(value);
  }, []);

  const handleModifyDiamondType = useCallback(() => {
    setSelectedDiamondType(null);
  }, []);

  const handleModifyCarat = useCallback((value) => {
    console.log(`handleModifyCarat`, value);
  }, []);

  const handleCheckAvailability = () => {
    setCheckAvailability(true);
  };

  const [productRoute, setProductRoute] = useState('');

  useEffect(() => {
    const shape = selectedDiamondType?.slug || null;

    if (shape && productRoute !== `/diamonds/results/${shape}?carat=${selectedCarat}`) {
      setProductRoute(`/diamonds/results/${shape}?carat=${selectedCarat}`);
      router.push(getCFYShallowRoute({ carat: selectedCarat, diamondType: shape }, 'diamondCfy'), undefined, {
        shallow: true,
      });
    } else if (!shape) {
      router.push('/diamonds', undefined, { shallow: true });
    }
  }, [selectedCarat, selectedDiamondType]);

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
            selectedDiamondType={selectedDiamondType}
            selectedCarat={selectedCarat}
            handleModifyCarat={handleModifyCarat}
            handleModifyDiamondType={handleModifyDiamondType}
            checkAvailability={checkAvailability}
          />

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
            <>
              <DiamondCfyFilterCarat
                locale={locale}
                title={diamondSelectorNote}
                selectedCarat={selectedCarat}
                selectedDiamondType={selectedDiamondType}
                handleSelectCarat={handleSelectCarat}
                caratSliderTooltip={caratSliderTooltip}
              />
              <UniLink route={productRoute}>
                <DarksideButton onClick={handleCheckAvailability} className="button-check-availability">
                  {checkAvailabilityLabel}
                </DarksideButton>
              </UniLink>
            </>
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

export { CFYPage, getServerSideProps as getServerSidePropsCFYPage };

export default CFYPage;
