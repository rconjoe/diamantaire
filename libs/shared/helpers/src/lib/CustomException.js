// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#ES6_Custom_Error_Class
// https://medium.com/@xjamundx/custom-javascript-errors-in-es6-aa891b173f87
class CustomException extends Error {
  constructor(message, data, code = 'UNSPECIFIED_ERROR_CODE', ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomException);
    }

    this.name = 'CustomException';
    // Custom debugging information
    this.message = message;
    this.data = data;
    this.code = code;
    this.date = new Date();
  }
}

export default CustomException;
