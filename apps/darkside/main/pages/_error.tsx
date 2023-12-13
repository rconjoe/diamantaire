import * as Sentry from '@sentry/nextjs';

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}
 
Error.getInitialProps = async (contextData) => {
  const {res, err} = contextData;

  await Sentry.captureUnderscoreErrorException(contextData);

  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  
  return { statusCode }
}
 
export default Error