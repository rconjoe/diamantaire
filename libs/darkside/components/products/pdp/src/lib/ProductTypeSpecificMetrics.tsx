import { Heading } from '@diamantaire/darkside/components/common-ui';
import { humanNamesMapperType, useTranslations } from '@diamantaire/darkside/data/hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductTypeSpecificMetricsStyles = styled.div`
  .metric-title {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    font-weight: 500;
    span {
      font-size: 1.7rem;
      font-weight: 400;

      @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
        font-size: 1.6rem;
      }
    }
  }
`;

const ProductTypeSpecificMetrics = ({ parentProductAttributes, additionalVariantData, productType, shouldDoublePrice }) => {
  const { locale } = useRouter();
  const caratWeight = additionalVariantData?.caratWeightOverride || parentProductAttributes?.caratWeight;

  const acceptableProductTypes = ['Necklace', 'Bracelet', 'Wedding Band', 'Earrings', 'Ring'];
  const { _t: translateOptionNames } = useTranslations(locale, [humanNamesMapperType.OPTION_NAMES]);

  return (
    <ProductTypeSpecificMetricsStyles>
      {acceptableProductTypes.includes(productType) && caratWeight ? (
        <Heading type="h2" className="metric-title">
          {/* keep carat weight lowercase for translation */}
          {translateOptionNames(`caratWeight`)}: <span>{shouldDoublePrice ? caratWeight * 2 : caratWeight}</span>
        </Heading>
      ) : (
        ''
      )}
    </ProductTypeSpecificMetricsStyles>
  );
};

export default ProductTypeSpecificMetrics;
