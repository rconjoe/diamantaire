import { render } from '@testing-library/react';

import DiamondHand from './DiamondHand';

describe('DiamondHand', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondHand />);

    expect(baseElement).toBeTruthy();
  });
});
