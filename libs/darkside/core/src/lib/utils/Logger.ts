import * as Sentry from '@sentry/nextjs';

const IS_PROD = process.env.NODE_ENV === 'production';

type LogData = object | string | number | boolean;

interface LoggerMethods {
  debug: (message: string, data?: LogData) => void;
  warn: (message: string, data?: LogData) => void;
  error: (error: unknown) => void;
  exception: (error: unknown) => void;
}

export const LogLevel = {
  ALL: 'all',
  DEBUG: 'debug',
  NONE: 'none',
  STANDARD: 'standard',
} as const;

const Logger = (context?: string, level?: (typeof LogLevel)[keyof typeof LogLevel]): LoggerMethods => {
  const msgWithContext = (message) => {
    if (context) {
      return `[${context}] ${message}`;
    }

    return message;
  };

  const isEnabled = (activeValues?: (typeof LogLevel)[keyof typeof LogLevel][]) => {
    // do not log on production or if NONE is provided
    if (level === LogLevel.NONE && !IS_PROD) {
      return false;
    }

    // if no level is provided, default to all
    if (!activeValues || activeValues.length === 0 || level === LogLevel.ALL) {
      return true;
    }

    return activeValues.includes(level);
  };

  const debug = (message, data) => {
    if (!isEnabled([LogLevel.DEBUG])) return;
    console.log(msgWithContext(message), data);
  };
  const warn = (message, data) => {
    if (!isEnabled([LogLevel.STANDARD])) return;
    console.warn(msgWithContext(message), data);
  };
  const error = (err) => {
    if (!isEnabled([LogLevel.STANDARD])) return;
    console.error(msgWithContext(err.message));
  };
  const exception = (err) => {
    // Always send exceptions
    Sentry.captureException(new Error(err));
    if (!isEnabled()) return;
    console.error(msgWithContext(err['message']));
  };

  return {
    debug,
    warn,
    error,
    exception,
  };
};

const createLogger = (context: string, level?: (typeof LogLevel)[keyof typeof LogLevel]) => {
  return Logger(context, level || LogLevel.STANDARD);
};

export default Logger;
export { Logger, createLogger };
