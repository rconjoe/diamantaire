import { PageViewTracker } from '@diamantaire/analytics';
import { Loader } from '@diamantaire/darkside/components/common-ui';
import { PlpHeroBanner, PlpProductGrid } from '@diamantaire/darkside/components/products/plp';
import { BuilderProductContext } from '@diamantaire/darkside/context/product-builder';
import { usePlpVRAIProducts } from '@diamantaire/darkside/data/api';
import { useBuilderFlowSeo, usePlpDatoServerside } from '@diamantaire/darkside/data/hooks';
import { queries } from '@diamantaire/darkside/data/queries';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import { useRudderStackAnalytics } from '@diamantaire/shared/rudderstack';
import { FilterValueProps } from '@diamantaire/shared-product';
import { DehydratedState, QueryClient, dehydrate } from '@tanstack/react-query';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useRef, useState } from 'react';
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
    margin: 0;
  }

  .grid-wrapper {
    padding: 0rem;
    > div {
      height: auto;
    }
  }
  .load-more-trigger {
    width: 100%;
    display: block;
  }
`;

const SettingSelectStep = () => {
  const { locale } = useRouter();
  const { data: seoData } = useBuilderFlowSeo(locale);
  const { seoTitle, seoDescription } = seoData?.builderFlow?.seoFields || {};

  const { builderProduct } = useContext(BuilderProductContext);

  const settingTypeToShow = builderProduct?.diamonds?.[0]?.diamondType;

  const containerRef = useRef(null);

  const { ref: pageEndRef, inView } = useInView({
    rootMargin: '1600px',
  });

  const category = 'engagement-rings';
  const plpSlug = settingTypeToShow ? settingTypeToShow + '-cut' : null;

  const [filterValue, setFilterValues] = useState<FilterValueProps>({});
  const [activeSortOptions, setActiveSortOptions] = useState({});

  // Keep in case we're asked to add creative to PLP in this view
  const { data: { listPage: plpData } = {} } = usePlpDatoServerside(locale, plpSlug, category);
  const { hero, promoCardCollection, creativeBlocks } = plpData || {};
  const creativeBlockIds = creativeBlocks && Array.from(creativeBlocks)?.map((block) => block.id);

  const { sortOptions } = plpData || {};

  const productData = usePlpVRAIProducts(category, plpSlug, { ...filterValue, ...activeSortOptions }, { page: 1 }, locale);

  const { data, fetchNextPage, isFetching, hasNextPage } = productData;

  const availableFilters = data?.pages?.[0]?.availableFilters;

  // Handle pagination
  useEffect(() => {
    if (isFetching) return;
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  const handleSortChange = ({ sortBy, sortOrder }: { id: string; sortBy: string; sortOrder: 'asc' | 'desc' }) => {
    setActiveSortOptions({
      sortBy,
      sortOrder,
    });
  };
  const listPageData = {
    productData: data,
    hero,
    category,
  };

  const analytics = useRudderStackAnalytics();

  useEffect(() => {
    if (analytics) {
      analytics?.page();
    }
  }, [analytics?.ready]);

  return (
    <SettingSelectStepStyles>
      <NextSeo title={seoTitle} description={seoDescription} nofollow={true} noindex={true} />
      <PageViewTracker listPageData={listPageData} />
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
            plpSlug={plpSlug}
            urlFilterMethod={'none'}
            onSortChange={handleSortChange}
            sortOptions={sortOptions}
            builderFlowOverride={true}
          />
        </div>

        <div ref={pageEndRef} className="load-more-trigger" />
      </div>
    </SettingSelectStepStyles>
  );
};

SettingSelectStep.getTemplate = getStandardTemplate;
export default SettingSelectStep;

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
