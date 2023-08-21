import { formatCurrency } from '@diamantaire/shared/helpers';
import styled from 'styled-components';

const ProductPriceStyles = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: calc(var(--gutter) / 4);
`;

const ProductPrice = ({ price }) => {
  return (
    <ProductPriceStyles className="price">
      Starting at{' '}
      {formatCurrency({
        amount: price?.amount,
      })}
    </ProductPriceStyles>
  );
};

export { ProductPrice };
