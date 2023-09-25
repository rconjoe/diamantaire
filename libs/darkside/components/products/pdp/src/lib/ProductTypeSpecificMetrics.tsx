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
      {productType === 'Necklace' || productType === 'Bracelet' || productType === 'Wedding Band' ? (
        <p>
          <strong>Carat weight</strong>: {Math.ceil(additionalVariantData?.carat * 100) / 100}
        </p>
      ) : (
        ''
      )}
    </ProductTypeSpecificMetricsStyles>
  );
};

export default ProductTypeSpecificMetrics;
