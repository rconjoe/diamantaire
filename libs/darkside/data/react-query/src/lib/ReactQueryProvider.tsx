// A component that can be used inside of CustomApp, wrapping the call to `GlobalTemplate.getTemplate`.
//
// It handles the instantiation of react-query such that layout state can be preserved underneath,
// yet there is still a new `QueryClient` created per page-fetch.
// This is to avoid sharing data between requests, which would inevitably return stale data in some cases.
//
// We are using the 'hydration' pattern:
// > React Query supports prefetching multiple queries on the server in Next.js and then dehydrating those queries to the queryClient.
// > This means the server can prerender markup that is immediately available on page load and as soon as JS is available,
// > React Query can upgrade or hydrate those queries with the full functionality of the library.
// > This includes refetching those queries on the client if they have become stale since the time they were rendered on the server.
//
// https://tanstack.com/query/v4/docs/guides/ssr#using-hydration

import { ReactNode, useState } from 'react';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/* eslint-disable-next-line */
type ReactQueryProviderProps = {
  children: ReactNode;
  dehydratedState: DehydratedState;
};

export function ReactQueryProvider({
  children,
  dehydratedState,
}: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  console.log('re-client');
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
