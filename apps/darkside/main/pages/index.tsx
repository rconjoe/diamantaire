import { queries } from '@diamantaire/darkside/data/queries';
import { HomePage } from '@diamantaire/darkside/page/home';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { NextRequest } from 'next/server';

export default HomePage;

export interface GetServerRequest extends NextRequest {
  locale: string;
  req: NextRequest;
}

export async function getServerSideProps({ req }: { req: GetServerRequest }) {
  // locale
  const locale = 'en-US';
  const refinedLocale = 'en_US';

  // device:
  const isMobile = Boolean(
    req.headers['user-agent'].match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i),
  );

  // geo -dev
  const devCountryCode = 'US';

  const devCurrencyCode = 'USD';

  // dato
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries.header.content(locale || 'en_US'),
    meta: { refinedLocale },
  });

  await queryClient.prefetchQuery({
    ...queries.footer.content(locale || 'en_US'),
    meta: { refinedLocale },
  });

  return {
    props: {
      isMobile,
      currencyCode: devCurrencyCode,
      countryCode: devCountryCode,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
