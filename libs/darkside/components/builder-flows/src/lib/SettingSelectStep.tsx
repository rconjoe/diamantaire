import { Loader } from '@diamantaire/darkside/components/common-ui';
import { PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { objectToURLSearchParams, updateUrlParameter } from '@diamantaire/shared/helpers';
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
  const [availableFilters, setAvailableFilters] = useState<any>(null);
  const [paginationPages, setPaginationPages] = useState<any>(null);

  const { updateStep } = useContext(BuilderProductContext);

  const containerRef = useRef(null);

  const { ref: pageEndRef, inView } = useInView({
    root: containerRef.current,
  });

  const category = 'engagement-rings';
  const plpSlug = settingTypeToShow + '-cut' || 'round-brilliant-cut';

  const objectParams = {
    slug: plpSlug,
    category,
  };

  const [qParams, setQParams] = useState(objectToURLSearchParams(objectParams));

  const [filterValue, setFilterValues] = useState<FilterValueProps>(null);

  // Keep in case we're asked to add creative to PLP in this view
  // const { data: { listPage: plpData } = {} } = usePlpDatoServerside(router.locale, plpSlug);
  // const { hero, promoCardCollection, creativeBlocks } = plpData || {};
  // const creativeBlockIds = Array.from(creativeBlocks)?.map((block) => block.id);

  const { data, fetchNextPage, isFetching, hasNextPage } = usePlpVRAIProducts(qParams, []);

  // Handle pagination
  useEffect(() => {
    if (isFetching) return;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  function selectSetting({ collectionSlug, productSlug }) {
    console.log('selectSetting running', collectionSlug, productSlug);

    updateSettingSlugs({ collectionSlug, productSlug });
    updateUrlParameter('collectionSlug', collectionSlug);
    updateUrlParameter('productSlug', productSlug);

    updateStep(flowIndex + 1);
  }

  // Handle filter changes
  useEffect(() => {
    // const price = filterValue?.price;

    const newFilterObject = {
      slug: plpSlug,
      category,
    };

    if (data?.pages) {
      if (filterValue?.metal) {
        newFilterObject['metal'] = filterValue?.metal;
      }

      if (filterValue?.diamondType) {
        newFilterObject['diamondType'] = filterValue.diamondType;
      }

      if (filterValue?.price?.min) {
        newFilterObject['priceMin'] = filterValue?.price?.min;
      } else if (availableFilters?.price[0]) {
        newFilterObject['priceMin'] = availableFilters?.price[0];
      }

      if (filterValue?.price?.max) {
        newFilterObject['priceMax'] = filterValue?.price?.max;
      } else if (availableFilters?.price[1]) {
        newFilterObject['priceMax'] = availableFilters?.price[1];
      }

      if (availableFilters === null) {
        setAvailableFilters(data?.[0]?.availableFilters);
      }

      if (availableFilters === null) {
        setAvailableFilters(data?.pages?.[0]?.availableFilters);
      }

      if (filterValue === null) {
        const initialFilterValues: FilterValueProps | object = {};

        data?.pages?.[0]?.availableFilters &&
          Object.keys(data?.pages?.[0]?.availableFilters).forEach((key) => {
            initialFilterValues[key] = null;
          });

        console.log('initialFilterValues', initialFilterValues);

        setFilterValues(initialFilterValues as FilterValueProps);
      }

      if (paginationPages === null) {
        setPaginationPages(data?.pages?.[0]?.paginator?.totalPages || 1);
      }
    }

    const newParams = objectToURLSearchParams({
      ...newFilterObject,
    });

    setQParams(newParams);
  }, [category, plpSlug]);

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
          />
        </div>

        <div ref={pageEndRef} className="load-more-trigger" />
      </div>
    </SettingSelectStepStyles>
  );
};

export default SettingSelectStep;
