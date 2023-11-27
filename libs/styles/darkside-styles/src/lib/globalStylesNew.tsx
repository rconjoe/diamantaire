import localFont from 'next/font/local';

import { CssHelpers } from './css-helpers';
import { CssVariables } from './css-variables.style';
import { MiscStyles } from './misc.style';
import { ResetStyles } from './reset.style';
import { Typography } from './typography';

export const vraiFont = localFont({
  variable: '--font-family-main',
  preload: true,
  src: [
    {
      path: './fonts/futura-pt_light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/futura-pt_book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/futura-pt_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/futura-pt_demi.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export const MAIN_FONT = 'var(--font-family-main)';

export const HEADLINE_SIZE = '2rem';

export function makeTealLink() {
  return `
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-xsmall);
    color: var(--color-teal);
    font-family: ${MAIN_FONT};
    text-decoration: underline;
  `;
}

export const GlobalStyles = () => {
  return (
    <>
      <div className={vraiFont.variable} />
      <ResetStyles />
      <CssVariables />
      <CssHelpers />
      <Typography />
      <MiscStyles />
    </>
  );
};
