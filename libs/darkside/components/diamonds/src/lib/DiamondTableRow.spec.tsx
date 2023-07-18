import { render } from '@testing-library/react';

import DiamondTableRow from './DiamondTableRow';

describe('DiamondTableRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondTableRow />);

    expect(baseElement).toBeTruthy();
  });
});
