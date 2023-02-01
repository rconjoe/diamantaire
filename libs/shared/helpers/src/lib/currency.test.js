import {
  shopifyNumberToHumanPrice,
  makeCurrency,
  dropZeroCents,
  replaceMoneyByCurrency,
} from './currency';

/* eslint-disable no-irregular-whitespace */
/**
 *  Please note when writting test for any function using JS API Intl:
 *
 *  Intl does not use space (ASCII 32) but non-breaking space (ASCII 160).
 *  '299,99 €' uses ASCII 160
 *
 *  Node does not use a complete ICU / locale list.  This needs to be provided to Node.
 *  1. install full-icu (only dev dep needed for tests)
 *  2. Run your test with NODE_ICU_DATA=node_modules/full-icu jest
 *  https://stackoverflow.com/questions/52329629/intl-numberformat-behaves-incorrectly-in-jest-unit-test
 *
 */

describe('Pricing / Currency Helpers', () => {
  describe('shopifyNumberToHumanPrice', () => {
    it('returns a readable USD price with decimals when given an integer only', () => {
      const humanPrice = shopifyNumberToHumanPrice(22999);

      expect(humanPrice).toBe('$229.99');
    });

    it('returns a readable USD price with decimals when given a float only', () => {
      const humanPrice = shopifyNumberToHumanPrice(229.99);

      expect(humanPrice).toBe('$229.99');
    });

    it('returns a readable price in Euros when given German localization options', () => {
      const humanPrice = shopifyNumberToHumanPrice(
        229.99,
        'de-DE',
        'EUR',
        'DE'
      );

      expect(humanPrice).toBe('€ 230');
    });

    it('returns a rounded readable price with VAT in Euros when given German localization options and VAT rates', () => {
      const humanPrice = shopifyNumberToHumanPrice(
        4229.99,
        'de-DE',
        'EUR',
        'DE',
        { DE: 1.25 },
        true
      );

      expect(humanPrice).toBe('€ 5.288');
    });
  });

  describe('makeCurrency', () => {
    it('returns properly formatted price in USD (no additional params)', () => {
      const formattedCurrency = makeCurrency(1299.99);

      expect(formattedCurrency).toBe('$1,299.99');
    });

    it('returns properly formatted price in USD (no additional params) when the cents are a multiple of 10', () => {
      const formattedCurrency = makeCurrency(4.5);

      expect(formattedCurrency).toBe('$4.50');
    });

    it('returns properly formatted price in EUR', () => {
      const formattedCurrency = makeCurrency(299.99, 'de-DE', 'EUR');

      expect(formattedCurrency).toBe('€ 299,99');
    });

    it('returns properly formatted price in EUR', () => {
      const formattedCurrency = makeCurrency(2299.99, 'de-DE', 'EUR');

      expect(formattedCurrency).toBe('€ 2.299,99');
    });

    it('returns a Euro formatted currency if currency code is EUR but locale is in US', () => {
      const formattedCurrency = makeCurrency(299.99, 'en_US', 'EUR');

      expect(formattedCurrency).toBe('€ 299,99');
    });
  });

  describe('dropZeroCents', () => {
    it('returns a formatted price in USD without showing 00 cents', () => {
      expect(dropZeroCents('$1,233.00')).toBe('$1,233');
    });

    it('returns a formatted price in USD with non 00 cents showing', () => {
      expect(dropZeroCents('$1,233.99')).toBe('$1,233.99');
    });

    it('returns a formatted price in USD with non 00 cents showing', () => {
      expect(dropZeroCents('$4.50')).toBe('$4.50');
    });

    it('returns a formatted price in EUR with 00 cents showing', () => {
      expect(dropZeroCents('2.299,00 €')).toBe('2.299,00 €');
    });

    it('returns a formatted price in EUR with non 00 cents showing', () => {
      expect(dropZeroCents('2.299,99 €')).toBe('2.299,99 €');
    });
  });
});

describe('properly parses and replaces string with formatted value based on currency map', () => {
  const PRICES = {
    AUD: 500,
    CAD: 400,
    EUR: 300,
    GBP: 200,
    USD: 50,
  };

  const testStr1 = '$100 for you my friend';
  const testStr2 = 'Hey friend, can I get $100?';
  const testStr3 = 'Friends may help with $ 100 if you ask nicely';

  const testStr4 = 'I have no money!';
  const testStr5 = 'I have %%value%% for myself';

  const testEurStr1 = '€100 for you my friend';
  const testEurStr2 = 'Hey friend, can I get €100?';
  const testEurStr3 = 'Friends may help with € 100 if you ask nicely';

  it('replaces the monetary value when provided as $100 properly for USD', () => {
    // AUD
    expect(replaceMoneyByCurrency(testEurStr1, 'AUD', PRICES)).toBe(
      'A$500 for you my friend'
    );
    expect(replaceMoneyByCurrency(testEurStr2, 'AUD', PRICES)).toBe(
      'Hey friend, can I get A$500?'
    );
    expect(replaceMoneyByCurrency(testEurStr3, 'AUD', PRICES)).toBe(
      'Friends may help with A$500 if you ask nicely'
    );
    // CAD
    expect(replaceMoneyByCurrency(testStr1, 'CAD', PRICES)).toBe(
      'CA$400 for you my friend'
    );
    expect(replaceMoneyByCurrency(testStr2, 'CAD', PRICES)).toBe(
      'Hey friend, can I get CA$400?'
    );
    expect(replaceMoneyByCurrency(testStr3, 'CAD', PRICES)).toBe(
      'Friends may help with CA$400 if you ask nicely'
    );
    // EUR
    expect(replaceMoneyByCurrency(testStr1, 'EUR', PRICES)).toBe(
      '€ 300 for you my friend'
    );
    expect(replaceMoneyByCurrency(testStr2, 'EUR', PRICES)).toBe(
      'Hey friend, can I get € 300?'
    );
    expect(replaceMoneyByCurrency(testStr3, 'EUR', PRICES)).toBe(
      'Friends may help with € 300 if you ask nicely'
    );
    // GBP
    expect(replaceMoneyByCurrency(testStr1, 'GBP', PRICES)).toBe(
      '£200 for you my friend'
    );
    expect(replaceMoneyByCurrency(testStr2, 'GBP', PRICES)).toBe(
      'Hey friend, can I get £200?'
    );
    expect(replaceMoneyByCurrency(testStr3, 'GBP', PRICES)).toBe(
      'Friends may help with £200 if you ask nicely'
    );
    // USD
    expect(replaceMoneyByCurrency(testStr1, 'USD', PRICES)).toBe(
      '$50 for you my friend'
    );
    expect(replaceMoneyByCurrency(testStr2, 'USD', PRICES)).toBe(
      'Hey friend, can I get $50?'
    );
    expect(replaceMoneyByCurrency(testStr3, 'USD', PRICES)).toBe(
      'Friends may help with $50 if you ask nicely'
    );
  });

  it('returns original string when provided an empty map', () => {
    expect(replaceMoneyByCurrency(testStr1, 'USD', {})).toBe(
      '$100 for you my friend'
    );
    expect(replaceMoneyByCurrency(testStr2, 'USD', {})).toBe(
      'Hey friend, can I get $100?'
    );
    expect(replaceMoneyByCurrency(testStr3, 'USD', {})).toBe(
      'Friends may help with $ 100 if you ask nicely'
    );
  });

  it('replaces the monetary value when provided as a %%value%% placeholder', () => {
    expect(replaceMoneyByCurrency(testStr5, 'AUD', PRICES)).toBe(
      'I have A$500 for myself'
    );
    expect(replaceMoneyByCurrency(testStr5, 'CAD', PRICES)).toBe(
      'I have CA$400 for myself'
    );
    expect(replaceMoneyByCurrency(testStr5, 'EUR', PRICES)).toBe(
      'I have € 300 for myself'
    );
    expect(replaceMoneyByCurrency(testStr5, 'GBP', PRICES)).toBe(
      'I have £200 for myself'
    );
    expect(replaceMoneyByCurrency(testStr5, 'USD', PRICES)).toBe(
      'I have $50 for myself'
    );
  });

  it('returns the original string if no mapped currency value is provided', () => {
    expect(replaceMoneyByCurrency(testStr4, 'AUD', PRICES)).toBe(
      'I have no money!'
    );
    expect(replaceMoneyByCurrency(testStr4, 'CAD', PRICES)).toBe(
      'I have no money!'
    );
    expect(replaceMoneyByCurrency(testStr4, 'EUR', PRICES)).toBe(
      'I have no money!'
    );
    expect(replaceMoneyByCurrency(testStr4, 'GBP', PRICES)).toBe(
      'I have no money!'
    );
    expect(replaceMoneyByCurrency(testStr4, 'USD', PRICES)).toBe(
      'I have no money!'
    );
  });
});
/* eslint-enable no-irregular-whitespace */
