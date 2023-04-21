import styled from 'styled-components';

const ProductPriceContainer = styled.h1`
  font-weight: 500;
  font-size: 2.8rem;
`;

export function ProductTitle({ title }) {
  // use product title composition logic;
  return <ProductPriceContainer>{title}</ProductPriceContainer>;
}
