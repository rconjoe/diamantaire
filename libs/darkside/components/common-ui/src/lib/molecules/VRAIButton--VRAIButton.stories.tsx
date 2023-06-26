import type { Meta } from '@storybook/react';

import { VRAIButton } from './VRAIButton';

const Story: Meta<typeof VRAIButton> = {
  component: VRAIButton,
  title: 'VRAIButton',
};

export default Story;

export const Solid = {
  args: {
    children: 'Solid',
    type: 'solid',
    inverse: false,
    isLink: false,
  },
};
export const SolidColorThemeTeal = {
  args: {
    children: 'Solid - Color Theme Teal',
    type: 'solid',
    inverse: false,
    isLink: false,
    colorTheme: 'teal',
  },
};

export const SolidInverse = {
  args: {
    children: 'Solid - Inverse',
    type: 'solid',
    inverse: true,
    isLink: false,
  },
};

export const Underline = {
  args: {
    children: 'Underline',
    type: 'underline',
    inverse: true,
    isLink: false,
    colorTheme: 'yelllo',
  },
};
