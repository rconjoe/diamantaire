import { render } from '@testing-library/react';

import DiamondsFilters, { DiamondsFiltersProps } from './diamonds-filters';

describe('DiamondsFilters', () => {
  it('should render successfully', () => {
    const handleRadioFilterChange = jest.fn();
    const handleSliderFilterChange = jest.fn();
    const loading = false;
    const options = {};
    const ranges = {};

    const props: DiamondsFiltersProps = {
      handleRadioFilterChange,
      handleSliderFilterChange,
      loading,
      options,
      ranges,
    };

    const { baseElement } = render(<DiamondsFilters {...props} />);

    expect(baseElement).toBeTruthy();
  });
});
