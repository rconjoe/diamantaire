import { render } from '@testing-library/react';

import DiamondFilter, { DiamondFilterProps } from './DiamondFilter';

describe('DiamondFilter', () => {
  it('should render successfully', () => {
    const handleRadioFilterChange = jest.fn();
    const handleSliderFilterChange = jest.fn();
    const loading = false;
    const options = {};
    const ranges = {};
    const locale = 'en_US';
    const countryCode = 'US';
    const currencyCode = 'USD';

    const props: DiamondFilterProps = {
      handleRadioFilterChange,
      handleSliderFilterChange,
      countryCode,
      locale,
      currencyCode,
      loading,
      options,
      ranges,
    };

    const { baseElement } = render(<DiamondFilter {...props} />);

    expect(baseElement).toBeTruthy();
  });
});
