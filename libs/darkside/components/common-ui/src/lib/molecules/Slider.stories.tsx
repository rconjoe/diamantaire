import type { Meta } from '@storybook/react';

import { Slider } from './Slider';

const Story: Meta<typeof Slider> = {
  component: Slider,
  title: 'Slider',
};

export default Story;

export const Primary = {
  args: {
    type: 'price',
    range: [0, 1000],
    value: 0,
    step: 100,
    handleChange: (val) => {
      return val;
    },
    handleDisplay: (val) => {
      return val;
    },
  },
};
