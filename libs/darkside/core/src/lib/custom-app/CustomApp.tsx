import { ClerkProvider } from '@clerk/nextjs';
import { DefaultSeo } from '@diamantaire/darkside/components/seo';
import { GlobalProvider } from '@diamantaire/darkside/context/global-context';
import { GlobalStyles, theme } from '@diamantaire/styles/darkside-styles';
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CookieConsentProvider } from '@use-cookie-consent/react';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import 'node_modules/react-toastify/dist/ReactToastify.css';

export type PageComponentWithTemplate<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getTemplate?: (page: ReactElement) => ReactNode;
};

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
    <QueryClientProvider client={queryClient}>
      <ClerkProvider {...pageProps}>
        <CookieConsentProvider>
          <GlobalProvider>
            <ThemeProvider theme={theme}>
              <DefaultSeo />
              <GlobalStyles />
              <Hydrate state={pageProps.dehydratedState}>{getTemplate(<Component {...pageProps} />)}</Hydrate>
              <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
          </GlobalProvider>
        </CookieConsentProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
