import styled from 'styled-components';

const ProductPriceContainer = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: calc(var(--gutter) / 4);
`;

const ProductPrice = ({ price }) => {
  return <ProductPriceContainer className="price">Starting at ${price.amount}</ProductPriceContainer>;
};

export default ProductPrice;
