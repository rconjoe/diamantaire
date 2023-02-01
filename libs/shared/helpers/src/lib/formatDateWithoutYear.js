import { toBCP47LocaleTag, DEFAULT_LOCALE } from './language';
import { captureException } from '@sentry/nextjs';

/*
  The arguments here match the interface required for use in react-day-picker.

  See https://react-day-picker.js.org/docs/input/
*/
const formatDateWithoutYear = (date, format, locale = DEFAULT_LOCALE) => {
  let localizedDateTime;

  if (!date) {
    return '';
  }

  let intlDateObj = new Intl.DateTimeFormat(toBCP47LocaleTag(locale), {
    month: 'long',
    day: 'numeric',
  });

  try {
    localizedDateTime = intlDateObj.format(date);
  } catch (e) {
    // https://docs.sentry.io/clients/javascript/usage/
    captureException(e, { date, format, locale });

    return '';
  }

  return localizedDateTime;
};

export default formatDateWithoutYear;
