import { DiamondFilter, DiamondTable } from '@diamantaire/darkside/components/diamonds';
import { useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { DEFAULT_LOCALE, DIAMOND_TABLE_FACETED_NAV } from '@diamantaire/shared/constants';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const DiamondBuildStepStyles = styled(motion.div)`
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 14rem;

  .switch-container {
    text-align: right;
    padding-right: 1rem;

    svg {
      stroke: #777;
    }
  }

  .table-container {
    display: flex;
    padding: 4rem 2rem;

    > aside {
      flex: 0 0 450px;
      padding-right: 5rem;
      top: 2rem;
      height: 100vh;
      position: sticky;
    }

    > div {
      flex: 1;
    }
  }
`;

type DiamondBuildStepProps = {
  flowIndex: number;
  diamondTypeToShow: string;
  hideFilters?: string[];
};

const DiamondBuildStep = ({ flowIndex, diamondTypeToShow, hideFilters }: DiamondBuildStepProps) => {
  const initialOptions = {
    caratMin: 1,
    diamondType: diamondTypeToShow,
    limit: 20,
    page: 1,
    sortBy: 'carat',
    sortOrder: 'desc',
  };

  const [loading, setLoading] = useState(true);
  // const [isTableView, setIsTableView] = useState(true);
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
    >
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
              hideFilters={hideFilters}
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
                flowIndex={flowIndex}
                updateOptions={() => null}
                clearOptions={() => null}
                ranges={ranges}
              />
            </div>
          </div>
        )}
      </div>
    </DiamondBuildStepStyles>
  );
};

export default DiamondBuildStep;
