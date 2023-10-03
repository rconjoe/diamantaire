import { DarksideButton, Loader } from '@diamantaire/darkside/components/common-ui';
import { usePlpDatoCreativeBlocks, usePlpDatoPromoCardCollection } from '@diamantaire/darkside/data/hooks';
import { FilterTypeProps, FilterValueProps } from '@diamantaire/shared-product';
import { media } from '@diamantaire/styles/darkside-styles';
import { useRouter } from 'next/router';
import { Fragment, useMemo, useRef } from 'react';
import styled from 'styled-components';

import PlpCreativeBlock from './PlpCreativeBlock';
import { PlpDiamondItem } from './PlpDiamondItem';
import PlpProductFilter from './PlpProductFilter';
import { PlpProductItem } from './PlpProductItem';
import PlpPromoItem from './PlpPromoItem';

const PlpProductGridStyles = styled.div`
  padding: 0 0 calc(var(--gutter) / 2);
  position: relative;
  height: 100%;
  .product-grid__row {
    display: grid;
    flex-wrap: wrap;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    ${media.medium`grid-template-columns: repeat(4, 1fr);`}
  }
  .loader-container {
    margin: 1rem 0;
    text-align: center;
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
  isSettingSelect?: boolean;
  selectSetting?: (_obj: { collectionSlug: string; productSlug: string }) => void;
  filterValue?: FilterValueProps;
  setFilterValues?;
  initialFilterValues?: {
    [key in FilterTypeProps]: string;
  };
  urlFilterMethod: 'facet' | 'param' | 'none';
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
  isSettingSelect = false,
  selectSetting,
  isFetching,
  plpSlug,
  urlFilterMethod,
}: PlpProductGridProps) => {
  const router = useRouter();

  const { data: { plpPromoCardCollection: { data: cardCollection } = {} } = {} } = usePlpDatoPromoCardCollection(
    router.locale,
    promoCardCollectionId,
  );

  const { data: { allCreativeBlocks: creativeBlocksData } = {} } = usePlpDatoCreativeBlocks('en_US', creativeBlockIds);

  const creativeBlockObject = useMemo(() => {
    if (!creativeBlocksData) return {}; // Return an empty object if cardCollection is falsy

    const object = {};

    if (creativeBlocksData[0]) {
      object[4] = { ...creativeBlocksData[0], className: 'creative-block--left' };
    }

    if (creativeBlocksData[1]) {
      object[15] = { ...creativeBlocksData[1], className: 'creative-block--right' };
    }

    return object;
  }, [creativeBlocksData]);

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
  const products = data?.pages?.map((page) => page.products).flat() || [];

  return (
    <PlpProductGridStyles ref={gridRef}>
      <PlpProductFilter
        availableFilters={availableFilters}
        gridRef={gridRef}
        filterValue={filterValue}
        setFilterValues={setFilterValues}
        urlFilterMethod={urlFilterMethod}
        plpSlug={plpSlug}
      />
      <div className="container-wrapper">
        <div className="product-grid__row ">
          {products?.length > 0 &&
            products?.map((product, gridItemIndex) => {
              if (!product) {
                return null;
              }

              return (
                <Fragment key={product?.defaultId}>
                  {cardCollectionObject[gridItemIndex + 1] !== undefined && !builderFlowOverride && (
                    <PlpPromoItem block={cardCollection[cardCollectionObject[gridItemIndex + 1]]} />
                  )}

                  {creativeBlockObject[gridItemIndex + 1] !== undefined && products.length > 8 && !builderFlowOverride && (
                    <PlpCreativeBlock block={creativeBlockObject[gridItemIndex + 1]} />
                  )}

                  {product?.productType === 'diamonds' ? (
                    <PlpDiamondItem product={product} />
                  ) : (
                    <div>
                      <PlpProductItem product={product} position={gridItemIndex} plpTitle={plpTitle} />
                      {isSettingSelect && (
                        <div
                          style={{
                            marginTop: '20px',
                          }}
                        >
                          <DarksideButton
                            onClick={() =>
                              selectSetting({
                                collectionSlug: product.variants[product.defaultId]?.collectionSlug,
                                productSlug: product.variants[product.defaultId]?.productSlug,
                              })
                            }
                          >
                            Select
                          </DarksideButton>
                        </div>
                      )}
                    </div>
                  )}
                </Fragment>
              );
            })}
          {products.length === 0 && !isFetching && (
            <div className="no-items-message">
              <p>No items match your selection</p>
            </div>
          )}
        </div>
      </div>

      <div className="loader-container">{isFetching && <Loader color="#000" />}</div>
    </PlpProductGridStyles>
  );
};

export { PlpProductGrid };
