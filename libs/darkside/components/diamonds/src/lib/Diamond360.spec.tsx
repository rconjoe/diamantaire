import { render } from '@testing-library/react';

import Diamond360 from './Diamond360';

describe('Diamond360', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Diamond360 />);

    expect(baseElement).toBeTruthy();
  });
});
