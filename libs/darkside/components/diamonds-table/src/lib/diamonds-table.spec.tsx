import { render } from '@testing-library/react';

import DiamondsTable from './diamonds-table';

describe('DiamondsTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondsTable />);

    expect(baseElement).toBeTruthy();
  });
});
