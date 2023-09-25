import styled from 'styled-components';

const ProductTypeSpecificMetricsStyles = styled.div`
  p {
    margin-bottom: 10px;
    font-size: var(--font-size-xxsmall);
  }
`;

const ProductTypeSpecificMetrics = ({ additionalVariantData, productType }) => {
  const caratWeight = Math.ceil(additionalVariantData?.carat * 100) / 100;

  const acceptableProductTypes = ['Necklace', 'Bracelet', 'Wedding Band'];

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
