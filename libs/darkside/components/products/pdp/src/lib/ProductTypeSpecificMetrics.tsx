import styled from 'styled-components';

const ProductTypeSpecificMetricsStyles = styled.div`
  p {
    margin-bottom: 10px;
    font-size: var(--font-size-xxsmall);
  }
`;

const ProductTypeSpecificMetrics = ({ additionalVariantData, productType }) => {
  return (
    <ProductTypeSpecificMetricsStyles>
      {productType === 'Necklace' || productType === 'Bracelet' ? (
        <p>
          <strong>Carat weight</strong>: {additionalVariantData?.carat}
        </p>
      ) : (
        ''
      )}
    </ProductTypeSpecificMetricsStyles>
  );
};

export default ProductTypeSpecificMetrics;
