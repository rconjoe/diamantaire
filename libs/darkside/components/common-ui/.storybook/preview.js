import { GlobalStyles } from '@diamantaire/styles/darkside-styles';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';

export const decorators = [
  withThemeFromJSXProvider({
    GlobalStyles, // Adds your GlobalStyle component to all stories
  }),
];
