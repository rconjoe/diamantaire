import { render } from '@testing-library/react';

import DarksideContextProductBuilder from './darkside-context-product-builder';

describe('DarksideContextProductBuilder', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DarksideContextProductBuilder />);
    expect(baseElement).toBeTruthy();
  });
});
