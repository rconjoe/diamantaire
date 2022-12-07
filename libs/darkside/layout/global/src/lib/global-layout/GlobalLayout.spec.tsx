import { render } from '@testing-library/react';

import GlobalLayout from './GlobalLayout';

describe('GlobalLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlobalLayout />);
    expect(baseElement).toBeTruthy();
  });
});
