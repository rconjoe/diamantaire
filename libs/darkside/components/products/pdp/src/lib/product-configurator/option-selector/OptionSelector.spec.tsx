import { render } from '@testing-library/react';

import OptionSelector from './OptionSelector';

describe('OptionSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <OptionSelector optionType="type" label="Label" options={[]} selectedOptionValue="selected-option" />,
    );

    expect(baseElement).toBeTruthy();
  });
});
