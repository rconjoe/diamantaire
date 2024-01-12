import { DarksideButton, Heading, ShowTabletAndUpOnly, UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondFilter, DiamondPromo, DiamondTable } from '@diamantaire/darkside/components/diamonds';
import { useDiamondsData, useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE } from '@diamantaire/shared/constants';
import { getDiamondShallowRoute } from '@diamantaire/shared/helpers';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DiamondBuildStepStyles = styled(motion.div)`
  padding-bottom: 14rem;

  .switch-container {
    text-align: right;
    padding-right: 1rem;

    svg {
      stroke: #777;
    }
  }

  .table-container {
    padding: 4rem 2rem;
    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      display: flex;
    }

    .vo-table-head {
      top: ${({ headerHeight }) => headerHeight}px;
    }

    > aside {
      @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
        flex: 0 0 450px;
        padding-right: 5rem;
        top: calc(${({ headerHeight }) => headerHeight}px + 4rem);
        height: 100vh;
        position: sticky;
      }
    }

    > div {
      flex: 1;
    }

    .nav-title {
      margin-bottom: 6rem;
    }
  }
`;

type DiamondBuildStepProps = {
  diamondTypeToShow: string;
  availableDiamonds?: string[];
  settingSlugs?: {
    [key: string]: string;
  };
};

const DiamondBuildStep = ({ diamondTypeToShow, availableDiamonds, settingSlugs }: DiamondBuildStepProps) => {
  const router = useRouter();
  const { asPath, query } = router;

  console.log();

  const defaultInitialOptions = {
    caratMin: 1,
    diamondType: diamondTypeToShow,
    limit: 20,
    page: 1,
    sortBy: 'carat',
    sortOrder: 'desc',
  };

  let routerInitialOptions: object = {
    ...query,
    diamondType: diamondTypeToShow,
  };

  const acceptedParams = ['caratMin', 'caratMax', 'page', 'sortBy', 'sortOrder', 'limit', 'diamondType'];

  routerInitialOptions = Object.keys(routerInitialOptions).reduce((acc, key) => {
    if (acceptedParams.includes(key)) {
      acc[key] = routerInitialOptions[key];
    }

    return acc;
  }, {});

  const doesRouterHaveOptions = query.limit && query.page && query.sortBy && query.caratMin ? true : false;

  const initialOptions = doesRouterHaveOptions ? { ...routerInitialOptions } : { ...defaultInitialOptions };

  let isToiMoiOrPair = false;

  if (asPath.includes('toi-moi')) {
    initialOptions['view'] = 'toimoi';
    isToiMoiOrPair = true;
  } else if (asPath.includes('pair')) {
    initialOptions['view'] = 'pairs';
    isToiMoiOrPair = true;
  }

  const [loading, setLoading] = useState(true);
  // const [isTableView, setIsTableView] = useState(true);
  const { headerHeight } = useGlobalContext();
  const isTableView = true;
  const [options, setOptions] = useState(initialOptions);
  const [activeRow, setActiveRow] = useState(null);

  const { data: { diamonds, pagination, ranges } = {} } = useDiamondsData({ ...options });

  const updateLoading = (newState) => {
    setLoading(newState);
  };

  const tableOptions = {
    locale: DEFAULT_LOCALE,
    initialOptions: { ...options },
    initialDiamonds: diamonds,
    initialPagination: pagination,
    currencyCode: 'USD',
    updateLoading,
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
  };

  const handleRadioFilterChange = (type: string, values: string[]) => {
    updateOptions({ [type]: values.join() });
  };

  const clearOptions = () => {
    console.log('xxx', options);
    updateOptions({ ...defaultInitialOptions, diamondType: diamondTypeToShow });
    // setOptions({
    //   ...defaultInitialOptions,
    //   diamondType: diamondTypeToShow,
    // });
  };

  useEffect(() => {
    updateOptions({ ...defaultInitialOptions, diamondType: diamondTypeToShow });
  }, [diamondTypeToShow]);

  useEffect(() => {
    router.push(getDiamondShallowRoute(options, window.location.origin + window.location.pathname), undefined, {
      shallow: true,
    });
  }, [options]);

  return (
    <DiamondBuildStepStyles
      className="container-wrapper"
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
      headerHeight={headerHeight}
    >
      <div className="">
        {diamonds && (
          <div className="table-container">
            <aside>
              <DiamondFilter
                handleRadioFilterChange={handleRadioFilterChange}
                handleSliderFilterChange={handleSliderFilterChange}
                loading={loading}
                options={options}
                ranges={ranges}
                locale={router?.locale || DEFAULT_LOCALE}
                availableDiamonds={availableDiamonds}
              />

              <DarksideButton type="underline" colorTheme="teal" className="vo-filter-clear-button" onClick={clearOptions}>
                <UIString>Clear filters</UIString>
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

              <div className="nav-title container-wrapper">
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
                clearOptions={() => null}
                ranges={ranges}
                settingSlugs={settingSlugs}
                isDiamondPairs={isToiMoiOrPair}
              />
            </div>
          </div>
        )}
      </div>
    </DiamondBuildStepStyles>
  );
};

export default DiamondBuildStep;
