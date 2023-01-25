import { render } from '@testing-library/react';

import { GlobalTemplate } from './GlobalTemplate';

describe('GlobalTemplate', () => {
  it('should render successfully', () => {
    // eslint-disable-next-line react/no-children-prop
    const { baseElement } = render(<GlobalTemplate children={''} />);

    expect(baseElement).toBeTruthy();
  });
});
