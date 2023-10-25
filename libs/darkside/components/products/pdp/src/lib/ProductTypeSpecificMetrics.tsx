import { Heading, UIString } from '@diamantaire/darkside/components/common-ui';
import styled from 'styled-components';

const ProductTypeSpecificMetricsStyles = styled.div`
  .metric-title {
    margin-bottom: 10px;
    font-size: var(--font-size-xxsmall);

    span {
      font-weight: 400;
    }
  }
`;

const ProductTypeSpecificMetrics = ({ additionalVariantData, productType, shouldDoublePrice }) => {
  const caratWeight = additionalVariantData?.carat;

  const acceptableProductTypes = ['Necklace', 'Bracelet', 'Wedding Band', 'Earrings', 'Ring'];

  return (
    <ProductTypeSpecificMetricsStyles>
      {acceptableProductTypes.includes(productType) && caratWeight ? (
        <Heading type="h2" className="metric-title">
          <UIString>Carat weight</UIString>: <span>{shouldDoublePrice ? caratWeight * 2 : caratWeight}</span>
        </Heading>
      ) : (
        ''
      )}
    </ProductTypeSpecificMetricsStyles>
  );
};

export default ProductTypeSpecificMetrics;
