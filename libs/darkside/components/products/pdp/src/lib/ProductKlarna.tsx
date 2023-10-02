import { parseValidLocale } from '@diamantaire/shared/constants';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ProductKlarnaStyles = styled.div`
  position: relative;
  left: -10px;
`;

const ProductKlarna = ({ title, currentPrice }) => {
  const { locale } = useRouter();
  const { countryCode } = parseValidLocale(locale);

  // Only available in the US
  if (countryCode !== 'US') {
    return null;
  }

  const isWithinKlarnaPriceRange = (price) => {
    const minKlarnaPrice = 200 * 100;
    const maxKlarnaPrice = 10000 * 100;

    if (price < minKlarnaPrice || price > maxKlarnaPrice) {
      return false;
    }

    return true;
  };

  if (!isWithinKlarnaPriceRange(currentPrice)) {
    return null;
  }

  return (
    <ProductKlarnaStyles>
      {/* @ts-expect-error one-time only for this */}
      <klarna-placement
        title={title}
        data-key="credit-promotion-auto-size"
        data-locale="en-US"
        data-purchase-amount={currentPrice}
        id="klarna-placement"
      />
    </ProductKlarnaStyles>
  );
};

export { ProductKlarna };
