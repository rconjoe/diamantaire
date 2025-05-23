import { css } from 'styled-components';

// Media Queries
export const sizes = {
  xxl: 1800,
  xl: 1600,
  laptop: 1440,
  large: 1200,
  medium: 992,
  small: 768,
  xsmall: 480,
  xxsmall: 376,
};

type SizeProps = {
  xxl?: any;
  xl?: any;
  laptop?: any;
  large?: any;
  medium?: any;
  small?: any;
  xsmall?: any;
};

// iterate through the sizes and create a media template
export const media: SizeProps = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;

  accumulator[label] = (...args) => {
    const [first, ...remaining] = args;

    return css`
      @media (min-width: ${emSize}em) {
        ${css(first, ...remaining)};
      }
    `;
  };

  return accumulator;
}, {});

type Theme = {
  sizes: {
    xxxxl: string;
    xxxl: string;
    xxl: string;
    xl: string;
    desktop: string;
    tablet: string;
  };
};

export const theme: Theme = {
  sizes: {
    xxxxl: '1600px',
    xxxl: '1500px',
    xxl: '1441px',
    xl: '1200px',
    desktop: '992px',
    tablet: '768px',
  },
};
