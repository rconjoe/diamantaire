import { UIString, Heading } from '@diamantaire/darkside/components/common-ui';
import { getFormattedPrice } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductPriceStyles = styled.div`
  margin-bottom: calc(var(--gutter) / 4);
  .price-text {
    font-size: 2rem;
    font-weight: 500;
  }

  .small {
    font-size: 1.2rem;
  }
`;

type ProductPriceProps = {
  price: number;
  shouldDoublePrice?: boolean;
  hasMoreThanOneVariant: boolean;
  isBuilderProduct: boolean;
};

const ProductPrice = ({ shouldDoublePrice = false, price, hasMoreThanOneVariant, isBuilderProduct }: ProductPriceProps) => {
  const { locale } = useRouter();

  const isInUS = locale === 'en-US';

  return (
    <ProductPriceStyles className="price">
      <Heading type="h2" className="price-text">
        {hasMoreThanOneVariant && isBuilderProduct && <UIString>Starting at</UIString>}{' '}
        {getFormattedPrice(shouldDoublePrice ? price * 2 : price, locale)}
      </Heading>
      {/* Is this right?? */}
      {!isInUS && (
        <p className="small">
          <UIString>incl. VAT</UIString>
        </p>
      )}
    </ProductPriceStyles>
  );
};

export { ProductPrice };
