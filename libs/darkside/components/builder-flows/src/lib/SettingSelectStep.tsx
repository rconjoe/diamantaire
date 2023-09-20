import { Loader } from '@diamantaire/darkside/components/common-ui';
import { PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { updateUrlParameter } from '@diamantaire/shared/helpers';
import { FilterValueProps } from '@diamantaire/shared-product';
import { useContext, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const SettingSelectStepStyles = styled.div`
  height: 100vh;
  overflow: hidden;

  .title-container {
    text-align: center;
    padding-top: 40px;
  }
  .wrapper {
    height: 100vh;
    overflow-y: scroll;
    position: relative;
  }

  .loader-container {
    text-align: center;
    padding-top: 40px;
  }

  .grid-wrapper {
    padding: 20px 0 200px;
    > div {
      height: auto;
    }
  }
  .load-more-trigger {
    /* background-color: red; */
    height: 100px;
    width: 100%;
    display: block;
  }
`;

const SettingSelectStep = ({ flowIndex, updateSettingSlugs, settingTypeToShow }) => {
  const { updateStep } = useContext(BuilderProductContext);

  const containerRef = useRef(null);

  const { ref: pageEndRef, inView } = useInView({
    root: containerRef.current,
  });

  const category = 'engagement-rings';
  const plpSlug = settingTypeToShow ? settingTypeToShow + '-cut' : 'round-brilliant-cut';

  const [filterValue, setFilterValues] = useState<FilterValueProps>({});

  // Keep in case we're asked to add creative to PLP in this view
  // const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug);
  // const { hero, promoCardCollection, creativeBlocks } = plpData || {};
  // const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  const plpData = usePlpVRAIProducts(category, plpSlug, filterValue, { page: 1 });

  console.log('plpData paramsss', category, plpSlug, filterValue);
  console.log('plpData dataaa', plpData);

  const { data, fetchNextPage, isFetching, hasNextPage } = plpData;

  const availableFilters = data?.pages?.[0]?.availableFilters;

  // Handle pagination
  useEffect(() => {
    if (isFetching) return;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  function selectSetting({ collectionSlug, productSlug }) {
    console.log('selectSetting running', collectionSlug, productSlug);

    updateSettingSlugs({ collectionSlug, productSlug });
    updateUrlParameter('collectionSlug', collectionSlug);
    updateUrlParameter('productSlug', productSlug);

    updateStep(flowIndex + 1);
  }

  useEffect(() => {
    console.log('plp data changing', data);
  }, [data]);

  return (
    <SettingSelectStepStyles>
      <div className="wrapper" ref={containerRef}>
        <div className="title-container">
          <h1>Setting Select</h1>
        </div>

        {(data?.pages?.length === 0 || data?.pages?.[0].message) && (
          <div className="loader-container">
            <Loader color={'#719093'} />
          </div>
        )}

        <div className="grid-wrapper">
          <PlpProductGrid
            data={data}
            isFetching={isFetching}
            availableFilters={availableFilters}
            promoCardCollectionId={''}
            creativeBlockIds={[]}
            setFilterValues={setFilterValues}
            filterValue={filterValue}
            isSettingSelect={true}
            selectSetting={selectSetting}
            plpSlug={plpSlug}
            urlFilterMethod={'none'}
          />
        </div>

        <div ref={pageEndRef} className="load-more-trigger" />
      </div>
    </SettingSelectStepStyles>
  );
};

export default SettingSelectStep;
