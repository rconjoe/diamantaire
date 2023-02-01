import React from 'react';
import PropTypes from 'prop-types';
import {
  mapStr,
  replacePlaceholders,
  toBCP47LocaleTag,
  formatNumber,
  getProductSpecsFromConfiguredProducts,
  getProductSpecsFromOptions,
} from './language';

const TestComponent = ({ text }) => {
  return (
    <div>
      <span>{text}</span>
    </div>
  );
};

TestComponent.propTypes = {
  text: PropTypes.string.isRequired,
};

describe('mapStr language helper', () => {
  const map = {
    key: 'value',
  };

  it('returns mapped string if found', () => {
    expect(mapStr(map, 'key')).toBe('value');
  });

  it('returns mapped value of lowercase key if original key map is not found', () => {
    expect(mapStr(map, 'KEY')).toBe('value');
  });

  it('returns original string if not found in map', () => {
    expect(mapStr(map, 'notAKey')).toBe('notAKey');
  });

  it('returns original string is map not provided', () => {
    expect(mapStr(undefined, 'key')).toBe('key');
  });
});

describe('replacePlaceholders language helper', () => {
  const string =
    'This string has two {{placeholder_1}}, here is another {{placeholder_2}} and more';
  const string2 =
    'This string has two {{placeholder_2}}, here is another {{placeholder_1}} and more';
  const placeholders = ['{{placeholder_1}}', '{{placeholder_2}}'];

  it('replaces placeholders with string values by index order as an array', () => {
    expect(
      replacePlaceholders(string, placeholders, ['value1', 'value2'])
    ).toEqual('This string has two value1, here is another value2 and more');
  });

  it('replaces placeholders with string values by index order as an array with different order placeholders', () => {
    expect(
      replacePlaceholders(string2, placeholders, ['value1', 'value2'])
    ).toEqual('This string has two value2, here is another value1 and more');
  });

  it('replaces placeholders with string and components in order, returns array', () => {
    expect(
      replacePlaceholders(string, placeholders, [
        'value1',
        <TestComponent key="test" text="foo" />,
      ])
    ).toEqual([
      'This string has two ',
      'value1',
      ', here is another ',
      <TestComponent key="test" text="foo" />,
      ' and more',
    ]);
  });

  it('replaces placeholders with components in order, returns array', () => {
    expect(
      replacePlaceholders(string, placeholders, [
        <TestComponent key="test" text="bar" />,
        <TestComponent key="test" text="foo" />,
      ])
    ).toEqual([
      'This string has two ',
      <TestComponent key="test" text="bar" />,
      ', here is another ',
      <TestComponent key="test" text="foo" />,
      ' and more',
    ]);
  });

  describe('formatNumber language helper', () => {
    it('converts a decimal number to use the proper format', () => {
      expect(formatNumber(2.99, 'de')).toBe('2,99');
    });

    it('accepts en_US and returns proper format as string', () => {
      expect(formatNumber(2.99, 'en_US')).toBe('2.99');
    });

    it('converts a decimal number to use the proper format and maintains 2 decimal places', () => {
      expect(formatNumber(2.9, 'de')).toBe('2,90');
    });
  });

  describe('toBCP47LocaleTag language helper', () => {
    it('converts en_US to en-US', () => {
      expect(toBCP47LocaleTag('en_US')).toBe('en-US');
    });

    it('does not alted "de"', () => {
      expect(toBCP47LocaleTag('de')).toBe('de');
    });
  });

  describe('Product specs localization', () => {
    const configuredProducts = [
      { options: { diamondType: 'baguette' } },
      { options: { diamondType: 'round-brilliant' } },
    ];
    const configuredNecklaceProduct = {
      ringSize: '16',
    };
    const configuredNecklaceProductWithCarat = {
      ringSize: '0.75ct',
    };
    const configuredBraceletProduct = {
      ringSize: '10 - 14',
      bandColor: 'red',
    };
    const configuredEarringProduct = {
      ringSize: '5.5',
    };
    const configuredEarringProductWithCarat = {
      ringSize: '0.10ct',
    };
    const configuredRingProduct = {
      ringSize: '10 - 16',
      side: 'left',
      diamondCount: '6',
    };
    const configuredERProduct = {
      ringSize: '5.5',
      sideStoneShape: 'oval',
      sideStoneCarat: '0.25ct',
      metal: '14k yellow gold',
      bandAccent: 'pave',
      caratWeight: '1.0ct',
    };
    const stringMaps = {
      OPTION_NAMES: {
        shape: 'Shape',
        side: 'Side',
        'side stone shape': 'Side Stone Shape',
        'side stone carat': 'Side Stone Carat',
        metal: 'Metal',
        band: 'Band Accent',
        'band color': 'Band Color',
        'band width': 'Band Width',
        'ring size': 'Ring Size',
        'diamond count': 'Diamond Count',
        'carat weight': 'Carat Weight',
        'chain length': 'Chain Length',
        'hoop length': 'Hoop Length',
        size: 'Size',
      },
      DIAMOND_SHAPES: {
        baguette: 'Baguette',
        'round-brilliant': 'Round Brilliant',
        oval: 'Oval',
      },
      METALS_WITH_GOLD_PURITIES_IN_HUMAN_NAMES: {
        '14k yellow gold': '14k Yellow Gold',
        '14k white gold': '14k White Gold',
      },
      BAND_ACCENT_CATEGORY_SHORT_HUMAN_NAMES: {
        plain: 'Plain',
        pave: 'Pave',
      },
      BAND_COLORS: {
        red: 'Red',
        black: 'Black',
      },
      SIDE_OPTIONS: {
        left: 'Left',
        right: 'Right',
      },
      CARAT_WEIGHT_HUMAN_NAMES: {
        '1.0ct': '1',
        '2.0ct': '2',
        '2.8ct': '3', // eternity-band
        '4.0ct': '4',
        '4.5ct': '4½',
        '5.0ct': '5',
        '6.5ct': '6½',
        '7.5ct': '7½',
        '8.0ct': '8',
      },
    };
    const productType = 'Engagement Rings';
    const locale = 'en_US';

    describe('getProductSpecsFromConfiguredProducts', () => {
      it('returns an array of product spec strings', () => {
        const localizedProductSpecs = getProductSpecsFromConfiguredProducts({
          configuredProducts,
          stringMaps,
          productType,
          locale,
        });

        expect(localizedProductSpecs).toEqual([
          'Shape: Baguette',
          'Shape: Round Brilliant',
        ]);
      });
    });

    describe('getProductSpecsFromOptions language helper', () => {
      it('returns a spec string given valid Necklace ringSize option with carat', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredNecklaceProductWithCarat,
          stringMaps,
          productType: 'Necklace',
          locale: 'en_US',
        });

        expect(productSpecs).toBe('Carat Weight: 3/4ct');
      });

      it('returns a spec string given valid Necklace options', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredNecklaceProduct,
          stringMaps,
          productType: 'Necklace',
          locale: 'en_US',
        });

        expect(productSpecs).toBe('Chain Length: 16"');
      });

      it('returns a spec string given valid Bracelet options', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredBraceletProduct,
          stringMaps,
          productType: 'Bracelet',
          locale: 'en_US',
        });

        expect(productSpecs).toBe('Band Color: Red;Size: 10 - 14');
      });

      it('returns a spec string given valid Earring options with carat', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredEarringProductWithCarat,
          stringMaps,
          productType: 'Earrings',
          locale: 'en_US',
        });

        expect(productSpecs).toBe('Carat Weight: 1/10ct');
      });

      it('returns a spec string given valid Earring options', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredEarringProduct,
          stringMaps,
          productType: 'Earrings',
          locale: 'en_US',
        });

        expect(productSpecs).toBe('Hoop Length: 5.5');
      });

      it('returns a spec string given valid Ring options', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredRingProduct,
          stringMaps,
          productType: 'Earrings',
          locale: 'en_US',
        });

        expect(productSpecs).toBe(
          'Side: Left;Hoop Length: 10 - 16;Diamond Count: 6'
        );
      });

      it('returns a spec string given valid ER options', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredERProduct,
          stringMaps,
          productType: 'Earrings',
          locale: 'en_US',
        });

        expect(productSpecs).toBe(
          'Side Stone Shape: Oval;Side Stone Carat: 1/4ct;Metal: 14k Yellow Gold;Band Accent: Pave;Hoop Length: 5.5;Carat Weight: 1 ctw'
        );
      });

      it('returns an empty string when missing options', () => {
        const productSpecs = getProductSpecsFromOptions({
          undefined,
          stringMaps,
          productType: 'Necklace',
          locale: 'en_US',
        });

        expect(productSpecs).toBe('');
      });

      it('returns an empty string when missing string maps', () => {
        const productSpecs = getProductSpecsFromOptions({
          options: configuredNecklaceProduct,
          stringMaps: {},
          productType: 'Necklace',
          locale: 'en_US',
        });

        expect(productSpecs).toBe('');
      });
    });
  });
});
