import { render } from '@testing-library/react';

import { OptionItemContainer } from './OptionItem';

describe('OptionItem', () => {
  const defaultProps = {
    option: { id: 'unique-id', value: 'foo', label: 'foo-label', type: 'foo-type' },
    optionType: 'foo-option',
    isSelected: true,
    onClick: () => null,
  };

  it('should render successfully', () => {
    const { baseElement } = render(<OptionItemContainer {...defaultProps} />);

    expect(baseElement).toBeTruthy();
  });
});
