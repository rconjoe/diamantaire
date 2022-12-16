import { render } from '@testing-library/react';

import DarksidePageTestPage from './DarksidePageTestPage';

describe('DarksidePageTestPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarksidePageTestPage />);
    expect(baseElement).toBeTruthy();
  });
});
