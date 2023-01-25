import { render } from '@testing-library/react';

import { TestPage } from './TestPage';

describe('DarksidePageTestPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestPage />);

    expect(baseElement).toBeTruthy();
  });
});
