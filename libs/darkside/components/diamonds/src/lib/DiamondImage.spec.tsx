import { render } from '@testing-library/react';

import DiamondImage from './DiamondImage';

describe('DiamondImage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondImage />);

    expect(baseElement).toBeTruthy();
  });
});
