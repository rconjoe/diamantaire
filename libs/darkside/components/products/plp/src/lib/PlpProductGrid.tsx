import { usePlpDatoCreativeBlocks, usePlpDatoPromoCardCollection } from '@diamantaire/darkside/data/hooks';
import { ListPageDiamondItem } from '@diamantaire/shared-diamond';
import { FilterTypeProps, FilterValueProps, ListPageItemWithConfigurationVariants } from '@diamantaire/shared-product';
import { media } from '@diamantaire/styles/darkside-styles';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
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
`;

type PlpProductGridProps = {
  promoCardCollectionId: string;
  creativeBlockIds: string[];
  data;
  isFetching: boolean;
  initialProducts: ListPageItemWithConfigurationVariants[] | ListPageDiamondItem[];
  availableFilters?: {
    [key in FilterTypeProps]: string[];
  };
  filterValue?: FilterValueProps;
  setFilterValues?;
  initialFilterValues?: {
    [key in FilterTypeProps]: string;
  };
};

const PlpProductGrid = ({
  promoCardCollectionId,
  creativeBlockIds,
  data,
  isFetching,
  initialProducts,
  availableFilters,
  filterValue,
  setFilterValues,
}: PlpProductGridProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [hasGridInitialized, setHasGridInitialized] = useState(false);

  const { data: { plpPromoCardCollection: { data: cardCollection } = {} } = {} } = usePlpDatoPromoCardCollection(
    'en_US',
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

  function isObjectEmpty(obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    if (isFetching) return;
    const allProducts = [];

    data?.pages?.forEach((page) => {
      page?.products?.forEach((product) => {
        allProducts.push(product);
      });
    });

    if ((allProducts.length > 0 && hasGridInitialized) || !isObjectEmpty(filterValue)) {
      setProducts(allProducts);
    }

    if (!hasGridInitialized) setHasGridInitialized(true);
  }, [data, filterValue, isFetching]);

  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <PlpProductGridStyles ref={gridRef}>
      <PlpProductFilter
        availableFilters={availableFilters}
        gridRef={gridRef}
        filterValue={filterValue}
        setFilterValues={setFilterValues}
      />
      <div className="container-wrapper">
        <div className="product-grid__row ">
          {products?.map((product, gridItemIndex) => (
            <Fragment key={product.defaultId}>
              {cardCollectionObject[gridItemIndex + 1] !== undefined && (
                <PlpPromoItem block={cardCollection[cardCollectionObject[gridItemIndex + 1]]} />
              )}

              {creativeBlockObject[gridItemIndex + 1] !== undefined && products.length > 8 && (
                <PlpCreativeBlock block={creativeBlockObject[gridItemIndex + 1]} />
              )}
              {product.productType === 'diamonds' ? (
                <PlpDiamondItem product={product} />
              ) : (
                <PlpProductItem product={product} />
              )}
            </Fragment>
          ))}
          {products.length === 0 && (
            <div className="no-items-message">
              <p>No items match your selection</p>
            </div>
          )}
        </div>
      </div>
    </PlpProductGridStyles>
  );
};

export { PlpProductGrid };
