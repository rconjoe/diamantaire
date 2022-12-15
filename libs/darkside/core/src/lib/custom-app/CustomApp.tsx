import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type PageComponentWithLayout<
  P = Record<string, unknown>,
  IP = P
> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppContextWithLayout = AppProps & {
  Component: PageComponentWithLayout;
};

const queryClient = new QueryClient();

export function CustomApp({ Component, pageProps }: AppContextWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
