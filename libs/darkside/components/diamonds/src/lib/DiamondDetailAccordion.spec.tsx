import { render } from '@testing-library/react';

import DiamondDetailAccordion from './DiamondDetailAccordion';

describe('DiamondDetailAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondDetailAccordion />);

    expect(baseElement).toBeTruthy();
  });
});
