import { UIString } from '@diamantaire/darkside/core';
import { makeCurrency } from '@diamantaire/shared/helpers';
import styled from 'styled-components';

const ProductPriceStyles = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: calc(var(--gutter) / 4);
`;

const ProductPrice = ({ price, hasMoreThanOneVariant }) => {
  return (
    <ProductPriceStyles className="price">
      {hasMoreThanOneVariant && <UIString>Starting at</UIString>} {makeCurrency(price, 'en-US', 'USD')}
    </ProductPriceStyles>
  );
};

export { ProductPrice };
