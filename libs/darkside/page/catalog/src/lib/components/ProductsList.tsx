import { generateProductUrl } from '@diamantaire/shared-product';
import clsx from 'clsx';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import styled from 'styled-components';

import 'react-json-pretty/themes/monikai.css';
import { sortOptionKV } from '../utils';

const StyledProductsList = styled.div`
  .products-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .product-item {
    border: 1px solid #888;
    border-radius: 10px;
    padding: 5px;
    text-align: left;

    .price {
      font-size: 1.5rem;
    }

    .json {
      font-size: 1.7em;
    }

    &:hover {
      border-color: teal;
      box-shadow: 2px 2px 2px teal;
    }
  }
`;

const ProductsList = ({ products }) => {
  const [expandedProductId, setExpandedProductId] = useState<string>('');

  const handleExpandProduct = (productId: string) => {
    if (expandedProductId === productId) {
      setExpandedProductId('');

      return;
    }
    setExpandedProductId(productId);
  };

  return (
    <StyledProductsList className="products-container">
      <h3>Products: {products.length}</h3>
      <div className="products-list">
        {products.map((product) => {
          const { productType, collectionSlug, productSlug } = product;
          const productUrl = generateProductUrl(productType, collectionSlug, productSlug);
          const isExpanded = expandedProductId === product._id;

          return (
            <div className="product-item" key={product._id}>
              <h2>
                {product.collectionTitle} | {product.productTitle} | {product.productType}
              </h2>
              <p>
                <strong className="price">Price:</strong>${product.price / 100}
              </p>
              <p className="product-options">
                <strong>Configuration: </strong>
                {Object.entries(product.configuration)
                  .sort(sortOptionKV)
                  .map(([, v]) => {
                    return v;
                  })
                  .join(' | ')}
              </p>
              <p className="styles">
                <strong>Styles: </strong>
                {product?.styles?.join(' | ') || 'N/A'}
              </p>
              <p className="sku">
                <strong>Sku: </strong>
                {product?.sku}
              </p>
              <p>
                <strong>Links:</strong>
                <a href={productUrl} target="_blank">
                  Dev Product Link
                </a>
              </p>
              <button onClick={() => handleExpandProduct(product._id)}>Show JSON</button>
              <div className={clsx('json', { hidden: !isExpanded })}>
                <JSONPretty data={product} />
              </div>
            </div>
          );
        })}
      </div>
    </StyledProductsList>
  );
};

export { ProductsList };
