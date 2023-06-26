// Our storybook configuration is soley managed here. If you need to add storybook to staging or production, you will need to add the exact path to stories.

const config = {
  core: { builder: 'webpack5' },
  stories: [
    '../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../darkside/components/common-ui/molecules/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-styling', '@nx/react/plugins/storybook'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
