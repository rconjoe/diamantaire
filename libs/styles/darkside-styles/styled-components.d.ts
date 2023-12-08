import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    sizes: {
      xxl: string;
      xl: string;
      desktop: string;
      tablet: string;
    };
  }
}
