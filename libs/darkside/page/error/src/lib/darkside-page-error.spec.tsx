import { render } from '@testing-library/react';
import React from 'react';

import DarksidePageError from './darkside-page-error';

describe('DarksidePageError', () => {
  it('should render successfully', () => {
    const props = {
      locale: 'en',
      countryCode: 'US',
      currencyCode: 'USD',
    };
    const { baseElement } = render(<DarksidePageError {...props} />);

    expect(baseElement).toBeTruthy();
  });
});
