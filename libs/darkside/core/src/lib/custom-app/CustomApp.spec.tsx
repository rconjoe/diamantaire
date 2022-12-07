import { render } from '@testing-library/react';

import CustomApp from './CustomApp';

describe('CustomApp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomApp />);
    expect(baseElement).toBeTruthy();
  });
});
