import styled from 'styled-components';

const ProductTypeSpecificMetricsStyles = styled.div`
  p {
    margin-bottom: 10px;
    font-size: var(--font-size-xxsmall);
  }
`;

const ProductTypeSpecificMetrics = ({ additionalVariantData, productType }) => {
  const caratWeight = parseFloat(((additionalVariantData?.carat * 100) / 100).toFixed(2));

  const acceptableProductTypes = ['Necklace', 'Bracelet', 'Wedding Band', 'Earrings', 'Ring'];

  return (
    <ProductTypeSpecificMetricsStyles>
      {acceptableProductTypes.includes(productType) && caratWeight !== 0 ? (
        <p>
          <strong>Carat weight</strong>: {caratWeight}
        </p>
      ) : (
        ''
      )}
    </ProductTypeSpecificMetricsStyles>
  );
};

export default ProductTypeSpecificMetrics;
