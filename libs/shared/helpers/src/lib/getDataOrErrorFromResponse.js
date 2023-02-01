import { captureException } from '@sentry/minimal';

/**
 * Returns a getDataOrErrorFromResponse function with the proper context string
 * @param {string} contextString - text used in error reporting to signify context its used in
 */
export const createResponseHandler = contextString => response =>
  getDataOrErrorFromResponse(response, contextString);

/**
 * Returns an object with either data or error properties depending ont the status.
 * @param {*} response - response promise from a request
 * @param {*} contextString - string used to identify which API / request its being used for
 */
const getDataOrErrorFromResponse = async (response, contextString) => {
  let result;

  if (response.status === 200) {
    const data = await response.json();

    result = { data };
  } else {
    try {
      const error = await response.json();

      result = { error };
    } catch {
      result = { error: { message: 'Unknown error' } };
    }
    captureException(
      new Error(`Error occured in the ${contextString}: ${result.message}`)
    );
  }

  return result;
};

export default getDataOrErrorFromResponse;
