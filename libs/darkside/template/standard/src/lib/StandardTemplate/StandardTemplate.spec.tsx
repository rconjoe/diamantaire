import { render } from '@testing-library/react';

import StandardTemplate from './StandardTemplate';

describe('StandardTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StandardTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
