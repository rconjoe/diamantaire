import {
  applyExchangeRate,
  combinePricesOfMultipleProducts,
  getCurrency,
  getFormattedPrice,
  parseValidLocale,
  simpleFormatPrice,
} from '@diamantaire/shared/constants';
import styled from 'styled-components';

const PriceDebuggerStyles = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 400px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #000;
  z-index: 1000;
`;

const PriceDebugger = ({ price, locale }) => {
  const { countryCode } = parseValidLocale(locale);

  const currency = getCurrency(countryCode);

  const exchangeRatePrice = applyExchangeRate(price / 100, currency, false);

  return (
    <PriceDebuggerStyles>
      <h1>Debug</h1>
      <p>Base Price: {price}</p>

      <p>Exchange rate applied to base: {exchangeRatePrice} </p>
      <p>Just formatting base val: {simpleFormatPrice(price)} </p>

      <p>getFormattedPrice: {getFormattedPrice(price, locale, true, false, false)}</p>
      <p>combinePricesOfMultipleProducts: {simpleFormatPrice(combinePricesOfMultipleProducts([price], locale), locale)}</p>
      <hr />
    </PriceDebuggerStyles>
  );
};

export { PriceDebugger };
