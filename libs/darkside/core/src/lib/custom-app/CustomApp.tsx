import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

export type PageComponentWithLayout<
  P = Record<string, unknown>,
  IP = P
> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppContextWithLayout = AppProps & {
  Component: PageComponentWithLayout;
};

export function CustomApp({ Component, pageProps }: AppContextWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
