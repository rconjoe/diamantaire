import { Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import { DiamondFilter, DiamondTable } from '@diamantaire/darkside/components/diamonds';
import { useDiamondsData, useGlobalContext } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE, DIAMOND_TABLE_FACETED_NAV } from '@diamantaire/shared/constants';
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
  const { asPath } = useRouter();
  const initialOptions = {
    caratMin: 1,
    diamondType: diamondTypeToShow,
    limit: 20,
    page: 1,
    sortBy: 'carat',
    sortOrder: 'desc',
  };

  let isToiMoiOrPair = false;

  if (asPath.includes('toi-moi')) {
    initialOptions['view'] = 'toi-moi';
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
      const updatedOptions = { ...prevOptions, ...newOptions };
      const keys = Object.keys(updatedOptions);

      keys.forEach((key) => {
        if (DIAMOND_TABLE_FACETED_NAV.includes(key)) {
          if (prevOptions[key] && prevOptions[key] === newOptions[key]) {
            delete updatedOptions[key];
          }
        }
      });

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

  //  Toggle table change

  // function handleViewChange() {
  //   setIsTableView(!isTableView);
  // }

  useEffect(() => {
    setOptions({
      ...options,
      diamondType: diamondTypeToShow,
    });
  }, [diamondTypeToShow]);

  return (
    <DiamondBuildStepStyles
      key="diamond-step-container"
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
      <div className="nav-title container-wrapper">
        <Heading type="h1" className="primary h2">
          <UIString>Complete your ring</UIString>
        </Heading>
      </div>
      <div className="">
        {diamonds && (
          <div className="table-container">
            <DiamondFilter
              handleRadioFilterChange={handleRadioFilterChange}
              handleSliderFilterChange={handleSliderFilterChange}
              loading={loading}
              options={options}
              ranges={ranges}
              locale={DEFAULT_LOCALE}
              availableDiamonds={availableDiamonds}
            />
            <div className="table">
              {/* Launching re-arch with table view only - this will be helpful in the future */}
              {/* <div className="switch-container">
                <GridIcon />
                <DarksideSwitch value={isTableView} handleChange={handleViewChange} />
                <TableIcon />
              </div> */}
              <DiamondTable
                {...tableOptions}
                isBuilderFlowOpen={true}
                isTableView={isTableView}
                activeRow={activeRow}
                setActiveRow={setActiveRow}
                updateOptions={() => null}
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
