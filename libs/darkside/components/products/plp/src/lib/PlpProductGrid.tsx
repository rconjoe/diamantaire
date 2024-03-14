import { Loader, UIString } from '@diamantaire/darkside/components/common-ui';
import { useGlobalContext, usePlpDatoCreativeBlocks, usePlpDatoPromoCardCollection } from '@diamantaire/darkside/data/hooks';
import { PlpBasicFieldSortOption } from '@diamantaire/shared/types';
import { FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import { media, pageMargin } from '@diamantaire/styles/darkside-styles';
import clsx from 'clsx';
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
  ${pageMargin}

  .container-wrapper:not(:first-child) {
    padding-left: 0;
    padding-right: 0;
  }

  .grid-controls-container {
    position: sticky;
    z-index: var(--z-index-filter);
    background-color: var(--color-white);
    top: ${({ isSettingSelect }) => (isSettingSelect ? 0 : '54px')};
    // margin bottom accounts for .5rem margin on .filter
    padding: 0 1rem;
    margin: 2rem -1rem calc(2rem - 0.5rem);
    &.-short-margin {
      padding: 0 1.75rem;
      // normal margin - settings menu padding
      margin: 2rem -1rem calc(2rem - 1rem - 0.5rem);
    }
    .grid-controls {
      display: flex;
      padding: 0;
      align-items: flex-start;
      justify-content: space-between;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        padding: 0;
      }
    }

    .sort {
      flex-shrink: 0;

      * {
        cursor: pointer;
        align-items: flex-start;
      }
    }
  }

  .product-grid__row {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 1.3rem;
    ${media.medium`
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 2.5rem;
    `}
  }

  .loader-container {
    margin-top: 4rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .filter {
    width: 100%;
    margin-bottom: 0.5rem;
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
      object[20] = { ...creativeBlocksData[1], className: 'creative-block--right' };
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
      <div
        className={clsx('grid-controls-container', {
          '-short-margin': filterOptionsOverride?.length > 0,
        })}
      >
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
                <Fragment key={`${product?.defaultId}-${gridItemIndex}`}>
                  {cardCollectionObject[gridItemIndex] !== undefined && (
                    <PlpPromoItem block={cardCollection[cardCollectionObject[gridItemIndex]]} />
                  )}

                  {creativeBlockObject[gridItemIndex] !== undefined && products.length > 8 && (
                    <PlpCreativeBlock block={creativeBlockObject[gridItemIndex]} plpTitle={plpTitle} />
                  )}

                  {product?.productType === 'diamonds' ? (
                    <PlpDiamondItem product={product} />
                  ) : (
                    <div>
                      <PlpProductItem
                        product={product}
                        plpTitle={plpTitle}
                        position={gridItemIndex}
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
