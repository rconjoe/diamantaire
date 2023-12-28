import { Loader } from '@diamantaire/darkside/components/common-ui';
import { PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { FilterValueProps } from '@diamantaire/shared-product';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const SettingSelectStepStyles = styled.div`
  .title-container {
    text-align: center;
    padding-top: 4rem;
  }
  .wrapper {
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
    height: 10rem;
    width: 100%;
    display: block;
  }
`;

const SettingSelectStep = ({ updateSettingSlugs, settingTypeToShow }) => {
  const { locale } = useRouter();

  const containerRef = useRef(null);

  const { ref: pageEndRef, inView } = useInView({
    rootMargin: '800px',
  });

  const category = 'engagement-rings';
  const plpSlug = settingTypeToShow ? settingTypeToShow + '-cut' : 'round-brilliant-cut';

  const [filterValue, setFilterValues] = useState<FilterValueProps>({});
  const [activeSortOptions, setActiveSortOptions] = useState({});

  // Keep in case we're asked to add creative to PLP in this view
  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(locale, plpSlug, category);
  const { hero, promoCardCollection, creativeBlocks } = plpData || {};
  const creativeBlockIds = creativeBlocks && Array.from(creativeBlocks)?.map((block) => block.id);

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
  }

  const handleSortChange = ({ sortBy, sortOrder }: { id: string; sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    setActiveSortOptions({
      sortBy,
      sortOrder,
    });
  };

  // useEffect(() => {
  //   console.log('plp data changing', data);
  // }, [data]);

  return (
    <SettingSelectStepStyles>
      <PlpHeroBanner showHeroWithBanner={true} data={hero} />
      <div className="wrapper" ref={containerRef}>
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
            promoCardCollectionId={promoCardCollection?.id}
            creativeBlockIds={creativeBlockIds}
            setFilterValues={setFilterValues}
            filterValue={filterValue}
            selectSetting={selectSetting}
            plpSlug={plpSlug}
            urlFilterMethod={'none'}
            handleSortChange={handleSortChange}
            sortOptions={sortOptions}
            builderFlowOverride={true}
          />
        </div>

        <div ref={pageEndRef} className="load-more-trigger" />
      </div>
    </SettingSelectStepStyles>
  );
};

export default SettingSelectStep;
