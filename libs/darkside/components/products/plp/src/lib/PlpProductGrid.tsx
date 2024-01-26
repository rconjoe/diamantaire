import { Loader, UIString } from '@diamantaire/darkside/components/common-ui';
import { useGlobalContext, usePlpDatoCreativeBlocks, usePlpDatoPromoCardCollection } from '@diamantaire/darkside/data/hooks';
import { PlpBasicFieldSortOption } from '@diamantaire/shared/types';
import { FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { Fragment, useMemo, useRef } from 'react';
import styled from 'styled-components';

import PlpProductFilter from './filter/PlpProductFilter';
import PlpCreativeBlock from './PlpCreativeBlock';
import { PlpDiamondItem } from './PlpDiamondItem';
import { PlpProductItem } from './PlpProductItem';
import PlpPromoItem from './PlpPromoItem';
import { SortProperties } from './PlpSortOption';
import { PlpSortOptions } from './PlpSortOptions';

const PlpProductGridStyles = styled.div`
  padding: 0 0 calc(var(--gutter) / 2);
  position: relative;
  height: 100%;

  .grid-controls-container {
    position: sticky;
    z-index: var(--z-index-filter);
    background-color: var(--color-white);
    top: ${({ isSettingSelect }) => (isSettingSelect ? 0 : '55px')};

    .grid-controls {
      display: flex;
      padding: 0 1rem;
      align-items: start;
      justify-content: space-between;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: 0;
      }
    }

    .sort {
      padding-top: 1rem;

      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        position: absolute;
        cursor: pointer;
        padding-top: 0;
        right: 0.5rem;
        top: 0.1rem;
      }

      * {
        cursor: pointer;
      }
    }
  }

  .product-grid {
    padding: 0 1rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0;
    }
  }

  .product-grid__row {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 0.8rem;

    ${media.medium`
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 2.5rem;
    `}
  }

  .loader-container {
    margin: 1rem 0;
    text-align: center;
  }

  .filter {
    width: 100%;
  }
`;

type PlpProductGridProps = {
  promoCardCollectionId: string;
  creativeBlockIds: string[];
  data;
  isFetching: boolean;
  availableFilters?: {
    [key in FilterTypeProps]: string[];
  };
  plpTitle?: string;
  plpSlug: string;
  // This is a temporary override to allow the builder to ignore rules we use to handle the server-side stuff
  builderFlowOverride?: boolean;
  selectSetting?: (_obj: { collectionSlug: string; productSlug: string }) => void;
  filterValue?: FilterValueProps;
  setFilterValues?;
  initialFilterValues?: {
    [key in FilterTypeProps]: string;
  };
  urlFilterMethod: 'facet' | 'param' | 'none';
  onSortChange: ({ sortBy, sortOrder }: SortProperties) => void;
  sortOptions: PlpBasicFieldSortOption[];
  filterOptionsOverride?: {
    filterLabel: string;
    filterValue: string;
  }[];
  subcategoryFilter?: {
    data: {
      slug: string;
    }[];
  }[];
};

const PlpProductGrid = ({
  promoCardCollectionId,
  creativeBlockIds,
  data,
  availableFilters,
  filterValue,
  setFilterValues,
  plpTitle,
  builderFlowOverride = false,
  selectSetting,
  isFetching,
  plpSlug,
  urlFilterMethod,
  sortOptions,
  onSortChange,
  filterOptionsOverride,
  subcategoryFilter,
}: PlpProductGridProps) => {
  const router = useRouter();

  const { asPath, locale } = router || {};

  const useProductTitleOnly = asPath.includes('/engagement-rings/settings');

  const includeStylesFilter = asPath.includes('/engagement-rings/');

  const { headerHeight } = useGlobalContext();

  const { data: { plpPromoCardCollection: { data: cardCollection } = {} } = {} } = usePlpDatoPromoCardCollection(
    locale,
    promoCardCollectionId,
  );

  const useLargeCreativeImageInDesktop = !useProductTitleOnly;

  const useLargeCreativeImageInMobile = asPath.includes('/jewelry');

  const { data: creativeBlockParentData } = usePlpDatoCreativeBlocks(
    locale,
    creativeBlockIds,
    useLargeCreativeImageInDesktop,
    useLargeCreativeImageInMobile,
  );

  const creativeBlockObject = useMemo(() => {
    if (!creativeBlockIds) return {}; // Return an empty object if cardCollection is falsy
    const creativeBlocksData = creativeBlockParentData?.allCreativeBlocks.sort((a, b) => {
      // order is not guaranteed when requesting the ids by themselves so the blocks must be sorted
      return creativeBlockIds.indexOf(a.id) - creativeBlockIds.indexOf(b.id);
    });

    if (!creativeBlocksData) return {}; // Return an empty object if cardCollection is falsy

    const object = {};

    if (creativeBlocksData[0]) {
      object[8] = { ...creativeBlocksData[0], className: 'creative-block--left' };
    }

    if (creativeBlocksData[1]) {
      object[19] = { ...creativeBlocksData[1], className: 'creative-block--right' };
    }

    return object;
  }, [creativeBlockParentData, creativeBlockIds]);

  const cardCollectionObject = useMemo(() => {
    if (!cardCollection) return {}; // Return an empty object if cardCollection is falsy

    const object = {};

    cardCollection &&
      Array.from(cardCollection)?.forEach((item, cardIndex) => {
        object[item.plpPosition] = cardIndex;
      });

    return object;
  }, [cardCollection]);

  const gridRef = useRef<HTMLDivElement>(null);

  const products = data?.pages?.map((page) => page?.products).flat() || [];

  if (availableFilters && !includeStylesFilter) {
    delete availableFilters.subStyles;
  }

  if (availableFilters && router?.asPath?.includes('/customize/') && availableFilters['price']) {
    delete availableFilters.price;
  }

  return (
    <PlpProductGridStyles ref={gridRef} headerHeight={headerHeight}>
      <div className="grid-controls-container">
        <div className="grid-controls container-wrapper">
          <div className="filter">
            <PlpProductFilter
              availableFilters={availableFilters}
              gridRef={gridRef}
              filterValue={filterValue}
              setFilterValues={setFilterValues}
              urlFilterMethod={urlFilterMethod}
              plpSlug={plpSlug}
              filterOptionsOverride={filterOptionsOverride}
              subcategoryFilter={subcategoryFilter}
            />
          </div>

          <div className="sort">
            {sortOptions && <PlpSortOptions sortOptions={sortOptions} onSortOptionChange={onSortChange} />}
          </div>
        </div>
      </div>

      <div className="container-wrapper product-grid">
        <div className="product-grid__row ">
          {products?.length > 0 &&
            products?.map((product, gridItemIndex) => {
              if (!product) {
                return null;
              }

              return (
                <Fragment key={product?.defaultId}>
                  {cardCollectionObject[gridItemIndex] !== undefined && (
                    <PlpPromoItem block={cardCollection[cardCollectionObject[gridItemIndex]]} />
                  )}

                  {creativeBlockObject[gridItemIndex] !== undefined && products.length > 8 && (
                    <PlpCreativeBlock
                      block={creativeBlockObject[gridItemIndex]}
                      plpTitle={plpTitle}
                      selectSetting={selectSetting}
                    />
                  )}

                  {product?.productType === 'diamonds' ? (
                    <PlpDiamondItem product={product} />
                  ) : (
                    <div>
                      <PlpProductItem
                        product={product}
                        plpTitle={plpTitle}
                        position={gridItemIndex}
                        selectSettingForBuilderFlow={() => {
                          return selectSetting({
                            collectionSlug: product.variants[product.defaultId]?.collectionSlug,
                            productSlug: product.variants[product.defaultId]?.productSlug,
                          });
                        }}
                        builderFlowOverride={builderFlowOverride}
                        useProductTitleOnly={useProductTitleOnly}
                      />
                    </div>
                  )}
                </Fragment>
              );
            })}

          {products.length === 0 && !isFetching && (
            <div className="no-items-message">
              <p>
                <UIString>noresult</UIString>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="loader-container">{isFetching && <Loader color="#000" />}</div>
    </PlpProductGridStyles>
  );
};

export { PlpProductGrid };
