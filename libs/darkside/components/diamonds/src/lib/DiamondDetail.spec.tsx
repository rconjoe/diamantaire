import { render } from '@testing-library/react';

import DiamondDetail from './DiamondDetail';

describe('DiamondDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondDetail />);

    expect(baseElement).toBeTruthy();
  });
});
