import { DarksideSwitch } from '@diamantaire/darkside/components/common-ui';
import { DiamondFilter, DiamondTable } from '@diamantaire/darkside/components/diamonds';
import { useDiamondsData } from '@diamantaire/darkside/data/hooks';
import { DIAMOND_TABLE_FACETED_NAV } from '@diamantaire/shared/constants';
import { GridIcon, TableIcon } from '@diamantaire/shared/icons';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

const DiamondBuildStepStyles = styled(motion.div)`
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 140px;

  .switch-container {
    text-align: right;
    padding-right: 10px;

    svg {
      stroke: #777;
    }
  }

  .table-container {
    display: flex;
    padding: 40px 50px;

    > aside {
      flex: 0 0 450px;
      padding-right: 50px;
    }

    > div {
      flex: 1;
    }
  }
`;

const initialOptions = {
  caratMin: 1,
  diamondType: 'round-brilliant',
  limit: 20,
  page: 1,
  sortBy: 'carat',
  sortOrder: 'desc',
};

const DiamondBuildStep = ({ changeStep, flowIndex }) => {
  const [loading, setLoading] = useState(true);
  const [isTableView, setIsTableView] = useState(false);
  const [options, setOptions] = useState(initialOptions);
  const [activeRow, setActiveRow] = useState(null);

  const { data: { diamonds, pagination, ranges } = {} } = useDiamondsData({ ...options });

  const updateLoading = (newState) => {
    setLoading(newState);
  };
  const tableOptions = {
    locale: 'en-US',
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

  function handleViewChange() {
    setIsTableView(!isTableView);
  }

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
              locale={'en-US'}
              currencyCode={'USD'}
            />
            <div className="table">
              <div className="switch-container">
                <GridIcon />
                <DarksideSwitch value={isTableView} handleChange={handleViewChange} />
                <TableIcon />
              </div>
              <DiamondTable
                {...tableOptions}
                isBuilderFlowOpen={true}
                isTableView={isTableView}
                changeStep={changeStep}
                activeRow={activeRow}
                setActiveRow={setActiveRow}
                flowIndex={flowIndex}
              />
            </div>
          </div>
        )}
      </div>
    </DiamondBuildStepStyles>
  );
};

export default DiamondBuildStep;
