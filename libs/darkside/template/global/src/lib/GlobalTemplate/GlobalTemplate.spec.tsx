import { render } from '@testing-library/react';

import GlobalTemplate from './GlobalTemplate';

describe('GlobalTemplate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GlobalTemplate />);
    expect(baseElement).toBeTruthy();
  });
});
