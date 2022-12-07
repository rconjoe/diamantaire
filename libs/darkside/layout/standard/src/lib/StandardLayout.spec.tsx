import { render } from '@testing-library/react';

import StandardLayout from './StandardLayout';

describe('StandardLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StandardLayout />);
    expect(baseElement).toBeTruthy();
  });
});
