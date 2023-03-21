import { render } from '@testing-library/react';

import MediaGallery from './MediaGallery';

describe('MediaGallery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MediaGallery assets={[]} />);

    expect(baseElement).toBeTruthy();
  });
});
