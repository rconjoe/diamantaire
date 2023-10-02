import React from 'react';
import styled from 'styled-components';

const ProductExtraInfoStyles = styled.div`
  margin: 15px 0 0;
  p {
    font-size: var(--font-size-xxsmall);
  }
`;

const ProductExtraInfo = ({ extraOptions }) => {
  return (
    <ProductExtraInfoStyles>
      {extraOptions?.map((item) => (
        <p key={item.label}>
          <strong>{item.label}: </strong>
          {item.name}
        </p>
      ))}
    </ProductExtraInfoStyles>
  );
};

export default ProductExtraInfo;
