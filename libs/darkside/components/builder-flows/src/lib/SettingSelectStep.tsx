import { Loader } from '@diamantaire/darkside/components/common-ui';
import { PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { updateUrlParameter } from '@diamantaire/shared/helpers';
import { FilterValueProps } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const SettingSelectStepStyles = styled.div`
  height: 100vh;
  overflow: hidden;

  .title-container {
    text-align: center;
    padding-top: 4rem;
  }
  .wrapper {
    height: 100vh;
    overflow-y: scroll;
    position: relative;
  }

  .loader-container {
    text-align: center;
    padding-top: 4rem;
  }

  .grid-wrapper {
    padding: 2rem 0 20rem;
    > div {
      height: auto;
    }
  }
  .load-more-trigger {
    /* background-color: red; */
    height: 10rem;
    width: 100%;
    display: block;
  }
`;

const SettingSelectStep = ({ flowIndex, updateSettingSlugs, settingTypeToShow }) => {
  const { updateStep } = useContext(BuilderProductContext);
  const { locale } = useRouter();

  const containerRef = useRef(null);

  const { ref: pageEndRef, inView } = useInView({
    root: containerRef.current,
  });

  const category = 'engagement-rings';
  const plpSlug = settingTypeToShow ? settingTypeToShow + '-cut' : 'round-brilliant-cut';

  const [filterValue, setFilterValues] = useState<FilterValueProps>({});
  const [activeSortOptions, setActiveSortOptions] = useState({});

  // Keep in case we're asked to add creative to PLP in this view
  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(locale, plpSlug, category);
  // const { hero, promoCardCollection, creativeBlocks } = plpData || {};
  // const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  const { sortOptions } = plpData || {};

  const productData = usePlpVRAIProducts(category, plpSlug, { ...filterValue, ...activeSortOptions }, { page: 1 });

  const { data, fetchNextPage, isFetching, hasNextPage } = productData;

  const availableFilters = data?.pages?.[0]?.availableFilters;

  // Handle pagination
  useEffect(() => {
    if (isFetching) return;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  function selectSetting({ collectionSlug, productSlug }) {
    updateSettingSlugs({ collectionSlug, productSlug });
    updateUrlParameter('collectionSlug', collectionSlug);
    updateUrlParameter('productSlug', productSlug);

    updateStep(flowIndex + 1);
  }

  const handleSortChange = ({ sortBy, sortOrder }: { id: string; sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    setActiveSortOptions({
      sortBy,
      sortOrder,
    });
  };

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
            handleSortChange={handleSortChange}
            sortOptions={sortOptions}
          />
        </div>

        <div ref={pageEndRef} className="load-more-trigger" />
      </div>
    </SettingSelectStepStyles>
  );
};

export default SettingSelectStep;
