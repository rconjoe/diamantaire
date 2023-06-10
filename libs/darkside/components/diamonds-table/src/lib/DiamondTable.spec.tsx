import { render } from '@testing-library/react';

import DiamondTable from './DiamondTable';

describe('DiamondTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondTable />);

    expect(baseElement).toBeTruthy();
  });
});
