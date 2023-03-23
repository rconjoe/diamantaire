import { DefaultSeo } from '@diamantaire/darkside/components/seo';
import { GlobalStyles } from '@diamantaire/styles/darkside-styles';
import { DehydratedState } from '@tanstack/react-query';
import type { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

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
  // const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      {/* <GlobalProvider> */}
      {/* <QueryClientProvider client={queryClient}> */}
      <DefaultSeo />
      <GlobalStyles />
      {/* <Hydrate state={pageProps.dehydratedState}>{getTemplate(<Component {...pageProps} />)}</Hydrate> */}
      {getTemplate(<Component {...pageProps} />)}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </QueryClientProvider> */}

      {/* </GlobalProvider> */}
    </>
  );
}
