/**
 * NOTE: This requires `@sentry/nextjs` version 7.3.0 or higher.
 *
 * NOTE: If using this with `next` version 12.2.0 or lower, uncomment the
 * penultimate line in `CustomErrorComponent`.
 *
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */
import { queries } from '@diamantaire/darkside/data/queries';
import { DarksidePageError } from '@diamantaire/darkside/page/error';
import * as Sentry from '@sentry/nextjs';
import { QueryClient } from '@tanstack/react-query';
import NextErrorComponent from 'next/error';

const CustomErrorComponent = (props) => {
  // If you're using a Nextjs version prior to 12.2.1, uncomment this to
  // compensate for https://github.com/vercel/next.js/issues/8592
  // Sentry.captureUnderscoreErrorException(props);

  return <DarksidePageError {...props} />;

  // return <NextErrorComponent statusCode={props.statusCode} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  const { locale } = contextData;

  // const { countryCode } = parseValidLocale(locale);

  // const currencyCode = getCurrency(countryCode);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content('error-page', locale),
  });

  return { ...NextErrorComponent.getInitialProps(contextData), locale };
};

export default CustomErrorComponent;
