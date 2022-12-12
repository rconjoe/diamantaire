import { render } from '@testing-library/react';

import HomePageEntry from './HomePageEntry';

describe('HomePageEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePageEntry />);
    expect(baseElement).toBeTruthy();
  });
});
