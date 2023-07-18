import { render } from '@testing-library/react';

import DiamondSpecs from './DiamondDetailSpecs';

describe('DiamondSpecs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondSpecs />);

    expect(baseElement).toBeTruthy();
  });
});
