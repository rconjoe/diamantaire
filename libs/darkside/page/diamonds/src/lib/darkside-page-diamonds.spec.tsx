import { render } from '@testing-library/react';

import DarksidePageDiamonds from './darkside-page-diamonds';

describe('DarksidePageDiamonds', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarksidePageDiamonds />);

    expect(baseElement).toBeTruthy();
  });
});
