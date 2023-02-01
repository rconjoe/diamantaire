import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
import { GlobalProvider } from 'libs/darkside/context/global-context/src';
import { GlobalStyles } from '@diamantaire/styles/darkside-styles';

export type PageComponentWithTemplate<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getTemplate?: (page: ReactElement) => ReactNode;
};

// export const GlobalStyles = createGlobalStyle`
//   body {
//     background-color: red;
//   }
// `;

export type AppPropsWithTemplate = AppProps & {
  Component: PageComponentWithTemplate;
  dehydratedState: DehydratedState;
};

export function CustomApp({ Component, pageProps }: AppPropsWithTemplate) {
  const getTemplate = Component.getTemplate ?? ((page) => page);

  // https://tanstack.com/query/v4/docs/guides/ssr#using-hydration
  // Layout files can then use useQuery() hooks to call for their data by key.
  // As long as the same keys are prefetched in the GSSP/SSG of the page using that layout,
  // the data will always be there at first render.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <GlobalProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Hydrate state={pageProps.dehydratedState}>{getTemplate(<Component {...pageProps} />)}</Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalProvider>
  );
}
