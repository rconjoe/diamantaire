import type { Meta } from '@storybook/react';

import { Tooltip } from './Tooltip';

const Story: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Tooltip',
};

export default Story;

export const Primary = {
  args: {
    children: 'Tooltip',
    id: 'wjfnjeg',
  },
};
