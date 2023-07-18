import { render } from '@testing-library/react';

import DiamondPromo from './DiamondPromo';

describe('DiamondPromo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondPromo />);

    expect(baseElement).toBeTruthy();
  });
});
