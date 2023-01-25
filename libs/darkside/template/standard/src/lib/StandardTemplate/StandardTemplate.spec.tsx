import { render } from '@testing-library/react';

import StandardTemplate from './StandardTemplate';

describe('StandardTemplate', () => {
  it('should render successfully', () => {
    // eslint-disable-next-line react/no-children-prop
    const { baseElement } = render(<StandardTemplate children={''} />);

    expect(baseElement).toBeTruthy();
  });
});
