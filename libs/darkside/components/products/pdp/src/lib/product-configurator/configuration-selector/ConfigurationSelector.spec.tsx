import { render } from '@testing-library/react';

import ConfigurationSelector from './ConfigurationSelector';

describe('ConfigurationSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ConfigurationSelector configurations={{}} selectedConfiguration={{}} />);

    expect(baseElement).toBeTruthy();
  });
});
