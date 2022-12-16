import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { ReactQueryProvider } from '@diamantaire/darkside/data/react-query';
import { DehydratedState } from 'react-query';

export type PageComponentWithTemplate<
  P = Record<string, unknown>,
  IP = P
> = NextPage<P, IP> & {
  getTemplate?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithTemplate = AppProps & {
  Component: PageComponentWithTemplate;
  dehydratedState: DehydratedState;
};

export function CustomApp({ Component, pageProps }: AppPropsWithTemplate) {
  const getTemplate = Component.getTemplate ?? ((page) => page);

  return (
    <ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
      {getTemplate(<Component {...pageProps} />)}
    </ReactQueryProvider>
  );
}
