import { render } from '@testing-library/react';

import DiamondTableRowAccordion from './DiamondTableRowAccordion';

describe('DiamondTableRowAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DiamondTableRowAccordion />);

    expect(baseElement).toBeTruthy();
  });
});
