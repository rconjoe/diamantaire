import { render } from '@testing-library/react';

import DarksideDataReactQuery from './DarksideDataReactQuery';

describe('DarksideDataReactQuery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarksideDataReactQuery />);
    expect(baseElement).toBeTruthy();
  });
});
