import { render } from '@testing-library/react';

import DiamondPage from './DiamondPage';

describe('DiamondPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DiamondPage locale={''} options={undefined} countryCode={''} currencyCode={''} dehydratedState={undefined} />,
    );

    expect(baseElement).toBeTruthy();
  });
});
