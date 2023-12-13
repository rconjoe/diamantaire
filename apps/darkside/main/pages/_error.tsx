import { DarksidePageError } from '@diamantaire/darkside/page/error';
import * as Sentry from '@sentry/nextjs';
import NextErrorComponent from 'next/error';

const CustomErrorComponent = (props) => {
  return <DarksidePageError {...props} />;
};

CustomErrorComponent.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  return { ...NextErrorComponent.getInitialProps(contextData) };
};

export default CustomErrorComponent;
