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

const ProductTypeSpecificMetrics = ({ additionalVariantData, parentProductAttributes, shouldDoublePrice }) => {
  const { locale, pathname } = useRouter();

  const carat = additionalVariantData
    ? additionalVariantData?.caratWeightOverride || parentProductAttributes?.caratWeight
    : '';
  const caratWeight = carat ? (shouldDoublePrice ? carat * 2 : carat) : '';
  const acceptableProductTypes = ['necklace', 'bracelet', 'wedding-bands', 'earrings', 'ring'];
  const isAcceptableProductType = acceptableProductTypes.some((acceptableProductType) =>
    pathname.includes(acceptableProductType),
  );
  const { _t: translateOptionNames } = useTranslations(locale, [humanNamesMapperType.OPTION_NAMES]);

  return (
    <ProductTypeSpecificMetricsStyles>
      {isAcceptableProductType && (
        <Heading type="h2" className="metric-title">
          {/* keep carat weight lowercase for translation */}
          {translateOptionNames(`caratWeight`)}: <span>{caratWeight}</span>
        </Heading>
      )}
    </ProductTypeSpecificMetricsStyles>
  );
};

export default ProductTypeSpecificMetrics;
