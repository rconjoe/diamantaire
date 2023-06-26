const config = {
  stories: ['../src/lib/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-styling'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
};

export default config;
