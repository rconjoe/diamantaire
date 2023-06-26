import type { Meta } from '@storybook/react';

import { Form } from './Form';

const Story: Meta<typeof Form> = {
  component: Form,
  title: 'Form',
};

export default Story;

export const Primary = {
  args: {},
};
