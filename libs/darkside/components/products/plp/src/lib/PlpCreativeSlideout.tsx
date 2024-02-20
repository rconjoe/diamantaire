import { useProductShopTheLook } from '@diamantaire/darkside/data/hooks';
import { useMemo } from 'react';
import styled from 'styled-components';

import { PlpProductItem } from './PlpProductItem';

const ShopTheLookSlideOutStyles = styled.div`
  .product-list {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin: 2rem 0;
    padding: 0;
  }

  .plp-variant__image {
    min-height: auto;
  }
`;

const PlpCreativeSlideOut = ({ configurationsInOrder, locale, plpTitle }) => {
  const ids = useMemo(
    () => configurationsInOrder.reduce((a, v) => [...a, v.variantId || v.shopifyProductHandle], []),
    [configurationsInOrder],
  );

  const { data: { products } = {} } = useProductShopTheLook(ids, locale);

  return (
    <ShopTheLookSlideOutStyles>
      <ul className="product-list">
        {products?.length > 0 &&
          products?.map((product, gridItemIndex) => {
            if (!product) {
              return null;
            }

            return (
              <PlpProductItem
                key={`${gridItemIndex}-${product.productTitle}`}
                product={product}
                plpTitle={plpTitle}
                position={gridItemIndex}
                useProductTitleOnly={true}
              />
            );
          })}
      </ul>
    </ShopTheLookSlideOutStyles>
  );
};

export default PlpCreativeSlideOut;
