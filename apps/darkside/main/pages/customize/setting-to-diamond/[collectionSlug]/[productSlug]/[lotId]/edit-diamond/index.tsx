import { BuilderFlowLoader } from '@diamantaire/darkside/components/builder-flows';
import { DarksideButton, Heading, ShowTabletAndUpOnly, UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondFilter, DiamondPromo, DiamondTable } from '@diamantaire/darkside/components/diamonds';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { useBuilderFlowSeo, useDiamondTableData, useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import {
  DEFAULT_LOCALE,
  DIAMOND_TABLE_DEFAULT_OPTIONS,
  DIAMOND_TABLE_DEFAULT_VALID_QUERIES,
} from '@diamantaire/shared/constants';
import { getDiamondShallowRoute } from '@diamantaire/shared/helpers';
import { useRudderStackAnalytics } from '@diamantaire/shared/rudderstack';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const DiamondBuildStepStyles = styled(motion.div)`
  padding-bottom: 14rem;
  margin: 0 auto;
  max-width: 90vw;

  @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
    padding: 0;
  }

  .switch-container {
    text-align: right;
    padding-right: 1rem;

    svg {
      stroke: #777;
    }
  }

  .table-container {
    padding: 4rem 0rem;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: flex;
    }

    > aside {
      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        flex: 0 0 450px;
        padding-right: 5rem;
        height: 100vh;
      }

      @media (min-width: ${({ theme }) => theme.sizes.xl}) {
        top: 55px;
        position: sticky;
      }
    }

    > div {
      flex: 1;
    }

    .nav-title {
      &.mobile {
        padding: 0;
        margin-bottom: 3rem;
        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          margin-bottom: 0;
          display: none;
        }
      }
      &.desktop {
        display: none;
        @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
          margin-bottom: 3rem;
          display: block;
        }
      }
    }
  }

  .vo-filter-clear-button {
    margin: 1rem 0 0;

    button {
      font-size: var(--font-size-xxxsmall);
      font-weight: var(--font-weight-normal);
    }
  }
`;

const DiamondBuildStep = () => {
  const router = useRouter();
  const { asPath, query, locale } = router;
  const { builderProduct } = useContext(BuilderProductContext);
  const { data: seoData } = useBuilderFlowSeo(locale);
  const { seoTitle, seoDescription } = seoData?.builderFlow?.seoFields || {};

  const diamondTypeToShow = builderProduct?.product?.configuration?.diamondType || 'round-brilliant';
  const availableDiamonds = builderProduct?.product?.optionConfigs?.diamondType.map((d) => d.value) || [];
  const settingProductType = builderProduct?.product?.productType;

  const { data: diamondTableData } = useDiamondTableData(locale);
  const { diamondTable } = diamondTableData || {};
  const { clearFiltersButtonCopy } = diamondTable || {};

  const acceptedParams = [...DIAMOND_TABLE_DEFAULT_VALID_QUERIES, 'diamondType', 'clarity', 'color', 'cut'];

  let routerInitialOptions: object = {
    ...query,
    diamondType: diamondTypeToShow,
  };

  routerInitialOptions = Object.keys(routerInitialOptions).reduce((acc, key) => {
    if (acceptedParams.includes(key)) {
      acc[key] = routerInitialOptions[key];
    }

    return acc;
  }, {});

  const doesRouterHaveOptions = query.limit && query.page && query.sortBy && query.caratMin ? true : false;

  let isToiMoiOrPair = asPath.includes('toi-moi') || asPath.includes('pairs') ? true : false;

  const defaultInitialOptions = {
    ...DIAMOND_TABLE_DEFAULT_OPTIONS,
    diamondType: diamondTypeToShow,
    caratMin: isToiMoiOrPair ? 0.5 : 1,
    limit: 20,
  };

  const initialOptions = doesRouterHaveOptions ? { ...routerInitialOptions } : { ...defaultInitialOptions };

  if (asPath.includes('toi-moi')) {
    initialOptions['view'] = 'toimoi';
    isToiMoiOrPair = true;
  } else if (asPath.includes('pair')) {
    initialOptions['view'] = 'pairs';
    isToiMoiOrPair = true;
  }

  // const [isTableView, setIsTableView] = useState(true);
  const isTableView = true;
  const [options, setOptions] = useState(initialOptions);
  const [activeRow, setActiveRow] = useState(null);

  const { data: { diamonds, pagination, ranges } = {} } = useDiamondsData({ ...options });

  const tableOptions = {
    locale: DEFAULT_LOCALE,
    initialOptions: { ...(options as any) },
    initialDiamonds: diamonds,
    initialPagination: pagination,
    currencyCode: 'USD',
  };

  const updateOptions = (newOptions) => {
    setOptions((prevOptions) => {
      let updatedOptions: { [key: string]: string } = { ...prevOptions };

      const key = Object.keys(newOptions).pop();

      if (key === 'diamondType') {
        newOptions[key].split().join();

        updatedOptions = { ...prevOptions, ...newOptions };

        if (prevOptions[key] && prevOptions[key] === newOptions[key]) {
          delete updatedOptions[key];
        }
      } else if (key === 'cut') {
        const oldOptionsArray = prevOptions[key]?.split(',') || [];
        const newOption = newOptions[key];

        if (oldOptionsArray.includes(newOption)) {
          updatedOptions[key] = oldOptionsArray.filter((v) => v !== newOption).join(',');
        } else {
          oldOptionsArray.push(newOption);
          updatedOptions[key] = oldOptionsArray.join(',');
        }

        if (!updatedOptions[key]) {
          delete updatedOptions[key];
        }
      } else if (key === 'color' || key === 'clarity') {
        let oldOptionsArray = prevOptions[key]?.split(',') || []; // [D,E,F,G,H,I]
        const newOptionsArray = newOptions[key].split(','); // [D,E,F]

        newOptionsArray.forEach((newOption) => {
          if (oldOptionsArray.includes(newOption)) {
            oldOptionsArray = oldOptionsArray.filter((v) => v !== newOption);
          } else {
            oldOptionsArray.push(newOption);
          }
          updatedOptions[key] = oldOptionsArray.join(',');
        });

        if (!updatedOptions[key]) {
          delete updatedOptions[key];
        }
      } else {
        updatedOptions = { ...prevOptions, ...newOptions };
      }

      // if Fancy shape is selected automatically remove Ideal and Ideal+Heart options
      if (updatedOptions.diamondType && updatedOptions.cut && updatedOptions.diamondType !== 'round-brilliant') {
        updatedOptions.cut = updatedOptions.cut
          .split(',')
          .filter((v) => v === 'Excellent')
          .join();
      }

      return updatedOptions;
    });
  };

  const handleSliderFilterChange = (type: string, values: number[]) => {
    if (type === 'carat') {
      updateOptions({ caratMin: parseFloat(values[0].toFixed(2)), caratMax: parseFloat(values[1].toFixed(2)) });
    }

    if (type === 'price') {
      updateOptions({ priceMin: values[0], priceMax: values[1] });
    }

    // smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRadioFilterChange = (type: string, values: string[]) => {
    updateOptions({ [type]: values.join() });
  };

  const clearOptions = () => {
    setOptions({ ...DIAMOND_TABLE_DEFAULT_OPTIONS, diamondType: diamondTypeToShow });
  };

  useEffect(() => {
    if (diamondTypeToShow) updateOptions({ ...defaultInitialOptions, diamondType: diamondTypeToShow });
  }, [builderProduct.diamonds]);

  useEffect(() => {
    const additionalParams: { ringSize?: string } = {};

    if (query?.ringSize) {
      additionalParams.ringSize = Array.isArray(query.ringSize) ? query.ringSize[0] : query.ringSize;
    }

    const newRoute = getDiamondShallowRoute(
      options,
      window.location.origin + window.location.pathname,
      true,
      additionalParams,
    );

    router.replace(newRoute, undefined, { shallow: true });
  }, [options]);

  const analytics = useRudderStackAnalytics();

  useEffect(() => {
    if (analytics) {
      analytics?.page();
    }
  }, [analytics?.ready]);

  if (!diamonds || !tableOptions?.initialOptions?.diamondType) return <BuilderFlowLoader />;

  return (
    <DiamondBuildStepStyles
      key="diamond-step-container "
      initial="collapsed"
      animate="open"
      exit="collapsed"
      variants={{
        open: { opacity: 1 },
        collapsed: { opacity: 0 },
      }}
      transition={{
        duration: 0.75,
      }}
    >
      <NextSeo title={seoTitle} description={seoDescription} nofollow={true} noindex={true} />
      <div>
        {diamonds && (
          <div className="table-container">
            <aside>
              <div className="nav-title mobile container-wrapper">
                <Heading type="h1" className="primary h2 text-center">
                  <UIString>diamondTable</UIString>
                </Heading>
              </div>

              <DiamondFilter
                handleRadioFilterChange={handleRadioFilterChange}
                handleSliderFilterChange={handleSliderFilterChange}
                options={options}
                ranges={ranges}
                availableDiamonds={availableDiamonds}
              />

              <DarksideButton type="underline" colorTheme="teal" className="vo-filter-clear-button" onClick={clearOptions}>
                {clearFiltersButtonCopy}
              </DarksideButton>

              <ShowTabletAndUpOnly>{router?.locale && <DiamondPromo locale={router?.locale} />}</ShowTabletAndUpOnly>
            </aside>

            <div className="table">
              {/* Launching re-arch with table view only - this will be helpful in the future */}
              {/* <div className="switch-container">
                <GridIcon />
                <DarksideSwitch value={isTableView} handleChange={handleViewChange} />
                <TableIcon />
              </div> */}

              <div className="nav-title desktop container-wrapper">
                <Heading type="h1" className="primary h2 text-center">
                  <UIString>diamondTable</UIString>
                </Heading>
              </div>

              <DiamondTable
                {...tableOptions}
                isBuilderFlowOpen={true}
                isTableView={isTableView}
                activeRow={activeRow}
                setActiveRow={setActiveRow}
                updateOptions={updateOptions}
                clearOptions={clearOptions}
                ranges={ranges}
                isDiamondPairs={isToiMoiOrPair}
                settingProductType={settingProductType}
              />
            </div>
          </div>
        )}
      </div>
    </DiamondBuildStepStyles>
  );
};

DiamondBuildStep.getTemplate = getStandardTemplate;

export default DiamondBuildStep;

type BuilderStepSeoProps = {
  dehydratedState: DehydratedState;
};

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<BuilderStepSeoProps>> {
  const { locale } = context;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries['builder-flow'].seo(locale),
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
