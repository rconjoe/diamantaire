import { render } from '@testing-library/react';

import DarksideComponentsHeader from './DarksideComponentsHeader';

describe('DarksideComponentsHeader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarksideComponentsHeader />);

    expect(baseElement).toBeTruthy();
  });
});
