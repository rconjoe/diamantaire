import { getCurrency, parseValidLocale } from '@diamantaire/shared/constants';
import { makeCurrency } from '@diamantaire/shared/helpers';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductPriceStyles = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: calc(var(--gutter) / 4);
`;

const ProductPrice = ({ price }) => {
  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);
  const currencyCode = getCurrency(countryCode);

  return <ProductPriceStyles className="price">Starting at {makeCurrency(price, locale, currencyCode)}</ProductPriceStyles>;
};

export default ProductPrice;
