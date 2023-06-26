import type { Meta } from '@storybook/react';

import { StorybookHost } from './storybook-host';

const Story: Meta<typeof StorybookHost> = {
  component: StorybookHost,
  title: 'StorybookHost',
};

export default Story;

export const Primary = {
  args: {},
};
