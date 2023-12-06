import { CustomApp } from '@diamantaire/darkside/core';
import localFont from '@next/font/local';

export const vraiFont = localFont({
  variable: '--font-family-main',
  preload: true,
  src: [
    {
      path: './futura-pt_light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './futura-pt_book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './futura-pt_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './futura-pt_demi.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export default CustomApp;
