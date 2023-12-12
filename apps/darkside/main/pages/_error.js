import { queries } from '@diamantaire/darkside/data/queries';
import { DarksidePageError } from '@diamantaire/darkside/page/error';
import { getTemplate as getStandardTemplate } from '@diamantaire/darkside/template/standard';
import * as Sentry from '@sentry/nextjs';
import { QueryClient, dehydrate } from '@tanstack/react-query';

const CustomErrorComponent = (props) => {
  return <DarksidePageError {...props} />;
};

CustomErrorComponent.getTemplate = getStandardTemplate;

CustomErrorComponent.getInitialProps = async (ctx) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  const locale = 'en-US';

  await Sentry.captureUnderscoreErrorException(ctx);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    ...queries['standard-page'].content('error-page', locale),
  });
  await queryClient.prefetchQuery({
    ...queries.template.global(locale),
  });

  return { dehydratedState: dehydrate(queryClient), locale, error: ctx.err };
};

export default CustomErrorComponent;
